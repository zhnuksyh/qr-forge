# Static QR Forge

A pure client-side QR Code generator built with React, TypeScript, and Tailwind CSS.

## Getting Started

1.  **Install dependencies** (if you haven't already):
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Architecture

-   **Modular Design**: Components are split into `src/components`, logic into `src/hooks`.
-   **No Bundled QR Library**: Uses `qr-code-styling` via CDN injection (Runtime) to ensure performance and reduce bundle size.
-   **Persistence**: Saves history to `localStorage`.
-   **Styling**: Full Tailwind CSS integration with Dark Mode default.
