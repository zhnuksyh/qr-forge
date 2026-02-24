import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface TourStep {
    target: string; // CSS selector
    title: string;
    content: string;
    position: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: TourStep[] = [
    {
        target: '[data-tour="data-input"]',
        title: 'Content Data',
        content: 'Start by choosing your data type and entering the content for your QR code.',
        position: 'right'
    },
    {
        target: '[data-tour="visual-style"]',
        title: 'Visual Style',
        content: 'Customize colors, patterns, and corner styles. Try the Quick Presets for instant themes!',
        position: 'right'
    },
    {
        target: '[data-tour="live-preview"]',
        title: 'Live Preview',
        content: 'See your QR code update in real-time as you make changes.',
        position: 'left'
    },
    {
        target: '[data-tour="action-buttons"]',
        title: 'Actions',
        content: 'Save, copy SVG, share your config link, or download in PNG/SVG format.',
        position: 'left'
    },
    {
        target: '[data-tour="undo-redo"]',
        title: 'Undo & Redo',
        content: 'Made a mistake? Use undo/redo to step through your style changes.',
        position: 'left'
    }
];

const STORAGE_KEY = 'qrypt_tour_completed';

export const OnboardingTour: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(-1); // -1 = not started
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
    const [arrowPosition, setArrowPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

    // Check if tour has been completed before
    useEffect(() => {
        const completed = localStorage.getItem(STORAGE_KEY);
        if (!completed) {
            // Delay start so the page has time to render
            const timer = setTimeout(() => setCurrentStep(0), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const positionTooltip = useCallback(() => {
        if (currentStep < 0 || currentStep >= TOUR_STEPS.length) return;

        const step = TOUR_STEPS[currentStep];
        const target = document.querySelector(step.target);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const tooltipW = 300;
        const tooltipH = 160;
        const gap = 16;

        let top = 0;
        let left = 0;
        let arrow: 'top' | 'bottom' | 'left' | 'right' = 'top';

        switch (step.position) {
            case 'bottom':
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2 - tooltipW / 2;
                arrow = 'top';
                break;
            case 'top':
                top = rect.top - tooltipH - gap;
                left = rect.left + rect.width / 2 - tooltipW / 2;
                arrow = 'bottom';
                break;
            case 'right':
                top = rect.top + rect.height / 2 - tooltipH / 2;
                left = rect.right + gap;
                arrow = 'left';
                break;
            case 'left':
                top = rect.top + rect.height / 2 - tooltipH / 2;
                left = rect.left - tooltipW - gap;
                arrow = 'right';
                break;
        }

        // Clamp within viewport
        left = Math.max(12, Math.min(left, window.innerWidth - tooltipW - 12));
        top = Math.max(12, Math.min(top, window.innerHeight - tooltipH - 12));

        setTooltipStyle({ top, left, width: tooltipW });
        setArrowPosition(arrow);

        // Scroll target into view
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [currentStep]);

    useEffect(() => {
        positionTooltip();
        window.addEventListener('resize', positionTooltip);
        return () => window.removeEventListener('resize', positionTooltip);
    }, [positionTooltip]);

    const next = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            finish();
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const finish = () => {
        setCurrentStep(-1);
        localStorage.setItem(STORAGE_KEY, 'true');
    };

    if (currentStep < 0) return null;

    const step = TOUR_STEPS[currentStep];

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-[999] backdrop-blur-[2px]" onClick={finish} />

            {/* Spotlight on target */}
            <SpotlightHighlight target={step.target} />

            {/* Tooltip */}
            <div
                className="fixed z-[1001] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5 animate-in fade-in slide-in-from-bottom-2"
                style={tooltipStyle}
            >
                {/* Arrow */}
                <div className={`absolute w-3 h-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rotate-45 ${
                    arrowPosition === 'top' ? '-top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0' :
                    arrowPosition === 'bottom' ? '-bottom-1.5 left-1/2 -translate-x-1/2 border-t-0 border-l-0' :
                    arrowPosition === 'left' ? '-left-1.5 top-1/2 -translate-y-1/2 border-t-0 border-r-0' :
                    '-right-1.5 top-1/2 -translate-y-1/2 border-b-0 border-l-0'
                }`} />

                {/* Close */}
                <button
                    onClick={finish}
                    className="absolute top-3 right-3 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{step.title}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{step.content}</p>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                        {currentStep + 1} / {TOUR_STEPS.length}
                    </span>
                    <div className="flex gap-2">
                        {currentStep > 0 && (
                            <button
                                onClick={prev}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-3 h-3" /> Back
                            </button>
                        )}
                        <button
                            onClick={next}
                            className="flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:from-purple-400 hover:to-indigo-400 transition-all"
                        >
                            {currentStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                            {currentStep < TOUR_STEPS.length - 1 && <ChevronRight className="w-3 h-3" />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Spotlight component highlights the target element
const SpotlightHighlight: React.FC<{ target: string }> = ({ target }) => {
    const [rect, setRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const el = document.querySelector(target);
        if (el) {
            setRect(el.getBoundingClientRect());
        }
    }, [target]);

    if (!rect) return null;

    const padding = 8;

    return (
        <div
            className="fixed z-[1000] rounded-2xl ring-4 ring-purple-500/50 pointer-events-none"
            style={{
                top: rect.top - padding,
                left: rect.left - padding,
                width: rect.width + padding * 2,
                height: rect.height + padding * 2,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)'
            }}
        />
    );
};
