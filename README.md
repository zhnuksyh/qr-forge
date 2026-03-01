# Qrypt 

![Hits](https://img.shields.io/endpoint?url=https%3A%2F%2Fhits.dwyl.com%2Fzhnuksyh%2Fqrypt.json%3Fcolor%3Dblue&label=visitors&style=flat-square)

**"I was tired of every online QR generator verifying my credit card just to download a PNG. So I built my own."**

Qrypt is a professional-grade, **Client-Side Only** QR Code generator. It runs entirely in your browser, meaning your data never leaves your device, and it will **never** ask you for a subscription.

[**🔗 Live Demo**](https://zhnuksyh.github.io/qrypt/)

## 🚀 Why this exists?
Most "Free" QR generators are:
1.  **Dynamic Traps**: They give you a short-link (e.g., `qr.co/xyz`) that redirects to your URL. When you stop paying, the link dies.
2.  **Data Harvesters**: They track who scans your code.
3.  **Paywalled**: They blur high-quality downloads unless you upgrade to "Pro".

**Qrypt is different.** 
It generates standard, static QR codes directly on your computer. The pixel pattern *is* the data. It works offline, forever, and for free.

## ✨ Features
-   **100% Client-Side**: No server, no database, no tracking.
-   **Multi-Type Data**: Generate QR codes for URLs, Wi-Fi, vCards, Email, SMS, and plain text.
-   **Vector Quality**: Export crystal-clear SVGs or high-res PNGs (up to 4096px).
-   **Fully Customizable**: Advanced color pickers, error correction levels, and granular dot/corner styling.
-   **Style Presets**: One-click aesthetic themes — Classic, Ocean, Neon, Minimal, Corporate, Sunset, Berry.
-   **Shareable Config Links**: Share your exact style config via URL hash.
-   **Undo/Redo & History**: Step through your customization history or load recent styles.
-   **Advanced Logo Support**: Use built-in icons or drag-and-drop custom logos with transparency and padding controls.
-   **Sleek Premium UI**: Animated toast notifications, seamless Dark/Light modes, and unified Poppins typography.
-   **PWA Ready**: Install it to your home screen and use it fully offline.
-   **Guided Onboarding**: First-visit tooltip tour to get started fast.
-   **Privacy Focused**: Secure by design.

## 🛠️ Tech Stack
-   **React + TypeScript**: For robust component logic.
-   **Vite**: For lightning-fast development and building.
-   **Tailwind CSS**: For the premium, dark-mode UI.
-   **qr-code-styling**: The powerful engine behind the generation (loaded dynamically).

## 🏃‍♂️ Running Locally

1.  **Clone the repo**
    ```bash
    git clone https://github.com/zhnuksyh/qrypt.git
    cd qrypt
    ```

2.  **Install & Start**
    ```bash
    npm install
    npm run dev
    ```

3.  **Build**
    ```bash
    npm run build
    ```

---
*Built with frustration and code by zhnuksyh.*
