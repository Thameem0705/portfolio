import React from 'react';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subTitle?: string;
    colSpan?: 1 | 2 | 3 | 4; // Responsive column spanning
    rowSpan?: 1 | 2 | 3; // Responsive row spanning
    id?: string;
    revealAnimation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'none';
}

const BentoCard: React.FC<BentoCardProps> = ({
    children,
    className = '',
    title,
    subTitle,
    colSpan = 1,
    rowSpan = 1,
    id,
    revealAnimation = 'fade-up'
}) => {
    // Map span props to tailwind classes — responsive: mobile (1 col), md (2 cols), lg (4 cols)
    const colSpanClass = {
        1: 'col-span-1',
        2: 'col-span-1 md:col-span-2',
        3: 'col-span-1 md:col-span-2 lg:col-span-3',
        4: 'col-span-1 md:col-span-2 lg:col-span-4'
    }[colSpan];

    const rowSpanClass = {
        1: '',
        2: 'md:row-span-2',
        3: 'md:row-span-3'
    }[rowSpan];

    const revealClasses = revealAnimation !== 'none'
        ? `reveal-on-scroll reveal-${revealAnimation}`
        : '';

    return (
        <div
            id={id}
            className={`relative group overflow-hidden bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-cyan-900/10 active:border-white/10 active:shadow-lg ${colSpanClass} ${rowSpanClass} ${revealClasses} ${className} flex flex-col ${id ? 'scroll-mt-20 sm:scroll-mt-28' : ''}`}
        >
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col w-full">
                {(title || subTitle) && (
                    <div className="mb-3 sm:mb-4">
                        {subTitle && <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">{subTitle}</p>}
                        {title && <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-50 transition-colors">{title}</h3>}
                    </div>
                )}
                <div className="flex-grow w-full relative">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BentoCard;

