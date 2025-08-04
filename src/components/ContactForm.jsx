import React, { useState } from 'react';
import { GlassRippleButton } from './GlassRippleButton';

export const ContactForm = ({ onMouseEnter, onMouseLeave }) => {
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus('Sending...');

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Updated fetch URL to your live domain
            const response = await fetch('https://oblikoval.xyz/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                form.reset();
            } else {
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('Failed to send message. Please contact me via email: oskar@oblikoval.xyz');
        } finally {
            setIsSubmitting(false);
        }
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
                disabled={isSubmitting}
                className="py-3 px-6 border w-full rounded-lg"
                onMouseEnter={() => onMouseEnter(isSubmitting ? 'Sending...' : '', 60)}
                onMouseLeave={onMouseLeave}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </GlassRippleButton>
            {status && <p className="mt-4 text-sm text-brown-text dark:text-neutral-300">{status}</p>}
        </form>
    );
};