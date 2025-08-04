import React from 'react';
import { ArrowIcon } from './Icons'; // Assuming ArrowIcon is in a components folder

export const PortfolioItems = ({ portfolioItems, onProjectClick, handleMouseEnter, handleMouseLeave }) => {
    return (
        <div
            className="border-t-2 border-beige-border dark:border-neutral-800"
            onMouseLeave={handleMouseLeave}
        >
            {portfolioItems.map((item) => (
                <div
                    key={item.id}
                    className="group block border-b-2 border-beige-border dark:border-neutral-800 py-8 transition-colors hover:bg-beige-soft/50 dark:hover:bg-neutral-900/50 no-cursor"
                    onMouseEnter={() => handleMouseEnter('View', 80)}
                    onClick={() => onProjectClick(item)}
                >
                    <div className="flex justify-between items-center px-4">
                        <div className="flex-grow">
                            <h3 className="text-3xl font-bold text-brown-text dark:text-neutral-200">{item.title}</h3>
                            <div className="flex items-center gap-x-4 mt-2 text-sm uppercase tracking-widest text-brown-muted dark:text-neutral-500">
                                <span>{item.description}</span><span>{item.year}</span>
                            </div>
                        </div>
                        <div className="text-brown-text dark:text-neutral-200 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowIcon />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};