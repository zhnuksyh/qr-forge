import React, { useState } from 'react';
import { Layers, Zap, Loader2 } from 'lucide-react';

interface BatchPanelProps {
    isGenerating: boolean;
    progress: number;
    total: number;
    onGenerate: (urls: string[]) => void;
}

export const BatchPanel: React.FC<BatchPanelProps> = ({
    isGenerating,
    progress,
    total,
    onGenerate
}) => {
    const [text, setText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const urls = text.split('\n').map(s => s.trim()).filter(Boolean);
    const count = urls.length;

    const handleGenerate = () => {
        if (count > 0 && !isGenerating) {
            onGenerate(urls);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5 dark:shadow-black/20 transition-colors duration-300">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
            >
                <h2 className="flex items-center gap-3 text-lg font-semibold text-slate-800 dark:text-white">
                    <div className="p-2 bg-amber-100 dark:bg-slate-800 rounded-lg text-amber-600 dark:text-amber-400">
                        <Layers className="w-5 h-5" />
                    </div>
                    Batch Generation
                </h2>
                <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isExpanded && (
                <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            URLs (one per line)
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`https://example.com\nhttps://google.com\nhttps://github.com`}
                            rows={5}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono transition-colors"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {count > 0 ? `${count} URL${count > 1 ? 's' : ''} detected` : 'Paste your URLs above'}
                        </p>
                    </div>

                    {isGenerating ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    Generating {progress} / {total}...
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${total > 0 ? (progress / total) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            disabled={count === 0}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-700 dark:disabled:to-slate-700 text-white disabled:text-slate-500 py-3 rounded-xl font-bold shadow-lg shadow-amber-900/20 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            <Zap className="w-4 h-4" />
                            Generate & Download ZIP ({count})
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
