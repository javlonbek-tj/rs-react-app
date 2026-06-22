import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'About | Pokemon',
  description: 'About the author and this project',
};

export const dynamic = 'force-static';

const stack = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'MongoDB',
];

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8">
        {t('title')}
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 px-8 py-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          Javlonbek Turdimatov
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          {t('role')}
        </p>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {t('bio')}
        </p>

        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
          {t('stack')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 px-8 py-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
          {t('projectTitle')}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {t('projectDesc')}
        </p>
      </div>
    </main>
  );
}
