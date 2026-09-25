import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Shield, Activity, Waves } from 'lucide-react';

export const AudioLab: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ancEnabled, setAncEnabled] = useState(true);
  const [selectedEnv, setSelectedEnv] = useState<'flight' | 'cafe' | 'street'>('flight');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | undefined>(undefined);

  const envInfo = {
    flight: { title: 'Commercial Jet Flight', db: '94 dB Ambient', cutoff: 'Low-Frequency Jet Engine' },
    cafe: { title: 'Urban Espresso Bar', db: '78 dB Ambient', cutoff: 'Mid-Range Chatter & Cups' },
    street: { title: 'Metropolitan Expressway', db: '88 dB Ambient', cutoff: 'High-Frequency Wind Noise' }
  };

  // Canvas Audio Spectrum Visualizer Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const barCount = 36;

    const renderSpectrum = () => {
      step += 0.05;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / barCount) - 3;

      for (let i = 0; i < barCount; i++) {
        // Compute dual waveforms: Music signal + Ambient noise signal
        const musicWave = isPlaying ? Math.abs(Math.sin(step + i * 0.25) * Math.cos(step * 0.7 + i * 0.15)) * (height * 0.65) + 8 : 4;
        const envNoiseWave = !ancEnabled ? Math.abs(Math.sin(step * 2 + i * 0.4) * 0.3 + 0.2) * (height * 0.4) : 2;

        const totalHeight = Math.min(height * 0.9, musicWave + envNoiseWave);
        const x = i * (barWidth + 3);
        const y = (height - totalHeight) / 2;

        // Color coding: Cyan for ANC Active, Amber red for ANC OFF (Noise interference)
        const gradient = ctx.createLinearGradient(0, y, 0, y + totalHeight);
        if (ancEnabled) {
          gradient.addColorStop(0, '#00D6FF');
          gradient.addColorStop(1, '#0050FF');
        } else {
          gradient.addColorStop(0, '#FF453A');
          gradient.addColorStop(1, '#FF9F0A');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, totalHeight, 3);
        ctx.fill();
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(renderSpectrum);
    };

    animFrameRef.current = requestAnimationFrame(renderSpectrum);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, ancEnabled, selectedEnv]);

  return (
    <section id="anc-lab" className="py-24 bg-[#0A0A0C] text-white relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3">
            <Activity className="w-4 h-4" />
            <span>INTERACTIVE ACOUSTIC LABORATORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Test the V2 Noise Cancelling Engine.
          </h2>
          <p className="text-sm md:text-base text-white/60">
            Simulate ambient noise cancellation live in your browser. Switch between noise environments and toggle XM6 Adaptive ANC.
          </p>
        </div>

        {/* Main Interactive Audio Lab Console */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-black/60">
          
          {/* Top Control Toolbar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            {/* Play/Pause Music Simulation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <div>
                <span className="text-xs font-mono text-cyan-400 block font-semibold">DEMO TRACK</span>
                <span className="text-base font-bold text-white">Ludovico Einaudi - Experience (Hi-Res 24-Bit / 96kHz)</span>
              </div>
            </div>

            {/* ANC Master Toggle Switch */}
            <div className="flex items-center space-x-4 bg-white/5 p-2 rounded-2xl border border-white/10">
              <span className="text-xs font-mono text-white/60 ml-2 font-semibold">ANC MODE:</span>
              <button
                onClick={() => setAncEnabled(!ancEnabled)}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${
                  ancEnabled
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{ancEnabled ? 'XM6 ANC ACTIVE (-42dB)' : 'ANC OFF (RAW NOISE)'}</span>
              </button>
            </div>
          </div>

          {/* Environment Selector Tabs */}
          <div className="my-8">
            <span className="text-xs font-mono text-white/50 block mb-3 uppercase tracking-wider">
              SELECT SIMULATED AMBIENT ENVIRONMENT:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['flight', 'cafe', 'street'] as const).map((env) => (
                <button
                  key={env}
                  onClick={() => setSelectedEnv(env)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedEnv === env
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold">{envInfo[env].title}</span>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      {envInfo[env].db}
                    </span>
                  </div>
                  <span className="text-xs text-white/40 block font-mono">{envInfo[env].cutoff}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Spectrum Canvas Box */}
          <div className="relative bg-black/80 rounded-2xl border border-white/10 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-white/50">
              <span className="flex items-center space-x-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>LIVE SPECTRUM MONITOR [20Hz - 20kHz]</span>
              </span>
              <span className={ancEnabled ? 'text-cyan-400' : 'text-amber-400 font-bold'}>
                {ancEnabled ? 'ISOLATION STABLE • 0.2ms LATENCY' : 'WARNING: HIGH AMBIENT DISTORTION'}
              </span>
            </div>

            <canvas
              ref={canvasRef}
              className="w-full h-32 md:h-40 block"
            />
          </div>

          {/* Technical Specs Footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-center font-mono text-xs">
            <div>
              <span className="text-white/40 block">SAMPLING RATE</span>
              <span className="text-white font-bold">40,000 Hz</span>
            </div>
            <div>
              <span className="text-white/40 block">NOISE ATTENUATION</span>
              <span className="text-cyan-400 font-bold">-42 dB Peak</span>
            </div>
            <div>
              <span className="text-white/40 block">SPEECH ISOLATION</span>
              <span className="text-white font-bold">AI Beamforming x4</span>
            </div>
            <div>
              <span className="text-white/40 block">ATMOSPHERIC OPTIMIZER</span>
              <span className="text-cyan-400 font-bold">Barometric Auto-Adjust</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
