import { motion } from 'framer-motion';
import { Send, Terminal, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here
    console.log('Form submitted:', formState);
  };

  return (
    <section className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-neon-cyan/10 via-transparent to-transparent blur-2xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-holographic-blue" />
            <span className="font-mono-light text-sm text-holographic-blue tracking-wider">TRANSMISSION</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            OPEN <span className="text-neon-cyan text-glow">CHANNEL</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to collaborate on your next mission? Send a transmission and let's build something extraordinary.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Status */}
            <div className="glass-panel p-6 rounded-xl hud-border">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-5 h-5 text-neon-cyan" />
                <span className="font-display text-sm tracking-wider text-foreground">SYSTEM STATUS</span>
              </div>
              <div className="space-y-3 font-mono-light text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-muted-foreground">Available for new projects</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  <span>San Francisco, CA (Remote OK)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-neon-cyan" />
                  <span>Response time: ~24h</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-panel p-6 rounded-xl">
              <h4 className="font-display text-sm tracking-wider text-foreground mb-4">DIRECT LINKS</h4>
              <div className="space-y-3">
                {[
                  { label: 'chanithtranchal@gmail.com', href: 'mailto:chanithtranchal@gmail.com' },
                  { label: 'github.com/chanithtranchal', href: 'https://github.com/it22172228' },
                  { label: 'linkedin.com/in/chanithtranchal', href: 'https://www.linkedin.com/in/chanith-tranchal/' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block font-mono-light text-sm text-neon-cyan hover:text-glow transition-all duration-300"
                  >
                    → {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-xl hud-border space-y-6">
              <div>
                <label className="block font-mono-light text-xs text-muted-foreground mb-2 tracking-wider">
                  IDENTIFIER
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-cosmic-deep/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all font-mono-light"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-mono-light text-xs text-muted-foreground mb-2 tracking-wider">
                  FREQUENCY
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-cosmic-deep/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all font-mono-light"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-mono-light text-xs text-muted-foreground mb-2 tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full bg-cosmic-deep/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all resize-none font-mono-light"
                  placeholder="Your transmission..."
                />
              </div>

              <button
                type="submit"
                className="w-full glass-panel py-4 rounded-lg font-display text-sm tracking-wider text-foreground hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-[0_0_30px_hsl(187_100%_50%/0.3)] transition-all duration-500 flex items-center justify-center gap-2 group"
              >
                <span>TRANSMIT</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
