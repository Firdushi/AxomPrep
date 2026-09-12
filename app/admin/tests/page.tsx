import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "../page";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminTests() {
  await requireAdmin();

  const s = await createClient();

  const { data: testsData } = await s
    .from("tests")
    .select(
      "id,title_en,duration_minutes,published,created_at,test_questions(count)"
    )
    .order("created_at", { ascending: false });

  const tests = testsData ?? [];

  return (
    <div className="page">
      <div className="container admin-layout">
        <AdminNav />

        <div className="admin-main">
          <div className="section-head">
            <div>
              <span className="badge">
                TEST BUILDER
              </span>

              <h1 className="page-title">Tests</h1>
            </div>

            <Link
              className="btn primary"
              href="/admin/tests/new"
            >
              + New Test
            </Link>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Duration</th>
                  <th>Questions</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tests.map((t: any) => (
                  <tr key={t.id}>
                    <td>{t.title_en}</td>

                    <td>
                      {t.duration_minutes} min
                    </td>

                    <td>
                      {t.test_questions?.[0]?.count ?? 0}
                    </td>

                    <td>
                      {t.published
                        ? "Published"
                        : "Draft"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!tests.length && (
            <div className="empty">
              No tests have been created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
