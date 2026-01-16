'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Html, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface CelestialObject {
  name: string;
  type: "planet" | "asteroid" | "comet";
  orbitRadius: number;
  rotationPeriod: number;
  size: number;
  color: string;
  orbitPeriod: number;
  tilt: number;
  description: string;
  eccentricity: number;
  inclination: number;
  periodDays: number;
  textureUrl?: string;
}

interface Moon {
  name: string;
  orbitRadius: number;
  rotationPeriod: number;
  size: number;
  color: string;
  orbitPeriod: number;
  tilt: number;
  description: string;
  eccentricity: number;
  inclination: number;
  periodDays: number;
}

const CELESTIAL_OBJECTS: CelestialObject[] = [
  {
    name: "Mercury",
    type: "planet",
    orbitRadius: 4,
    rotationPeriod: 58.6,
    size: 0.4,
    color: '#A0522D',
    orbitPeriod: 88,
    tilt: 0.034,
    description: "Smallest and innermost planet",
    eccentricity: 0.205,
    inclination: 7.0,
    periodDays: 88,
    textureUrl: "/textures/mercury.jpg"
  },
  {
    name: "Venus",
    type: "planet",
    orbitRadius: 7,
    rotationPeriod: 243,
    size: 0.9,
    color: '#DEB887',
    orbitPeriod: 225,
    tilt: 177.4,
    description: "Second planet from the Sun",
    eccentricity: 0.007,
    inclination: 3.4,
    periodDays: 225,
    textureUrl: "/textures/venus.jpg"
  },
  {
    name: "Earth",
    type: "planet",
    orbitRadius: 10,
    rotationPeriod: 0.997,
    size: 1,
    color: '#4169E1',
    orbitPeriod: 365,
    tilt: 23.4,
    description: "Our home planet",
    eccentricity: 0.017,
    inclination: 0.0,
    periodDays: 365,
    textureUrl: "/textures/earth.jpg"
  },
  {
    name: "Mars",
    type: "planet",
    orbitRadius: 15,
    rotationPeriod: 1.03,
    size: 0.5,
    color: '#CD5C5C',
    orbitPeriod: 687,
    tilt: 25.2,
    description: "The Red Planet",
    eccentricity: 0.093,
    inclination: 1.9,
    periodDays: 687,
    textureUrl: "/textures/mars.jpg"
  },
  {
    name: "Ceres",
    type: "asteroid",
    orbitRadius: 17,
    rotationPeriod: 0.378,
    size: 0.1,
    color: '#8B4513',
    orbitPeriod: 1680,
    tilt: 4,
    description: "Largest asteroid in the asteroid belt",
    eccentricity: 0.079,
    inclination: 10.6,
    periodDays: 1680,
    textureUrl: "/textures/ceres.jpg"
  },
  {
    name: "Jupiter",
    type: "planet",
    orbitRadius: 52,
    rotationPeriod: 0.414,
    size: 11,
    color: '#FF6B35',
    orbitPeriod: 4333,
    tilt: 3.1,
    description: "Largest planet in our solar system",
    eccentricity: 0.048,
    inclination: 1.3,
    periodDays: 4333,
    textureUrl: "/textures/jupiter.jpg"
  },
  {
    name: "Saturn",
    type: "planet",
    orbitRadius: 95,
    rotationPeriod: 0.444,
    size: 9,
    color: '#FFD93D',
    orbitPeriod: 10759,
    tilt: 26.7,
    description: "Famous for its rings",
    eccentricity: 0.054,
    inclination: 2.5,
    periodDays: 10759,
    textureUrl: "/textures/saturn.jpg"
  },
  {
    name: "Uranus",
    type: "planet",
    orbitRadius: 192,
    rotationPeriod: 0.718,
    size: 4,
    color: '#87CEEB',
    orbitPeriod: 30687,
    tilt: 97.8,
    description: "Ice giant planet",
    eccentricity: 0.047,
    inclination: 0.8,
    periodDays: 30687,
    textureUrl: "/textures/uranus.jpg"
  },
  {
    name: "Neptune",
    type: "planet",
    orbitRadius: 301,
    rotationPeriod: 0.671,
    size: 3.9,
    color: '#1E90FF',
    orbitPeriod: 60190,
    tilt: 28.3,
    description: "The windiest planet",
    eccentricity: 0.009,
    inclination: 1.8,
    periodDays: 60190,
    textureUrl: "/textures/neptune.jpg"
  },
  {
    name: "Halley's Comet",
    type: "comet",
    orbitRadius: 100,
    rotationPeriod: 2,
    size: 0.15,
    color: '#FFFFFF',
    orbitPeriod: 27566,
    tilt: 0,
    description: "Famous periodic comet visible from Earth every 75-76 years. Last visible in 1986, next appearance in 2061.",
    eccentricity: 0.967,
    inclination: 162.3,
    periodDays: 27566,
    textureUrl: "/textures/halley.jpg"
  },
  {
    name: 'Pluto',
    type: 'planet',
    orbitRadius: 395,
    rotationPeriod: -6.39,
    size: 1.2,
    color: '#D2B48C',
    orbitPeriod: 248.09,
    tilt: 122.53,
    description: 'The most famous dwarf planet',
    eccentricity: 0.248,
    inclination: 17.2,
    periodDays: 248.09 * 365.25,
    textureUrl: "/textures/pluto.jpg"
  },
  {
    name: 'Comet NEOWISE',
    type: 'comet',
    orbitRadius: 85,
    rotationPeriod: 1.5,
    size: 0.6,
    color: '#FFFFFF',
    orbitPeriod: 6800,
    tilt: 128.9,
    description: 'A long-period comet discovered in 2020',
    eccentricity: 0.999,
    inclination: 128.9,
    periodDays: 6800,
    textureUrl: "/textures/neowise.jpg"
  },
  {
    name: 'Comet 67P',
    type: 'comet',
    orbitRadius: 80,
    rotationPeriod: 12.4 / 24,
    size: 0.5,
    color: '#FFFFFF',
    orbitPeriod: 6.44,
    tilt: 7.04,
    description: 'The comet visited by Rosetta spacecraft',
    eccentricity: 0.641,
    inclination: 7.04,
    periodDays: 6.44 * 365.25,
    textureUrl: "/textures/67p.jpg"
  }
];

const MOONS: Record<string, Moon[]> = {
  "Earth": [
    {
      name: "Moon",
      orbitRadius: 2,
      rotationPeriod: 27.3,
      size: 0.27,
      color: '#C0C0C0',
      orbitPeriod: 27.3,
      tilt: 6.7,
      description: "Earth's only natural satellite",
      eccentricity: 0.0549,
      inclination: 5.145,
      periodDays: 27.3
    }
  ],
  "Jupiter": [
    {
      name: "Io",
      orbitRadius: 3,
      rotationPeriod: 1.77,
      size: 0.3,
      color: '#FFD700',
      orbitPeriod: 1.77,
      tilt: 0.04,
      description: "Most volcanically active body in the solar system",
      eccentricity: 0.0041,
      inclination: 0.036,
      periodDays: 1.77
    },
    {
      name: "Europa",
      orbitRadius: 4,
      rotationPeriod: 3.55,
      size: 0.25,
      color: '#FFFFFF',
      orbitPeriod: 3.55,
      tilt: 0.47,
      description: "Possibly harbors a subsurface ocean",
      eccentricity: 0.0094,
      inclination: 0.466,
      periodDays: 3.55
    },
    {
      name: "Ganymede",
      orbitRadius: 6,
      rotationPeriod: 7.15,
      size: 0.4,
      color: '#A9A9A9',
      orbitPeriod: 7.15,
      tilt: 0.2,
      description: "Largest moon in the solar system",
      eccentricity: 0.0013,
      inclination: 0.177,
      periodDays: 7.15
    },
    {
      name: "Callisto",
      orbitRadius: 8,
      rotationPeriod: 16.69,
      size: 0.35,
      color: '#808080',
      orbitPeriod: 16.69,
      tilt: 0.192,
      description: "Most heavily cratered object in the solar system",
      eccentricity: 0.0074,
      inclination: 0.192,
      periodDays: 16.69
    }
  ],
  "Saturn": [
    {
      name: "Titan",
      orbitRadius: 4,
      rotationPeriod: 15.95,
      size: 0.4,
      color: '#FFA500',
      orbitPeriod: 15.95,
      tilt: 0.33,
      description: "Only moon with a dense atmosphere",
      eccentricity: 0.0288,
      inclination: 0.33,
      periodDays: 15.95
    }
  ]
};

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.2, radius + 0.2, 64]} />
      <meshBasicMaterial color="white" transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ClockHands({ radius, simulatedDate }: { radius: number, simulatedDate: Date }) {
  const handRefs = {
    second: useRef<THREE.Group>(null),
    minute: useRef<THREE.Group>(null),
    hour: useRef<THREE.Group>(null)
  };

  useFrame(() => {
    const date = simulatedDate;
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
      {/* Hour hand - Gold */}
      <group ref={handRefs.hour}>
        <mesh position={[radius * 0.3, 0, 0]}>
          <boxGeometry args={[radius * 0.6, 0.8, 0.15]} />
          <meshStandardMaterial
            color="#FFD700"
            transparent
            opacity={0.95}
            emissive="#FFD700"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Minute hand - Silver */}
      <group ref={handRefs.minute}>
        <mesh position={[radius * 0.4, 0, 0]}>
          <boxGeometry args={[radius * 0.8, 0.5, 0.12]} />
          <meshStandardMaterial
            color="#C0C0C0"
            transparent
            opacity={0.9}
            emissive="#C0C0C0"
            emissiveIntensity={0.4}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Second hand - White */}
      <group ref={handRefs.second}>
        {/* Main second hand */}
        <mesh position={[radius * 0.5, 0, 0]}>
          <boxGeometry args={[radius * 1, 0.4, 0.08]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.95}
            emissive="#FFFFFF"
            emissiveIntensity={0.9}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* Sweep effect */}
        <mesh position={[radius * 0.5, 0, 0]}>
          <planeGeometry args={[radius * 1, 0.3]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.2}
            emissive="#FFFFFF"
            emissiveIntensity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function DigitalClock({ simulatedDate }: { simulatedDate: Date }) {
  const [timeStr, setTimeStr] = useState('');

  useFrame(() => {
    const date = simulatedDate;
    setTimeStr(date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  });

  return (
    <Html position={[0, 40, 0]}>
      <div className="px-12 py-6 text-8xl font-sans tracking-tight font-light">
        <span className="text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">{timeStr}</span>
      </div>
    </Html>
  );
}

// Add type for textures
type TextureMap = {
  [key: string]: THREE.Texture | undefined;
};

// Add texture preloading with error handling
function usePreloadedTextures(): TextureMap {
  try {
    return useTexture({
      mercury: '/textures/mercury.jpg',
      venus: '/textures/venus.jpg',
      earth: '/textures/earth.jpg',
      mars: '/textures/mars.jpg',
      jupiter: '/textures/jupiter.jpg',
      saturn: '/textures/saturn.jpg',
      uranus: '/textures/uranus.jpg',
      neptune: '/textures/neptune.jpg',
      pluto: '/textures/pluto.jpg',
      comet: '/textures/comet.jpg',
    });
  } catch (error) {
    console.warn('Some textures failed to load:', error);
    return {};
  }
}

function Scene({ timeScale }: { timeScale: number }) {
  const [time, setTime] = useState(0);
  const [simulationStartTime, setSimulationStartTime] = useState(() => new Date());
  const [currentSimulatedDate, setCurrentSimulatedDate] = useState(() => new Date());
  const [hoveredObject, setHoveredObject] = useState<CelestialObject | null>(null);
  const [hoveredMoon, setHoveredMoon] = useState<Moon | null>(null);
  const textureMap = usePreloadedTextures();
  const controlsRef = useRef<any>(null!);
  const initialAngles = useRef(
    CELESTIAL_OBJECTS.reduce((acc, obj) => {
      acc[obj.name] = Math.random() * Math.PI * 2;
      return acc;
    }, {} as Record<string, number>)
  );

  useEffect(() => {
    if (timeScale === 1) {
      const now = new Date();
      setSimulationStartTime(now);
      setTime(0);
      setCurrentSimulatedDate(now);
      console.log("Simulation time reset to real time.");
    }
  }, [timeScale]);

  useFrame((_, delta) => {
    if (timeScale !== 0) {
      const effectiveDelta = delta * timeScale;
      const newTime = time + effectiveDelta;
      setTime(newTime);

      const elapsedSimulationMillis = newTime * 1000;
      setCurrentSimulatedDate(new Date(simulationStartTime.getTime() + elapsedSimulationMillis));
    } else {
      const elapsedSimulationMillis = time * 1000;
      const pausedDate = new Date(simulationStartTime.getTime() + elapsedSimulationMillis);
      if (currentSimulatedDate.getTime() !== pausedDate.getTime()) {
        setCurrentSimulatedDate(pausedDate);
      }
    }
  });

  const handleFocus = (name: string, targetPosition: THREE.Vector3) => {
    console.log(`Focus requested on ${name}`);
  };

  const goToPreset = (presetName: string) => {
    console.log(`Preset requested: ${presetName}`);
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 50, 100]} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={30}
        maxDistance={300}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 6}
      />
      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.3} groundColor="#000000" />
      <Sun />
      <group rotation={[0, 0, 0]}>
        <ClockHands radius={80} simulatedDate={currentSimulatedDate} />
        {CELESTIAL_OBJECTS.map(object => {
          const textureName = object.type === 'comet' ? 'comet' : object.name.toLowerCase();
          return (
            <CelestialObject
              key={object.name}
              object={object}
              time={time}
              timeScale={timeScale}
              initialAngle={initialAngles.current[object.name]}
              onHover={setHoveredObject}
              onMoonHover={setHoveredMoon}
              texture={textureMap[textureName]}
              onClick={(pos) => handleFocus(object.name, pos)}
            />
          );
        })}
      </group>
      <Stars radius={200} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <DigitalClock simulatedDate={currentSimulatedDate} />

      {(hoveredObject || hoveredMoon) && (
        <Html position={[0, 20, 0]}>
          <div className="px-4 py-2 bg-black/80 text-white rounded-lg backdrop-blur-sm min-w-[200px]">
            <h3 className="text-lg font-bold">{hoveredMoon ? hoveredMoon.name : hoveredObject?.name}</h3>
            <p className="text-sm opacity-80">
              {hoveredMoon ? hoveredMoon.description : hoveredObject?.description}
            </p>
            <div className="text-xs mt-2 opacity-60">
              {hoveredMoon ? (
                <>
                  <div>Type: Moon</div>
                  <div>Rotation period: {Math.abs(hoveredMoon.rotationPeriod)} days</div>
                  <div>Orbital period: {hoveredMoon.orbitPeriod} days</div>
                  <div>Tilt: {hoveredMoon.tilt}°</div>
                </>
              ) : hoveredObject && (
                <>
                  <div>Type: {hoveredObject.type}</div>
                  <div>Rotation period: {Math.abs(hoveredObject.rotationPeriod)} days</div>
                  <div>Orbital period: {hoveredObject.orbitPeriod} years</div>
                  <div>Tilt: {hoveredObject.tilt}°</div>
                </>
              )}
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

function Moon({ moon, parentPosition, time, timeScale, initialAngle, onHover, onClick }: {
  moon: Moon;
  parentPosition: THREE.Vector3;
  time: number;
  timeScale: number;
  initialAngle: number;
  onHover: (object: Moon | null) => void;
  onClick: (position: THREE.Vector3) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialAngleRef = useRef(initialAngle);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const ORBITAL_VISUAL_BOOST = 5000;
    const orbitalPeriod = moon.periodDays * 24 * 60 * 60;
    const orbitalSpeed = (2 * Math.PI) / orbitalPeriod;
    const angle = initialAngleRef.current + time * orbitalSpeed * ORBITAL_VISUAL_BOOST;

    const r = moon.orbitRadius * (1 - moon.eccentricity * moon.eccentricity) /
      (1 + moon.eccentricity * Math.cos(angle));

    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle) * Math.sin(moon.inclination * Math.PI / 180);
    const z = r * Math.sin(angle) * Math.cos(moon.inclination * Math.PI / 180);

    meshRef.current.position.set(
      parentPosition.x + x,
      parentPosition.y + y,
      parentPosition.z + z
    );

    const rotationSpeedFactor = 5;
    meshRef.current.rotation.y += (rotationSpeedFactor / moon.rotationPeriod) * delta * timeScale;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => { e.stopPropagation(); onHover(moon); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
      onClick={(e) => {
        e.stopPropagation();
        if (meshRef.current) {
          onClick(meshRef.current.position);
        }
      }}
    >
      <sphereGeometry args={[moon.size * 2, 32, 32]} />
      <meshStandardMaterial
        color={moon.color}
        metalness={0.2}
        roughness={0.8}
        emissive={moon.color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function SaturnRings({ size, position }: { size: number; position: THREE.Vector3 }) {
  return (
    <group position={position}>
      {/* Main rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.4, size * 0.2, 32, 64]} />
        <meshStandardMaterial
          color="#FFD93D"
          transparent
          opacity={0.8}
          metalness={0.5}
          roughness={0.2}
          emissive="#FFD93D"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Inner rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.2, size * 0.1, 32, 64]} />
        <meshStandardMaterial
          color="#FFD93D"
          transparent
          opacity={0.6}
          metalness={0.5}
          roughness={0.2}
          emissive="#FFD93D"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Outer rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.6, size * 0.15, 32, 64]} />
        <meshStandardMaterial
          color="#FFD93D"
          transparent
          opacity={0.4}
          metalness={0.5}
          roughness={0.2}
          emissive="#FFD93D"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function CelestialObject({
  object,
  time,
  timeScale,
  initialAngle,
  onHover,
  onMoonHover,
  texture,
  onClick
}: {
  object: CelestialObject;
  time: number;
  timeScale: number;
  initialAngle: number;
  onHover: (object: CelestialObject | null) => void;
  onMoonHover: (moon: Moon | null) => void;
  texture?: THREE.Texture;
  onClick: (position: THREE.Vector3) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState(new THREE.Vector3());
  const initialAngleRef = useRef(initialAngle);
  const segments = object.size > 5 ? 32 : 16;
  const finalTexture = object.type === 'comet' ? texture : texture;

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const ORBITAL_VISUAL_BOOST = 5000;
    const orbitalPeriod = object.periodDays * 24 * 60 * 60;
    const orbitalSpeed = (2 * Math.PI) / orbitalPeriod;
    const angle = initialAngleRef.current + time * orbitalSpeed * ORBITAL_VISUAL_BOOST;

    const r = object.orbitRadius * (1 - object.eccentricity * object.eccentricity) /
      (1 + object.eccentricity * Math.cos(angle));

    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle) * Math.sin(object.inclination * Math.PI / 180);
    const z = r * Math.sin(angle) * Math.cos(object.inclination * Math.PI / 180);

    const newPosition = new THREE.Vector3(x, y, z);
    meshRef.current.position.copy(newPosition);
    setPosition(newPosition);

    const rotationSpeedFactor = 20;
    meshRef.current.rotation.y += (rotationSpeedFactor / object.rotationPeriod) * delta * timeScale;
  });

  return (
    <>
      <group>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); onHover(object); }}
          onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
          onClick={(e) => {
            e.stopPropagation();
            if (meshRef.current) {
              onClick(meshRef.current.position);
            }
          }}
        >
          <sphereGeometry args={[object.size, segments, segments]} />
          <meshStandardMaterial
            map={finalTexture}
            color={object.color}
            metalness={0.2}
            roughness={0.8}
            emissive={object.color}
            emissiveIntensity={0.1}
          />
          {object.type === 'comet' && (
            <mesh position={[object.size * 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.5, 4, 16]} />
              <meshStandardMaterial
                color="white"
                transparent
                opacity={0.3}
                emissive="white"
                emissiveIntensity={0.5}
              />
            </mesh>
          )}
        </mesh>
        {object.name === "Saturn" && <SaturnRings size={object.size} position={position} />}
        {MOONS[object.name]?.map((moon, index) => (
          <Moon
            key={moon.name}
            moon={moon}
            parentPosition={position}
            time={time}
            timeScale={timeScale}
            initialAngle={initialAngle + (index * Math.PI / 2)}
            onHover={onMoonHover}
            onClick={onClick}
          />
        ))}
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
  const [timeScale, setTimeScale] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasError(true);
      }
    } catch (e) {
      setHasError(true);
    }
    // Give Canvas time to initialize
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const timeScales = {
    ReverseFast: -100,
    Reverse: -10,
    Pause: 0,
    RealTime: 1,
    Fast: 10,
    VeryFast: 100,
    Ludicrous: 1000,
  };

  if (!isClient) {
    return (
      <div className="w-full h-[600px] md:h-[800px] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Initializing 3D Solar System...</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-[600px] md:h-[800px] bg-gray-900 flex flex-col items-center justify-center p-8">
        <div className="text-white text-xl mb-4">⚠️ WebGL Not Supported</div>
        <p className="text-gray-400 text-center max-w-md mb-4">
          Your browser or device doesn't support WebGL, which is required for the 3D Solar Clock.
        </p>
        <a
          href="/solar-clock"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try the 2D Solar Clock instead →
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="text-white text-lg">Loading 3D Solar System...</div>
            <div className="text-gray-400 text-sm mt-2">This may take a moment on slower devices</div>
          </div>
        </div>
      )}
      <Canvas
        shadows
        camera={{ position: [0, 50, 150], fov: 50 }}
        onCreated={() => setIsLoading(false)}
      >
        <Scene timeScale={timeScale} />
      </Canvas>
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2 p-2 bg-gray-800/70 rounded-lg backdrop-blur-sm">
        {Object.entries(timeScales).map(([name, scale]) => (
          <button
            key={name}
            onClick={() => setTimeScale(scale)}
            className={`px-3 py-1 text-xs rounded ${timeScale === scale ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}
            title={`${name} (${scale}x)`}
          >
            {name.replace(/([A-Z])/g, ' $1').trim()} {scale !== 1 && scale !== 0 ? `(${scale}x)` : ''}
          </button>
        ))}
      </div>
      {/* Instructions overlay */}
      <div className="absolute top-4 right-4 z-10 p-3 bg-gray-800/70 rounded-lg backdrop-blur-sm text-xs text-gray-300 max-w-[200px]">
        <div className="font-semibold mb-1">Controls</div>
        <div>🖱️ Drag to rotate</div>
        <div>📍 Click planet to focus</div>
        <div>🔍 Scroll to zoom</div>
      </div>
    </div>
  );
} 