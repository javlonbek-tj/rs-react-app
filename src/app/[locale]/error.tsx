'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
      <div className="text-6xl mb-6">💥</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2 dark:text-white">
        Something went wrong
      </h2>
      <p className="text-slate-500 text-center max-w-sm mb-8 dark:text-slate-100">
        An unexpected error occurred. The details have been logged to the
        console.
      </p>
      <button
        onClick={unstable_retry}
        className="px-6 py-2.5 bg-green-500 cursor-pointer text-slate-900 rounded-lg hover:bg-green-400 transition-colors font-semibold"
      >
        Reload page
      </button>
    </div>
  );
}
