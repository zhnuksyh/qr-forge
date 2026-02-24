import React from 'react';
import { Save, Download, RefreshCw } from 'lucide-react';

interface PreviewCardProps {
  isLibLoaded: boolean;
  qrRef: React.RefObject<HTMLDivElement>;
  saveToHistory: () => void;
  handleDownload: (ext: 'png' | 'svg' | 'jpeg') => void;
  handleCopySvg: () => void;
  bgTransparent?: boolean;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ 
  isLibLoaded, 
  qrRef, 
  saveToHistory, 
  handleDownload,
  handleCopySvg,
  bgTransparent
}) => {
  return (
    <div className="lg:col-span-5">
      <div className="lg:sticky lg:top-28 space-y-6">
        
        {/* [Preview Card] - kept LIGHT/WHITE as requested for contrast */}
        <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-3xl lg:rounded-[2rem] shadow-2xl shadow-black/5 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
          
          <h3 className="text-center text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">Live Preview</h3>
          
          <div className="flex flex-col items-center justify-center">
            <div 
              ref={qrRef} 
              className={`qr-container bg-white p-6 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-100 flex justify-center items-center min-h-[300px] transition-colors ${bgTransparent ? 'bg-checkerboard' : ''}`}
              // The library injects the canvas/svg here
            >
              {!isLibLoaded && (
                 <div className="text-slate-400 animate-pulse flex flex-col items-center gap-2 py-10">
                   <RefreshCw className="w-6 h-6 animate-spin" />
                   <span className="text-sm">Initializing Engine...</span>
                 </div>
              )}
            </div>
            
            <div className="mt-8 space-y-2 text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-500">
                 Generated securely in your browser
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                High-resolution vector-ready code
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-2">
            <button 
              onClick={saveToHistory}
              title="Save to History"
              className="flex-1 group flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-4 rounded-2xl font-semibold transition-all border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={handleCopySvg}
              title="Copy SVG to Clipboard"
              className="flex-1 group flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-4 rounded-2xl font-semibold transition-all border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
            </button>
          </div>

          <div className="relative group/download">
             <button 
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute bottom-full right-0 w-full mb-2 hidden group-hover/download:flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-2 z-20">
              <div className="p-2 space-y-1">
                <button onClick={() => handleDownload('png')} className="w-full px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700 rounded-lg text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:text-slate-900 dark:focus:text-white focus:outline-none transition-colors flex justify-between items-center">
                  PNG <span className="text-[10px] bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-slate-600 dark:text-slate-500">RASTER</span>
                </button>
                <button onClick={() => handleDownload('svg')} className="w-full px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700 rounded-lg text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:text-slate-900 dark:focus:text-white focus:outline-none transition-colors flex justify-between items-center">
                  SVG <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">VECTOR</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
