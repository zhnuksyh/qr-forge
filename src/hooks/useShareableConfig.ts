/**
 * useShareableConfig - Encode/decode QR style settings in URL hash
 * 
 * Hash format: #c=2563eb&bg=ffffff&t=1&d=rounded&cs=extra-rounded&cd=dot&s=2000
 */

export interface QRConfig {
    color: string;
    bgColor: string;
    bgTransparent: boolean;
    dotType: string;
    cornerSquareType: string;
    cornerDotType: string;
    exportSize: number;
}

const DEFAULTS: QRConfig = {
    color: '#2563eb',
    bgColor: '#ffffff',
    bgTransparent: false,
    dotType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
    exportSize: 2000
};

const PARAM_MAP = {
    color: 'c',
    bgColor: 'bg',
    bgTransparent: 't',
    dotType: 'd',
    cornerSquareType: 'cs',
    cornerDotType: 'cd',
    exportSize: 's'
} as const;

export function encodeConfig(config: QRConfig): string {
    const params = new URLSearchParams();
    // Only encode values that differ from defaults to keep URL short
    if (config.color !== DEFAULTS.color) params.set(PARAM_MAP.color, config.color.replace('#', ''));
    if (config.bgColor !== DEFAULTS.bgColor) params.set(PARAM_MAP.bgColor, config.bgColor.replace('#', ''));
    if (config.bgTransparent) params.set(PARAM_MAP.bgTransparent, '1');
    if (config.dotType !== DEFAULTS.dotType) params.set(PARAM_MAP.dotType, config.dotType);
    if (config.cornerSquareType !== DEFAULTS.cornerSquareType) params.set(PARAM_MAP.cornerSquareType, config.cornerSquareType);
    if (config.cornerDotType !== DEFAULTS.cornerDotType) params.set(PARAM_MAP.cornerDotType, config.cornerDotType);
    if (config.exportSize !== DEFAULTS.exportSize) params.set(PARAM_MAP.exportSize, String(config.exportSize));

    const str = params.toString();
    return str ? `#${str}` : '';
}

export function decodeConfig(): Partial<QRConfig> {
    const hash = window.location.hash.slice(1); // Remove #
    if (!hash) return {};

    const params = new URLSearchParams(hash);
    const config: Partial<QRConfig> = {};

    const c = params.get(PARAM_MAP.color);
    if (c) config.color = `#${c}`;

    const bg = params.get(PARAM_MAP.bgColor);
    if (bg) config.bgColor = `#${bg}`;

    const t = params.get(PARAM_MAP.bgTransparent);
    if (t === '1') config.bgTransparent = true;

    const d = params.get(PARAM_MAP.dotType);
    if (d) config.dotType = d;

    const cs = params.get(PARAM_MAP.cornerSquareType);
    if (cs) config.cornerSquareType = cs;

    const cd = params.get(PARAM_MAP.cornerDotType);
    if (cd) config.cornerDotType = cd;

    const s = params.get(PARAM_MAP.exportSize);
    if (s) config.exportSize = parseInt(s, 10);

    return config;
}
