export default function DetailPanelSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
        <div className="h-5 w-16 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>

      <div className="px-6 pt-8">
        <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl w-full aspect-square max-h-64 animate-pulse" />
      </div>

      <div className="flex flex-col items-center gap-6 px-6 pt-6">
        <div className="h-8 w-40 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />

        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 flex flex-col items-center gap-2">
            <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-600 animate-pulse" />
            <div className="h-7 w-16 rounded bg-slate-200 dark:bg-slate-600 animate-pulse" />
          </div>
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 flex flex-col items-center gap-2">
            <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-600 animate-pulse" />
            <div className="h-7 w-16 rounded bg-slate-200 dark:bg-slate-600 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
