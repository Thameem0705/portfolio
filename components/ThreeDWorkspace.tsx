import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, PerspectiveCamera, Environment, ContactShadows, Text, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

/* ─── ARROW LABEL ────────────────────────────────────────────── */
const ArrowLabel = ({ text, from, to }: { text: string; from: [number, number, number]; to: [number, number, number] }) => {
    const points = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);

    // arrowhead direction
    const dir = useMemo(() => new THREE.Vector3().subVectors(points[1], points[0]).normalize(), [points]);
    const arrowPos = useMemo(() => new THREE.Vector3(...to), [to]);

    return (
        <group>
            {/* Line */}
            <Line
                points={[from, to]}
                color="#ffffff"
                lineWidth={1.5}
                transparent
                opacity={0.85}
            />

            {/* Arrow tip – small cone */}
            <mesh position={arrowPos} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)}>
                <coneGeometry args={[0.06, 0.18, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Label text */}
            <Text
                position={[from[0], from[1] + 0.15, from[2]]}
                fontSize={0.22}
                color="#ffffff"
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.015}
                outlineColor="#000000"
            >
                {text}
            </Text>
        </group>
    );
};

/* ─── DESK ───────────────────────────────────────────────────── */
const Desk = () => {
    return (
        <group position={[0, -1, 0]}>
            {/* Main Table Top */}
            <Box args={[3.6, 0.12, 1.8]} position={[0, 1.1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#0f1729" roughness={0.15} metalness={0.9} />
            </Box>
            {/* Table edge bevel (subtle strip) */}
            <Box args={[3.62, 0.02, 1.82]} position={[0, 1.16, 0]}>
                <meshStandardMaterial color="#1a2744" roughness={0.1} metalness={0.95} />
            </Box>

            {/* Legs */}
            {[[-1.6, 0.55, 0.7], [1.6, 0.55, 0.7], [-1.6, 0.55, -0.7], [1.6, 0.55, -0.7]].map((pos, i) => (
                <Cylinder key={i} args={[0.06, 0.05, 1.1]} position={pos as [number, number, number]} castShadow>
                    <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} />
                </Cylinder>
            ))}
        </group>
    );
};

/* ─── MONITOR ────────────────────────────────────────────────── */
const Monitor = ({ position, rotation, screenColor = "#06b6d4", emissiveColor = "#06b6d4" }: any) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Screen Bezel */}
            <Box args={[1.3, 0.8, 0.06]} position={[0, 0.5, 0]} castShadow>
                <meshStandardMaterial color="#0a0f1a" roughness={0.3} metalness={0.7} />
            </Box>
            {/* Screen Display */}
            <Box args={[1.2, 0.7, 0.01]} position={[0, 0.5, 0.031]}>
                <meshStandardMaterial color={screenColor} emissive={emissiveColor} emissiveIntensity={0.6} roughness={0.1} />
            </Box>
            {/* Stand Neck */}
            <Box args={[0.08, 0.35, 0.06]} position={[0, 0.12, -0.1]}>
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </Box>
            {/* Stand Base */}
            <Cylinder args={[0.22, 0.22, 0.03, 24]} position={[0, -0.05, -0.1]}>
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </Cylinder>
        </group>
    );
};

/* ─── LAPTOP ─────────────────────────────────────────────────── */
const Laptop = ({ position, rotation }: any) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Base */}
            <Box args={[0.85, 0.03, 0.55]} position={[0, 0.015, 0.27]}>
                <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.2} />
            </Box>
            {/* Keyboard area on base */}
            <Box args={[0.78, 0.005, 0.42]} position={[0, 0.035, 0.27]}>
                <meshStandardMaterial color="#334155" roughness={0.4} />
            </Box>

            {/* Screen – angled */}
            <group position={[0, 0.03, 0]} rotation={[-0.35, 0, 0]}>
                {/* Body */}
                <Box args={[0.85, 0.55, 0.02]} position={[0, 0.28, 0]}>
                    <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.2} />
                </Box>
                {/* Display */}
                <Box args={[0.8, 0.5, 0.005]} position={[0, 0.28, 0.011]}>
                    <meshStandardMaterial color="#1a0a0a" />
                </Box>
                {/* Code lines on screen */}
                <Box args={[0.65, 0.012, 0.005]} position={[0, 0.42, 0.015]}>
                    <meshBasicMaterial color="#ef4444" />
                </Box>
                <Box args={[0.5, 0.012, 0.005]} position={[-0.07, 0.39, 0.015]}>
                    <meshBasicMaterial color="#f97316" />
                </Box>
                <Box args={[0.55, 0.012, 0.005]} position={[0, 0.36, 0.015]}>
                    <meshBasicMaterial color="#22c55e" />
                </Box>
                <Box args={[0.4, 0.012, 0.005]} position={[-0.1, 0.33, 0.015]}>
                    <meshBasicMaterial color="#3b82f6" />
                </Box>
                <Box args={[0.58, 0.012, 0.005]} position={[0.02, 0.30, 0.015]}>
                    <meshBasicMaterial color="#a855f7" />
                </Box>
            </group>
        </group>
    );
};

/* ─── KEYBOARD ───────────────────────────────────────────────── */
const Keyboard = ({ position, rotation }: any) => {
    return (
        <group position={position} rotation={rotation}>
            <Box args={[0.95, 0.02, 0.38]}>
                <meshStandardMaterial color="#0f172a" roughness={0.3} />
            </Box>
            {/* Key rows */}
            {[0, 1, 2, 3].map(r =>
                [...Array(12)].map((_, c) => (
                    <Box key={`${r}-${c}`} args={[0.055, 0.012, 0.055]} position={[-0.38 + c * 0.07, 0.016, -0.12 + r * 0.08]}>
                        <meshStandardMaterial color="#1e293b" />
                    </Box>
                ))
            )}
        </group>
    );
};

/* ─── MOUSE ──────────────────────────────────────────────────── */
const Mouse = ({ position }: any) => (
    <group position={position}>
        <Box args={[0.1, 0.035, 0.18]}>
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </Box>
        {/* Scroll wheel */}
        <Box args={[0.02, 0.012, 0.04]} position={[0, 0.02, -0.03]}>
            <meshStandardMaterial color="#334155" />
        </Box>
    </group>
);

/* ─── DOCUMENT / PAPER ───────────────────────────────────────── */
const Paper = ({ position, rotation }: any) => (
    <group position={position} rotation={rotation}>
        <Box args={[0.5, 0.005, 0.65]}>
            <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
        </Box>
        {/* Text lines */}
        {[0, 1, 2, 3, 4].map(i => (
            <Box key={i} args={[0.38, 0.002, 0.012]} position={[0, 0.004, -0.2 + i * 0.08]}>
                <meshStandardMaterial color="#94a3b8" />
            </Box>
        ))}
    </group>
);

/* ─── OFFICE CHAIR ───────────────────────────────────────────── */
const Chair = ({ position, rotation }: any) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Star base with 5 legs */}
            <Cylinder args={[0.04, 0.04, 0.02, 16]} position={[0, 0.01, 0]}>
                <meshStandardMaterial color="#0f172a" />
            </Cylinder>
            {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                    <group key={i}>
                        <Box args={[0.04, 0.03, 0.35]} position={[Math.sin(rad) * 0.17, 0.015, Math.cos(rad) * 0.17]} rotation={[0, -rad, 0]}>
                            <meshStandardMaterial color="#1e293b" metalness={0.8} />
                        </Box>
                        {/* Wheel */}
                        <Cylinder args={[0.035, 0.035, 0.03, 12]} position={[Math.sin(rad) * 0.34, 0.015, Math.cos(rad) * 0.34]} rotation={[Math.PI / 2, 0, rad]}>
                            <meshStandardMaterial color="#0f172a" />
                        </Cylinder>
                    </group>
                );
            })}

            {/* Pneumatic cylinder/stem */}
            <Cylinder args={[0.04, 0.04, 0.45, 12]} position={[0, 0.26, 0]}>
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
            </Cylinder>

            {/* Seat */}
            <Box args={[0.55, 0.06, 0.55]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#0c1322" />
            </Box>
            {/* Seat cushion */}
            <Box args={[0.52, 0.05, 0.52]} position={[0, 0.55, 0]}>
                <meshStandardMaterial color="#0ea5e9" roughness={0.7} />
            </Box>

            {/* Backrest */}
            <Box args={[0.55, 0.65, 0.06]} position={[0, 0.9, -0.25]} rotation={[0.08, 0, 0]}>
                <meshStandardMaterial color="#0c1322" />
            </Box>
            <Box args={[0.50, 0.60, 0.04]} position={[0, 0.9, -0.22]} rotation={[0.08, 0, 0]}>
                <meshStandardMaterial color="#0ea5e9" roughness={0.7} />
            </Box>

            {/* Armrests */}
            {[-1, 1].map(side => (
                <group key={side}>
                    {/* Vertical */}
                    <Box args={[0.04, 0.28, 0.04]} position={[side * 0.28, 0.65, -0.05]}>
                        <meshStandardMaterial color="#0f172a" />
                    </Box>
                    {/* Horizontal pad */}
                    <Box args={[0.06, 0.03, 0.26]} position={[side * 0.28, 0.79, -0.05]}>
                        <meshStandardMaterial color="#1e293b" />
                    </Box>
                </group>
            ))}
        </group>
    );
};

/* ─── FLOOR ──────────────────────────────────────────────────── */
const Floor = () => (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#080d18" roughness={0.6} metalness={0.3} />
    </mesh>
);

/* ─── MAIN SCENE ─────────────────────────────────────────────── */
const Scene = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle breathing float
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
        }
    });

    return (
        <group ref={groupRef}>
            <Desk />

            {/* Left monitor – purple/magenta (Income Tax) */}
            <Monitor
                position={[-1.2, 0.17, -0.3]}
                rotation={[0, 0.35, 0]}
                screenColor="#7c3aed"
                emissiveColor="#a855f7"
            />

            {/* Center monitor – cyan (main) */}
            <Monitor
                position={[0.1, 0.17, -0.5]}
                rotation={[0, 0, 0]}
                screenColor="#06b6d4"
                emissiveColor="#22d3ee"
            />

            {/* Laptop – between monitors (GST Filling) */}
            <Laptop position={[1.1, 0.15, 0.1]} rotation={[0, -0.45, 0]} />

            {/* Keyboard & Mouse */}
            <Keyboard position={[-0.1, 0.16, 0.35]} rotation={[0, 0, 0]} />
            <Mouse position={[0.55, 0.16, 0.40]} />

            {/* Paper document on desk */}
            <Paper position={[-0.8, 0.17, 0.3]} rotation={[0, 0.15, 0]} />

            {/* Chair (Front end) */}
            <Chair position={[1.2, -1.05, 1.5]} rotation={[0, -0.6, 0]} />

            {/* ─── FLOATING LABELS WITH ARROWS ──────────────── */}

            {/* Income Tax → Left monitor */}
            <ArrowLabel
                text="Income Tax"
                from={[-2.5, 1.6, 0.8]}
                to={[-1.3, 0.8, -0.1]}
            />

            {/* GST Filling → Laptop */}
            <ArrowLabel
                text="GST Filling"
                from={[0.5, 2.0, -0.8]}
                to={[1.0, 0.7, 0.0]}
            />

            {/* Front end → Chair */}
            <ArrowLabel
                text="Front end"
                from={[2.5, 1.2, 2.0]}
                to={[1.4, 0.1, 1.5]}
            />

            <Floor />
        </group>
    );
};

/* ─── CANVAS WRAPPER ─────────────────────────────────────────── */
const ThreeDWorkspace = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="w-full h-full min-h-[220px] sm:min-h-[250px] cursor-move">
            <Canvas
                shadows={!isMobile}
                dpr={isMobile ? [1, 1.5] : [1, 2]}
                gl={{ antialias: !isMobile }}
            >
                <PerspectiveCamera makeDefault position={[3, 4, 6]} fov={isMobile ? 50 : 45} />

                {/* Ambient fill */}
                <ambientLight intensity={isMobile ? 0.35 : 0.25} />

                {/* Key light – warm white from top-right */}
                <pointLight
                    position={[8, 10, 5]}
                    intensity={1.2}
                    color="#f1f5f9"
                    castShadow={!isMobile}
                    shadow-mapSize={isMobile ? 512 : 1024}
                />

                {/* Cyan rim light */}
                <pointLight position={[-6, 4, -6]} intensity={0.6} color="#06b6d4" />

                {/* Purple fill from left */}
                <pointLight position={[-5, 3, 4]} intensity={0.4} color="#a855f7" />

                {/* Subtle bottom fill */}
                <pointLight position={[0, -3, 0]} intensity={0.15} color="#1e293b" />

                <Scene />

                {/* Ground shadows — only on desktop */}
                {!isMobile && (
                    <ContactShadows
                        position={[0, -2.08, 0]}
                        opacity={0.5}
                        scale={12}
                        blur={2.5}
                        far={5}
                        color="#000000"
                    />
                )}

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={isMobile ? 0.5 : 0.8}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 6}
                />

                <Environment preset="night" />
            </Canvas>
        </div>
    );
};

export default ThreeDWorkspace;

