'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  total: number;
  limit: number;
}

export default function Pagination({ total, limit }: PaginationProps) {
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const router = useRouter();
  const t = useTranslations('pagination');

  const page = Number(searchParams.get('page') ?? '1');
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  function goTo(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(nextPage));

    router.push(`?${params.toString()}`);
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
        {t('previous')}
      </button>

      <span className="text-slate-500 dark:text-slate-200 text-sm font-medium">
        {t('page', { page, total: totalPages })}
      </span>

      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className={className}
      >
        {t('next')}
      </button>
    </div>
  );
}
