import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Rocket, Target, TrendingUp } from 'lucide-react';

// Project data with enhanced details
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  size: 'sm' | 'md' | 'lg';
  orbitRadius: number;
  orbitSpeed: number;
  liveUrl?: string;
  githubUrl?: string;
  // Enhanced details for case study
  challenge?: string;
  solution?: string;
  impact?: string[];
  features?: string[];
  planetType: 'gas' | 'rocky' | 'ice' | 'volcanic' | 'oceanic';
}

// Satellite representing a tech stack item
const TechSatellite = ({ 
  tech, 
  orbitRadius, 
  orbitSpeed, 
  index, 
  color 
}: { 
  tech: string; 
  orbitRadius: number; 
  orbitSpeed: number; 
  index: number; 
  color: string;
}) => {
  const ref = useRef<THREE.Group>(null);
  const offset = (index / 4) * Math.PI * 2;

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime * orbitSpeed + offset;
      ref.current.position.x = Math.cos(time) * orbitRadius;
      ref.current.position.z = Math.sin(time) * orbitRadius;
      ref.current.position.y = Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
      </mesh>
      <Html center distanceFactor={10}>
        <div className="px-1.5 py-0.5 bg-background/80 backdrop-blur-sm rounded text-[8px] font-mono-light text-foreground whitespace-nowrap border border-white/10">
          {tech}
        </div>
      </Html>
    </group>
  );
};

// Planet surface detail generators
const usePlanetTexture = (planetType: string, color: string) => {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    const baseColor = new THREE.Color(color);
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl);

    // Base gradient
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${hsl.l * 100}%)`);
    gradient.addColorStop(0.5, `hsl(${hsl.h * 360}, ${hsl.s * 80}%, ${hsl.l * 80}%)`);
    gradient.addColorStop(1, `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${hsl.l * 60}%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Add surface details based on planet type
    switch (planetType) {
      case 'rocky':
        // Craters
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 256;
          const r = Math.random() * 20 + 5;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hsl.h * 360}, ${hsl.s * 60}%, ${hsl.l * 50}%, 0.4)`;
          ctx.fill();
        }
        break;
      case 'gas':
        // Horizontal bands
        for (let i = 0; i < 10; i++) {
          const y = i * 26;
          ctx.fillStyle = `hsla(${hsl.h * 360}, ${hsl.s * 100}%, ${30 + (i % 3) * 20}%, 0.3)`;
          ctx.fillRect(0, y, 512, 13);
        }
        // Storm spots
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * 512, Math.random() * 256, 30, 15, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hsl.h * 360 + 30}, 70%, 60%, 0.5)`;
          ctx.fill();
        }
        break;
      case 'ice':
        // Ice cracks
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * 512, Math.random() * 256);
          for (let j = 0; j < 5; j++) {
            ctx.lineTo(Math.random() * 512, Math.random() * 256);
          }
          ctx.strokeStyle = `hsla(200, 80%, 90%, 0.4)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        break;
      case 'volcanic':
        // Lava flows
        for (let i = 0; i < 15; i++) {
          ctx.beginPath();
          const startX = Math.random() * 512;
          const startY = Math.random() * 256;
          ctx.moveTo(startX, startY);
          for (let j = 0; j < 3; j++) {
            ctx.lineTo(startX + (Math.random() - 0.5) * 100, startY + Math.random() * 50);
          }
          ctx.strokeStyle = `hsla(20, 100%, 50%, 0.6)`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        break;
      case 'oceanic':
        // Continents
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const cx = Math.random() * 512;
          const cy = Math.random() * 256;
          ctx.moveTo(cx, cy);
          for (let j = 0; j < 8; j++) {
            const angle = (j / 8) * Math.PI * 2;
            const r = 30 + Math.random() * 40;
            ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
          }
          ctx.closePath();
          ctx.fillStyle = `hsla(${hsl.h * 360 + 40}, 40%, 40%, 0.5)`;
          ctx.fill();
        }
        break;
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [planetType, color]);
};

// Individual orbiting planet
const OrbitingPlanet = ({ 
  project, 
  onClick,
  isSelected
}: { 
  project: ProjectData; 
  onClick: () => void;
  isSelected: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const planetColor = useMemo(() => new THREE.Color(project.color), [project.color]);
  const glowColor = useMemo(() => new THREE.Color(project.color).multiplyScalar(0.5), [project.color]);
  const texture = usePlanetTexture(project.planetType, project.color);
  
  const sizeMap = { sm: 0.4, md: 0.55, lg: 0.7 };
  const radius = sizeMap[project.size];

  useFrame((state, delta) => {
    if (groupRef.current && !isSelected) {
      // Orbital movement
      const time = state.clock.elapsedTime * project.orbitSpeed;
      groupRef.current.position.x = Math.cos(time) * project.orbitRadius;
      groupRef.current.position.z = Math.sin(time) * project.orbitRadius;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.5;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.setScalar(scale * (hovered ? 1.3 : 1));
    }
  });

  return (
    <group ref={groupRef}>
      {/* Atmospheric glow */}
      <mesh ref={glowRef} scale={1.4}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={hovered ? 0.4 : 0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main planet with texture */}
      <mesh 
        ref={planetRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color={planetColor}
          roughness={0.4}
          metalness={0.6}
          emissive={planetColor}
          emissiveIntensity={hovered ? 0.4 : 0.2}
        />
      </mesh>

      {/* Cloud layer for gas/oceanic planets */}
      {(project.planetType === 'gas' || project.planetType === 'oceanic') && (
        <mesh scale={1.05}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.15}
            roughness={1}
          />
        </mesh>
      )}

      {/* Orbital ring for some planets */}
      {project.size === 'lg' && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[radius * 1.6, 0.03, 16, 100]} />
          <meshBasicMaterial color={planetColor} transparent opacity={0.5} />
        </mesh>
      )}

      {/* Tech satellites */}
      {project.tech.map((tech, i) => (
        <TechSatellite
          key={tech}
          tech={tech}
          orbitRadius={radius + 0.3 + i * 0.15}
          orbitSpeed={1.5 + i * 0.3}
          index={i}
          color={project.color}
        />
      ))}

      {/* Planet label */}
      <Html position={[0, radius + 0.5, 0]} center distanceFactor={8}>
        <div 
          className={`px-3 py-1.5 glass-panel rounded-lg cursor-pointer transition-all duration-300 ${hovered ? 'scale-110' : ''}`}
          onClick={onClick}
        >
          <span className="font-display text-sm text-foreground whitespace-nowrap">{project.title}</span>
        </div>
      </Html>
    </group>
  );
};

// Central sun
const CentralSun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (coronaRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      coronaRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Corona glow */}
      <mesh ref={coronaRef} scale={2.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffa500" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      
      {/* Outer glow */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffcc00" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>

      {/* Main sun */}
      <mesh ref={sunRef}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#ffd700"
            distort={0.4}
            speed={3}
            roughness={0}
            metalness={0.2}
            emissive="#ff8c00"
            emissiveIntensity={1}
          />
        </Sphere>
      </mesh>

      {/* Sun light */}
      <pointLight position={[0, 0, 0]} intensity={3} color="#ffd700" distance={20} decay={2} />
    </group>
  );
};

// Orbital paths visualization
const OrbitalPaths = ({ projects }: { projects: ProjectData[] }) => {
  const uniqueRadii = [...new Set(projects.map(p => p.orbitRadius))];
  
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {uniqueRadii.map((radius, i) => (
        <mesh key={i}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

// Camera controller for zoom effect
const CameraController = ({ 
  target, 
  isZoomed 
}: { 
  target: THREE.Vector3 | null; 
  isZoomed: boolean;
}) => {
  const { camera } = useThree();
  const defaultPos = useMemo(() => new THREE.Vector3(0, 8, 12), []);
  
  useFrame(() => {
    if (isZoomed && target) {
      camera.position.lerp(new THREE.Vector3(target.x, target.y + 2, target.z + 3), 0.05);
      camera.lookAt(target);
    } else {
      camera.position.lerp(defaultPos, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

// Main scene content
const SolarSystemScene = ({ 
  projects, 
  onPlanetClick,
  selectedProject 
}: { 
  projects: ProjectData[];
  onPlanetClick: (project: ProjectData | null) => void;
  selectedProject: ProjectData | null;
}) => {
  const [zoomTarget, setZoomTarget] = useState<THREE.Vector3 | null>(null);

  const handlePlanetClick = useCallback((project: ProjectData) => {
    if (selectedProject?.id === project.id) {
      onPlanetClick(null);
      setZoomTarget(null);
    } else {
      onPlanetClick(project);
      // Calculate planet position for camera zoom
      const time = performance.now() / 1000 * project.orbitSpeed;
      const x = Math.cos(time) * project.orbitRadius;
      const z = Math.sin(time) * project.orbitRadius;
      setZoomTarget(new THREE.Vector3(x, 0, z));
    }
  }, [selectedProject, onPlanetClick]);

  return (
    <>
      <CameraController target={zoomTarget} isZoomed={!!selectedProject} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Stars background */}
      <Stars radius={50} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />
      
      {/* Central sun */}
      <CentralSun />
      
      {/* Orbital paths */}
      <OrbitalPaths projects={projects} />
      
      {/* Orbiting planets */}
      {projects.map((project) => (
        <OrbitingPlanet
          key={project.id}
          project={project}
          onClick={() => handlePlanetClick(project)}
          isSelected={selectedProject?.id === project.id}
        />
      ))}
    </>
  );
};

// Project detail modal
const ProjectDetailModal = ({ 
  project, 
  onClose 
}: { 
  project: ProjectData; 
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-panel hud-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto pointer-events-auto"
        style={{ 
          boxShadow: `0 0 60px ${project.color}30, 0 0 120px ${project.color}15`,
        }}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-panel hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: project.color, boxShadow: `0 0 20px ${project.color}` }}
            />
            <span className="font-mono-light text-sm text-muted-foreground tracking-wider">MISSION BRIEFING</span>
          </div>
          
          <h2 className="font-display text-3xl text-foreground" style={{ textShadow: `0 0 30px ${project.color}` }}>
            {project.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div>
            <h3 className="font-mono-light text-xs text-muted-foreground tracking-wider mb-3 flex items-center gap-2">
              <Rocket className="w-4 h-4" style={{ color: project.color }} />
              TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span 
                  key={t}
                  className="px-3 py-1.5 text-sm font-mono-light rounded-lg"
                  style={{ 
                    background: `${project.color}20`,
                    color: project.color,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Challenge */}
          {project.challenge && (
            <div>
              <h3 className="font-mono-light text-xs text-muted-foreground tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" style={{ color: project.color }} />
                THE CHALLENGE
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed glass-panel p-4 rounded-lg">
                {project.challenge}
              </p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div>
              <h3 className="font-mono-light text-xs text-muted-foreground tracking-wider mb-3">
                💡 THE SOLUTION
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed glass-panel p-4 rounded-lg">
                {project.solution}
              </p>
            </div>
          )}

          {/* Impact Metrics */}
          {project.impact && project.impact.length > 0 && (
            <div>
              <h3 className="font-mono-light text-xs text-muted-foreground tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: project.color }} />
                IMPACT METRICS
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {project.impact.map((metric, i) => (
                  <div 
                    key={i}
                    className="glass-panel p-3 rounded-lg text-center"
                    style={{ borderColor: `${project.color}30` }}
                  >
                    <span className="text-sm text-foreground font-mono-light">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono-light text-sm transition-all hover:scale-105"
                style={{ 
                  background: `${project.color}20`,
                  color: project.color,
                  border: `1px solid ${project.color}40`,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono-light text-sm glass-panel hover:bg-white/10 transition-all hover:scale-105"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main exported component
interface SolarSystem3DProps {
  projects: ProjectData[];
}

const SolarSystem3D = ({ projects }: SolarSystem3DProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="relative w-full h-[700px]">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <SolarSystemScene 
          projects={projects}
          onPlanetClick={setSelectedProject}
          selectedProject={selectedProject}
        />
      </Canvas>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full">
        <span className="font-mono-light text-xs text-muted-foreground">
          Click on a planet to explore • Drag to rotate view
        </span>
      </div>
    </div>
  );
};

export default SolarSystem3D;
