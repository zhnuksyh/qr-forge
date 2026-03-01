import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-lg shadow-inner overflow-hidden flex-shrink-0 cursor-pointer border border-black/10 dark:border-white/10 transition-transform ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
        style={{ backgroundColor: color }}
        aria-label="Choose color"
      />
      
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-3 z-50 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
          {/* The tip of the popover */}
          <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white dark:bg-slate-800 rotate-45 border-l border-t border-slate-200 dark:border-slate-700"></div>
          
          <div className="relative z-10 space-y-3">
            <HexColorPicker color={color} onChange={onChange} />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">HEX</span>
              <input 
                type="text" 
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm font-mono uppercase bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Quick Presets row inside the picker */}
            <div className="flex gap-1.5 pt-1">
              {['#000000', '#ffffff', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'].map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChange(preset)}
                  className="w-5 h-5 rounded-full border border-black/10 dark:border-white/10 flex-shrink-0 transition-transform hover:scale-125"
                  style={{ backgroundColor: preset }}
                  title={preset}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
