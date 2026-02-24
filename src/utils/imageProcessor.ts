/**
 * Processes a raw logo data URL and conditionally draws a solid background behind it using HTML Canvas.
 */
export const processLogo = async (
    rawLogoUrl: string,
    bgColor: string,
    isTransparent: boolean
): Promise<string> => {
    // If the user wants a transparent background, we don't need to do any canvas processing.
    // The qr-code-styling library will just render the raw image.
    if (isTransparent || !rawLogoUrl) {
        return rawLogoUrl;
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Ensure we can read the canvas data later

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                resolve(rawLogoUrl); // Fallback on error
                return;
            }

            // We want to create a slightly padded square/rectangle for the solid background
            // Use 10% padding
            const pad = Math.max(img.width, img.height) * 0.1;
            canvas.width = img.width + (pad * 2);
            canvas.height = img.height + (pad * 2);

            // Draw solid background round rect
            ctx.fillStyle = bgColor;

            // Basic rounded rect path
            const radius = Math.min(canvas.width, canvas.height) * 0.15; // 15% corner radius
            ctx.beginPath();
            ctx.moveTo(radius, 0);
            ctx.lineTo(canvas.width - radius, 0);
            ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
            ctx.lineTo(canvas.width, canvas.height - radius);
            ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
            ctx.lineTo(radius, canvas.height);
            ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();
            ctx.fill();

            // Draw original image centered
            ctx.drawImage(img, pad, pad, img.width, img.height);

            // Return processed image
            resolve(canvas.toDataURL('image/png'));
        };

        img.onerror = () => {
            resolve(rawLogoUrl); // Fallback on error
        };

        img.src = rawLogoUrl;
    });
};
