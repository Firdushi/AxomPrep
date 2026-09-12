import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "../page";

export const dynamic = "force-dynamic";

export default async function Questions() {
  await requireAdmin();

  const s = await createClient();

  const { data: qsData } = await s
    .from("questions")
    .select(
      "id,question_en,question_as,difficulty,created_at,categories(name_en)"
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

              <h1 className="page-title">
                MCQs
              </h1>

              <p className="muted">
                Manage your AxomPrep question bank.
              </p>
            </div>

            <div className="actions">

              <Link
                className="btn"
                href="/admin/questions/import"
              >
                Bulk Import
              </Link>

              <Link
                className="btn primary"
                href="/admin/questions/new"
              >
                + Add Question
              </Link>

            </div>

          </div>

          <div className="table-wrap">

            <table className="table">

              <thead>
                <tr>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {qs.map((q: any) => (

                  <tr key={q.id}>

                    <td>
                      <strong>
                        {q.question_en}
                      </strong>

                      {q.question_as && (
                        <div className="small">
                          {q.question_as}
                        </div>
                      )}
                    </td>

                    <td>
                      {q.categories?.name_en || "—"}
                    </td>

                    <td>
                      {q.difficulty}
                    </td>

                    <td>

                      <Link
                        className="btn"
                        href={`/admin/questions/${q.id}/edit`}
                      >
                        Edit
                      </Link>

                    </td>

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
