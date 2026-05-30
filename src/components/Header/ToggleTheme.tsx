import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeCtx';

function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';
  return (
    <button
      className="p-2 rounded-lg hover:text-gray-800 dark:text-gray-800 bg-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 text-gray-600 cursor-pointer transition-colors"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default ToggleTheme;
