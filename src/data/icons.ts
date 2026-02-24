export interface PredefinedIcon {
    id: string;
    name: string;
    paths: string;
}

export const PREDEFINED_ICONS: PredefinedIcon[] = [
    {
        id: 'globe',
        name: 'Web',
        paths: '<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
    },
    {
        id: 'wifi',
        name: 'Wi-Fi',
        paths: '<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>'
    },
    {
        id: 'mail',
        name: 'Email',
        paths: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'
    },
    {
        id: 'user',
        name: 'vCard',
        paths: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
    },
    {
        id: 'message',
        name: 'SMS',
        paths: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
    },
    {
        id: 'phone',
        name: 'Phone',
        paths: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
    }
];

export const generateIconUrl = (paths: string, color: string, bgColor: string, isTransparent: boolean) => {
    const strokeHex = color.startsWith('#') ? color : '#2563eb';
    const bgFill = bgColor.startsWith('#') ? bgColor : '#ffffff';

    // To reduce whitespace, we scale the 24x24 Lucide icon up significantly.
    // scale(3.2) brings it to ~76x76 inside the 100x100 viewBox.
    // translate(11, 11) centers the 76x76 grouped path perfectly within the 100x100 box.
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        ${!isTransparent ? `<rect width="100" height="100" rx="20" fill="${bgFill}" />` : ''}
        <g transform="translate(11, 11) scale(3.2)" fill="none" stroke="${strokeHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${paths}
        </g>
    </svg>`;

    return `data:image/svg+xml;base64,${btoa(svgStr)}`;
};
