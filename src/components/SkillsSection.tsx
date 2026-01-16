import { motion } from 'framer-motion';
import SkillConstellation from './SkillConstellation';

const constellations = [
  {
    name: 'FRONTEND',
    color: '#00d4ff',
    skills: [
      { name: 'React', level: 95, x: 20, y: 30 },
      { name: 'TypeScript', level: 90, x: 50, y: 15 },
      { name: 'Next.js', level: 85, x: 80, y: 25 },
      { name: 'Tailwind', level: 92, x: 70, y: 60 },
      { name: 'Vue', level: 75, x: 30, y: 70 },
    ],
  },
  {
    name: 'BACKEND',
    color: '#22c55e',
    skills: [
      { name: 'Node.js', level: 90, x: 25, y: 20 },
      { name: 'Go', level: 85, x: 60, y: 25 },
      { name: 'Python', level: 80, x: 80, y: 50 },
      { name: 'Rust', level: 70, x: 45, y: 65 },
      { name: 'GraphQL', level: 88, x: 20, y: 55 },
    ],
  },
  {
    name: 'INFRASTRUCTURE',
    color: '#f59e0b',
    skills: [
      { name: 'AWS', level: 88, x: 30, y: 25 },
      { name: 'Docker', level: 92, x: 65, y: 20 },
      { name: 'Kubernetes', level: 80, x: 75, y: 55 },
      { name: 'Terraform', level: 75, x: 40, y: 70 },
      { name: 'CI/CD', level: 90, x: 20, y: 50 },
    ],
  },
  {
    name: 'DATA & ML',
    color: '#ec4899',
    skills: [
      { name: 'PostgreSQL', level: 90, x: 25, y: 30 },
      { name: 'Redis', level: 85, x: 55, y: 20 },
      { name: 'TensorFlow', level: 70, x: 80, y: 40 },
      { name: 'Spark', level: 65, x: 60, y: 65 },
      { name: 'MongoDB', level: 82, x: 30, y: 60 },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-6">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-holographic-purple/5 rounded-full blur-[100px]" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10"
      >
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-neon-cyan" />
          <span className="font-mono-light text-sm text-neon-cyan tracking-wider">STAR MAP</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          SKILL <span className="text-neon-cyan text-glow">CONSTELLATIONS</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Navigate through the technologies I've mastered. Each star represents expertise, connected by years of experience.
        </p>
      </motion.div>

      {/* Constellations Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
        {constellations.map((constellation, index) => (
          <SkillConstellation
            key={constellation.name}
            {...constellation}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
