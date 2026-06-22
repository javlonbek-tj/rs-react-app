import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 py-20">
      <div className="bg-slate-200 dark:bg-slate-500 rounded-2xl w-60 h-48 flex items-center justify-center relative">
        <span className="text-8xl">?</span>
        <span className="absolute top-3 right-3 text-xs text-slate-600 dark:text-slate-200 font-mono font-semibold">
          #404
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">
          {t('title')}
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs">
          {t('desc')}
        </p>
      </div>

      <Link
        href="/"
        className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
      >
        {t('back')}
      </Link>
    </div>
  );
}
