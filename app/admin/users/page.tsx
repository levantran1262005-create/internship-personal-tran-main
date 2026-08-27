import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/session";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await getSession();

  // Chưa đăng nhập
  if (!session) {
    redirect("/auth/login");
  }

  // Không phải ADMIN
  if (session.role !== "ADMIN") {
    redirect("/");
  }

  // Lấy danh sách user
  const users = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const adminCount = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  const userCount = users.filter(
    (user) => user.role === "USER"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Task Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Khu vực quản trị
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {session.name}
              </p>

              <p className="text-xs text-slate-500">
                Quản trị viên
              </p>
            </div>

            <a
              href="/"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              ← Trang chủ
            </a>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Danh sách người dùng
          </h2>

          <p className="mt-2 text-slate-500">
            Theo dõi các tài khoản đang có trong hệ thống.
          </p>
        </div>

        {/* STATISTICS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Tổng tài khoản
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {users.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Người dùng
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {userCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Quản trị viên
            </p>

            <p className="mt-2 text-3xl font-bold text-violet-600">
              {adminCount}
            </p>
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TABLE HEADER */}
          <div className="border-b border-slate-200 px-6 py-5">
            <h3 className="font-bold text-slate-900">
              Tài khoản hệ thống
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Có {users.length} tài khoản
            </p>
          </div>

          {users.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              Chưa có người dùng nào.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">
                      ID
                    </th>

                    <th className="px-6 py-4">
                      Người dùng
                    </th>

                    <th className="px-6 py-4">
                      Email
                    </th>

                    <th className="px-6 py-4">
                      Vai trò
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* ID */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        #{user.id}
                      </td>

                      {/* USER */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          {/* AVATAR */}
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold uppercase text-blue-700">
                            {user.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {user.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              Tài khoản #{user.id}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.email}
                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-4">
                        {user.role === "ADMIN" ? (
                          <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                            ADMIN
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            USER
                          </span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}