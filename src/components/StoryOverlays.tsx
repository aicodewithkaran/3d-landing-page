import React, { useState } from 'react';
import { ShieldCheck, Cpu, Mic, Radio, Sparkles, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

interface StoryOverlaysProps {
  scrollProgress: number;
  onPreOrderClick: () => void;
}

export const StoryOverlays: React.FC<StoryOverlaysProps> = ({ scrollProgress, onPreOrderClick }) => {
  const [activeNcMode, setActiveNcMode] = useState<'flight' | 'street' | 'office'>('flight');

  // Seamless continuous crossfade curve (0.0 to 1.0)
  const getBeatVisibility = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (scrollProgress <= start || scrollProgress >= end) {
      return { opacity: 0, pointerEvents: 'none' as const, scale: 0.96, translateY: 15 };
    }
    if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
      return { opacity: 1, pointerEvents: 'auto' as const, scale: 1, translateY: 0 };
    }
    if (scrollProgress < peakStart) {
      const p = (scrollProgress - start) / (peakStart - start);
      return { opacity: p, pointerEvents: 'auto' as const, scale: 0.96 + p * 0.04, translateY: (1 - p) * 15 };
    } else {
      const p = (end - scrollProgress) / (end - peakEnd);
      return { opacity: p, pointerEvents: 'none' as const, scale: 1 - (1 - p) * 0.04, translateY: (1 - p) * -15 };
    }
  };

  // Overlapping 100% continuous timelines
  const beat1 = getBeatVisibility(0.00, 0.00, 0.16, 0.24);
  const beat2 = getBeatVisibility(0.16, 0.24, 0.38, 0.44);
  const beat3 = getBeatVisibility(0.38, 0.44, 0.62, 0.68);
  const beat4 = getBeatVisibility(0.62, 0.68, 0.80, 0.86);
  const beat5 = getBeatVisibility(0.80, 0.86, 1.00, 1.00);

  const ncModes = {
    flight: { label: 'Airplane Cabin', db: '-42 dB', desc: 'Attenuates low-frequency turbine rumble' },
    street: { label: 'City Traffic', db: '-38 dB', desc: 'Filters horn blasts & ambient wind turbulences' },
    office: { label: 'Open Workspace', db: '-35 dB', desc: 'Isolates keyboard clatter and human chatter' }
  };

  const chapters = [
    { title: 'INTRO', range: [0, 0.20] },
    { title: 'ARCHITECTURE', range: [0.20, 0.42] },
    { title: 'NOISE CANCELING', range: [0.42, 0.65] },
    { title: 'ACOUSTICS', range: [0.65, 0.84] },
    { title: 'REASSEMBLY', range: [0.84, 1.0] }
  ];

  const currentChapterIndex = chapters.findIndex(c => scrollProgress >= c.range[0] && scrollProgress <= c.range[1]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
      
      {/* Top Spacer for Navbar offset */}
      <div className="h-16" />

      {/* Center Narrative Overlays Layer */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        
        {/* ========================================================================= */}
        {/* BEAT 1: HERO / INTRO */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 flex flex-col items-center text-center transition-all duration-300 ease-out transform"
          style={{
            opacity: beat1.opacity,
            pointerEvents: beat1.pointerEvents,
            transform: `scale(${beat1.scale}) translateY(${beat1.translateY}px)`
          }}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FLAGSHIP NEXT-GEN AUDIO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-4 leading-none">
            Sony <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">WH-1000XM6</span>
          </h1>

          <p className="text-xl md:text-3xl font-light text-white/90 mb-4 tracking-tight">
            Silence, perfected.
          </p>

          <p className="max-w-lg text-sm md:text-base text-white/60 font-normal leading-relaxed mb-8">
            Flagship wireless noise cancelling, re-engineered from the inside out for a world that never stops.
          </p>

          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400/90 animate-bounce">
            <span>Scroll to explode engineering</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BEAT 2: ENGINEERING REVEAL */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 flex flex-col md:flex-row items-center justify-between transition-all duration-300 ease-out transform"
          style={{
            opacity: beat2.opacity,
            pointerEvents: beat2.pointerEvents,
            transform: `scale(${beat2.scale}) translateY(${beat2.translateY}px)`
          }}
        >
          <div className="max-w-xl text-left glass-panel p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl bg-black/70 backdrop-blur-xl">
            <div className="text-xs font-mono font-semibold tracking-widest text-blue-400 uppercase mb-3 flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>01 / STRUCTURAL ARCHITECTURE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Precision-engineered for silence.
            </h2>

            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">
              Custom 30mm carbon-fiber dome drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity across every frequency.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs font-mono">
              <div>
                <span className="text-white/40 block">DRIVER MATERIAL</span>
                <span className="text-white font-semibold text-sm">Carbon-Fiber Composite</span>
              </div>
              <div>
                <span className="text-white/40 block">ACOUSTIC CHAMBERS</span>
                <span className="text-white font-semibold text-sm">Dual Resonance Control</span>
              </div>
            </div>
          </div>

          {/* Floating Engineering Badges */}
          <div className="hidden lg:flex flex-col space-y-3 text-xs font-mono">
            <div className="glass-panel px-4 py-3 rounded-2xl border border-cyan-500/30 text-white flex items-center space-x-3 bg-black/70 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>30mm Carbon Fiber Diaphragm Dome</span>
            </div>
            <div className="glass-panel px-4 py-3 rounded-2xl border border-blue-500/30 text-white flex items-center space-x-3 bg-black/70 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Dual HD Processor V2 Architecture</span>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BEAT 3: NOISE CANCELLING & MICS */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 flex flex-col items-end text-right transition-all duration-300 ease-out transform"
          style={{
            opacity: beat3.opacity,
            pointerEvents: beat3.pointerEvents,
            transform: `scale(${beat3.scale}) translateY(${beat3.translateY}px)`
          }}
        >
          <div className="max-w-xl text-left glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl bg-black/70 backdrop-blur-xl">
            <div className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>02 / INTELLIGENT NOISE CANCELLING</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Adaptive noise cancelling, redefined.
            </h2>

            <ul className="space-y-3 text-xs md:text-sm text-white/70 mb-6">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Multi-microphone 8-sensor array listens in every direction.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Real-time AI noise analysis adjusts 40,000 times per second.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Your music stays pure—planes, trains, and crowds fade away completely.</span>
              </li>
            </ul>

            {/* Interactive Environment Mode Toggle */}
            <div className="border-t border-white/10 pt-4">
              <span className="text-xs font-mono text-white/50 block mb-2">SIMULATE ACTIVE CANCELLATION MODE:</span>
              <div className="grid grid-cols-3 gap-2">
                {(['flight', 'street', 'office'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveNcMode(mode)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                      activeNcMode === mode
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <p className="text-xs text-cyan-400/90 font-mono mt-3 flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
                <span>{ncModes[activeNcMode].label}: {ncModes[activeNcMode].desc}</span>
                <span className="font-bold text-white bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0 ml-2">
                  {ncModes[activeNcMode].db}
                </span>
              </p>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BEAT 4: SOUND & UPSCALING */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 flex flex-col items-start text-left transition-all duration-300 ease-out transform"
          style={{
            opacity: beat4.opacity,
            pointerEvents: beat4.pointerEvents,
            transform: `scale(${beat4.scale}) translateY(${beat4.translateY}px)`
          }}
        >
          <div className="max-w-xl glass-panel p-6 md:p-8 rounded-3xl border border-blue-500/30 shadow-2xl bg-black/70 backdrop-blur-xl">
            <div className="text-xs font-mono font-semibold tracking-widest text-blue-400 uppercase mb-3 flex items-center space-x-2">
              <Radio className="w-4 h-4" />
              <span>03 / AUDIOPHILE CLARITY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Immersive, lifelike sound.
            </h2>

            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">
              High-performance drivers unlock detail, depth, and texture in every track. AI-enhanced DSEE Ultimate™ upscaling restores clarity to compressed audio streams in real time.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-blue-950/80 border border-blue-500/30 text-blue-300 font-semibold">
                Hi-Res Audio Wireless
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold">
                LDAC Codec 990kbps
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/10 border border-white/20 text-white font-semibold">
                360 Reality Audio
              </span>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BEAT 5: REASSEMBLY & FINAL HERO CTA */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 flex flex-col items-center text-center transition-all duration-300 ease-out transform"
          style={{
            opacity: beat5.opacity,
            pointerEvents: beat5.pointerEvents,
            transform: `scale(${beat5.scale}) translateY(${beat5.translateY}px)`
          }}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-lg shadow-cyan-500/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OFFICIAL FLAGSHIP RELEASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-4 leading-tight">
            Hear everything.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-300 to-white">
              Feel nothing else.
            </span>
          </h2>

          <p className="text-base md:text-xl text-white/80 font-light mb-8 max-w-lg">
            WH-1000XM6. Designed for absolute focus, crafted for all-day luxury comfort.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pointer-events-auto">
            <button
              onClick={onPreOrderClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Experience WH-1000XM6</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#engineering"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-white/20 text-white hover:border-white/40 font-semibold text-sm uppercase tracking-wider transition-all duration-300 text-center"
            >
              Explore Engineering
            </a>
          </div>

          <p className="text-xs text-white/40 font-mono mt-6">
            Engineered for airports, offices, and everything in between.
          </p>
        </div>

      </div>

      {/* Bottom Sticky HUD Bar (Chapter Indicator & Progress) */}
      <div className="w-full flex items-center justify-between glass-panel px-6 py-3 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl font-mono text-xs pointer-events-auto mt-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white/40">CHAPTER:</span>
          <span className="text-cyan-300 font-bold tracking-wider">
            {chapters[currentChapterIndex >= 0 ? currentChapterIndex : 0]?.title}
          </span>
        </div>

        {/* Step Dots */}
        <div className="flex items-center space-x-2">
          {chapters.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentChapterIndex === idx
                  ? 'w-6 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm shadow-cyan-400/50'
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        <div className="text-white/50">
          <span>SEQUENCE: </span>
          <span className="text-cyan-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

    </div>
  );
};
