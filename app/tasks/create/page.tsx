import { prisma } from "../../../lib/prisma";
import { createTask } from "../actions";
import { getSession } from "../../../lib/session";
import { redirect } from "next/navigation";

export default async function CreateTaskPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const priorities = await prisma.priority.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Task Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Quản lý công việc cá nhân
            </p>
          </div>

          <a
            href="/"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            ← Trang chủ
          </a>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-7">
          <h2 className="text-3xl font-bold text-slate-900">
            Thêm công việc
          </h2>

          <p className="mt-2 text-slate-500">
            Tạo một công việc mới và theo dõi tiến độ của bạn.
          </p>
        </div>

        {/* FORM */}
        <form
          action={createTask}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="space-y-6 p-6 md:p-8">
            {/* TITLE */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Tiêu đề
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="title"
                type="text"
                name="title"
                required
                placeholder="Ví dụ: Hoàn thành báo cáo tuần"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Mô tả
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Nhập nội dung chi tiết của công việc..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* CATEGORY + PRIORITY */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="categoryId"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Danh mục
                </label>

                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="priorityId"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Mức ưu tiên
                </label>

                <select
                  id="priorityId"
                  name="priorityId"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {priorities.map((priority) => (
                    <option
                      key={priority.id}
                      value={priority.id}
                    >
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* DUE DATE */}
            <div>
              <label
                htmlFor="dueDate"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Hạn hoàn thành
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="dueDate"
                type="date"
                name="dueDate"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Ngày hoàn thành không được nhỏ hơn ngày hiện tại.
              </p>
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex flex-col-reverse gap-3 border-t bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end md:px-8">
            <a
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Hủy
            </a>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              + Thêm công việc
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}