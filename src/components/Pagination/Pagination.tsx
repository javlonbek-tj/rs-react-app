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
    setSearchParams({ page: String(nextPage) });
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        ← Previous
      </button>

      <span className="text-slate-500 text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
