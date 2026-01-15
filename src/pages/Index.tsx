import SpaceBackground from '@/components/SpaceBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <Navigation />
      
      <main>
        <HeroSection />
        <ProjectsSection />
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
