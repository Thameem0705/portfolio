import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Image, useCursor, Text, Cylinder, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';
import bloodBankDashboard from '../assets/blood_bank_dashboard.png';

const Card = ({ image, ...props }: any) => {
    const ref = useRef<THREE.Group>(null);
    const [hovered, hover] = useState(false);
    useCursor(hovered);

    useFrame((state, delta) => {
        if (ref.current) {
            // Subtle floating movement
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 11, 0.1)
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 11, 0.1)
        }
    });

    return (
        <group ref={ref} {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
            {/* Glass Frame */}
            <mesh position={[0, 0, -0.07]}>
                <boxGeometry args={[2.9, 2.5, 0.1]} />
                <meshPhysicalMaterial

                    metalness={0.1}
                    roughness={0.1}
                    transmission={0.9}
                    thickness={0.5}
                    ior={1.5}
                />
            </mesh>

            {/* The Image Itself */}
            <Image url={image} scale={[2, 2]} position={[0, 0, 0.03]} />

        </group>
    );
};

const Coin = (props: any) => {
    return (
        <group {...props} rotation={[Math.PI / 2, 0, 0]}>
            <Cylinder args={[-0.11, -0.11, 0.07, 20]}>
                <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.40, 0.40, 0.06, 50]}>
                <meshStandardMaterial color="#f59e0b" metalness={1} roughness={0.3} />
            </Cylinder>
        </group>
    )
}

const Calculator = (props: any) => {
    return (
        <group {...props}>
            <Box args={[0.9, 0.13, 0.1]}>
                <meshStandardMaterial color="#1e293b" roughness={0.5} />
            </Box>
            {/* Screen */}
            <Box args={[0.8, 0.30, 0.02]} position={[0, 0.35, 0.05]}>
                <meshStandardMaterial color="#334155" />
            </Box>
            {/* Buttons Grid */}
            {[...Array(4)].map((_, r) =>
                [...Array(3)].map((_, c) => (
                    <Box key={r + '-' + c} args={[0.15, 0.1, 0.02]} position={[-0.22 + c * 0.22, 0.1 - r * 0.15, 0.05]}>
                        <meshStandardMaterial color={c === 2 ? "#f59e0b" : "#475569"} />
                    </Box>
                ))
            )}
        </group>
    )
}

const Pen = (props: any) => {
    return (
        <group {...props}>
            <Cylinder args={[0.04, 0.04, 1.2, 16]}>
                <meshStandardMaterial color="#2563eb" metalness={0.6} />
            </Cylinder>
            <mesh position={[0, -0.7, 0]}>
                <coneGeometry args={[0.04, 0.2, 16]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
            </mesh>
            <Box args={[0.01, 0.3, 0.02]} position={[0.05, 0.3, 0]} rotation={[0, 0, -0.1]}>
                <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
            </Box>
        </group>
    )
}

const Document = (props: any) => {
    return (
        <group {...props}>
            <Box args={[1, 1.4, 0.02]}>
                <meshStandardMaterial color="#f8fafc" />
            </Box>
            {/* Lines */}
            {[...Array(6)].map((_, i) => (
                <Box key={i} args={[0.8, 0.02, 0.005]} position={[0, 0.5 - i * 0.15, 0.015]}>
                    <meshStandardMaterial color="#94a3b8" />
                </Box>
            ))}
            <Box args={[0.4, 0.02, 0.005]} position={[-0.2, 0.5 + 0.15, 0.015]}>
                <meshStandardMaterial color="#000" />
            </Box>
        </group>
    )
}

const MagnifyingGlass = (props: any) => {
    return (
        <group {...props}>
            {/* Rim */}
            <Torus args={[0.4, 0.05, 16, 32]}>
                <meshStandardMaterial color="#64748b" metalness={0.8} />
            </Torus>
            {/* Glass */}
            <Cylinder args={[0.38, 0.38, 0.02, 32]} rotation={[Math.PI / 2, 0, 0]}>
                <meshPhysicalMaterial
                    color="#fff"
                    transmission={0.9}
                    opacity={0.5}
                    transparent
                    roughness={0}
                    ior={1.5}
                />
            </Cylinder>
            {/* Handle */}
            <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[0, -0.8, 0]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
        </group>
    )
}

const Chart = (props: any) => {
    return (
        <group {...props}>
            <Box args={[0.2, 0.6, 0.2]} position={[-0.3, -0.2, 0]}> <meshStandardMaterial color="#06b6d4" /> </Box>
            <Box args={[0.2, 1.0, 0.2]} position={[0, 0, 0]}> <meshStandardMaterial color="#3b82f6" /> </Box>
            <Box args={[0.2, 0.8, 0.2]} position={[0.3, -0.1, 0]}> <meshStandardMaterial color="#8b5cf6" /> </Box>
            {/* Base line */}
            <Box args={[1.2, 0.05, 0.05]} position={[0, -0.55, 0]}>
                <meshStandardMaterial color="#fff" />
            </Box>
        </group>
    )
}

const FloatingElements = () => {
    return (
        <group>
            {/* Coins */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Coin position={[-2.8, 1.5, 1]} />
            </Float>
            <Float speed={2.5} rotationIntensity={1} floatIntensity={0.5}>
                <Coin position={[2.8, 2.2, -1]} />
            </Float>

            {/* Calculator */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Calculator position={[2.5, -1, 1]} rotation={[0, -0.4, 0.2]} />
            </Float>

            {/* Pen */}
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <Pen position={[-2.5, -1, 2]} rotation={[0, 0, -0.5]} />
            </Float>

            {/* Document / Statement */}
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                <Document position={[-2.2, 0.5, -1]} rotation={[0, 0.5, 0.1]} />
            </Float>

            {/* Magnifying Glass (Analysis) */}
            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
                <MagnifyingGlass position={[2.2, 0.8, 1.5]} rotation={[0, 0, -0.8]} />
            </Float>

            {/* Chart */}
            <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.4}>
                <Chart position={[-3, -1.5, 0]} rotation={[0, 0.5, 0]} />
            </Float>
        </group>
    )
}

interface Experience3DProps {
    imagePath?: string;
}

const Experience3D: React.FC<Experience3DProps> = ({ imagePath }) => {
    // Fallback if no image provided
    const imgToUse = imagePath || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000';

    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

                <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                    <Card image={imgToUse} />
                </Float>

                <FloatingElements />

                {/* Blood Bank Dashboard Image - Right Side, Medium Size */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Image url={bloodBankDashboard} scale={[2, 1.4]} position={[4, 0, 0]} transparent opacity={0.9} />
                </Float>


                <Environment preset="city" />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default Experience3D;
