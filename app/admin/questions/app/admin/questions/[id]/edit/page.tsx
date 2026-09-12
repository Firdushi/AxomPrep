import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateQuestion(formData: FormData) {
  "use server";

  await requireAdmin();

  const id = String(formData.get("id") || "");
  const question_en = String(
    formData.get("question_en") || ""
  ).trim();

  const question_as = String(
    formData.get("question_as") || ""
  ).trim();

  const option_a = String(
    formData.get("option_a") || ""
  ).trim();

  const option_b = String(
    formData.get("option_b") || ""
  ).trim();

  const option_c = String(
    formData.get("option_c") || ""
  ).trim();

  const option_d = String(
    formData.get("option_d") || ""
  ).trim();

  const correct_index = Number(
    formData.get("correct_index")
  );

  const difficulty = String(
    formData.get("difficulty") || "medium"
  );

  const explanation_en = String(
    formData.get("explanation_en") || ""
  ).trim();

  const explanation_as = String(
    formData.get("explanation_as") || ""
  ).trim();

  if (
    !id ||
    !question_en ||
    !option_a ||
    !option_b ||
    !option_c ||
    !option_d ||
    !Number.isInteger(correct_index) ||
    correct_index < 0 ||
    correct_index > 3
  ) {
    throw new Error(
      "Please complete all required fields."
    );
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("questions")
    .update({
      question_en,
      question_as,
      options: [
        option_a,
        option_b,
        option_c,
        option_d,
      ],
      correct_index,
      difficulty,
      explanation_en,
      explanation_as,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/questions");
}

export default async function EditQuestion({
  params,
}: PageProps) {
  await requireAdmin();

  const { id } = await params;

  const supabase = await createClient();

  const { data: question } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (!question) {
    notFound();
  }

  const options = Array.isArray(question.options)
    ? question.options
    : [];

  return (
    <div className="page">
      <div className="container">

        <Link
          href="/admin/questions"
          className="small"
        >
          ← Back to Questions
        </Link>

        <div className="section-head">
          <div>
            <span className="badge">
              QUESTION BANK
            </span>

            <h1 className="page-title">
              Edit MCQ
            </h1>
          </div>
        </div>

        <form
          action={updateQuestion}
          className="card"
        >

          <input
            type="hidden"
            name="id"
            value={question.id}
          />

          <label htmlFor="question_en">
            Question — English
          </label>

          <textarea
            id="question_en"
            name="question_en"
            rows={4}
            defaultValue={question.question_en}
            required
          />

          <label htmlFor="question_as">
            Question — Assamese
          </label>

          <textarea
            id="question_as"
            name="question_as"
            rows={4}
            defaultValue={question.question_as || ""}
          />

          <label htmlFor="option_a">
            Option A
          </label>

          <input
            id="option_a"
            name="option_a"
            defaultValue={options[0] || ""}
            required
          />

          <label htmlFor="option_b">
            Option B
          </label>

          <input
            id="option_b"
            name="option_b"
            defaultValue={options[1] || ""}
            required
          />

          <label htmlFor="option_c">
            Option C
          </label>

          <input
            id="option_c"
            name="option_c"
            defaultValue={options[2] || ""}
            required
          />

          <label htmlFor="option_d">
            Option D
          </label>

          <input
            id="option_d"
            name="option_d"
            defaultValue={options[3] || ""}
            required
          />

          <label htmlFor="correct_index">
            Correct Answer
          </label>

          <select
            id="correct_index"
            name="correct_index"
            defaultValue={String(
              question.correct_index
            )}
            required
          >
            <option value="0">
              Option A
            </option>

            <option value="1">
              Option B
            </option>

            <option value="2">
              Option C
            </option>

            <option value="3">
              Option D
            </option>
          </select>

          <label htmlFor="difficulty">
            Difficulty
          </label>

          <select
            id="difficulty"
            name="difficulty"
            defaultValue={
              question.difficulty || "medium"
            }
          >
            <option value="easy">
              Easy
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="hard">
              Hard
            </option>
          </select>

          <label htmlFor="explanation_en">
            Explanation — English
          </label>

          <textarea
            id="explanation_en"
            name="explanation_en"
            rows={5}
            defaultValue={
              question.explanation_en || ""
            }
          />

          <label htmlFor="explanation_as">
            Explanation — Assamese
          </label>

          <textarea
            id="explanation_as"
            name="explanation_as"
            rows={5}
            defaultValue={
              question.explanation_as || ""
            }
          />

          <div className="actions">

            <button
              type="submit"
              className="btn primary"
            >
              Save Changes
            </button>

            <Link
              href="/admin/questions"
              className="btn"
            >
              Cancel
            </Link>

          </div>

        </form>

      </div>
    </div>
  );
}
