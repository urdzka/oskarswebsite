import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../App';

export const InteractiveGridBackground = () => {
    const { theme } = useTheme();
    const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
    const gridRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const gridSize = 50;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const numLinesX = Math.ceil(width / gridSize) + 1;
    const numLinesY = Math.ceil(height / gridSize) + 1;
    const warpFactor = 60;
    const gridColor = theme === 'dark' ? 'rgba(128, 128, 128, 0.15)' : 'rgba(0, 0, 0, 0.06)';
    const bgColor = theme === 'dark' ? 'black' : 'var(--bg-color)';
    const points = [];

    if(width > 0 && height > 0){
        for (let i = 0; i < numLinesY; i++) {
            for (let j = 0; j < numLinesX; j++) {
                const x = j * gridSize;
                const y = i * gridSize;
                const dx = x - mousePos.x;
                const dy = y - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);
                const displacement = Math.max(0, warpFactor - distance) / warpFactor;
                points.push({
                    x: x - Math.cos(angle) * displacement * 20,
                    y: y - Math.sin(angle) * displacement * 20,
                });
            }
        }
    }

    return (
        <svg ref={gridRef} className="fixed top-0 left-0 w-full h-screen z-0">
            <rect width="100%" height="100%" fill={bgColor} />
            {points.length > 0 && <>
                {Array.from({ length: numLinesY }).map((_, i) =>
                    Array.from({ length: numLinesX - 1 }).map((_, j) => (
                        <path key={`h-${i}-${j}`} d={`M ${points[i * numLinesX + j].x} ${points[i * numLinesX + j].y} L ${points[i * numLinesX + j + 1].x} ${points[i * numLinesX + j + 1].y}`} stroke={gridColor} strokeWidth="1"/>
                    ))
                )}
                {Array.from({ length: numLinesX }).map((_, j) =>
                    Array.from({ length: numLinesY - 1 }).map((_, i) => (
                        <path key={`v-${i}-${j}`} d={`M ${points[i * numLinesX + j].x} ${points[i * numLinesX + j].y} L ${points[(i + 1) * numLinesX + j].x} ${points[(i + 1) * numLinesX + j].y}`} stroke={gridColor} strokeWidth="1"/>
                    ))
                )}
            </>}
        </svg>
    );
};