
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Controls } from './components/qr/Controls';
import { PreviewCard } from './components/qr/PreviewCard';
import { useQRSystem } from './hooks/useQRSystem';
import { useHistory } from './hooks/useHistory';
import { useToast } from './components/ui/Toast';

export default function App() {
  const { 
    url, setUrl, 
    color, setColor, 
    bgColor, setBgColor, 
    logo, setLogo, 
    dotType, setDotType, 
    errorCorrectionLevel, setErrorCorrectionLevel,
    cornerSquareType, setCornerSquareType,
    cornerDotType, setCornerDotType,
    exportSize, setExportSize,
    isLibLoaded, 
    qrRef, 
    handleLogoUpload, 
    handleDownload,
    handleCopySvg 
  } = useQRSystem();

  const { history, saveToHistory, clearHistory } = useHistory();
  const { toast } = useToast();

  const onSave = () => {
    saveToHistory(url);
    toast('QR code saved to history');
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
            logo={logo} setLogo={setLogo}
            dotType={dotType} setDotType={setDotType}
            errorCorrectionLevel={errorCorrectionLevel} setErrorCorrectionLevel={setErrorCorrectionLevel}
            cornerSquareType={cornerSquareType} setCornerSquareType={setCornerSquareType}
            cornerDotType={cornerDotType} setCornerDotType={setCornerDotType}
            exportSize={exportSize} setExportSize={setExportSize}
            handleLogoUpload={handleLogoUpload}
            history={history}
            clearHistory={clearHistory}
          />
          
          <PreviewCard 
            isLibLoaded={isLibLoaded}
            qrRef={qrRef}
            saveToHistory={onSave}
            handleDownload={onDownload}
            handleCopySvg={onCopySvg}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}