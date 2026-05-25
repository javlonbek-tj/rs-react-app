import { useSearchParams } from 'react-router';

interface PaginationProps {
  total: number;
  limit: number;
}

function Pagination({ total, limit }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  function goTo(nextPage: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(nextPage));
      return next;
    });
  }

  const className =
    'px-5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer';

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className={className}
      >
        ← Previous
      </button>

      <span className="text-slate-500 dark:text-slate-200 text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className={className}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
