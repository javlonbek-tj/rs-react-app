'use client';

import type { ChangeEvent } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value as Locale;
    const query = searchParams.toString();

    router.replace(`${pathname}${query ? `?${query}` : ''}`, {
      locale: nextLocale,
    });
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium cursor-pointer border-0 focus:outline-none"
    >
      <option value="en">EN</option>
      <option value="uz">UZ</option>
    </select>
  );
}
