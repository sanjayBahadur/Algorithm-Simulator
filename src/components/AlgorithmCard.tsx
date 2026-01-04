"use client";

import React, { useEffect, useMemo } from 'react';
import { AlgorithmConfig } from '../algorithms/types';
import { useRunner } from '../lib/useRunner';
import { ArcadeFrame } from './ArcadeFrame';
import { ControlButton } from './controls/ControlButton';
import { SpeedSlider } from './controls/SpeedSlider';

interface AlgorithmCardProps<TInput, TState> {
    config: AlgorithmConfig<TInput, TState>;
}

export function AlgorithmCard<TInput, TState>({ config }: AlgorithmCardProps<TInput, TState>) {
    const [input, setInput] = React.useState<TInput>(config.initialInput);

    const steps = useMemo(() => {
        return config.createSteps(input);
    }, [config, input]);

    const {
        state,
        currentStep,
        progress,
        isDone,
        play,
        pause,
        reset,
        stepOnce,
        stepBack,
        setSpeed,
        setProgress
    } = useRunner(steps);

    const View = config.View;

    return (
        <div className="w-full max-w-4xl mx-auto my-8">
            <ArcadeFrame title={config.title}>

                <div className="mb-4 text-sm text-gray-400 font-mono">
                    <p>{config.description}</p>
                </div>

                <div className="relative min-h-[400px] bg-black/40 border-2 border-neon-blue/30 rounded p-4 mb-4 overflow-hidden flex items-center justify-center">
                    <View
                        input={input}
                        state={currentStep?.snapshot ?? null}
                        currentStep={currentStep}
                        stepIndex={state.stepIndex}
                        allSteps={steps}
                    />

                    <div className="absolute top-2 right-2 bg-black/80 text-neon-green text-xs p-1 border border-neon-green/50 pointer-events-none">
                        Step: {state.stepIndex} / {Math.max(0, steps.length - 1)}
                    </div>
                </div>

                <div className="min-h-[2rem] mb-4 flex items-center justify-center text-center">
                    <span className="text-neon-yellow font-bold crt-glow-text text-lg px-4 bg-black/50 border border-neon-yellow/20 rounded">
                        {currentStep?.label || "Ready to Start"}
                    </span>
                </div>

                <div className="flex flex-wrap gap-4 items-center justify-between bg-card-border/50 p-2 rounded border border-card-border">
                    <div className="flex gap-2">
                        <ControlButton
                            label={state.status === 'running' ? 'Pause' : 'Play'}
                            onClick={state.status === 'running' ? pause : play}
                            variant={state.status === 'running' ? 'pink' : 'green'}
                        />
                        <ControlButton
                            label="Back"
                            onClick={stepBack}
                            disabled={state.stepIndex <= 0 || state.status === 'running'}
                            variant='blue'
                        />
                        <ControlButton
                            label="Step"
                            onClick={stepOnce}
                            disabled={isDone || state.status === 'running'}
                            variant='blue'
                        />
                        <ControlButton
                            label="Reset"
                            onClick={reset}
                            variant='pink'
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Clickable Progress Bar */}
                        <div
                            className="bg-gray-800 w-48 h-4 border border-gray-600 relative cursor-pointer group hover:border-white transition-colors"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const pct = Math.max(0, Math.min(1, x / rect.width));
                                const idx = Math.floor(pct * (steps.length - 1));
                                setProgress(idx);
                            }}
                        >
                            <div
                                className="h-full bg-neon-blue/50 transition-none"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>

                        <SpeedSlider value={state.speedMs} onChange={setSpeed} />
                    </div>
                </div>

            </ArcadeFrame>
        </div>
    );
}
