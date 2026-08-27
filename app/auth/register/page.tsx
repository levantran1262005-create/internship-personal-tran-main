"use client";

import { useActionState } from "react";
import { register } from "../actions";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, {});

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">

        {/* TITLE */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow">
            T
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Tạo tài khoản
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Đăng ký để bắt đầu quản lý công việc
          </p>
        </div>

        {/* FORM */}
        <form
          action={formAction}
          className="space-y-5 rounded-2xl border bg-white p-7 shadow-sm"
        >
          {/* NAME */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Họ và tên
            </label>

            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="Nguyễn Văn A"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Mật khẩu
            </label>

            <input
              id="password"
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Tối thiểu 6 ký tự"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Mật khẩu phải có ít nhất 6 ký tự.
            </p>
          </div>

          {/* ERROR */}
          {state.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {state.error}
            </div>
          )}

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>

          <div className="border-t pt-5 text-center">
            <p className="text-sm text-slate-500">
              Đã có tài khoản?{" "}
              <a
                href="/auth/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Personal Task Management
        </p>
      </div>
    </main>
  );
}