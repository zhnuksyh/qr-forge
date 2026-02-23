
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Controls } from './components/qr/Controls';
import { PreviewCard } from './components/qr/PreviewCard';
import { useQRSystem } from './hooks/useQRSystem';
import { useHistory } from './hooks/useHistory';

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
    isLibLoaded, 
    qrRef, 
    handleLogoUpload, 
    handleDownload 
  } = useQRSystem();

  const { history, saveToHistory, clearHistory } = useHistory();

  const onSave = () => {
    saveToHistory(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500 selection:text-white flex flex-col">
      {/* [Style Injection] Loading Poppins Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
      `}</style>

      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Controls 
            url={url} setUrl={setUrl}
            color={color} setColor={setColor}
            bgColor={bgColor} setBgColor={setBgColor}
            logo={logo} setLogo={setLogo}
            dotType={dotType} setDotType={setDotType}
            errorCorrectionLevel={errorCorrectionLevel} setErrorCorrectionLevel={setErrorCorrectionLevel}
            cornerSquareType={cornerSquareType} setCornerSquareType={setCornerSquareType}
            cornerDotType={cornerDotType} setCornerDotType={setCornerDotType}
            handleLogoUpload={handleLogoUpload}
            history={history}
            clearHistory={clearHistory}
          />
          
          <PreviewCard 
            isLibLoaded={isLibLoaded}
            qrRef={qrRef}
            saveToHistory={onSave}
            handleDownload={handleDownload}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}