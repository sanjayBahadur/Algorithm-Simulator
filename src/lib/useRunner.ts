import { useState, useCallback, useEffect, useRef } from 'react';
import { RunnerState, Step } from '../algorithms/types';

export function useRunner<T>(steps: Step<T>[]) {
    const [state, setState] = useState<RunnerState>({
        status: 'idle',
        stepIndex: 0,
        speedMs: 500,
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        stopTimer();
        setState(prev => ({ ...prev, status: 'idle', stepIndex: 0 }));
    }, [stopTimer]);

    const pause = useCallback(() => {
        stopTimer();
        setState(prev => ({ ...prev, status: 'paused' }));
    }, [stopTimer]);

    const stepOnce = useCallback(() => {
        setState(prev => {
            const nextIndex = prev.stepIndex + 1;
            if (nextIndex >= steps.length) {
                stopTimer();
                return { ...prev, status: 'done', stepIndex: steps.length - 1 };
            }
            return { ...prev, stepIndex: nextIndex };
        });
    }, [steps.length, stopTimer]);

    const stepBack = useCallback(() => {
        setState(prev => {
            const nextIndex = Math.max(0, prev.stepIndex - 1);
            // If we were done, and we step back, we are arguably "paused" or "running" but let's say "paused" for safety if manual
            return { ...prev, stepIndex: nextIndex, status: prev.status === 'done' ? 'paused' : prev.status };
        });
    }, []);

    const play = useCallback(() => {
        // If already done, restart
        setState(prev => {
            if (prev.status === 'done' || prev.stepIndex >= steps.length - 1) {
                return { ...prev, status: 'running', stepIndex: 0 };
            }
            return { ...prev, status: 'running' };
        });
    }, [steps.length]);

    // Effect to handle the interval when running
    useEffect(() => {
        if (state.status === 'running') {
            timerRef.current = setInterval(() => {
                setState(prev => {
                    if (prev.status !== 'running') return prev;
                    const nextIndex = prev.stepIndex + 1;
                    if (nextIndex >= steps.length) {
                        clearInterval(timerRef.current!);
                        timerRef.current = null;
                        return { ...prev, status: 'done', stepIndex: steps.length - 1 };
                    }
                    return { ...prev, stepIndex: nextIndex };
                });
            }, state.speedMs);
        } else {
            stopTimer();
        }
        return () => stopTimer();
    }, [state.status, state.speedMs, steps.length, stopTimer]);

    const setSpeed = useCallback((ms: number) => {
        setState(prev => ({ ...prev, speedMs: ms }));
    }, []);

    const setProgress = useCallback((index: number) => {
        stopTimer();
        setState(prev => ({
            ...prev,
            status: 'paused',
            stepIndex: Math.max(0, Math.min(index, steps.length - 1))
        }));
    }, [steps.length, stopTimer]);

    const currentStep = steps[state.stepIndex] || null;

    return {
        state,
        currentStep,
        progress: steps.length > 0 ? (state.stepIndex + 1) / steps.length : 0,
        isDone: state.status === 'done',
        play,
        pause,
        reset,
        stepOnce,
        stepBack,
        setSpeed,
        setProgress
    };
}
