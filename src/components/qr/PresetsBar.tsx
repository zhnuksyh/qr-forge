import React from 'react';
import { PRESETS, QRPreset } from '../../data/presets';

interface PresetsBarProps {
    onApply: (preset: QRPreset) => void;
    currentColor: string;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({ onApply, currentColor }) => {
    return (
        <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Presets</label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {PRESETS.map((preset) => {
                    const isActive = preset.color === currentColor;
                    return (
                        <button
                            key={preset.name}
                            onClick={() => onApply(preset)}
                            title={preset.name}
                            className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                isActive 
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md' 
                                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                        >
                            <div 
                                className="w-8 h-8 rounded-lg shadow-inner border border-black/10"
                                style={{ 
                                    backgroundColor: preset.bgColor,
                                    backgroundImage: `radial-gradient(circle at 30% 30%, ${preset.color} 30%, transparent 31%), radial-gradient(circle at 70% 70%, ${preset.color} 20%, transparent 21%)`
                                }}
                            />
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                {preset.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
