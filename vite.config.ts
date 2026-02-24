import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon-192.svg'],
            manifest: {
                name: 'Qrypt',
                short_name: 'Qrypt',
                description: 'Free, private, client-side QR code generator. No servers, no tracking.',
                theme_color: '#020617',
                background_color: '#020617',
                display: 'standalone',
                start_url: '/qrypt/',
                scope: '/qrypt/',
                icons: [
                    {
                        src: 'icon-192.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
    base: '/qrypt/',
})

