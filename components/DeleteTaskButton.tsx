"use client";

import { deleteTask } from "../app/tasks/actions";

export default function DeleteTaskButton({
  taskId,
}: {
  taskId: number;
}) {
  return (
    <form
      action={deleteTask}
      onSubmit={(e) => {
        const confirmed = window.confirm(
          "Bạn có chắc chắn muốn xóa công việc này?"
        );

        if (!confirmed) {
          e.preventDefault();
        }
      }}
    >
      <input
        type="hidden"
        name="id"
        value={taskId}
      />

      <button
        type="submit"
        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        Xóa
      </button>
    </form>
  );
}