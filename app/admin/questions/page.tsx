import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "../page";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Questions() {
  await requireAdmin();

  const s = await createClient();

  const { data: qsData } = await s
    .from("questions")
    .select(
      "id,question_en,difficulty,created_at,categories(name_en)"
    )
    .order("created_at", { ascending: false });

  const qs = qsData ?? [];

  return (
    <div className="page">
      <div className="container admin-layout">
        <AdminNav />

        <div className="admin-main">
          <div className="section-head">
            <div>
              <span className="badge">
                QUESTION BANK
              </span>

              <h1 className="page-title">MCQs</h1>
            </div>

            <Link
              className="btn primary"
              href="/admin/questions/new"
            >
              + Add Question
            </Link>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                </tr>
              </thead>

              <tbody>
                {qs.map((q: any) => (
                  <tr key={q.id}>
                    <td>{q.question_en}</td>

                    <td>
                      {q.categories?.name_en || "—"}
                    </td>

                    <td>{q.difficulty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!qs.length && (
            <div className="empty">
              No questions have been added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
