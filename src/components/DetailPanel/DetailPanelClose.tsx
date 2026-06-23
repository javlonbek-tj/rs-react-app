'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DetailPanelClose() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function close(e: React.MouseEvent) {
    e.stopPropagation();
    const next = new URLSearchParams(searchParams?.toString() ?? '');
    next.delete('details');
    router.push(`/?${next.toString()}`);
  }

  return (
    <button
      onClick={close}
      className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-2xl leading-none cursor-pointer transition-colors"
      aria-label="Close details"
    >
      ✕
    </button>
  );
}
