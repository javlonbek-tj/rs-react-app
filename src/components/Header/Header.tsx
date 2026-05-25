import { NavLink } from 'react-router';
import ToggleTheme from './ToggleTheme';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-b bg-slate-50 to-slate-100 dark:bg-slate-900 dark:to-slate-900 border-b-2 border-slate-200 dark:border-slate-700">
      <div className="max-w-5xl mx-auto py-4 flex items-center justify-between px-6 lg:px-4">
        <span className="text-3xl font-semibold text-slate-800 dark:text-white tracking-widest uppercase drop-shadow-md">
          Pokemon
        </span>
        <div className="flex gap-4">
          <nav className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-slate-200 dark:bg-white/20 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'bg-slate-200 dark:bg-white/20 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'}`
              }
            >
              About
            </NavLink>
          </nav>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}

export default Header;
