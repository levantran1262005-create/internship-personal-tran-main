import { prisma } from "../../../../lib/prisma";
import { updateTask } from "../../actions";
import { getSession } from "../../../../lib/session";
import { redirect } from "next/navigation";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // KIỂM TRA ĐĂNG NHẬP
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  // LẤY TASK
  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!task) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Không tìm thấy công việc
          </h1>

          <a
            href="/"
            className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            ← Quay về trang chủ
          </a>
        </div>
      </main>
    );
  }

  // KIỂM TRA PHÂN QUYỀN
  if (
    session.role === "USER" &&
    task.userId !== session.userId
  ) {
    redirect("/");
  }

  // CATEGORY + PRIORITY
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
            Sửa công việc
          </h2>

          <p className="mt-2 text-slate-500">
            Cập nhật thông tin và tiến độ công việc.
          </p>
        </div>

        {/* FORM */}
        <form
          action={updateTask}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <input
            type="hidden"
            name="id"
            value={task.id}
          />

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
                defaultValue={task.title}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                defaultValue={task.description}
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  defaultValue={task.categoryId}
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
                  defaultValue={task.priorityId}
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

            {/* STATUS */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Trạng thái
              </label>

              <select
                id="status"
                name="status"
                defaultValue={task.status}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="TODO">
                  Chưa làm
                </option>

                <option value="IN_PROGRESS">
                  Đang làm
                </option>

                <option value="COMPLETED">
                  Hoàn thành
                </option>
              </select>
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
                defaultValue={
                  task.dueDate.toISOString().split("T")[0]
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* BUTTONS */}
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
              Lưu thay đổi
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}