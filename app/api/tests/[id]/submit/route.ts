import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const answers =
      body &&
      typeof body.answers === "object" &&
      body.answers !== null
        ? body.answers
        : {};

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Login required" },
        { status: 401 }
      );
    }

    const { data: result, error: gradeError } =
      await supabase.rpc("grade_test", {
        p_test_id: id,
        p_answers: answers,
      });

    if (gradeError) {
      return NextResponse.json(
        { error: gradeError.message },
        { status: 500 }
      );
    }

    const grading = result?.[0];

    if (!grading) {
      return NextResponse.json(
        { error: "Unable to grade test" },
        { status: 500 }
      );
    }

    const score = Number(grading.score);
    const total = Number(grading.total);

    if (total === 0) {
      return NextResponse.json(
        { error: "Test contains no questions" },
        { status: 400 }
      );
    }

    const {
      data: attempt,
      error: attemptError,
    } = await supabase
      .from("attempts")
      .insert({
        user_id: user.id,
        test_id: id,
        submitted_at: new Date().toISOString(),
        score,
        total,
        answers,
      })
      .select("id")
      .single();

    if (attemptError) {
      return NextResponse.json(
        { error: attemptError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      attemptId: attempt.id,
      score,
      total,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
