import { Sun, Moon, QrCode } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-sm dark:shadow-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center text-black dark:text-white transition-colors duration-300">
            <QrCode className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-none">Qrypt</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
