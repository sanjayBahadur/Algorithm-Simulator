import React from 'react';
import { BinarySearchState } from './runner';
import { Step } from '../types';

interface ViewProps {
    input: number;
    state: BinarySearchState | null;
    currentStep: Step<BinarySearchState> | null;
}

export const BinarySearchView: React.FC<ViewProps> = ({ state }) => {
    if (!state) return <div className="text-gray-500">Initializing...</div>;

    const { array, low, mid, high, target, foundIndex, comparison } = state;

    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="flex flex-wrap justify-center gap-1 mb-12">
                {array.map((val, idx) => {
                    const isMid = idx === mid;
                    const inRange = idx >= low && idx <= high;
                    const isFound = idx === foundIndex;

                    let bgColor = "bg-transparent";
                    let borderColor = "border-gray-800";
                    let textColor = "text-gray-500";
                    let shadow = "";

                    if (isFound) {
                        bgColor = "bg-neon-green/20";
                        borderColor = "border-neon-green";
                        textColor = "text-neon-green";
                        shadow = "shadow-[0_0_10px_rgba(0,255,0,0.5)]";
                    } else if (isMid) {
                        bgColor = "bg-neon-yellow/20";
                        borderColor = "border-neon-yellow";
                        textColor = "text-neon-yellow";
                        shadow = "shadow-[0_0_10px_rgba(255,255,0,0.5)]";
                    } else if (inRange) {
                        borderColor = "border-neon-blue";
                        textColor = "text-neon-blue";
                    }

                    return (
                        <div
                            key={idx}
                            className={`
                relative w-12 h-16 border-2 flex items-center justify-center font-bold text-lg transition-all duration-300
                ${bgColor} ${borderColor} ${textColor} ${shadow}
              `}
                        >
                            {val}

                            {/* Indicators */}
                            {idx === low && (
                                <div className="absolute -top-6 text-[10px] text-neon-blue uppercase font-bold">Low</div>
                            )}
                            {idx === high && (
                                <div className="absolute -bottom-6 text-[10px] text-neon-blue uppercase font-bold">High</div>
                            )}
                            {isMid && (
                                <div className="absolute -top-6 text-[10px] text-neon-yellow uppercase font-bold animate-bounce">Mid</div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm uppercase tracking-widest font-bold">
                <div className="flex flex-col items-center p-2 border border-card-border bg-black/30">
                    <span className="text-gray-400 text-xs mb-1">Target</span>
                    <span className="text-neon-pink text-xl">{target}</span>
                </div>
                <div className="flex flex-col items-center p-2 border border-card-border bg-black/30">
                    <span className="text-gray-400 text-xs mb-1">Status</span>
                    <span className={`text-xl ${comparison === 'equal' ? 'text-neon-green' : 'text-neon-blue'}`}>
                        {comparison === 'equal' ? 'Found!' : (comparison === 'none' ? 'Searching' : (comparison === 'less' ? 'Too Small' : 'Too Big'))}
                    </span>
                </div>
            </div>
        </div>
    );
};
