'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import { portfolioConfig } from '@/config/portfolio.config';

// Lazy load chat widget to keep initial bundle small
const ChatWidget = dynamic(() => import('@/components/ui/ChatWidget'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero — full viewport */}
        <Hero />

        {/* About */}
        <div className="relative">
          <div className="absolute inset-0 mesh-bg pointer-events-none" />
          <About />
        </div>

        {/* Divider */}
        <SectionDivider />

        {/* Skills */}
        <Skills />

        {/* Divider */}
        <SectionDivider reverse />

        {/* Projects */}
        <Projects />

        {/* Divider */}
        <SectionDivider />

        {/* Experience */}
        <Experience />

        {/* Divider */}
        <SectionDivider reverse />

        {/* Contact */}
        <Contact />
      </main>

      <Footer />

      {/* Floating AI chat */}
      {portfolioConfig.aiChat.enabled && <ChatWidget />}
    </>
  );
}

function SectionDivider({ reverse }: { reverse?: boolean }) {
  return (
    <div className="relative h-px mx-auto max-w-6xl px-6 overflow-visible">
      <div
        className="absolute inset-0 mx-6"
        style={{
          background: `linear-gradient(to ${reverse ? 'left' : 'right'}, transparent, rgba(59,130,246,0.2), transparent)`,
        }}
      />
    </div>
  );
}
