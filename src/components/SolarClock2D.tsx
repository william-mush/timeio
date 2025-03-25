'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Planet {
  name: string;
  color: string;
  orbitRadius: number;  // in px
  periodDays: number;   // orbital period in Earth days
  size: number;        // diameter in px
  description: string; // additional info
  type?: 'planet' | 'dwarf' | 'asteroid' | 'comet';  // celestial object type
}

const PLANETS: Planet[] = [
  { 
    name: 'Mercury', 
    color: '#A0522D', 
    orbitRadius: 50, 
    periodDays: 88, 
    size: 28,
    description: 'Smallest planet, closest to Sun\nOrbit: 88 Earth days\nTemp: 430°C to -180°C',
    type: 'planet'
  },
  { 
    name: 'Venus', 
    color: '#DEB887', 
    orbitRadius: 75, 
    periodDays: 225, 
    size: 42,
    description: 'Earth\'s "sister planet"\nOrbit: 225 Earth days\nTemp: 460°C',
    type: 'planet'
  },
  { 
    name: 'Earth', 
    color: '#4169E1', 
    orbitRadius: 100, 
    periodDays: 365, 
    size: 42,
    description: 'Our home planet\nOrbit: 365.25 days\nTemp: 15°C average',
    type: 'planet'
  },
  { 
    name: 'Mars', 
    color: '#CD5C5C', 
    orbitRadius: 125, 
    periodDays: 687, 
    size: 35,
    description: 'The Red Planet\nOrbit: 687 Earth days\nTemp: -63°C average',
    type: 'planet'
  },
  { 
    name: 'Ceres', 
    color: '#8B8989', 
    orbitRadius: 150, 
    periodDays: 1682, 
    size: 14,
    description: 'Largest asteroid in the belt\nOrbit: 4.6 Earth years\nDiameter: 940 km',
    type: 'dwarf'
  },
  { 
    name: 'Jupiter', 
    color: '#DAA520', 
    orbitRadius: 170, 
    periodDays: 4333, 
    size: 84,
    description: 'Largest planet\nOrbit: 11.9 Earth years\nTemp: -110°C average',
    type: 'planet'
  },
  { 
    name: 'Saturn', 
    color: '#F4A460', 
    orbitRadius: 210, 
    periodDays: 10759, 
    size: 70,
    description: 'Ring system planet\nOrbit: 29.5 Earth years\nTemp: -140°C average',
    type: 'planet'
  },
  { 
    name: 'Uranus', 
    color: '#87CEEB', 
    orbitRadius: 250, 
    periodDays: 30687, 
    size: 49,
    description: 'Ice giant\nOrbit: 84 Earth years\nTemp: -195°C average',
    type: 'planet'
  },
  { 
    name: 'Neptune', 
    color: '#4169E1', 
    orbitRadius: 290, 
    periodDays: 60190, 
    size: 49,
    description: 'Windiest planet\nOrbit: 165 Earth years\nTemp: -200°C average',
    type: 'planet'
  },
  { 
    name: 'Pluto', 
    color: '#DEB887', 
    orbitRadius: 330, 
    periodDays: 90560, 
    size: 21,
    description: 'Dwarf planet\nOrbit: 248 Earth years\nTemp: -230°C average',
    type: 'dwarf'
  },
  { 
    name: 'Halley\'s Comet', 
    color: '#E6E6FA', 
    orbitRadius: 370, 
    periodDays: 27740, 
    size: 14,
    description: 'Famous periodic comet\nOrbit: 76 Earth years\nLast visit: 1986\nNext visit: 2061',
    type: 'comet'
  }
];

interface HoverInfo {
  x: number;
  y: number;
  content: string;
  visible: boolean;
}

export function SolarClock2D() {
  const [time, setTime] = useState(new Date());
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>({ x: 0, y: 0, content: '', visible: false });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const calculatePlanetPosition = (planet: Planet, currentTime: Date) => {
    const msPerOrbit = planet.periodDays * 24 * 60 * 60 * 1000;
    const degreesPerMs = 360 / msPerOrbit;
    const timeMs = currentTime.getTime();
    const angle = (timeMs * degreesPerMs) % 360;
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * planet.orbitRadius,
      y: Math.sin(radians) * planet.orbitRadius,
    };
  };

  const drawSolarSystem = (ctx: CanvasRenderingContext2D, currentTime: Date) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw Sun
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();

    // Draw orbits and planets
    PLANETS.forEach(planet => {
      // Draw orbit
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      // Calculate and draw planet
      const pos = calculatePlanetPosition(planet, currentTime);
      ctx.beginPath();
      ctx.arc(centerX + pos.x, centerY + pos.y, planet.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();
    });

    // Draw second hand
    const secondAngle = (
      (currentTime.getSeconds() * 1000 + currentTime.getMilliseconds()) / 60000
    ) * Math.PI * 2 - Math.PI / 2;
    
    // Draw radial glow effect along the entire hand
    const gradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + Math.cos(secondAngle) * 390,
      centerY + Math.sin(secondAngle) * 390
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
    
    // Draw wide glow path
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const glowWidth = 20;
    const perpAngle = secondAngle + Math.PI / 2;
    const px = Math.cos(perpAngle) * glowWidth;
    const py = Math.sin(perpAngle) * glowWidth;
    
    ctx.lineTo(
      centerX + Math.cos(secondAngle) * 390 + px,
      centerY + Math.sin(secondAngle) * 390 + py
    );
    ctx.lineTo(
      centerX + Math.cos(secondAngle) * 390 - px,
      centerY + Math.sin(secondAngle) * 390 - py
    );
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw second hand
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(secondAngle) * 390,
      centerY + Math.sin(secondAngle) * 390
    );
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 9;
    ctx.stroke();
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Check if mouse is over Sun
    const distanceToSun = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    if (distanceToSun <= 8) {
      setHoverInfo({
        x: event.clientX,
        y: event.clientY,
        content: 'The Sun\nSurface Temp: 5,500°C\nAge: 4.6 billion years',
        visible: true
      });
      return;
    }

    // Check if mouse is over any planet
    PLANETS.forEach(planet => {
      const pos = calculatePlanetPosition(planet, time);
      const planetX = centerX + pos.x;
      const planetY = centerY + pos.y;
      const distanceToPlanet = Math.sqrt(
        Math.pow(x - planetX, 2) + Math.pow(y - planetY, 2)
      );
      if (distanceToPlanet <= planet.size) {
        setHoverInfo({
          x: event.clientX,
          y: event.clientY,
          content: `${planet.name}\n${planet.description}`,
          visible: true
        });
        return;
      }
    });

    // If not hovering over anything, hide the tooltip
    if (hoverInfo.visible) {
      setHoverInfo(prev => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const size = Math.min(window.innerWidth - 40, 800);
      canvas.width = size;
      canvas.height = size;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation loop with requestAnimationFrame for smooth movement
    let animationFrameId: number;
    
    const animate = () => {
      const now = new Date();
      setTime(now);
      drawSolarSystem(ctx, now);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          className="rounded-full bg-black/20 backdrop-blur-xl shadow-2xl"
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoverInfo(prev => ({ ...prev, visible: false }))}
        />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        {hoverInfo.visible && (
          <div 
            className="absolute bg-white/90 backdrop-blur-sm text-gray-600 text-sm rounded-lg p-3 pointer-events-none whitespace-pre-line shadow-lg border border-gray-200/50"
            style={{ 
              left: `${hoverInfo.x + 10}px`, 
              top: `${hoverInfo.y + 10}px`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            {hoverInfo.content}
          </div>
        )}
      </motion.div>
    </div>
  );
} 