export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-100" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* TITLE */}
        <div className="mb-8">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-slate-100" />
        </div>

        {/* STAT CARDS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="mt-3 h-8 w-12 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div className="mb-8 flex gap-3 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="h-12 flex-1 animate-pulse rounded-xl bg-slate-100" />

          <div className="hidden h-12 w-40 animate-pulse rounded-xl bg-slate-100 md:block" />

          <div className="hidden h-12 w-28 animate-pulse rounded-xl bg-slate-200 md:block" />
        </div>

        {/* TASK CARDS */}
        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex justify-between">
                <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
              </div>

              <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />

              <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-100" />

              <div className="mt-6 h-20 animate-pulse rounded-xl bg-slate-100" />

              <div className="mt-5 flex gap-2">
                <div className="h-9 w-16 animate-pulse rounded-lg bg-slate-100" />

                <div className="h-9 w-16 animate-pulse rounded-lg bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}