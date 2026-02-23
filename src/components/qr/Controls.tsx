import React from 'react';
import { RefreshCw, Link as LinkIcon, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

interface ControlsProps {
  url: string;
  setUrl: (url: string) => void;
  color: string;
  setColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  logo: string | null;
  setLogo: (logo: string | null) => void;
  dotType: string;
  setDotType: (type: string) => void;
  errorCorrectionLevel: string;
  setErrorCorrectionLevel: (level: string) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  history: string[];
  clearHistory: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  url, setUrl, 
  color, setColor, 
  bgColor, setBgColor, 
  logo, setLogo, 
  dotType, setDotType, 
  errorCorrectionLevel, setErrorCorrectionLevel,
  handleLogoUpload,
  history,
  clearHistory
}) => {
  return (
    <div className="lg:col-span-7 space-y-8">
      {/* 1. URL Input Card */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl shadow-black/20 relative overflow-hidden group">
        {/* Decorative gradient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-all duration-700"></div>
        
        <h2 className="flex items-center gap-3 text-lg font-semibold mb-6 text-white relative z-10">
          <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
            <LinkIcon className="w-5 h-5" />
          </div>
          Content Data
        </h2>
        
        <div className="space-y-4 relative z-10">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Destination</label>
          <div className="relative">
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
              placeholder="https://yourwebsite.com"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none text-sm font-semibold">URL</div>
          </div>
        </div>
      </div>

      {/* 2. Visual Design Card */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl shadow-black/20">
        <h2 className="flex items-center gap-3 text-lg font-semibold mb-6 text-white">
          <div className="p-2 bg-slate-800 rounded-lg text-purple-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          Visual Style
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dot Color Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Color</label>
            <div className="flex items-center gap-4 bg-slate-950 p-2 pr-4 rounded-xl border border-slate-800">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border-0 p-0 bg-transparent"
              />
              <span className="text-sm text-slate-300 font-mono flex-grow">{color}</span>
            </div>
          </div>

          {/* Background Color Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Background</label>
            <div className="flex items-center gap-4 bg-slate-950 p-2 pr-4 rounded-xl border border-slate-800">
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border-0 p-0 bg-transparent"
              />
              <span className="text-sm text-slate-300 font-mono flex-grow">{bgColor}</span>
            </div>
          </div>

          {/* Dot Shape Selector */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pattern Style</label>
            <div className="relative">
              <select 
                value={dotType}
                onChange={(e) => setDotType(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer hover:bg-slate-900 transition-colors"
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

          {/* Error Correction Level */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Error Correction</label>
            <div className="relative">
              <select 
                value={errorCorrectionLevel}
                onChange={(e) => setErrorCorrectionLevel(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer hover:bg-slate-900 transition-colors"
              >
                <option value="L">Low (7%) - Smallest QR</option>
                <option value="M">Medium (15%) - Balanced</option>
                <option value="Q">Quartile (25%) - Recommended with logos</option>
                <option value="H">High (30%) - Maximum recovery</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Logo Upload Card */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl shadow-black/20">
        <h2 className="flex items-center gap-3 text-lg font-semibold mb-6 text-white">
          <div className="p-2 bg-slate-800 rounded-lg text-emerald-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          Brand Logo
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block w-full h-32 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800/50 hover:border-emerald-500/50 transition-all group">
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <div className="flex flex-col items-center gap-3 text-slate-500 group-hover:text-emerald-400 transition-colors">
                <div className="p-3 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Click to upload brand asset</span>
              </div>
            </label>
          </div>
          
          {/* Logo Preview Area */}
          {logo && (
            <div className="relative group shrink-0">
              <div className="w-32 h-32 border border-slate-700 rounded-2xl bg-[url('https://bg-patterns.netlify.app/bg-patterns/subtle-dots.png')] flex items-center justify-center p-2">
                <img src={logo} alt="Logo preview" className="max-w-full max-h-full object-contain" />
              </div>
              <button 
                onClick={() => setLogo(null)}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-transform hover:scale-110"
                title="Remove Logo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. History Card */}
      {history.length > 0 && (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl shadow-black/20">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-semibold text-white">Saved Sessions</h2>
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
                onClick={() => setUrl(hUrl)}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors shrink-0"></div>
                  <span className="text-sm text-slate-400 group-hover:text-white truncate transition-colors">{hUrl}</span>
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
