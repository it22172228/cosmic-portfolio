import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const texts = ["SOFTWARE ENGINEER", "FULL STACK ARCHITECT"];
  const [displayedText, setDisplayedText] = useState("");
  const charIndexRef = useRef(0);
  const pauseCounterRef = useRef(0);
  const isTypingRef = useRef(true);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTypingRef.current) {
        if (charIndexRef.current < texts[currentIndexRef.current].length) {
          setDisplayedText(texts[currentIndexRef.current].slice(0, charIndexRef.current + 1));
          charIndexRef.current++;
        } else {
          pauseCounterRef.current++;
          if (pauseCounterRef.current > 10) { // Pause for ~1 second after typing
            isTypingRef.current = false;
            pauseCounterRef.current = 0;
          }
        }
      } else {
        if (charIndexRef.current > 0) {
          charIndexRef.current--;
          setDisplayedText(texts[currentIndexRef.current].slice(0, charIndexRef.current));
        } else {
          // Move to next text
          currentIndexRef.current = (currentIndexRef.current + 1) % texts.length;
          charIndexRef.current = 0;
          isTypingRef.current = true;
        }
      }
    }, 100); // Typing/erasing speed: 100ms per character

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Central Sun Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-neon-cyan/20 via-neon-cyan/5 to-transparent blur-3xl animate-pulse-glow" />
      </div>

      {/* Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full orbital-ring animate-rotate-slow opacity-30" />
        <div className="absolute w-[700px] h-[700px] rounded-full orbital-ring animate-rotate-slow opacity-20" style={{ animationDuration: '80s', animationDirection: 'reverse' }} />
        <div className="absolute w-[900px] h-[900px] rounded-full orbital-ring animate-rotate-slow opacity-10" style={{ animationDuration: '100s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* HUD Label */}
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="font-mono-light text-sm text-neon-cyan tracking-wider">SYSTEM ONLINE</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">CHANITH</span>
            <br />
            <span className="text-glow text-neon-cyan">TRANCHAL</span>
          </h1>

          {/* Subtitle */}
          <p className="font-mono-light text-lg md:text-xl text-muted-foreground mb-4 tracking-wide">
            {displayedText}<span className="animate-blink">|</span>
          </p>

          {/* Bio Text */}
          <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Crafting high-performance systems and elegant interfaces. 
            Specializing in distributed architectures, real-time applications, 
            and developer experience optimization.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { icon: Github, href: 'https://github.com/it22172228', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/chanith-tranchal/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:chanithtranchal@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-panel-hover p-3 rounded-lg group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-neon-cyan transition-colors duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 glass-panel px-8 py-4 rounded-lg font-display text-sm tracking-wider hover:border-neon-cyan/50 hover:shadow-[0_0_30px_hsl(187_100%_50%/0.3)] transition-all duration-500 group"
            >
              <span className="text-foreground group-hover:text-neon-cyan transition-colors">EXPLORE PROJECTS</span>
              <ChevronDown className="w-4 h-4 text-neon-cyan animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-void to-transparent" />
    </section>
  );
};

export default HeroSection;
