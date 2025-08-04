// MouseFollower.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../App';

export const MouseFollower = ({ size = 20, text = "" }) => {
    const { theme } = useTheme();

    const cursorRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);
    const lerpFactor = 0.2;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            const { x: targetX, y: targetY } = mousePos.current;
            const { x: currentX, y: currentY } = cursorPos.current;

            cursorPos.current.x += (targetX - currentX) * lerpFactor;
            cursorPos.current.y += (targetY - currentY) * lerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    const lightModeBg = 'rgba(120, 117, 105, 0.2)';
    const darkModeBg = 'rgba(0, 255, 119, 0.15)';
    const lightModeBorder = '#a3a198';
    const darkModeBorder = '#0fa';

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out flex items-center justify-center border-2 -translate-x-1/2 -translate-y-1/2"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: theme === 'light' ? lightModeBg : darkModeBg,
                borderColor: theme === 'light' ? lightModeBorder : darkModeBorder,
                backdropFilter: 'blur(2.8px)',
            }}
        >
            {text && (
                 <span className={theme === 'light' ? 'text-brown-text font-medium' : 'text-white font-medium'}>
                    {text}
                </span>
            )}
        </div>
    );
};