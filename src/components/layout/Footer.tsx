

export const Footer = () => {
  return (
    <footer className="py-12 text-center text-slate-500 dark:text-slate-600 text-sm font-medium border-t border-slate-200 dark:border-slate-900/50">
      <p className="flex items-center justify-center gap-2">
        <span>© {new Date().getFullYear()} Qrypt.</span>
        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-800"></span>
        <span className="text-slate-400 dark:text-slate-500">No cookies, no tracking.</span>
      </p>
    </footer>
  );
};
