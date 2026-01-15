import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

interface TechSatelliteProps {
  tech: string;
  orbitRadius: number;
  speed: number;
  index: number;
  color: string;
}

const TechSatellite = ({ tech, orbitRadius, speed, index, color }: TechSatelliteProps) => {
  const ref = useRef<THREE.Group>(null);
  const offset = (index / 4) * Math.PI * 2;

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(time) * orbitRadius;
      ref.current.position.z = Math.sin(time) * orbitRadius;
      ref.current.position.y = Math.sin(time * 2) * 0.08;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
      </mesh>
      <Html center distanceFactor={8}>
        <div className="px-1 py-0.5 bg-background/80 backdrop-blur-sm rounded text-[7px] font-mono-light text-foreground whitespace-nowrap border border-white/10">
          {tech}
        </div>
      </Html>
    </group>
  );
};

// Generate procedural texture for planet surface
const usePlanetTexture = (color: string, type: 'rocky' | 'gas' | 'ice') => {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    
    const baseColor = new THREE.Color(color);
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl);

    // Base gradient
    const gradient = ctx.createLinearGradient(0, 0, 256, 128);
    gradient.addColorStop(0, `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${hsl.l * 100}%)`);
    gradient.addColorStop(0.5, `hsl(${hsl.h * 360}, ${hsl.s * 80}%, ${hsl.l * 80}%)`);
    gradient.addColorStop(1, `hsl(${hsl.h * 360}, ${hsl.s * 100}%, ${hsl.l * 60}%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 128);

    // Add surface details
    if (type === 'rocky') {
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 12 + 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hsl.h * 360}, ${hsl.s * 60}%, ${hsl.l * 50}%, 0.3)`;
        ctx.fill();
      }
    } else if (type === 'gas') {
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = `hsla(${hsl.h * 360}, ${hsl.s * 100}%, ${30 + (i % 3) * 20}%, 0.25)`;
        ctx.fillRect(0, i * 16, 256, 8);
      }
    } else {
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 256, Math.random() * 128);
        for (let j = 0; j < 3; j++) {
          ctx.lineTo(Math.random() * 256, Math.random() * 128);
        }
        ctx.strokeStyle = `hsla(200, 80%, 90%, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [color, type]);
};

interface PlanetMeshProps {
  color: string;
  size: number;
  isHovered: boolean;
  tech?: string[];
}

const PlanetMesh = ({ color, size, isHovered, tech = [] }: PlanetMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  const planetColor = useMemo(() => new THREE.Color(color), [color]);
  const glowColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.5), [color]);
  
  // Determine planet type based on color
  const planetType = useMemo(() => {
    const hsl = { h: 0, s: 0, l: 0 };
    planetColor.getHSL(hsl);
    if (hsl.h > 0.5 && hsl.h < 0.7) return 'ice';
    if (hsl.s > 0.7) return 'gas';
    return 'rocky';
  }, [planetColor]);
  
  const texture = usePlanetTexture(color, planetType);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.setScalar(scale * (isHovered ? 1.2 : 1));
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Atmospheric glow */}
        <mesh ref={glowRef} scale={1.3}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={isHovered ? 0.3 : 0.15}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Main planet with texture */}
        <mesh ref={meshRef}>
          <Sphere args={[size, 64, 64]}>
            <meshStandardMaterial
              map={texture}
              color={planetColor}
              roughness={0.4}
              metalness={0.6}
              emissive={planetColor}
              emissiveIntensity={isHovered ? 0.4 : 0.2}
            />
          </Sphere>
        </mesh>

        {/* Cloud layer */}
        {planetType === 'gas' && (
          <mesh scale={1.02}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color="white" transparent opacity={0.1} roughness={1} />
          </mesh>
        )}

        {/* Orbital ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[size * 1.5, 0.02, 16, 100]} />
          <meshBasicMaterial 
            color={planetColor} 
            transparent 
            opacity={isHovered ? 0.6 : 0.3} 
          />
        </mesh>

        {/* Secondary ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[size * 1.8, 0.015, 16, 100]} />
          <meshBasicMaterial 
            color={planetColor} 
            transparent 
            opacity={isHovered ? 0.4 : 0.2} 
          />
        </mesh>

        {/* Tech satellites */}
        {tech.map((t, i) => (
          <TechSatellite
            key={t}
            tech={t}
            orbitRadius={size + 0.3 + i * 0.12}
            speed={1.2 + i * 0.25}
            index={i}
            color={color}
          />
        ))}

        {/* Surface highlight */}
        <pointLight 
          position={[-2, 2, 2]} 
          intensity={isHovered ? 2 : 1} 
          color={planetColor} 
        />
      </group>
    </Float>
  );
};

interface Planet3DProps {
  color: string;
  size: 'sm' | 'md' | 'lg';
  isHovered: boolean;
  tech?: string[];
}

const sizeMap = {
  sm: { container: 'w-36 h-36', radius: 0.8 },
  md: { container: 'w-44 h-44', radius: 1 },
  lg: { container: 'w-52 h-52', radius: 1.2 },
};

const Planet3D = ({ color, size, isHovered, tech = [] }: Planet3DProps) => {
  const { container, radius } = sizeMap[size];

  return (
    <div className={`${container} relative`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4a9eff" />
        
        <Stars 
          radius={10} 
          depth={20} 
          count={100} 
          factor={2} 
          saturation={0} 
          fade 
          speed={0.5}
        />

        <PlanetMesh color={color} size={radius} isHovered={isHovered} tech={tech} />
      </Canvas>
    </div>
  );
};

export default Planet3D;
