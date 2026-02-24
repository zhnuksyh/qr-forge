import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-sm dark:shadow-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 text-xl ring-2 ring-slate-100 dark:ring-white/5">
            Q
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-none">Qrypt</h1>
            <span className="text-[10px] text-slate-500 font-bold tracking-widest mt-0.5 block">SECURE & CLIENT-SIDE</span>
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
          
          <a 
            href="https://github.com/zhnuksyh/qrypt"
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all uppercase tracking-wider bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 group focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>GitHub Pages v1.0</span>
          </a>
        </div>
      </div>
    </header>
  );
};
