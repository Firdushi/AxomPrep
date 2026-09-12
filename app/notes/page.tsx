import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Notes({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q || "";
  const supabase = await createClient();

  let query = supabase
    .from("notes")
    .select(
      "id,slug,title_en,title_as,excerpt_en,excerpt_as,categories(name_en,name_as)"
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(
      `title_en.ilike.%${q}%,title_as.ilike.%${q}%,excerpt_en.ilike.%${q}%`
    );
  }

  const { data: notesData } = await query;

  const notes = notesData ?? [];

  return (
    <div className="page">
      <div className="container">
        <span className="badge">LEARNING LIBRARY</span>

        <h1 className="page-title">Notes & PDFs</h1>

        <p className="muted">
          Find concise, exam-ready material.
        </p>

        <form className="toolbar">
          <input
            className="input search"
            name="q"
            defaultValue={q}
            placeholder="Search notes…"
          />

          <button className="btn primary">
            Search
          </button>
        </form>

        <div className="grid">
          {notes.map((n: any) => (
            <Link
              className="card"
              href={`/notes/${n.slug}`}
              key={n.id}
            >
              <span className="badge">
                {n.categories?.name_en || "Notes"}
              </span>

              <h3>{n.title_en}</h3>

              <p>
                {n.excerpt_en ||
                  "Open this note to start studying."}
              </p>

              <span className="small">
                Assamese version available when published.
              </span>
            </Link>
          ))}
        </div>

        {!notes.length && (
          <div className="empty">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
}
