import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "../page";

export const dynamic = "force-dynamic";

export default async function Categories() {
  await requireAdmin();

  const s = await createClient();

  const { data: catsData } = await s
    .from("categories")
    .select("*")
    .order("name_en");

  const cats = catsData ?? [];

  return (
    <div className="page">
      <div className="container admin-layout">
        <AdminNav />

        <div className="admin-main">
          <span className="badge">TAXONOMY</span>

          <h1 className="page-title">Categories</h1>

          <div className="grid">
            {cats.map((c: any) => (
              <div className="card" key={c.id}>
                <span className="badge">{c.type}</span>
                <h3>{c.name_en}</h3>
                <p>{c.name_as}</p>
                <span className="small">{c.slug}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
