import React, { useState, useEffect, useContext, createContext } from 'react';

// Import Pages from your 'pages' directory
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetailPage } from './pages/ProjectPageDetails';

// Import Reusable Components from your 'components' directory
import { ThemeToggle } from './components/ThemeToggle';
import { InteractiveGridBackground } from './components/InteractiveGridBackground';
import { MouseFollower } from './components/MouseFollower';
import { MarqueeStripe } from './components/MarqueeStripe';
import { EmailIcon, LinkedInIcon, GitHubIcon } from './components/Icons';


// --- Theme Management ---
export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

// --- Main App Component ---
function AppContent() {
    const [cursorState, setCursorState] = useState({ size: 20, text: '' });
    const [activePage, setActivePage] = useState('home');
    const [selectedProject, setSelectedProject] = useState(null);

    const handleMouseEnter = (text = '', size = 60) => {
        if (typeof text !== 'string') {
            text = '';
        }
        setCursorState({ text, size });
    };

    const handleMouseLeave = () => {
        setCursorState({ text: '', size: 20 });
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setActivePage('project');
        window.scrollTo(0, 0);
    };

    const navigateTo = (page) => {
        setActivePage(page);
        window.scrollTo(0, 0);

        handleMouseLeave();
    };

    const renderContent = () => {
        switch (activePage) {
            case 'project':
                // All projects are now handled by ProjectDetailPage
                return <ProjectDetailPage project={selectedProject} onBack={() => navigateTo('home')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;

            case 'contact':
                return <ContactPage onBack={() => navigateTo('home')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;

            case 'home':
            default:
                return <HomePage onProjectClick={handleProjectClick} onContactClick={() => navigateTo('contact')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
        }
    };

    return (
        <>
            <InteractiveGridBackground />
            <div className="fixed top-6 right-6 z-[60]">
                <ThemeToggle />
            </div>
            <div className="fixed inset-0 w-full h-screen pointer-events-none z-0" style={{ backgroundImage: 'var(--grain-texture)', opacity: 'var(--grain-opacity)', animation: 'grain 8s steps(10) infinite' }}></div>

            <MouseFollower size={cursorState.size} text={cursorState.text} />

            <div className="relative z-50 min-h-screen font-sans antialiased overflow-x-hidden">
                <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
                    <main id="work">
                        {renderContent()}
                    </main>
                </div>
                <div className="my-16 md:my-24">
                    <MarqueeStripe
                        onClick={() => navigateTo('contact')}
                        onMouseEnter={() => handleMouseEnter('Contact', 80)}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
               <footer className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
                   <div className="flex items-center justify-between">
                       <p className="text-sm text-brown-muted dark:text-neutral-600 uppercase">
                          &copy; {new Date().getFullYear()} Oblikovalsky
                       </p>
                       <div className="flex items-center space-x-4">
                           <a href="mailto:oskar@oblikoval.xyz" className="text-brown-muted dark:text-neutral-500 hover:text-brown-text dark:hover:text-white transition-colors" onMouseEnter={() => handleMouseEnter()} onMouseLeave={handleMouseLeave}><EmailIcon /></a>
                           <a href="https://www.linkedin.com/in/oskar-miketi%C4%8D-8ba29a217/" className="text-brown-muted dark:text-neutral-500 hover:text-brown-text dark:hover:text-white transition-colors" onMouseEnter={() => handleMouseEnter()} onMouseLeave={handleMouseLeave}><LinkedInIcon /></a>
                           <a href="https://www.github.com" className="text-brown-muted dark:text-neutral-500 hover:text-brown-text dark:hover:text-white transition-colors" onMouseEnter={() => handleMouseEnter()} onMouseLeave={handleMouseLeave}><GitHubIcon /></a>
                       </div>
                   </div>
               </footer>
            </div>
        </>
    );
}

// Final export wrapped in the ThemeProvider
export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}