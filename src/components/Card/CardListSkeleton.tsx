function CardSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800 flex items-center justify-center pt-4 pb-2 relative">
        <div className="w-30 h-30 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="absolute top-3 right-3 w-8 h-3 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>

      <div className="px-4 py-4 flex flex-col items-center gap-2 relative">
        <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="flex gap-1.5">
          <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
        </div>
        <div className="absolute bottom-3 right-3 w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    </div>
  );
}

export default function CardListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
