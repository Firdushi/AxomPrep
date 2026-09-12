"use client";

import { useState } from "react";
import { deleteQuestion } from "./delete";

export default function DeleteQuestionButton({
  id,
}: {
  id: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      await deleteQuestion(id);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Could not delete question."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="btn"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
