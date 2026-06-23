'use client';

import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

interface CardLinkProps {
  href: string;
  isSelected: boolean;
  children: ReactNode;
}

export default function CardLink({
  href,
  isSelected,
  children,
}: CardLinkProps) {
  return (
    <Link
      href={href}
      onClick={(e) => e.stopPropagation()}
      className={`flex flex-col bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden
        ${
          isSelected
            ? 'border-red-500 dark:border-red-600 shadow-lg shadow-red-100 dark:shadow-red-900 scale-[1.02]'
            : 'border-slate-200 hover:border-red-400 dark:hover:border-red-600 hover:shadow-lg'
        }`}
    >
      {children}
    </Link>
  );
}
