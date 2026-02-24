import React, { useState } from 'react';
import { RefreshCw, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { DataInput } from './DataInput';
import { PresetsBar } from './PresetsBar';
import type { QRPreset } from '../../data/presets';
import { PREDEFINED_ICONS, generateIconUrl } from '../../data/icons';

interface ControlsProps {
  setUrl: (url: string) => void;
  color: string;
  setColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  bgTransparent: boolean;
  setBgTransparent: (transparent: boolean) => void;
  logo: string | null;
  setLogo: (logo: string | null) => void;
  logoSize: number;
  setLogoSize: (size: number) => void;
  dotType: string;
  setDotType: (type: string) => void;
  cornerSquareType: string;
  setCornerSquareType: (type: string) => void;
  cornerDotType: string;
  setCornerDotType: (type: string) => void;
  exportSize: number;
  setExportSize: (size: number) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApplyPreset: (preset: QRPreset) => void;
  history: string[];
  clearHistory: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  setUrl, 
  color, setColor, 
  bgColor, setBgColor, 
  bgTransparent, setBgTransparent,
  logo, setLogo, 
  logoSize, setLogoSize,
  dotType, setDotType,
  cornerSquareType, setCornerSquareType,
  cornerDotType, setCornerDotType,
  exportSize, setExportSize,
  handleLogoUpload,
  onApplyPreset,
  history,
  clearHistory
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => setLogo(event.target?.result as string);
        reader.readAsDataURL(file);
    }
  };

  return (
    <div className="lg:col-span-7 space-y-8">
      {/* 1. Data Input Card */}
      <DataInput setQRData={setUrl} />

      {/* 2. Visual Design Card */}
      <div data-tour="visual-style" className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5 dark:shadow-black/20 transition-colors duration-300">
        <h2 className="flex items-center gap-3 text-lg font-semibold mb-6 text-slate-800 dark:text-white">
          <div className="p-2 bg-purple-100 dark:bg-slate-800 rounded-lg text-purple-600 dark:text-purple-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          Visual Style
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Presets */}
          <div className="md:col-span-2">
            <PresetsBar onApply={onApplyPreset} currentColor={color} />
          </div>

          {/* Dot Color Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Color</label>
            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-950 p-2 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-purple-500 transition-shadow">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border-0 p-0 bg-transparent"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 font-mono flex-grow">{color}</span>
            </div>
          </div>

          {/* Background Color Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Background</label>
            <div className="flex items-center justify-between gap-4 bg-slate-100 dark:bg-slate-950 p-2 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-purple-500 transition-shadow">
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)}
                  disabled={bgTransparent}
                  className={`w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent ${bgTransparent ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <span className={`text-sm font-medium uppercase font-mono ${bgTransparent ? 'text-slate-400 opacity-50' : 'text-slate-700 dark:text-slate-300'}`}>
                  {bgColor}
                </span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={bgTransparent}
                  onChange={(e) => setBgTransparent(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-purple-600 focus:ring-purple-500 bg-white dark:bg-slate-900 cursor-pointer transition-colors"
                />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  Transparent
                </span>
              </label>
            </div>
          </div>

          {/* Dot Shape Selector */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pattern Style</label>
            <div className="relative">
              <select 
                value={dotType}
                onChange={(e) => setDotType(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <option value="square">Classic Square</option>
                <option value="dots">Modern Dots</option>
                <option value="rounded">Soft Rounded</option>
                <option value="classy">Classy Edge</option>
                <option value="classy-rounded">Classy Rounded</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>


          {/* Corner Square Style */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Corner Squares</label>
            <div className="relative">
              <select 
                value={cornerSquareType}
                onChange={(e) => setCornerSquareType(e.target.value)}
                className="w-full p-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <option value="square">Square</option>
                <option value="dot">Dot</option>
                <option value="extra-rounded">Extra Rounded</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          {/* Corner Dot Style */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Corner Dots</label>
            <div className="relative">
              <select 
                value={cornerDotType}
                onChange={(e) => setCornerDotType(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer hover:bg-slate-900 transition-colors"
              >
                <option value="square">Square</option>
                <option value="dot">Dot</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          {/* Export Resolution Slider */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Export Resolution</label>
              <span className="text-sm font-mono text-purple-600 dark:text-purple-400 bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800">{exportSize}px</span>
            </div>
            <input 
              type="range"
              min={256}
              max={4096}
              step={256}
              value={exportSize}
              onChange={(e) => setExportSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-600 font-medium">
              <span>256px</span>
              <span>4096px</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Logo Upload Card */}
      <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5 dark:shadow-black/20 transition-colors duration-300">
        <h2 className="flex items-center gap-3 text-lg font-semibold mb-6 text-slate-800 dark:text-white">
          <div className="p-2 bg-emerald-100 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          Brand Logo
        </h2>

        {/* Predefined Quick Icons */}
        <div className="mb-6 space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Icons</label>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {PREDEFINED_ICONS.map((icon) => (
              <button
                key={icon.id}
                onClick={() => setLogo(generateIconUrl(icon.paths, color))}
                title={icon.name}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors shrink-0 group focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  <g dangerouslySetInnerHTML={{ __html: icon.paths }} />
                </svg>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{icon.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label 
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`block w-full h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group ${
                isDragging 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' 
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-emerald-400 dark:hover:border-emerald-500/50'
              }`}
            >
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="sr-only" />
              <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                <div className={`p-3 rounded-full transition-colors ${isDragging ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
                  <Upload className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${isDragging ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  {isDragging ? 'Drop logo here...' : 'Click or drop logo to upload'}
                </span>
              </div>
            </label>
          </div>
          
          {/* Logo Preview Area */}
          {logo && (
            <div className="relative group shrink-0">
              <div className="w-32 h-32 border border-slate-200 dark:border-slate-700 rounded-2xl bg-[url('https://bg-patterns.netlify.app/bg-patterns/subtle-dots.png')] flex items-center justify-center p-2 bg-white dark:bg-transparent">
                <img src={logo} alt="Logo preview" className="max-w-full max-h-full object-contain" />
              </div>
              <button 
                onClick={() => setLogo(null)}
                className="absolute -top-3 -right-3 bg-red-500 text-slate-800 dark:text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-transform hover:scale-110"
                title="Remove Logo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Logo Size Slider */}
        {logo && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logo Size</label>
              <span className="text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded">{Math.round(logoSize * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.5"
              step="0.01"
              value={logoSize}
              onChange={(e) => setLogoSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. History Card */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5 dark:shadow-black/20 transition-colors duration-300">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Saved Sessions</h2>
            <button 
              onClick={clearHistory}
              className="text-xs text-red-400 hover:text-red-300 font-medium px-3 py-1 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              Clear History
            </button>
          </div>
          <div className="space-y-2">
            {history.map((hUrl, i) => (
              <div 
                key={i} 
                role="button"
                tabIndex={0}
                onClick={() => setUrl(hUrl)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setUrl(hUrl)}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors shrink-0"></div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white truncate transition-colors">{hUrl}</span>
                </div>
                <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 font-bold tracking-wider px-2">LOAD</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
