"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

        {/* ICON */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
          !
        </div>

        {/* TITLE */}
        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Đã xảy ra lỗi
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Hệ thống gặp sự cố khi xử lý yêu cầu của bạn.
          Vui lòng thử lại.
        </p>

        {/* BUTTONS */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <button
            onClick={() => reset()}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Thử lại
          </button>

          <a
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Về trang chủ
          </a>

        </div>
      </div>
    </main>
  );
}