import { useState, useCallback, useRef } from 'react';

export interface StyleState {
    color: string;
    bgColor: string;
    bgTransparent: boolean;
    dotType: string;
    cornerSquareType: string;
    cornerDotType: string;
    exportSize: number;
}

const MAX_HISTORY = 30;

export const useUndoRedo = (initial: StyleState) => {
    const [past, setPast] = useState<StyleState[]>([]);
    const [present, setPresent] = useState<StyleState>(initial);
    const [future, setFuture] = useState<StyleState[]>([]);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const set = useCallback((newState: StyleState) => {
        // Debounce rapid changes (e.g. dragging color picker)
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            setPast(prev => [...prev, present].slice(-MAX_HISTORY));
            setFuture([]);
        }, 300);
        setPresent(newState);
    }, [present]);

    const undo = useCallback(() => {
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        const newPast = past.slice(0, -1);
        setPast(newPast);
        setFuture([present, ...future]);
        setPresent(previous);
    }, [past, present, future]);

    const redo = useCallback(() => {
        if (future.length === 0) return;
        const next = future[0];
        const newFuture = future.slice(1);
        setPast([...past, present]);
        setFuture(newFuture);
        setPresent(next);
    }, [past, present, future]);

    return {
        state: present,
        set,
        undo,
        redo,
        canUndo: past.length > 0,
        canRedo: future.length > 0
    };
};
