
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Controls } from './components/qr/Controls';
import { PreviewCard } from './components/qr/PreviewCard';
import { BatchPanel } from './components/qr/BatchPanel';
import { OnboardingTour } from './components/ui/OnboardingTour';
import { useQRSystem } from './hooks/useQRSystem';
import { useHistory } from './hooks/useHistory';
import { useBatchGenerate } from './hooks/useBatchGenerate';
import { useToast } from './components/ui/Toast';
import { encodeConfig } from './hooks/useShareableConfig';
import type { QRPreset } from './data/presets';

export default function App() {
  const { 
    url, setUrl, 
    color, setColor, 
    bgColor, setBgColor, 
    bgTransparent, setBgTransparent,
    logo, setLogo, 
    logoSize, setLogoSize,
    dotType, setDotType, 
    cornerSquareType, setCornerSquareType,
    cornerDotType, setCornerDotType,
    exportSize, setExportSize,
    setStyle,
    undo, redo, canUndo, canRedo,
    isLibLoaded, 
    qrRef, 
    handleLogoUpload, 
    handleDownload,
    handleCopySvg 
  } = useQRSystem();

  const { history, saveToHistory, clearHistory } = useHistory();
  const { generateBatch, isGenerating, progress, total } = useBatchGenerate();
  const { toast } = useToast();

  const onSave = () => {
    saveToHistory(url);
    toast('QR code saved to history');
  };

  const onApplyPreset = (preset: QRPreset) => {
    setStyle({
      color: preset.color,
      bgColor: preset.bgColor,
      bgTransparent: false,
      dotType: preset.dotType,
      cornerSquareType: preset.cornerSquareType,
      cornerDotType: preset.cornerDotType,
      exportSize,
    });
    toast(`Applied "${preset.name}" preset`);
  };

  const onDownload = async (ext: 'png' | 'svg' | 'jpeg') => {
    await handleDownload(ext);
    toast(`Downloaded as ${ext.toUpperCase()}`);
  };

  const onCopySvg = async () => {
    const success = await handleCopySvg();
    if (success) {
      toast('SVG copied to clipboard');
    } else {
      toast('Failed to copy SVG', 'error');
    }
  };

  const onShareConfig = async () => {
    const hash = encodeConfig({
      color, bgColor, bgTransparent, dotType,
      cornerSquareType, cornerDotType, exportSize
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}${hash}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      window.history.replaceState(null, '', hash || window.location.pathname);
      toast('Config link copied to clipboard');
    } catch {
      toast('Failed to copy link', 'error');
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white flex flex-col">
      {/* [Style Injection] Loading Poppins Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
      `}</style>

      <Header />

      <main className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-12 flex-grow w-full">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
          <Controls 
            setUrl={setUrl}
            color={color} setColor={setColor}
            bgColor={bgColor} setBgColor={setBgColor}
            bgTransparent={bgTransparent} setBgTransparent={setBgTransparent}
            logo={logo} setLogo={setLogo}
            logoSize={logoSize} setLogoSize={setLogoSize}
            dotType={dotType} setDotType={setDotType}
            cornerSquareType={cornerSquareType} setCornerSquareType={setCornerSquareType}
            cornerDotType={cornerDotType} setCornerDotType={setCornerDotType}
            exportSize={exportSize} setExportSize={setExportSize}
            handleLogoUpload={handleLogoUpload}
            onApplyPreset={onApplyPreset}
            history={history}
            clearHistory={clearHistory}
          />
          
          <PreviewCard 
            isLibLoaded={isLibLoaded}
            qrRef={qrRef}
            saveToHistory={onSave}
            handleDownload={onDownload}
            handleCopySvg={onCopySvg}
            handleShareConfig={onShareConfig}
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            bgTransparent={bgTransparent}
          />
        </div>

        {/* Batch Generation Panel */}
        <div className="mt-8">
          <BatchPanel
            isGenerating={isGenerating}
            progress={progress}
            total={total}
            onGenerate={(urls) => {
              generateBatch(urls, {
                color, bgColor, bgTransparent, dotType,
                cornerSquareType, cornerDotType, exportSize
              });
              toast(`Generating ${urls.length} QR codes...`);
            }}
          />
        </div>
      </main>

      <Footer />
      <OnboardingTour />
    </div>
  );
}