import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../types';
import { decodeConfig } from './useShareableConfig';
import { useUndoRedo, StyleState } from './useUndoRedo';
import { processLogo } from '../utils/imageProcessor';
import { generateIconUrl, PREDEFINED_ICONS } from '../data/icons';

export const useQRSystem = () => {
    // Read URL hash for shared config on mount
    const initialConfig = decodeConfig();

    const initialStyle: StyleState = {
        color: initialConfig.color || '#2563eb',
        bgColor: initialConfig.bgColor || '#ffffff',
        bgTransparent: initialConfig.bgTransparent || false,
        dotType: initialConfig.dotType || 'rounded',
        cornerSquareType: initialConfig.cornerSquareType || 'extra-rounded',
        cornerDotType: initialConfig.cornerDotType || 'dot',
        exportSize: initialConfig.exportSize || 2000,
        logoBgColor: initialConfig.logoBgColor || '#ffffff',
        logoBgTransparent: initialConfig.logoBgTransparent ?? true,
        logoMargin: initialConfig.logoMargin ?? 5
    };

    // Undo/Redo state management
    const { state: style, set: setStyle, undo, redo, canUndo, canRedo } = useUndoRedo(initialStyle);

    // Non-style state (not tracked by undo/redo)
    const [url, setUrl] = useState('https://example.com');

    // Logo State Management
    const [rawLogo, setRawLogo] = useState<string | null>(null);
    const [activeIconId, setActiveIconId] = useState<string | null>(null);
    const [processedLogo, setProcessedLogo] = useState<string | null>(null);
    const [logoSize, setLogoSize] = useState(0.4); // 0.2 to 0.5 ratio

    // Convenience setters that update the style object
    const setColor = useCallback((v: string) => setStyle({ ...style, color: v }), [style, setStyle]);
    const setBgColor = useCallback((v: string) => setStyle({ ...style, bgColor: v }), [style, setStyle]);
    const setBgTransparent = useCallback((v: boolean) => setStyle({ ...style, bgTransparent: v }), [style, setStyle]);
    const setDotType = useCallback((v: string) => setStyle({ ...style, dotType: v }), [style, setStyle]);
    const setCornerSquareType = useCallback((v: string) => setStyle({ ...style, cornerSquareType: v }), [style, setStyle]);
    const setCornerDotType = useCallback((v: string) => setStyle({ ...style, cornerDotType: v }), [style, setStyle]);
    const setExportSize = useCallback((v: number) => setStyle({ ...style, exportSize: v }), [style, setStyle]);
    const setLogoBgColor = useCallback((v: string) => setStyle({ ...style, logoBgColor: v }), [style, setStyle]);
    const setLogoBgTransparent = useCallback((v: boolean) => setStyle({ ...style, logoBgTransparent: v }), [style, setStyle]);
    const setLogoMargin = useCallback((v: number) => setStyle({ ...style, logoMargin: v }), [style, setStyle]);

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

    // 2. Logo Processing Effect
    useEffect(() => {
        let isStale = false;

        const processInternalLogo = async () => {
            if (activeIconId) {
                const icon = PREDEFINED_ICONS.find(i => i.id === activeIconId);
                if (icon) {
                    const iconUrl = generateIconUrl(icon.paths, style.color, style.logoBgColor, style.logoBgTransparent);
                    if (!isStale) setProcessedLogo(iconUrl);
                }
            } else if (rawLogo) {
                const processed = await processLogo(rawLogo, style.logoBgColor, style.logoBgTransparent);
                if (!isStale) setProcessedLogo(processed);
            } else {
                if (!isStale) setProcessedLogo(null);
            }
        };

        processInternalLogo();

        return () => { isStale = true; };
    }, [rawLogo, activeIconId, style.color, style.logoBgColor, style.logoBgTransparent]);

    // 3. Core Logic: QR Generation & Update Cycle
    useEffect(() => {
        if (!isLibLoaded || !ref.current) return;

        // Handle Empty State: Clear container if no URL
        if (!url.trim()) {
            ref.current.innerHTML = '';
            return;
        }

        const options = {
            width: 300,
            height: 300,
            type: 'canvas', // Canvas fixes all browser SVG clipPath rotation bugs for preview
            data: url,
            image: '',
            dotsOptions: { color: style.color, type: style.dotType },
            backgroundOptions: { color: style.bgTransparent ? 'transparent' : style.bgColor },
            imageOptions: { crossOrigin: 'anonymous', margin: style.logoMargin, imageSize: logoSize },
            cornersSquareOptions: { type: style.cornerSquareType },
            cornersDotOptions: { type: style.cornerDotType },
            qrOptions: { errorCorrectionLevel: 'Q' }
        };

        if (!qrCode.current) {
            qrCode.current = new window.QRCodeStyling(options);

            ref.current.innerHTML = '';
            qrCode.current.append(ref.current);
        } else {
            qrCode.current.update({
                ...options,
                image: processedLogo || undefined
            });
        }
    }, [isLibLoaded, url, style, processedLogo, logoSize]);

    // Handlers
    const handleLogoUpload = (file: File) => {
        if (file) {
            setActiveIconId(null);
            const reader = new FileReader();
            reader.onload = (e) => {
                setRawLogo(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearLogo = useCallback(() => {
        setRawLogo(null);
        setActiveIconId(null);
        setProcessedLogo(null);
    }, []);

    const handleSelectIcon = useCallback((iconId: string) => {
        setRawLogo(null);
        setActiveIconId(iconId);
    }, []);

    const handleDownload = async (ext: 'png' | 'svg' | 'jpeg') => {
        if (qrCode.current && url.trim()) {
            // 1. Re-configure for High-Res Export
            await qrCode.current.update({
                width: style.exportSize,
                height: style.exportSize,
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
        color: style.color, setColor,
        bgColor: style.bgColor, setBgColor,
        bgTransparent: style.bgTransparent, setBgTransparent,
        logoBgColor: style.logoBgColor, setLogoBgColor,
        logoBgTransparent: style.logoBgTransparent, setLogoBgTransparent,
        logoMargin: style.logoMargin, setLogoMargin,
        logo: processedLogo,
        rawLogo, handleClearLogo, handleSelectIcon, activeIconId,
        logoSize, setLogoSize,
        dotType: style.dotType, setDotType,
        cornerSquareType: style.cornerSquareType, setCornerSquareType,
        cornerDotType: style.cornerDotType, setCornerDotType,
        exportSize: style.exportSize, setExportSize,
        setStyle, // expose for batch updates (presets)
        undo, redo, canUndo, canRedo,
        isLibLoaded,
        qrRef: ref,
        handleLogoUpload,
        handleDownload,
        handleCopySvg
    };
};
