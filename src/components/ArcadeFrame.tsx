import React from 'react';

interface ArcadeFrameProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export const ArcadeFrame: React.FC<ArcadeFrameProps> = ({ children, title, className = '' }) => {
    return (
        <div className={`
      relative p-1 bg-card-bg border-4 border-card-border pixel-border
      ${className}
    `}>
            {/* Header Bar */}
            {title && (
                <div className="bg-card-border py-1 px-3 mb-4 flex justify-between items-center text-neon-blue font-bold tracking-widest uppercase text-sm border-b-2 border-neon-blue crt-glow-text">
                    <span>{title}</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                </div>
            )}

            <div className="p-2 relative z-10">
                {children}
            </div>

            {/* Frame decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-transparent box-border crt-box-glow opacity-50" />
        </div>
    );
};
