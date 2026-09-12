import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { TestRunner } from "@/components/TestRunner";

export const dynamic = "force-dynamic";

export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();

  const { id } = await params;

  const supabase = await createClient();

  const { data: test } = await supabase
    .from("tests")
    .select("id,title_en,title_as,duration_minutes")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!test) {
    notFound();
  }

  const { data: questionsData, error } =
    await supabase.rpc("get_test_questions", {
      p_test_id: id,
    });

  if (error) {
    throw new Error(error.message);
  }

  const questions = (questionsData ?? []).map(
    (q: any) => ({
      id: q.question_id,
      question_en: q.question_en,
      question_as: q.question_as,
      options: q.options,
    })
  );

  return (
    <div className="page">
      <div className="container">
        <TestRunner
          test={{
            id: test.id,
            title: test.title_en,
            duration: test.duration_minutes,
          }}
          questions={questions}
        />
      </div>
    </div>
  );
}
