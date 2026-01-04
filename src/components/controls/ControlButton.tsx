import React from 'react';

interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'blue' | 'pink' | 'green';
    label: string;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
    variant = 'blue',
    label,
    className,
    ...props
}) => {
    let variantClass = 'arcade-btn';
    if (variant === 'pink') variantClass += ' arcade-btn-pink';
    if (variant === 'green') variantClass += ' arcade-btn-green';

    return (
        <button
            className={`${variantClass} ${className || ''}`}
            {...props}
        >
            {label}
        </button>
    );
};
