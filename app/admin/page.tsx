
import { getSession } from "../../lib/session";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Trang quản trị
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="/admin/users"
            className="rounded-lg bg-white p-6 shadow"
          >
            <h2 className="text-xl font-semibold">
              Danh sách người dùng
            </h2>

            <p className="mt-2 text-gray-600">
              Xem toàn bộ tài khoản trong hệ thống.
            </p>
          </a>

          <a
            href="/"
            className="rounded-lg bg-white p-6 shadow"
          >
            <h2 className="text-xl font-semibold">
              Quản lý công việc
            </h2>

            <p className="mt-2 text-gray-600">
              Quay về trang quản lý task.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}