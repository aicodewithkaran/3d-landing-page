import { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { SequenceCanvas } from './components/SequenceCanvas';
import { EngineeringDeepDive } from './components/EngineeringDeepDive';
import { AudioLab } from './components/AudioLab';
import { SpecsSection } from './components/SpecsSection';
import { FooterCTA } from './components/FooterCTA';
import { PreOrderModal } from './components/PreOrderModal';

export function App() {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[] | null>(null);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-cyan-500 selection:text-black">
      {/* 1. Preloader (loads 240 sequence frames into memory) */}
      {!loadedImages && (
        <Preloader onComplete={(images) => setLoadedImages(images)} frameCount={240} />
      )}

      {/* App Content once preloaded */}
      {loadedImages && (
        <>
          {/* Apple-style Translucent Glassmorphism Header */}
          <Navbar
            onPreOrderClick={() => setIsPreOrderOpen(true)}
            onNavigate={handleNavigate}
          />

          {/* Core Pinned HTML5 Canvas Scrollytelling Section (450vh) */}
          <main id="overview">
            <SequenceCanvas
              images={loadedImages}
              onPreOrderClick={() => setIsPreOrderOpen(true)}
            />
          </main>

          {/* 3D Hardware Engineering Deep Dive */}
          <div id="engineering">
            <EngineeringDeepDive />
          </div>

          {/* Interactive ANC & Spectrum Audio Lab */}
          <div id="acoustics">
            <AudioLab />
          </div>

          {/* Benchmark Matrix & Specifications */}
          <SpecsSection />

          {/* Footer Call To Action & Sustainability */}
          <FooterCTA onPreOrderClick={() => setIsPreOrderOpen(true)} />

          {/* Pre-Order Modal Drawer */}
          <PreOrderModal
            isOpen={isPreOrderOpen}
            onClose={() => setIsPreOrderOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
