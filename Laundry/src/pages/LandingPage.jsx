import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemTransition from '../components/ProblemTransition';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import PhotoFeature from '../components/PhotoFeature';
import Verification from '../components/Verification';
import Notifications from '../components/Notifications';
import SecurityAccess from '../components/SecurityAccess';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen text-slate-800 font-sans antialiased selection:bg-amber-100 selection:text-amber-900"
      style={{
        backgroundColor: '#fdfbf7',
        backgroundImage: `
          radial-gradient(#d6c7b2 0.75px, transparent 0.75px), 
          linear-gradient(135deg, rgba(214,199,178,0.15) 25%, transparent 25%), 
          linear-gradient(225deg, rgba(214,199,178,0.15) 25%, transparent 25%)
        `,
        backgroundSize: '12px 12px, 6px 6px, 6px 6px',
        backgroundPosition: '0 0, 0 0, 3px 3px'
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <ProblemTransition />
        <HowItWorks />
        <Features />
        <PhotoFeature />
        <Verification />
        <Notifications />
        <SecurityAccess />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}