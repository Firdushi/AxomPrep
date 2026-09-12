"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function deleteQuestion(id: string) {
  await requireAdmin();

  if (!id) {
    throw new Error("Question ID is required.");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/questions");
}
