import React, { useState, useEffect } from 'react';
import pythonLogo from '../assets/python_logo.png';
import vb6Logo from '../assets/vb6_logo.png';
import htmlCssLogo from '../assets/html_css_logo.png';
// React logo removed — file did not exist in assets
import officeLogo from '../assets/office_logo.png';

interface WelcomeScreenProps {
    onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress bar animation — ~3 seconds
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 28);

        // Dismiss after completion
        const timer = setTimeout(() => {
            handleDismiss();
        }, 3500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    const handleDismiss = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShow(false);
            onComplete();
        }, 800);
    };

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleDismiss}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleDismiss()}
            aria-label="Welcome screen. Click or press Enter to skip."
        >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Floating Images — scaled down on mobile */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img src={pythonLogo} alt="" className="absolute top-[8%] left-[5%] w-10 sm:w-16 h-10 sm:h-16 object-contain opacity-15 sm:opacity-20 animate-float-slow" aria-hidden="true" />
                <img src={vb6Logo} alt="" className="absolute top-[12%] right-[5%] w-10 sm:w-16 h-10 sm:h-16 object-contain opacity-15 sm:opacity-20 animate-float-slow" style={{ animationDelay: '1s' }} aria-hidden="true" />
                <img src={htmlCssLogo} alt="" className="absolute bottom-[15%] left-[8%] w-12 sm:w-20 h-12 sm:h-20 object-contain opacity-15 sm:opacity-20 animate-float-slow" style={{ animationDelay: '2s' }} aria-hidden="true" />
                <img src={officeLogo} alt="" className="absolute bottom-[8%] right-[8%] w-9 sm:w-14 h-9 sm:h-14 object-contain opacity-15 sm:opacity-20 animate-float-slow" style={{ animationDelay: '0.5s' }} aria-hidden="true" />
            </div>

            <div className="relative text-center p-4 sm:p-6 z-10 flex flex-col items-center max-w-lg mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-wider animate-bounce-slow">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        Welcome
                    </span>
                </h1>
                <h2 className="text-base sm:text-xl md:text-3xl text-gray-300 font-light mb-8 sm:mb-12 animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
                    M. Ahamed Thameemul Ansari's Portfolio
                </h2>

                {/* Loading Bar */}
                <div className="w-48 sm:w-64 md:w-80 h-1.5 bg-gray-800 rounded-full overflow-hidden mx-auto mb-3 sm:mb-4 border border-gray-700/50">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-cyan-400/80 text-[10px] sm:text-xs md:text-sm animate-pulse font-mono tracking-widest">
                    LOADING {progress}%
                </p>

                {/* Skip hint */}
                <p className="text-slate-600 text-[10px] sm:text-xs mt-6 sm:mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                    Tap anywhere to skip
                </p>
            </div>
        </div>
    );
};

export default WelcomeScreen;
