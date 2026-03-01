import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-white outline-none transition-colors text-left focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isOpen ? 'ring-2 ring-purple-500 border-transparent dark:border-transparent bg-white dark:bg-slate-900 shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800'}`}
      >
        <span className="font-medium">{selectedOption?.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="max-h-60 overflow-y-auto scrollbar-hide">
            {options.map((opt) => {
              const isActive = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm ${isActive ? 'bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 font-bold' : 'text-slate-700 dark:text-slate-200 font-medium'}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
