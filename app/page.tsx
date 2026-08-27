import { prisma } from "../lib/prisma";
import type { TaskStatus } from "@prisma/client";;
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";
import { logout } from "./auth/actions";
import DeleteTaskButton from "../components/DeleteTaskButton";

const statusLabels: Record<TaskStatus, string> = {
  TODO: "Chưa làm",
  IN_PROGRESS: "Đang làm",
  COMPLETED: "Hoàn thành",
};

const statusClass: Record<TaskStatus, string> = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
  q?: string;
  status?: string;
  success?: string;
}>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

 const { q, status, success } = await searchParams;

  const tasks = await prisma.task.findMany({
    where: {
      ...(session.role === "USER"
        ? {
            userId: session.userId,
          }
        : {}),

      ...(q
        ? {
            title: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {}),

      ...(status && status !== "ALL"
        ? {
            status: status as TaskStatus,
          }
        : {}),
    },

    include: {
      category: true,
      priority: true,
    },

    orderBy: {
      id: "desc",
    },
  });

  const completedCount = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const doingCount = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const todoCount = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Task Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Quản lý công việc cá nhân
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="text-right">
              <p className="font-semibold text-slate-800">
                {session.name}
              </p>

              <p className="text-xs text-slate-500">
                {session.role === "ADMIN"
                  ? "Quản trị viên"
                  : "Người dùng"}
              </p>
            </div>

            {session.role === "ADMIN" && (
              <a
                href="/admin/users"
                className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                Người dùng
              </a>
            )}

            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* DASHBOARD TOP */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Công việc của bạn
            </h2>

            <p className="mt-1 text-slate-500">
              Theo dõi và quản lý tiến độ công việc
            </p>
          </div>

          <a
            href="/tasks/create"
            className="rounded-xl bg-slate-900 px-5 py-3 text-center font-medium text-white shadow-sm hover:bg-slate-800"
          >
            + Thêm công việc
          </a>
        </div>

        {/* STATS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Tổng công việc
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Chưa làm
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-700">
              {todoCount}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Đang làm
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {doingCount}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Hoàn thành
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        {success === "create" && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            ✓ Thêm công việc thành công.
          </div>
        )}

        {success === "update" && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
            ✓ Cập nhật công việc thành công.
          </div>
        )}

        {success === "delete" && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            ✓ Xóa công việc thành công.
          </div>
        )}
        <form className="mb-8 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm md:flex-row">

          <input
            type="text"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Tìm kiếm công việc..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

          <select
            name="status"
            defaultValue={status || "ALL"}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none"
          >
            <option value="ALL">
              Tất cả trạng thái
            </option>

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

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Tìm kiếm
          </button>
        </form>

        {/* EMPTY */}
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-700">
              Chưa có công việc
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Hãy tạo công việc đầu tiên của bạn.
            </p>

            <a
              href="/tasks/create"
              className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-3 text-white"
            >
              + Thêm công việc
            </a>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">

            {tasks.map((task) => (
              <article
                key={task.id}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >

                <div className="mb-4 flex items-start justify-between gap-3">

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {task.category.name}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[task.status]}`}
                  >
                    {statusLabels[task.status]}
                  </span>
                </div>

                <p className="min-h-12 text-sm leading-6 text-slate-600">
                  {task.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm">

                  <div>
                    <p className="text-slate-400">
                      Ưu tiên
                    </p>

                    <p className="font-semibold text-slate-700">
                      {task.priority.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">
                      Hạn hoàn thành
                    </p>

                    <p className="font-semibold text-slate-700">
                      {task.dueDate.toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">

                  <a
                    href={`/tasks/${task.id}/edit`}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Sửa
                  </a>

                  <DeleteTaskButton taskId={task.id} />
                </div>

              </article>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}