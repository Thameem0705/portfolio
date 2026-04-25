import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
    const globeRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    const [colorMap, specularMap, normalMap] = useLoader(TextureLoader, [
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'
    ]);

    useFrame(({ clock }) => {
        if (globeRef.current) {
            globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.06;
            cloudsRef.current.rotation.x = clock.getElapsedTime() * 0.005;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />

            {/* Core Globe with Texture */}
            <Sphere ref={globeRef} args={[1.8, 64, 64]}>
                <meshPhongMaterial
                    map={colorMap}
                    specularMap={specularMap}
                    normalMap={normalMap}
                    shininess={5}
                />
            </Sphere>

            {/* Cloud-like Atmosphere */}
            <Sphere ref={cloudsRef} args={[1.82, 64, 64]}>
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </Sphere>

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

const EarthGlobe = () => {
    return (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Globe />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default EarthGlobe;
