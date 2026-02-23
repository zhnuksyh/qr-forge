import React, { useState, useEffect, useRef } from 'react';
import '../types';

export const useQRSystem = () => {
    // Core QR Content State
    const [url, setUrl] = useState('https://example.com');
    const [color, setColor] = useState('#2563eb'); // Default Blue
    const [bgColor, setBgColor] = useState('#ffffff');
    const [logo, setLogo] = useState<string | null>(null);
    const [dotType, setDotType] = useState<string>('rounded');
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<string>('Q');
    const [cornerSquareType, setCornerSquareType] = useState<string>('extra-rounded');
    const [cornerDotType, setCornerDotType] = useState<string>('dot');
    const [exportSize, setExportSize] = useState<number>(2000);

    // System State (Library Loading Status)
    const [isLibLoaded, setIsLibLoaded] = useState(false);

    // Refs
    const ref = useRef<HTMLDivElement>(null);
    const qrCode = useRef<any>(null);

    // 1. Dependency Injection (Script Loading)
    useEffect(() => {
        if (window.QRCodeStyling) {
            setIsLibLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js';
        script.async = true;
        script.onload = () => setIsLibLoaded(true);
        document.body.appendChild(script);
    }, []);

    // 2. Core Logic: QR Generation & Update Cycle
    useEffect(() => {
        if (!isLibLoaded || !ref.current) return;

        // Handle Empty State: Clear container if no URL
        if (!url.trim()) {
            ref.current.innerHTML = '';
            return;
        }

        const options = {
            width: 300, // Reduced size for preview to prevent layout overflow
            height: 300,
            type: 'svg',
            data: url,
            image: '',
            dotsOptions: { color: color, type: dotType },
            backgroundOptions: { color: bgColor },
            imageOptions: { crossOrigin: 'anonymous', margin: 5 },
            cornersSquareOptions: { type: cornerSquareType },
            cornersDotOptions: { type: cornerDotType },
            qrOptions: { errorCorrectionLevel: errorCorrectionLevel }
        };

        if (!qrCode.current) {
            qrCode.current = new window.QRCodeStyling(options);

            ref.current.innerHTML = '';
            qrCode.current.append(ref.current);
        } else {
            qrCode.current.update({
                ...options,
                image: logo || undefined
            });
        }
    }, [isLibLoaded, url, color, bgColor, logo, dotType, errorCorrectionLevel, cornerSquareType, cornerDotType]);

    // Handlers
    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogo(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async (ext: 'png' | 'svg' | 'jpeg') => {
        if (qrCode.current && url.trim()) {
            // 1. Re-configure for High-Res Export
            await qrCode.current.update({
                width: exportSize,
                height: exportSize,
                imageOptions: { crossOrigin: 'anonymous', margin: 20 }
            });

            // 2. Download
            await qrCode.current.download({
                name: 'qrypt-export',
                extension: ext
            });

            // 3. Revert to Preview Size
            qrCode.current.update({
                width: 300,
                height: 300,
                imageOptions: { crossOrigin: 'anonymous', margin: 5 }
            });
        }
    };

    return {
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
        qrRef: ref,
        handleLogoUpload,
        handleDownload
    };
};
