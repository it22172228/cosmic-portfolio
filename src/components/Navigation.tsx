import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'HOME', href: '#' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-panel border-b border-neon-cyan/10' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-bold text-foreground hover:text-neon-cyan transition-colors">
          <span className="text-neon-cyan">&lt;</span>
          CT
          <span className="text-neon-cyan">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono-light text-sm text-muted-foreground hover:text-neon-cyan transition-colors tracking-wider relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neon-cyan/30 text-neon-cyan font-mono-light text-sm hover:bg-neon-cyan/10 hover:border-neon-cyan/50 transition-all duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          CONNECT
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-panel border-t border-neon-cyan/10 px-6 py-8"
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-mono-light text-lg text-foreground hover:text-neon-cyan transition-colors tracking-wider"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-neon-cyan/30 text-neon-cyan font-mono-light text-sm hover:bg-neon-cyan/10 transition-all duration-300 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              CONNECT
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navigation;
