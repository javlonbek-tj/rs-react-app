import { Suspense } from 'react';
import CardList from '@/components/CardList/CardList';
import ErrorTrigger from '@/components/ErrorTrigger/ErrorTrigger';
import CardListSkeleton from '@/components/Card/CardListSkeleton';
import DetailPanel from '@/components/DetailPanel/DetailPanel';
import DetailPanelSkeleton from '@/components/DetailPanel/DetailPanelSkeleton';
import PaginationServer from '@/components/Pagination/PaginationServer';
import SearchBar from '@/components/SearchBar/SearchBar';
import Flyout from '@/components/Flyout/Flyout';

type SearchParams = {
  name?: string;
  limit?: string;
  page?: string;
  details?: string;
};
type Props = { searchParams: Promise<SearchParams> };

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const name = params.name?.trim().toLowerCase();
  const limit = Number(params.limit) || 9;
  const page = Number(params.page) || 1;
  const detailId = params.details;

  const currentParams = new URLSearchParams(params).toString();

  return (
    <div className="flex flex-col flex-1 bg-slate-50 dark:bg-slate-800">
      <SearchBar initialValue={name} />
      <div className="relative flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto py-4">
          <div className="max-w-5xl mx-auto px-6 lg:px-4">
            <Suspense
              key={`${name}-${page}-${limit}`}
              fallback={<CardListSkeleton />}
            >
              <CardList
                page={page}
                limit={limit}
                name={name}
                detailId={detailId}
                currentParams={currentParams}
              />
            </Suspense>

            <div className="flex items-center justify-between pt-6">
              <Suspense
                fallback={
                  <div className="h-10 w-64 rounded-xl bg-slate-200 animate-pulse" />
                }
              >
                <PaginationServer name={name} limit={limit} />
              </Suspense>

              <div className="flex gap-2">
                <button
                  aria-label="Refresh results"
                  className="px-4 py-2 text-sm bg-slate-600 text-white rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  Refresh
                </button>
                <ErrorTrigger />
              </div>
            </div>
          </div>
        </main>

        {detailId && (
          <aside className="absolute right-0 top-0 bottom-0 w-96 border-l-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 overflow-y-auto shadow-xl z-10">
            <Suspense fallback={<DetailPanelSkeleton />}>
              <DetailPanel detailId={detailId} />
            </Suspense>
          </aside>
        )}
      </div>

      <Flyout />
    </div>
  );
}
