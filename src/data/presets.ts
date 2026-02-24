export interface QRPreset {
    name: string;
    color: string;
    bgColor: string;
    dotType: string;
    cornerSquareType: string;
    cornerDotType: string;
}

export const PRESETS: QRPreset[] = [
    {
        name: 'Classic',
        color: '#000000',
        bgColor: '#ffffff',
        dotType: 'square',
        cornerSquareType: 'square',
        cornerDotType: 'square'
    },
    {
        name: 'Ocean',
        color: '#2563eb',
        bgColor: '#ffffff',
        dotType: 'rounded',
        cornerSquareType: 'extra-rounded',
        cornerDotType: 'dot'
    },
    {
        name: 'Neon',
        color: '#22d3ee',
        bgColor: '#0f172a',
        dotType: 'dots',
        cornerSquareType: 'extra-rounded',
        cornerDotType: 'dot'
    },
    {
        name: 'Minimal',
        color: '#64748b',
        bgColor: '#f8fafc',
        dotType: 'rounded',
        cornerSquareType: 'dot',
        cornerDotType: 'dot'
    },
    {
        name: 'Corporate',
        color: '#1e293b',
        bgColor: '#ffffff',
        dotType: 'classy-rounded',
        cornerSquareType: 'extra-rounded',
        cornerDotType: 'square'
    },
    {
        name: 'Sunset',
        color: '#f97316',
        bgColor: '#fffbeb',
        dotType: 'dots',
        cornerSquareType: 'extra-rounded',
        cornerDotType: 'dot'
    },
    {
        name: 'Berry',
        color: '#a855f7',
        bgColor: '#faf5ff',
        dotType: 'rounded',
        cornerSquareType: 'extra-rounded',
        cornerDotType: 'dot'
    }
];
