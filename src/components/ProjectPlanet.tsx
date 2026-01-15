import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import Planet3D from './Planet3D';

interface ProjectPlanetProps {
  title: string;
  description: string;
  tech: string[];
  color: string;
  size: 'sm' | 'md' | 'lg';
  index: number;
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectPlanet = ({ 
  title, 
  description, 
  tech, 
  color, 
  size, 
  index,
  liveUrl,
  githubUrl 
}: ProjectPlanetProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Planet */}
      <div className="relative flex flex-col items-center">
        {/* 3D Planet */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="cursor-pointer"
        >
          <Suspense 
            fallback={
              <div className="w-44 h-44 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-neon-cyan animate-spin" />
              </div>
            }
          >
            <Planet3D color={color} size={size} isHovered={isHovered} tech={tech} />
          </Suspense>
        </motion.div>

        {/* Info Panel */}
        <motion.div 
          className="mt-4 glass-panel p-5 rounded-xl max-w-xs hud-border"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-display text-lg text-foreground mb-2 text-glow-subtle">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t) => (
              <span 
                key={t} 
                className="px-2 py-1 text-xs font-mono-light rounded-md"
                style={{ 
                  background: `${color}15`,
                  color: color,
                  border: `1px solid ${color}30`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {liveUrl && (
              <a 
                href={liveUrl}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Live
              </a>
            )}
            {githubUrl && (
              <a 
                href={githubUrl}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                <Github className="w-3 h-3" />
                Code
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectPlanet;
