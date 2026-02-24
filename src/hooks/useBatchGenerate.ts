import { useState } from 'react';
import JSZip from 'jszip';
import '../types';

interface BatchStyleConfig {
    color: string;
    bgColor: string;
    bgTransparent: boolean;
    dotType: string;
    cornerSquareType: string;
    cornerDotType: string;
    exportSize: number;
}

export const useBatchGenerate = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [total, setTotal] = useState(0);

    const generateBatch = async (urls: string[], style: BatchStyleConfig) => {
        if (!window.QRCodeStyling || urls.length === 0) return;

        setIsGenerating(true);
        setTotal(urls.length);
        setProgress(0);

        const zip = new JSZip();

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i].trim();
            if (!url) continue;

            // Create a temporary QR instance
            const qr = new window.QRCodeStyling({
                width: style.exportSize,
                height: style.exportSize,
                type: 'png',
                data: url,
                dotsOptions: { color: style.color, type: style.dotType },
                backgroundOptions: { color: style.bgTransparent ? 'transparent' : style.bgColor },
                imageOptions: { crossOrigin: 'anonymous', margin: 20 },
                cornersSquareOptions: { type: style.cornerSquareType },
                cornersDotOptions: { type: style.cornerDotType },
                qrOptions: { errorCorrectionLevel: 'Q' }
            });

            // Render to a temp container
            const container = document.createElement('div');
            qr.append(container);

            // Wait for rendering
            await new Promise(resolve => setTimeout(resolve, 300));

            try {
                const blob = await qr.getRawData('png');
                if (blob) {
                    // Sanitize URL for filename
                    const safeName = url
                        .replace(/^https?:\/\//, '')
                        .replace(/[^a-zA-Z0-9.-]/g, '_')
                        .substring(0, 50);
                    zip.file(`qr_${i + 1}_${safeName}.png`, blob);
                }
            } catch (err) {
                console.error(`Failed to generate QR for: ${url}`, err);
            }

            container.remove();
            setProgress(i + 1);
        }

        // Download ZIP
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = `qrypt-batch-${urls.length}qr.zip`;
        link.click();
        URL.revokeObjectURL(link.href);

        setIsGenerating(false);
        setProgress(0);
        setTotal(0);
    };

    return { generateBatch, isGenerating, progress, total };
};
