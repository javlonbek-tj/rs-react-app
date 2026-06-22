import { Link } from '@/i18n/navigation';
import ToggleTheme from './ToggleTheme';
import Navigation from './Navigation';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-b bg-slate-50 to-slate-100 dark:bg-slate-900 dark:to-slate-900 border-b-2 border-slate-200 dark:border-slate-700">
      <div className="max-w-5xl mx-auto py-4 flex items-center justify-between px-6 lg:px-4">
        <Link
          href="/"
          className="text-3xl font-semibold text-slate-800 dark:text-white tracking-widest uppercase drop-shadow-md"
        >
          Pokemon
        </Link>

        <div className="flex items-center gap-4">
          <Navigation />
          <LocaleSwitcher />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
