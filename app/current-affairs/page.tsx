import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CurrentAffairs() {
  const supabase = await createClient();

  const { data: itemsData } = await supabase
    .from("current_affairs")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: false });

  const items = itemsData ?? [];

  return (
    <div className="page">
      <div className="container">
        <span className="badge">STAY UPDATED</span>
        <h1 className="page-title">Current Affairs</h1>
        <p className="muted">
          Date-wise updates published through the content management system.
        </p>

        <div className="cards">
          {items.map((x: any) => (
            <article className="card" key={x.id}>
              <span className="badge">{x.event_date}</span>
              <h3>{x.title_en}</h3>
              <p>{x.content_en}</p>

              {x.source_url && (
                <a
                  href={x.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small"
                >
                  Source: {x.source_name || "Read source"} ↗
                </a>
              )}
            </article>
          ))}
        </div>

        {!items.length && (
          <div className="empty">
            No current-affairs posts published yet.
          </div>
        )}
      </div>
    </div>
  );
}
