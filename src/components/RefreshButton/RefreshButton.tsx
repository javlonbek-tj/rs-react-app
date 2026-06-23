'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export default function RefreshButton() {
  const t = useTranslations('errors');
  const router = useRouter();

  return (
    <button
      onClick={() => router.refresh()}
      aria-label="Refresh results"
      className="px-4 py-2 text-sm bg-slate-600 text-white rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
    >
      {t('refresh')}
    </button>
  );
}
