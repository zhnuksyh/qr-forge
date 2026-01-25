import { useState, useEffect } from 'react';

export const useHistory = () => {
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('qr_history');
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const saveToHistory = (url: string) => {
        if (url && !history.includes(url)) {
            const newHistory = [url, ...history].slice(0, 5); // Limit stack to 5 items
            setHistory(newHistory);
            localStorage.setItem('qr_history', JSON.stringify(newHistory));
        }
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('qr_history');
    };

    return { history, saveToHistory, clearHistory, setHistory }; // Exporting setHistory might be useful if needed, but the requirements seem met with just these. The original App used setHistory(newHistory).
};
