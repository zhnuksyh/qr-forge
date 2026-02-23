

export const Footer = () => {
  return (
    <footer className="py-12 text-center text-slate-600 text-sm font-medium border-t border-slate-900/50">
      <p className="flex items-center justify-center gap-2">
        <span>© {new Date().getFullYear()} Qrypt.</span>
        <span className="w-1 h-1 rounded-full bg-slate-800"></span>
        <span className="text-slate-500">No cookies, no tracking.</span>
      </p>
      <p className="mt-3">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800/60 text-slate-500 border border-slate-700/50 tracking-wide">
          v1.0.0
        </span>
      </p>
    </footer>
  );
};
