import React from 'react';

/**
 * WorkplaceFlowDiagram — an animated UML-style SVG diagram
 * showing Problem Solving, System Knowledge, and Handling
 * flowing into a central Workplace node via animated arrows.
 */
const WorkplaceFlowDiagram: React.FC = () => {
    return (
        <div className="workplace-flow-diagram">
            <svg
                viewBox="0 0 700 520"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.08))' }}
            >
                <defs>
                    {/* Gradient for arrows */}
                    <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="arrowGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="arrowGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="glowStrong">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Arrow markers */}
                    <marker id="arrowCyan" viewBox="0 0 10 10" refX="10" refY="5"
                        markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowPurple" viewBox="0 0 10 10" refX="10" refY="5"
                        markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
                    </marker>
                    <marker id="arrowGreen" viewBox="0 0 10 10" refX="10" refY="5"
                        markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                </defs>

                {/* ═══════════════ CENTRAL WORKPLACE NODE ═══════════════ */}
                <g className="uml-node-center" filter="url(#glow)">
                    {/* Shadow */}
                    <rect x="252" y="202" width="196" height="116" rx="12"
                        fill="rgba(0,0,0,0.3)" />
                    {/* Main box */}
                    <rect x="250" y="200" width="196" height="116" rx="12"
                        fill="rgba(15,23,42,0.95)"
                        stroke="#06b6d4" strokeWidth="2" />
                    {/* Header bar */}
                    <rect x="250" y="200" width="196" height="36" rx="12"
                        fill="rgba(6,182,212,0.15)"
                        stroke="#06b6d4" strokeWidth="2" />
                    {/* Clip bottom corners of header */}
                    <rect x="251" y="224" width="194" height="14"
                        fill="rgba(6,182,212,0.15)" />
                    {/* Header divider line */}
                    <line x1="250" y1="236" x2="446" y2="236"
                        stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.4" />

                    {/* Icon — briefcase */}
                    <text x="282" y="225" fontSize="16" fill="#06b6d4"
                        fontFamily="sans-serif">💼</text>
                    {/* Title */}
                    <text x="302" y="224" fontSize="13" fill="#e2e8f0"
                        fontWeight="700" fontFamily="'Outfit', sans-serif"
                        letterSpacing="0.5">Workplace</text>

                    {/* Body text */}
                    <text x="270" y="260" fontSize="10" fill="#94a3b8"
                        fontFamily="'Outfit', sans-serif">
                        <tspan x="270" dy="0">+ Professional Skills</tspan>
                        <tspan x="270" dy="16">+ Continuous Growth</tspan>
                        <tspan x="270" dy="16">+ Team Collaboration</tspan>
                    </text>

                    {/* Stereotype label */}
                    <text x="348" y="195" fontSize="9" fill="#06b6d4"
                        textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontStyle="italic" opacity="0.8">«core»</text>
                </g>

                {/* ═══════════════ NODE 1: PROBLEM SOLVING (left) ═══════════════ */}
                <g className="uml-node uml-node-1">
                    <rect x="12" y="162" width="170" height="100" rx="10"
                        fill="rgba(15,23,42,0.92)"
                        stroke="#06b6d4" strokeWidth="1.5" />
                    {/* Header */}
                    <rect x="12" y="162" width="170" height="30" rx="10"
                        fill="rgba(6,182,212,0.12)"
                        stroke="#06b6d4" strokeWidth="1.5" />
                    <rect x="13" y="180" width="168" height="14"
                        fill="rgba(6,182,212,0.12)" />
                    <line x1="12" y1="192" x2="182" y2="192"
                        stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.3" />

                    <text x="26" y="183" fontSize="12" fill="#06b6d4"
                        fontFamily="sans-serif">🧩</text>
                    <text x="44" y="183" fontSize="11" fill="#e2e8f0"
                        fontWeight="600" fontFamily="'Outfit', sans-serif">Problem Solving</text>

                    <text x="26" y="212" fontSize="9" fill="#94a3b8"
                        fontFamily="'Outfit', sans-serif">
                        <tspan x="26" dy="0">+ Analytical Thinking</tspan>
                        <tspan x="26" dy="14">+ Root Cause Analysis</tspan>
                        <tspan x="26" dy="14">+ Creative Solutions</tspan>
                    </text>

                    <text x="97" y="157" fontSize="8" fill="#06b6d4"
                        textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontStyle="italic" opacity="0.7">«skill»</text>
                </g>

                {/* ═══════════════ NODE 2: SYSTEM KNOWLEDGE (right) ═══════════════ */}
                <g className="uml-node uml-node-2">
                    <rect x="518" y="162" width="170" height="100" rx="10"
                        fill="rgba(15,23,42,0.92)"
                        stroke="#8b5cf6" strokeWidth="1.5" />
                    <rect x="518" y="162" width="170" height="30" rx="10"
                        fill="rgba(139,92,246,0.12)"
                        stroke="#8b5cf6" strokeWidth="1.5" />
                    <rect x="519" y="180" width="168" height="14"
                        fill="rgba(139,92,246,0.12)" />
                    <line x1="518" y1="192" x2="688" y2="192"
                        stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.3" />

                    <text x="532" y="183" fontSize="12" fill="#8b5cf6"
                        fontFamily="sans-serif">⚙️</text>
                    <text x="552" y="183" fontSize="11" fill="#e2e8f0"
                        fontWeight="600" fontFamily="'Outfit', sans-serif">System Knowledge</text>

                    <text x="532" y="212" fontSize="9" fill="#94a3b8"
                        fontFamily="'Outfit', sans-serif">
                        <tspan x="532" dy="0">+ Architecture Design</tspan>
                        <tspan x="532" dy="14">+ Process Workflows</tspan>
                        <tspan x="532" dy="14">+ Technical Expertise</tspan>
                    </text>

                    <text x="603" y="157" fontSize="8" fill="#8b5cf6"
                        textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontStyle="italic" opacity="0.7">«knowledge»</text>
                </g>

                {/* ═══════════════ NODE 3: HANDLING (bottom) ═══════════════ */}
                <g className="uml-node uml-node-3">
                    <rect x="250" y="390" width="196" height="100" rx="10"
                        fill="rgba(15,23,42,0.92)"
                        stroke="#10b981" strokeWidth="1.5" />
                    <rect x="250" y="390" width="196" height="30" rx="10"
                        fill="rgba(16,185,129,0.12)"
                        stroke="#10b981" strokeWidth="1.5" />
                    <rect x="251" y="408" width="194" height="14"
                        fill="rgba(16,185,129,0.12)" />
                    <line x1="250" y1="420" x2="446" y2="420"
                        stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />

                    <text x="272" y="411" fontSize="12" fill="#10b981"
                        fontFamily="sans-serif">🤝</text>
                    <text x="292" y="411" fontSize="11" fill="#e2e8f0"
                        fontWeight="600" fontFamily="'Outfit', sans-serif">Handling & Execution</text>

                    <text x="264" y="440" fontSize="9" fill="#94a3b8"
                        fontFamily="'Outfit', sans-serif">
                        <tspan x="264" dy="0">+ Task Management</tspan>
                        <tspan x="264" dy="14">+ Priority Scheduling</tspan>
                        <tspan x="264" dy="14">+ Quality Delivery</tspan>
                    </text>

                    <text x="348" y="385" fontSize="8" fill="#10b981"
                        textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontStyle="italic" opacity="0.7">«execution»</text>
                </g>

                {/* ═══════════════ ANIMATED ARROWS ═══════════════ */}

                {/* Arrow: Problem Solving → Workplace */}
                <line x1="182" y1="212" x2="248" y2="250"
                    stroke="#06b6d4" strokeWidth="2"
                    strokeDasharray="6 4"
                    markerEnd="url(#arrowCyan)"
                    filter="url(#glow)"
                    className="uml-arrow uml-arrow-1"
                    opacity="0.9" />
                {/* Flow particles */}
                <circle r="3" fill="#06b6d4" opacity="0.9" filter="url(#glowStrong)">
                    <animateMotion dur="2s" repeatCount="indefinite"
                        path="M182,212 L248,250" />
                </circle>
                <circle r="2" fill="#06b6d4" opacity="0.5">
                    <animateMotion dur="2s" repeatCount="indefinite" begin="1s"
                        path="M182,212 L248,250" />
                </circle>

                {/* Arrow: System Knowledge → Workplace */}
                <line x1="518" y1="212" x2="448" y2="250"
                    stroke="#8b5cf6" strokeWidth="2"
                    strokeDasharray="6 4"
                    markerEnd="url(#arrowPurple)"
                    filter="url(#glow)"
                    className="uml-arrow uml-arrow-2"
                    opacity="0.9" />
                <circle r="3" fill="#8b5cf6" opacity="0.9" filter="url(#glowStrong)">
                    <animateMotion dur="2s" repeatCount="indefinite"
                        path="M518,212 L448,250" />
                </circle>
                <circle r="2" fill="#8b5cf6" opacity="0.5">
                    <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s"
                        path="M518,212 L448,250" />
                </circle>

                {/* Arrow: Handling → Workplace */}
                <line x1="348" y1="390" x2="348" y2="318"
                    stroke="#10b981" strokeWidth="2"
                    strokeDasharray="6 4"
                    markerEnd="url(#arrowGreen)"
                    filter="url(#glow)"
                    className="uml-arrow uml-arrow-3"
                    opacity="0.9" />
                <circle r="3" fill="#10b981" opacity="0.9" filter="url(#glowStrong)">
                    <animateMotion dur="2s" repeatCount="indefinite"
                        path="M348,390 L348,318" />
                </circle>
                <circle r="2" fill="#10b981" opacity="0.5">
                    <animateMotion dur="2s" repeatCount="indefinite" begin="1.3s"
                        path="M348,390 L348,318" />
                </circle>

                {/* ═══════════════ RELATIONSHIP LABELS ON ARROWS ═══════════════ */}
                <g className="uml-label uml-label-1">
                    <rect x="190" y="218" width="52" height="16" rx="4"
                        fill="rgba(6,182,212,0.12)" stroke="#06b6d4"
                        strokeWidth="0.5" strokeOpacity="0.4" />
                    <text x="216" y="229" fontSize="7" fill="#06b6d4"
                        textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontWeight="500">applies</text>
                </g>

                <g className="uml-label uml-label-2">
                    <rect x="458" y="218" width="52" height="16" rx="4"
                        fill="rgba(139,92,246,0.12)" stroke="#8b5cf6"
                        strokeWidth="0.5" strokeOpacity="0.4" />
                    <text x="484" y="229" fontSize="7" fill="#8b5cf6"
                        textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontWeight="500">informs</text>
                </g>

                <g className="uml-label uml-label-3">
                    <rect x="354" y="348" width="52" height="16" rx="4"
                        fill="rgba(16,185,129,0.12)" stroke="#10b981"
                        strokeWidth="0.5" strokeOpacity="0.4" />
                    <text x="380" y="359" fontSize="7" fill="#10b981"
                        textAnchor="middle" fontFamily="'Outfit', sans-serif"
                        fontWeight="500">delivers</text>
                </g>

                {/* ═══════════════ DECORATIVE ELEMENTS ═══════════════ */}

                {/* Corner brackets (UML package-style) */}
                <g opacity="0.15" stroke="#06b6d4" strokeWidth="1" fill="none">
                    <polyline points="20,20 20,8 32,8" />
                    <polyline points="668,20 680,20 680,8" />
                    <polyline points="20,500 20,512 32,512" />
                    <polyline points="668,512 680,512 680,500" />
                </g>

                {/* Diagram title */}
                <text x="350" y="32" fontSize="10" fill="#475569"
                    textAnchor="middle" fontFamily="'Outfit', sans-serif"
                    letterSpacing="3" fontWeight="300">
                    WORKPLACE ACTIVITY DIAGRAM
                </text>

                {/* Bottom note */}
                <text x="350" y="510" fontSize="8" fill="#334155"
                    textAnchor="middle" fontFamily="'Outfit', sans-serif"
                    fontStyle="italic">
                    Skills flow into workplace to drive results
                </text>
            </svg>
        </div>
    );
};

export default WorkplaceFlowDiagram;
