'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { searchAction } from '@/app/[locale]/actions/search';

const STORAGE_KEY = 'pokemon-search';

interface SearchProps {
  initialValue?: string;
}

export default function Search({ initialValue }: SearchProps) {
  const [, action, isPending] = useActionState(searchAction, null);
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const locale = useLocale();
  const t = useTranslations('search');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initialValue ?? '';
    }
    localStorage.setItem(STORAGE_KEY, initialValue ?? '');
  }, [initialValue]);

  const defaultValue =
    initialValue ??
    (typeof window !== 'undefined'
      ? (localStorage.getItem(STORAGE_KEY) ?? '')
      : '');

  return (
    <form action={action} className="flex gap-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="currentName" value={initialValue ?? ''} />
      {searchParams?.get('limit') && (
        <input type="hidden" name="limit" value={searchParams.get('limit')!} />
      )}
      <input
        ref={inputRef}
        type="text"
        name="name"
        defaultValue={defaultValue}
        placeholder={t('placeholder')}
        className="flex-1 px-4 py-3 rounded-xl bg-slate-200 text-slate-900 placeholder-slate-400 border-0 shadow-inner focus:outline-none focus:ring-slate-200 text-base"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-3 bg-red-600 text-white rounded-xl cursor-pointer hover:bg-red-700 transition-colors dark:hover:bg-red-700 font-bold text-base shadow disabled:opacity-60"
      >
        {isPending ? t('searching') : t('button')}
      </button>
    </form>
  );
}
