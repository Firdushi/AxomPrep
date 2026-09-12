import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

export async function requireUser() {
  const result = await getProfile();
  if (!result.user) redirect("/login");
  return result;
}

export async function requireAdmin() {
  const result = await requireUser();
  if (result.profile?.role !== "admin") redirect("/dashboard");
  return result;
}
