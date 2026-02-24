import React, { useState, useEffect, useRef } from 'react';
import '../types';
import { decodeConfig } from './useShareableConfig';

export const useQRSystem = () => {
    // Read URL hash for shared config on mount
    const initialConfig = decodeConfig();

    // Core QR Content State
    const [url, setUrl] = useState('https://example.com');
    const [color, setColor] = useState(initialConfig.color || '#2563eb');
    const [bgColor, setBgColor] = useState(initialConfig.bgColor || '#ffffff');
    const [bgTransparent, setBgTransparent] = useState(initialConfig.bgTransparent || false);
    const [logo, setLogo] = useState<string | null>(null);
    const [dotType, setDotType] = useState<string>(initialConfig.dotType || 'rounded');
    const [cornerSquareType, setCornerSquareType] = useState<string>(initialConfig.cornerSquareType || 'extra-rounded');
    const [cornerDotType, setCornerDotType] = useState<string>(initialConfig.cornerDotType || 'dot');
    const [exportSize, setExportSize] = useState<number>(initialConfig.exportSize || 2000);

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
            backgroundOptions: { color: bgTransparent ? 'transparent' : bgColor },
            imageOptions: { crossOrigin: 'anonymous', margin: 5 },
            cornersSquareOptions: { type: cornerSquareType },
            cornersDotOptions: { type: cornerDotType },
            qrOptions: { errorCorrectionLevel: 'Q' }
        };

        // Fix: qr-code-styling adds rotate(90/-90) on corner clipPath children
        // that breaks SVG rendering at small sizes. Strip them after render.
        const fixCornerClips = () => {
            const svg = ref.current?.querySelector('svg');
            if (!svg) return;
            svg.querySelectorAll('clipPath path, clipPath circle').forEach(el => {
                const t = el.getAttribute('transform');
                if (t && /rotate\((90|-90)/.test(t)) {
                    el.removeAttribute('transform');
                }
            });
        };

        if (!qrCode.current) {
            qrCode.current = new window.QRCodeStyling(options);

            ref.current.innerHTML = '';
            qrCode.current.append(ref.current);
            setTimeout(fixCornerClips, 0);
        } else {
            qrCode.current.update({
                ...options,
                image: logo || undefined
            });
            setTimeout(fixCornerClips, 0);
        }
    }, [isLibLoaded, url, color, bgColor, bgTransparent, logo, dotType, cornerSquareType, cornerDotType]);

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

    const handleCopySvg = async (): Promise<boolean> => {
        if (!qrCode.current || !url.trim()) return false;
        try {
            const rawData = await qrCode.current.getRawData('svg');
            if (rawData) {
                const svgText = await rawData.text();
                await navigator.clipboard.writeText(svgText);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to copy SVG", error);
            return false;
        }
    };

    return {
        url, setUrl,
        color, setColor,
        bgColor, setBgColor,
        bgTransparent, setBgTransparent,
        logo, setLogo,
        dotType, setDotType,
        cornerSquareType, setCornerSquareType,
        cornerDotType, setCornerDotType,
        exportSize, setExportSize,
        isLibLoaded,
        qrRef: ref,
        handleLogoUpload,
        handleDownload,
        handleCopySvg
    };
};
