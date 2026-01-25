

export const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 text-xl ring-2 ring-white/5">
            Q
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">Static QR Forge</h1>
            <span className="text-[10px] text-slate-500 font-bold tracking-widest mt-0.5 block">SECURE & CLIENT-SIDE</span>
          </div>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-all uppercase tracking-wider bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:border-slate-600 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>GitHub Pages v1.0</span>
        </a>
      </div>
    </header>
  );
};
