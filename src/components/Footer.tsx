import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="font-display text-xl font-bold text-foreground">
            <span className="text-neon-cyan">&lt;</span>
            CT
            <span className="text-neon-cyan">/&gt;</span>
          </div>

          {/* Copyright */}
          <p className="font-mono-light text-sm text-muted-foreground text-center">
            © 2026 Chanith Tranchal. Built with React, TypeScript & cosmic ambition.
          </p>

          {/* Coordinates */}
          <div className="font-mono-light text-xs text-muted-foreground/50 tracking-wider">
            6°51'57.1"N 79°51'56.8"E
          </div>
        </motion.div>

        {/* Decorative line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
