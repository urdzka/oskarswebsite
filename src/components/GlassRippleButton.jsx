import React from 'react';
import { useTheme } from '../App';

export const GlassRippleButton = ({ children, onClick, onMouseEnter, onMouseLeave, className = '', type = 'button' }) => {
    const { theme } = useTheme();

    const baseClasses = "relative inline-flex items-center justify-center overflow-hidden transition-colors font-medium rounded-lg border-2 py-2 px-5";

    const themeClasses = theme === 'light'
        ? "bg-stone-500 text-white border-transparent hover:bg-stone-600"
        : "bg-transparent text-neutral-300 border-neutral-800 hover:bg-neutral-800/50";

    const rippleColor = "rgba(255, 255, 255, 0.2)";

    return (
        <button
            type={type}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${baseClasses} ${themeClasses} group ${className}`}
        >
            <span
                className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,padding-bottom] duration-[2000ms] ease-in-out group-hover:w-[200%] group-hover:pb-[200%]"
                style={{ backgroundColor: rippleColor, backdropFilter: 'blur(2px) brightness(1.2)' }}
            ></span>
            <span className="relative z-10">{children}</span>
        </button>
    );
};
