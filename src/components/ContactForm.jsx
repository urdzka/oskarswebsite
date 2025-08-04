import React from 'react';
import { GlassRippleButton } from './GlassRippleButton'; // Assuming you also move GlassRippleButton

export const ContactForm = ({ onMouseEnter, onMouseLeave }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted! (This is a demo)');
    };

    const inputStyles = "w-full bg-beige-soft dark:bg-neutral-900 border-2 border-beige-border dark:border-neutral-800 p-3 text-brown-text dark:text-neutral-200 focus:border-brown-muted dark:focus:border-neutral-600 focus:outline-none transition-colors rounded-md";

    return (
        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-brown-muted dark:text-neutral-400 mb-2">Name</label>
                <input type="text" id="name" name="name" required className={inputStyles} />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-brown-muted dark:text-neutral-400 mb-2">Email</label>
                <input type="email" id="email" name="email" required className={inputStyles} />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-brown-muted dark:text-neutral-400 mb-2">Message</label>
                <textarea id="message" name="message" rows="5" required className={inputStyles}></textarea>
            </div>
             <GlassRippleButton
                type="submit"
                className="py-3 px-6 border w-full rounded-lg"
                onMouseEnter={() => onMouseEnter('', 40)}
                onMouseLeave={onMouseLeave}
            >
                Send Message
            </GlassRippleButton>
        </form>
    );
};