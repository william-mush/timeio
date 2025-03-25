'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface CelestialObject {
  name: string;
  orbitRadius: number;
  rotationPeriod: number; // days
  size: number;
  color: string;
  orbitPeriod: number; // Earth years
  tilt: number; // degrees
  type: 'planet' | 'asteroid' | 'comet';
  description?: string;
  eccentricity: number; // orbital eccentricity
  inclination: number; // orbital inclination in degrees
}

const CELESTIAL_OBJECTS: CelestialObject[] = [
  {
    name: 'Mercury',
    orbitRadius: 10,
    rotationPeriod: 58.6,
    size: 1,
    color: '#A0522D',
    orbitPeriod: 0.24,
    tilt: 0.034,
    type: 'planet',
    description: 'The smallest and innermost planet',
    eccentricity: 0.206,
    inclination: 7.0
  },
  {
    name: 'Venus',
    orbitRadius: 15,
    rotationPeriod: -243,
    size: 1.5,
    color: '#DEB887',
    orbitPeriod: 0.62,
    tilt: 177.4,
    type: 'planet',
    description: 'The hottest planet with retrograde rotation',
    eccentricity: 0.007,
    inclination: 3.4
  },
  {
    name: 'Earth',
    orbitRadius: 20,
    rotationPeriod: 1,
    size: 1.5,
    color: '#4169E1',
    orbitPeriod: 1,
    tilt: 23.44,
    type: 'planet',
    description: 'Our home planet',
    eccentricity: 0.017,
    inclination: 0.0
  },
  {
    name: 'Mars',
    orbitRadius: 25,
    rotationPeriod: 1.03,
    size: 1.2,
    color: '#CD5C5C',
    orbitPeriod: 1.88,
    tilt: 25.19,
    type: 'planet',
    description: 'The red planet',
    eccentricity: 0.093,
    inclination: 1.85
  },
  {
    name: 'Ceres',
    orbitRadius: 30,
    rotationPeriod: 0.378,
    size: 0.5,
    color: '#8B8989',
    orbitPeriod: 4.6,
    tilt: 4,
    type: 'asteroid',
    description: 'The largest asteroid in the main belt',
    eccentricity: 0.076,
    inclination: 10.6
  },
  {
    name: 'Jupiter',
    orbitRadius: 35,
    rotationPeriod: 0.41,
    size: 4,
    color: '#DEB887',
    orbitPeriod: 11.86,
    tilt: 3.13,
    type: 'planet',
    description: 'The largest planet',
    eccentricity: 0.049,
    inclination: 1.3
  },
  {
    name: 'Saturn',
    orbitRadius: 45,
    rotationPeriod: 0.44,
    size: 3.5,
    color: '#F4A460',
    orbitPeriod: 29.46,
    tilt: 26.73,
    type: 'planet',
    description: 'The ringed planet',
    eccentricity: 0.054,
    inclination: 2.5
  },
  {
    name: 'Uranus',
    orbitRadius: 55,
    rotationPeriod: -0.72,
    size: 2.5,
    color: '#87CEEB',
    orbitPeriod: 84.01,
    tilt: 97.77,
    type: 'planet',
    description: 'The tilted planet',
    eccentricity: 0.047,
    inclination: 0.8
  },
  {
    name: 'Neptune',
    orbitRadius: 65,
    rotationPeriod: 0.67,
    size: 2.5,
    color: '#4169E1',
    orbitPeriod: 164.79,
    tilt: 28.32,
    type: 'planet',
    description: 'The windiest planet',
    eccentricity: 0.009,
    inclination: 1.8
  },
  {
    name: "Halley's Comet",
    orbitRadius: 75,
    rotationPeriod: 2.2,
    size: 0.7,
    color: '#FFFFFF',
    orbitPeriod: 76,
    tilt: 162.3,
    type: 'comet',
    description: 'Famous periodic comet visible every 76 years',
    eccentricity: 0.967,
    inclination: 162.3
  },
  {
    name: 'Pluto',
    orbitRadius: 70,
    rotationPeriod: -6.39,
    size: 1.2,
    color: '#D2B48C',
    orbitPeriod: 248.09,
    tilt: 122.53,
    type: 'planet',
    description: 'The most famous dwarf planet',
    eccentricity: 0.248,
    inclination: 17.2
  },
  {
    name: 'Comet NEOWISE',
    orbitRadius: 85,
    rotationPeriod: 1.5,
    size: 0.6,
    color: '#FFFFFF',
    orbitPeriod: 6800,
    tilt: 128.9,
    type: 'comet',
    description: 'A long-period comet discovered in 2020',
    eccentricity: 0.999,
    inclination: 128.9
  },
  {
    name: 'Comet 67P',
    orbitRadius: 80,
    rotationPeriod: 12.4,
    size: 0.5,
    color: '#FFFFFF',
    orbitPeriod: 6.44,
    tilt: 7.04,
    type: 'comet',
    description: 'The comet visited by Rosetta spacecraft',
    eccentricity: 0.641,
    inclination: 7.04
  }
];

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.2, radius + 0.2, 64]} />
      <meshBasicMaterial color="white" transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ClockHands({ radius }: { radius: number }) {
  const handRefs = {
    second: useRef<THREE.Group>(null),
    minute: useRef<THREE.Group>(null),
    hour: useRef<THREE.Group>(null)
  };
  
  useFrame(() => {
    const date = new Date();
    const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
    const minutes = date.getMinutes() + seconds / 60;
    const hours = date.getHours() % 12 + minutes / 60;

    if (handRefs.second.current) {
      handRefs.second.current.rotation.z = -(seconds / 60) * Math.PI * 2;
    }
    if (handRefs.minute.current) {
      handRefs.minute.current.rotation.z = -(minutes / 60) * Math.PI * 2;
    }
    if (handRefs.hour.current) {
      handRefs.hour.current.rotation.z = -(hours / 12) * Math.PI * 2;
    }
  });

  return (
    <group>
      {/* Hour hand */}
      <group ref={handRefs.hour}>
        <mesh position={[radius * 0.25, 0, 0]}>
          <boxGeometry args={[radius * 0.5, 0.4, 0.1]} />
          <meshStandardMaterial
            color="#FFD700"
            transparent
            opacity={0.8}
            emissive="#FFD700"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
      
      {/* Minute hand */}
      <group ref={handRefs.minute}>
        <mesh position={[radius * 0.35, 0, 0]}>
          <boxGeometry args={[radius * 0.7, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#C0C0C0"
            transparent
            opacity={0.7}
            emissive="#C0C0C0"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Second hand group */}
      <group ref={handRefs.second}>
        {/* Main second hand */}
        <mesh position={[radius * 0.45, 0, 0]}>
          <boxGeometry args={[radius * 0.9, 0.75, 0.05]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.9}
            emissive="#FFFFFF"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Sweep effect */}
        <mesh position={[radius * 0.45, 0, 0]}>
          <planeGeometry args={[radius * 0.9, 0.3]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.15}
            emissive="#FFFFFF"
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function DigitalClock() {
  const [time, setTime] = useState('');
  
  useFrame(() => {
    const date = new Date();
    setTime(date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  });

  return (
    <Html position={[0, 40, 0]}>
      <div className="px-8 py-4 bg-black/40 text-white rounded-xl backdrop-blur-md text-6xl font-sans tracking-tight font-light">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">{time}</span>
      </div>
    </Html>
  );
}

function Scene() {
  const [time, setTime] = useState(0);
  const [hoveredObject, setHoveredObject] = useState<CelestialObject | null>(null);
  const initialAngles = useRef(
    CELESTIAL_OBJECTS.reduce((acc, obj) => {
      // Give each object a random initial position
      acc[obj.name] = Math.random() * Math.PI * 2;
      return acc;
    }, {} as Record<string, number>)
  );

  useFrame((_, delta) => {
    setTime(prev => prev + delta);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 50, 100]} />
      <OrbitControls
        enablePan={false}
        minDistance={30}
        maxDistance={300}
      />
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.5} groundColor="#000000" />
      <Sun />
      <group rotation={[0, 0, 0]}>
        <ClockHands radius={80} />
        {CELESTIAL_OBJECTS.map(object => (
          <CelestialObject
            key={object.name}
            object={object}
            time={time}
            initialAngle={initialAngles.current[object.name]}
            onHover={setHoveredObject}
          />
        ))}
      </group>
      <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <DigitalClock />
      
      {hoveredObject && (
        <Html position={[0, 20, 0]}>
          <div className="px-4 py-2 bg-black/80 text-white rounded-lg backdrop-blur-sm min-w-[200px]">
            <h3 className="text-lg font-bold">{hoveredObject.name}</h3>
            <p className="text-sm opacity-80">{hoveredObject.description}</p>
            <div className="text-xs mt-2 opacity-60">
              <div>Type: {hoveredObject.type}</div>
              <div>Rotation period: {Math.abs(hoveredObject.rotationPeriod)} days</div>
              <div>Orbital period: {hoveredObject.orbitPeriod} years</div>
              <div>Tilt: {hoveredObject.tilt}°</div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

function getTexturePath(object: CelestialObject): string {
  if (object.type === 'comet') {
    return '/textures/comet.jpg';
  }
  return `/textures/${object.name.toLowerCase().replace(/['']/g, '')}.jpg`;
}

function CelestialObject({ 
  object, 
  time,
  initialAngle,
  onHover 
}: { 
  object: CelestialObject; 
  time: number;
  initialAngle: number;
  onHover: (object: CelestialObject | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [textureError, setTextureError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    const texturePath = getTexturePath(object);
    console.log(`Loading texture for ${object.name} from ${texturePath}`);
    
    const loader = new THREE.TextureLoader();
    loader.load(
      texturePath,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.anisotropy = 16;
        setTexture(loadedTexture);
        setIsLoading(false);
        console.log(`Texture loaded successfully for ${object.name}`);
      },
      undefined,
      (error) => {
        console.warn(`Texture for ${object.name} not loaded:`, error);
        setTextureError(true);
        setIsLoading(false);
      }
    );
  }, [object]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Rotate around its axis with proper tilt
    meshRef.current.rotation.x = (object.tilt * Math.PI) / 180;
    const rotationSpeed = (2 * Math.PI) / (object.rotationPeriod * 24);
    meshRef.current.rotation.y += rotationSpeed;
    
    // Calculate position using elliptical orbit
    const orbitSpeed = (2 * Math.PI) / (object.orbitPeriod * 365 * 24);
    const angle = initialAngle + time * orbitSpeed;
    
    // Apply Kepler's laws for elliptical orbit
    const a = object.orbitRadius; // semi-major axis
    const e = object.eccentricity;
    const r = a * (1 - e * e) / (1 + e * Math.cos(angle));
    
    // Apply orbital inclination
    const inclination = (object.inclination * Math.PI) / 180;
    meshRef.current.position.x = r * Math.cos(angle);
    meshRef.current.position.y = r * Math.sin(angle) * Math.sin(inclination);
    meshRef.current.position.z = r * Math.sin(angle) * Math.cos(inclination);
  });

  // Add comet tail if it's a comet
  const cometTail = object.type === 'comet' && (
    <mesh position={[object.size * 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <coneGeometry args={[0.5, 4, 32]} />
      <meshStandardMaterial
        color="white"
        transparent
        opacity={0.3}
        emissive="white"
        emissiveIntensity={0.5}
      />
    </mesh>
  );

  return (
    <>
      <group>
        <mesh 
          ref={meshRef}
          onPointerOver={() => onHover(object)}
          onPointerOut={() => onHover(null)}
        >
          <sphereGeometry args={[object.size, 64, 64]} />
          <meshStandardMaterial
            map={texture || null}
            color={textureError || isLoading ? object.color : undefined}
            metalness={0.2}
            roughness={0.8}
            emissive={textureError || isLoading ? object.color : undefined}
            emissiveIntensity={0.1}
            normalScale={[0.5, 0.5]}
          />
          {cometTail}
        </mesh>
        <OrbitRing radius={object.orbitRadius} />
      </group>
    </>
  );
}

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial
        emissive="#FDB813"
        emissiveIntensity={2}
        toneMapped={false}
      />
      <pointLight intensity={100} distance={200} decay={2} />
      <pointLight intensity={50} distance={200} decay={2} color="#ff4500" />
    </mesh>
  );
}

export function SolarClock3D() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
} 