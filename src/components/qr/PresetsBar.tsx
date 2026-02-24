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
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                {PRESETS.map((preset) => {
                    const isActive = preset.color === currentColor;
                    return (
                        <button
                            key={preset.name}
                            onClick={() => onApply(preset)}
                            title={preset.name}
                            className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-2.5 py-2 rounded-xl border transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                isActive 
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md ring-1 ring-purple-500/30' 
                                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                            }`}
                        >
                            {/* Aesthetic Color Swatch */}
                            <div 
                                className="w-10 h-10 rounded-full relative shadow-inner overflow-hidden flex transform-gpu transition-transform group-hover:rotate-12"
                                style={{ backgroundColor: preset.bgColor, border: `2px solid ${preset.bgColor === '#ffffff' ? '#f1f5f9' : preset.bgColor}` }}
                            >
                                <div 
                                    className="absolute inset-0 w-full h-full"
                                    style={{ 
                                        backgroundColor: preset.color,
                                        clipPath: 'polygon(0 0, 100% 0, 100% 100%)', // Diagonal split
                                        opacity: 0.9
                                    }}
                                />
                                {/* Inner accent dot to represent QR */}
                                <div 
                                    className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/3 shadow-sm"
                                    style={{ backgroundColor: preset.bgColor }}
                                />
                                <div 
                                    className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-md translate-x-1/4 translate-y-1/3 shadow-sm"
                                    style={{ backgroundColor: preset.color }}
                                />
                            </div>
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
