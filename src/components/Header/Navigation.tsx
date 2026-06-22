'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const linkClass = (href: string) =>
    `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
      pathname === href
        ? 'bg-slate-200 dark:bg-white/20 text-slate-900 dark:text-white'
        : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
    }`;

  return (
    <>
      <Link href="/" className={linkClass('/')}>
        {t('home')}
      </Link>

      <Link href="/about" className={linkClass('/about')}>
        {t('about')}
      </Link>
    </>
  );
}
