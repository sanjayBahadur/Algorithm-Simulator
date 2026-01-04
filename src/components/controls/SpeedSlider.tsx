import React from 'react';

interface SpeedSliderProps {
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
}

export const SpeedSlider: React.FC<SpeedSliderProps> = ({
    value,
    onChange,
    min = 100,
    max = 2000
}) => {
    return (
        <div className="flex flex-col gap-1 w-32">
            <label className="text-xs uppercase tracking-widest text-neon-blue font-bold">
                Speed
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={50}
                // Invert value so right is faster (smaller ms)
                value={max - value + min}
                onChange={(e) => {
                    const val = Number(e.target.value);
                    // Invert back
                    onChange(max - val + min);
                }}
                className="w-full"
            />
        </div>
    );
};
