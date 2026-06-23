'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

function ErrorTrigger() {
  const t = useTranslations('errors');
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) throw new Error('Test error triggered by user.');

  return (
    <button
      onClick={() => setShouldThrow(true)}
      className="px-4 py-2 border border-red-300 cursor-pointer text-red-500 rounded-lg hover:bg-red-500 hover:text-gray-50 transition-colors text-sm font-bold"
    >
      {t('triggerError')}
    </button>
  );
}

export default ErrorTrigger;
