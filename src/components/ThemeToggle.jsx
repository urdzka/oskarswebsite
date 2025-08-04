import React from 'react';
import { useTheme } from '../App';

const nightModeIcon = '/assets/night-mode.png';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="theme-toggle-button">
            <input
                id="toggle"
                className="theme-toggle-input"
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />
            <label htmlFor="toggle" className="theme-toggle-label">
                <div className="theme-toggle-switch">
                    <img
                        src={nightModeIcon}
                        alt="Toggle Icon"
                        className="w-4 h-4"
                    />
                </div>
            </label>
        </div>
    );
};