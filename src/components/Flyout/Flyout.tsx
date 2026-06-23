'use client';

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../app-apis/hooks';
import { unselectAll } from '../../app-apis/selectedPokemonSlice';

export default function Flyout() {
  const selectedIds = useAppSelector(
    (state) => state.selectedPokemon.selectedIds
  );
  const dispatch = useAppDispatch();
  const t = useTranslations('flyout');

  if (selectedIds.length === 0) return null;

  const csvUrl = `/api/csv?ids=${selectedIds.join(',')}`;

  return (
    <div className="font-bold dark:bg-gray-600 bg-slate-200 py-4 items-center sticky bottom-0">
      <div className="max-w-5xl mx-auto flex px-6 lg:px-4">
        <span className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg">
          {t('selected', { count: selectedIds.length })}
        </span>
        <button
          className="px-4 py-2 ml-4 text-sm bg-red-500 text-white rounded-lg cursor-pointer"
          onClick={() => dispatch(unselectAll())}
        >
          {t('unselectAll')}
        </button>
        <a
          href={csvUrl}
          download={`${selectedIds.length}_items.csv`}
          className="px-4 py-2 ml-4 text-sm bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          {t('download')}
        </a>
      </div>
    </div>
  );
}
