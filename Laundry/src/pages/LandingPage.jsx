import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
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
    <div className="min-h-screen bg-background font-sans text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
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
