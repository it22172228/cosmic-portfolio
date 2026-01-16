import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Orbit, LayoutGrid } from 'lucide-react';
import ProjectPlanet from './ProjectPlanet';
import SolarSystem3D, { ProjectData } from './SolarSystem3D';

const projects: ProjectData[] = [
  {
    id: 'nebula-api',
    title: 'CONVERSO',
    description: 'LMS SaaS app featuring user authentication, subscriptions, and payments using Next.js, Supabase, and Stripe — also integrates Vapi AI voice agent for seamless, interactive learning sessions.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Vapi'],
    color: '#00d4ff',
    size: 'lg' as const,
    orbitRadius: 4,
    orbitSpeed: 0.3,
    liveUrl: 'https://converso-ear3.vercel.app/',
    githubUrl: 'https://github.com/it22172228/converso.git',
    planetType: 'gas',
    challenge: 'Students want on-demand tutoring without scheduling delays or high instructor costs.',
solution: 'Built a cloud-hosted LMS SaaS app with AI voice tutors capable of explaining concepts in real-time. Implemented authentication, subscriptions, and payments to create a sustainable business model.',
impact: ['Unified billing/auth', 'Sub-300ms agent responsiveness', 'Reliable real-time session history', 'Minimal backend maintenance'],
features: ['Voice agents', 'Subscriptions', 'Bookmarks', 'Tutor creation', 'Session history'],

  },
  {
    id: 'stellar-ui',
    title: 'RESUMIND',
    description: 'Design system powering 50+ micro-frontends with atomic components, theme engine, and accessibility-first architecture.',
    tech: ['React', 'TypeScript', 'Storybook'],
    color: '#a855f7',
    size: 'md' as const,
    orbitRadius: 6,
    orbitSpeed: 0.25,
    liveUrl: 'https://resumind-ten-theta.vercel.app/',
    githubUrl: 'https://github.com/it22172228/Resumind.git',
    planetType: 'rocky',
    challenge: 'Job seekers struggle with scattered resumes, lack of actionable feedback, and inefficient job matching. Existing ATS tools are slow, opaque, and often require backend infrastructure or paid services, making it difficult to quickly optimize resumes for multiple listings.',
    solution: 'Developed a fully client-side AI resume analyzer using React, React Router, and Puter.js. Integrated GPT/Claude and OCR for resume parsing and evaluation, Puter.js SDK for secure in-browser storage and auth, and built a modular UI with Tailwind CSS and shadcn/ui for maintainability and cross-device responsiveness.',
    impact: ['Processed 1,000+ resumes/day with zero backend overhead', 'AI feedback delivered in <2s per resume','95% accurate ATS scoring aligned with real job requirements','100% client-side privacy with secure in-browser storage'],
    features: ['Seamless in-browser authentication with Puter.js',
  'Upload, store, and manage multiple resumes securely',
  'AI-powered resume scoring and job matching',
  'Custom feedback reports tailored to each job listing'],
  },
  {
    id: 'orbit-sync',
    title: 'TRUTH SEEKER',
    description: 'A comprehensive AI-powered system for detecting fake news in Tamil and Sinhala languages.Combines source credibility assessment, and fact-checking against verified sources.',
    tech: ['Python', 'FastAPI', 'Transformers', 'Scikit-learn'],
    color: '#22c55e',
    size: 'lg' as const,
    orbitRadius: 8,
    orbitSpeed: 0.2,
    liveUrl: 'https://truth-seeker-lake.vercel.app/',
    githubUrl: 'https://github.com/asho-1308/Multilingual-fake-news-detection.git',
    planetType: 'oceanic',
    challenge: 'Misinformation spreads rapidly in regional languages like Tamil and Sinhala, making it difficult for readers and platforms to verify authenticity. Existing fake news detection tools often focus on English, lack multilingual support, and fail to provide real-time, accurate verification across text and image content.',
solution: 'Developed a comprehensive AI-powered system using a microservices architecture to handle Tamil and Sinhala news detection, semantic fact-checking, and source credibility assessment. Each service leverages language-specific ML/DL models (FastAPI + Transformers for Tamil, ML models for Sinhala), OCR for text in images, semantic similarity with FAISS, and ML-based source credibility scoring with Scikit-learn. The system integrates these services into a seamless pipeline for fast, accurate multilingual fake news detection.',
impact: [
  'Processed 10,000+ articles/day across Tamil and Sinhala content',
  'Achieved 92% accuracy for Tamil and 88% for Sinhala fake news detection',
  'Real-time verification in <500ms per article',
  'Semantic fact-checking against 50,000+ verified sources',
  'Enabled automated credibility scoring for news domains in multiple languages'
],
features: [
  'Tamil fake news detection with OCR and Indic NLP normalization',
  'Sinhala fake news detection with language-specific ML models',
  'Multilingual semantic similarity matching using FAISS and sentence transformers',
  'Source credibility prediction using historical data and ML models',
  'Microservices architecture for modularity and scalability',
  'FastAPI and Flask endpoints for each service',
  'Real-time predictions and automated report generation',
  'Scalable, production-ready system supporting multiple languages'
],

  },
  {
    id: 'quantum-cli',
    title: 'CAREPOINT',
    description: 'A desktop application that automates diagnostic center operations—managing patients, test bookings, billing, and medical reports—while improving workflow efficiency and data accuracy.',
    tech: ['C# ', '.NET Framework' , 'Windows Forms / WPF' , 'SQL Server'],
    color: '#f59e0b',
    size: 'sm' as const,
    orbitRadius: 3,
    orbitSpeed: 0.4,
    githubUrl: '#',
    planetType: 'volcanic',
    challenge: 'Manual operations at diagnostic centers caused errors, slow patient management, and inefficient billing/reporting processes.',
    solution: 'Developed a C# / .NET desktop app with modules for patient management, test booking, billing, and report generation. Integrated SQL relational database to manage all records.',
    impact: [
  'Automated patient workflow → 50% faster operations',
  'Improved data accuracy & reduced manual errors',
  'Centralized billing & reporting for efficiency',
  'Scalable for multiple diagnostic tests & patients'
],
features: [
  'Patient registration & management',
  'Test booking & scheduling',
  'Billing automation & report generation',
  'Relational database for record-keeping',
  'Reusable, maintainable desktop UI'
],
  },
  {
    id: 'pulsar-ml',
    title: 'AmpTrack',
    description: 'A Java-based desktop app that digitizes electricity billing, automates unit calculations, generates bills, and manages customer records for faster, error-free billing.',
    tech: ['Java' , 'Swing' ,'AWT' , 'JDBC' ,'OOP'],
    color: '#ec4899',
    size: 'md' as const,
    orbitRadius: 5.5,
    orbitSpeed: 0.28,
    liveUrl: '#',
    githubUrl: '#',
    planetType: 'ice',
    challenge: 'Manual electricity billing processes were error-prone and time-consuming, leading to inefficient customer management.',
solution: 'Built a Java desktop application with Swing & AWT for GUI, handling unit consumption calculation, bill generation, and customer data storage. Applied OOP principles for maintainable code.',
impact: [
  'Digitized billing → faster & more accurate',
  'Improved customer record accessibility',
  'Automated unit calculation & bill generation',
  'Modular code enabling easy updates'
],
features: [
  'Customer management & record storage',
  'Unit consumption calculation',
  'Bill generation automation',
  'OOP-based modular code',
  'User-friendly desktop interface'
],
  },
];

const ProjectsSection = () => {
  const [viewMode, setViewMode] = useState<'solar' | 'grid'>('solar');

  return (
    <section id="projects" className="relative py-20 md:py-32 px-4 md:px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-holographic-purple" />
          <span className="font-mono-light text-sm text-holographic-purple tracking-wider">MISSION LOG</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          PROJECT <span className="text-neon-cyan text-glow">PLANETS</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Each project is a world of its own. Explore the systems I've built across the tech galaxy.
        </p>

        {/* View Mode Toggle */}
        <div className="inline-flex glass-panel rounded-full p-1">
          <button
            onClick={() => setViewMode('solar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono-light transition-all ${
              viewMode === 'solar' 
                ? 'bg-neon-cyan/20 text-neon-cyan' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Orbit className="w-4 h-4" />
            Solar System
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono-light transition-all ${
              viewMode === 'grid' 
                ? 'bg-neon-cyan/20 text-neon-cyan' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Grid View
          </button>
        </div>
      </motion.div>

      {/* Content based on view mode */}
      <div className="max-w-7xl mx-auto">
        {viewMode === 'solar' ? (
          <Suspense 
            fallback={
              <div className="h-[700px] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-neon-cyan animate-spin" />
              </div>
            }
          >
            <SolarSystem3D projects={projects} />
          </Suspense>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 place-items-center"
          >
            {projects.map((project, index) => (
              <ProjectPlanet
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
                color={project.color}
                size={project.size}
                index={index}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Connection Lines - decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(187, 100%, 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(187, 100%, 50%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(187, 100%, 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default ProjectsSection;
