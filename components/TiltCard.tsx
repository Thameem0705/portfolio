import React, { useRef, useState, useEffect } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Detect touch device once on mount
    useEffect(() => {
        setIsTouchDevice(
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(hover: none)').matches
        );
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const tiltX = (y - 0.5) * 20; // Max tilt rotation X
        const tiltY = (0.5 - x) * 20; // Max tilt rotation Y

        setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`);
    };

    const handleMouseLeave = () => {
        if (isTouchDevice) return;
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    };

    return (
        <div
            ref={ref}
            className={`transition-transform duration-100 ease-out will-change-transform ${
                isTouchDevice ? 'active:scale-[0.98] transition-transform duration-150' : ''
            } ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={isTouchDevice ? undefined : { transform }}
        >
            {children}
        </div>
    );
};

export default TiltCard;
