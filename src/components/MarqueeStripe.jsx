import React from 'react';

export const MarqueeStripe = ({ onClick, onMouseEnter, onMouseLeave }) => (
    <div
        className="marquee-container cursor-none relative w-full py-12 bg-beige-soft dark:bg-neutral-900 text-brown-muted dark:text-neutral-500 whitespace-nowrap overflow-hidden z-10"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="marquee-content flex text-3xl font-bold uppercase tracking-widest animate-[marquee_25s_linear_infinite]">
            {Array(10).fill("Available for new projects").map((text, i) => <span key={i} className="px-8">{text} &bull;</span>)}
        </div>
    </div>
);