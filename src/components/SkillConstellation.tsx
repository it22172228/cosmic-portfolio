import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  x: number;
  y: number;
}

interface ConstellationProps {
  name: string;
  skills: Skill[];
  color: string;
  index: number;
}

const SkillConstellation = ({ name, skills, color, index }: ConstellationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Constellation Box */}
      <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-neon-cyan/30 transition-all duration-500">
        {/* Connection Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {skills.map((skill, i) => {
            const nextSkill = skills[(i + 1) % skills.length];
            return (
              <line
                key={`line-${i}`}
                x1={`${skill.x}%`}
                y1={`${skill.y}%`}
                x2={`${nextSkill.x}%`}
                y2={`${nextSkill.y}%`}
                stroke={color}
                strokeWidth="0.3"
                strokeOpacity="0.3"
                className="group-hover:stroke-opacity-50 transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Stars (Skills) */}
        <div className="relative h-40">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group/star"
              style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
              whileHover={{ scale: 1.2 }}
            >
              {/* Star glow */}
              <div
                className="absolute inset-0 -m-2 rounded-full blur-md opacity-50"
                style={{ background: color }}
              />
              {/* Star core */}
              <div
                className="w-3 h-3 rounded-full relative z-10 animate-twinkle"
                style={{ 
                  background: color,
                  animationDelay: `${i * 0.5}s`,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/star:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs font-mono-light px-2 py-1 rounded glass-panel" style={{ color }}>
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Label */}
        <div className="text-center mt-4 pt-4 border-t border-border/30">
          <h4 className="font-display text-sm tracking-wider" style={{ color }}>
            {name}
          </h4>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillConstellation;
