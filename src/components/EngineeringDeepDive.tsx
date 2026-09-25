import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Disc, Mic2, Feather, ArrowUpRight, Zap, Sparkles } from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  specs: { label: string; value: string }[];
  highlightColor: string;
  gradient: string;
}

export const EngineeringDeepDive: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const pillars: ComponentDetail[] = [
    {
      id: 'processor',
      name: 'Dual HD Processor V2',
      tagline: '40,000 Real-Time Calculations / Sec',
      description: 'Combines Sony’s proprietary HD Noise Cancelling Processor V2 with an Integrated Processor V2 to control 8 microphones simultaneously, eliminating ambient frequencies faster than ever.',
      icon: Cpu,
      specs: [
        { label: 'CALCULATION SPEED', value: '40k cycles/sec' },
        { label: 'DAC ACCURACY', value: '32-Bit Precision' },
        { label: 'POWER EFFICIENCY', value: '+35% Optimized' }
      ],
      highlightColor: 'text-cyan-400',
      gradient: 'from-blue-600/20 via-cyan-500/10 to-transparent'
    },
    {
      id: 'driver',
      name: '30mm Carbon-Fiber Dome',
      tagline: 'Rigid Composite Dome & Soft Edge',
      description: 'Specially constructed with a lightweight, high-rigidity carbon fiber composite dome and a soft polyurethane edge to dramatically enhance high-frequency sensitivity and low-end transient response.',
      icon: Disc,
      specs: [
        { label: 'DIAPHRAGM DOME', value: 'Carbon Fiber' },
        { label: 'FREQUENCY RANGE', value: '4Hz - 40,000Hz' },
        { label: 'IMPEDANCE', value: '48 ohms' }
      ],
      highlightColor: 'text-blue-400',
      gradient: 'from-cyan-600/20 via-blue-500/10 to-transparent'
    },
    {
      id: 'mics',
      name: '8-Microphone Beamforming Array',
      tagline: 'Multi-Directional Noise Capture',
      description: 'Four precision microphones on each ear cup capture ambient sound accurately. Advanced wind-noise reduction structure isolates voice calls crystal-clear even in stormy weather.',
      icon: Mic2,
      specs: [
        { label: 'MICROPHONE COUNT', value: '8 Mics Total' },
        { label: 'BEAMFORMING MICS', value: '4 AI-Assisted' },
        { label: 'WIND ATTENUATION', value: '-18dB Reduction' }
      ],
      highlightColor: 'text-purple-400',
      gradient: 'from-purple-600/20 via-blue-500/10 to-transparent'
    },
    {
      id: 'ergonomics',
      name: 'Ultra-Soft Fit Leather',
      tagline: 'Zero-Pressure Ergonomic Seal',
      description: 'Newly developed synthetic leather fits snugly around the ears while applying minimal pressure. Stepless slider and seamless swivel joints provide silent, frictionless adjustment.',
      icon: Feather,
      specs: [
        { label: 'EARPAD MATERIAL', value: 'Synthetic Soft Fit' },
        { label: 'HEADBAND JOINT', value: 'Silent Stepless' },
        { label: 'TOTAL WEIGHT', value: '245 Grams' }
      ],
      highlightColor: 'text-emerald-400',
      gradient: 'from-emerald-600/20 via-teal-500/10 to-transparent'
    }
  ];

  const activeComponent = pillars.find(p => p.id === selectedPillar);

  return (
    <section id="engineering" className="py-24 bg-gradient-to-b from-[#050505] via-[#08080C] to-[#0A0A0C] text-white relative overflow-hidden">
      {/* Background Radial Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-radial-gradient pointer-events-none opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3">
              <Zap className="w-4 h-4" />
              <span>CRAFTSMANSHIP & INNOVATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Mastery in every micro-component.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md mt-4 md:mt-0 font-normal">
            Click any engineering pillar below to inspect raw technical specifications and internal schematics.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`glass-panel p-6 rounded-3xl border transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden ${
                  selectedPillar === pillar.id
                    ? 'border-cyan-400 bg-white/10 shadow-xl shadow-cyan-500/10'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {/* Subtle Gradient Backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-b ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${pillar.highlightColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-cyan-200 transition-colors">
                  {pillar.name}
                </h3>
                
                <p className="text-xs font-mono text-cyan-400/90 mb-4 relative z-10 font-semibold">
                  {pillar.tagline}
                </p>

                <p className="text-xs text-white/60 leading-relaxed line-clamp-3 relative z-10">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Modal / Expanded Component Inspector */}
        <AnimatePresence>
          {activeComponent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-12 glass-panel p-8 md:p-10 rounded-3xl border border-cyan-500/30 relative overflow-hidden bg-black/80 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-6 right-6 text-xs font-mono text-white/50 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-all"
              >
                CLOSE [ESC]
              </button>

              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-2/3">
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>TECHNICAL SCHEMATIC DEEP DIVE</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                    {activeComponent.name}
                  </h3>

                  <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6">
                    {activeComponent.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6 font-mono text-xs">
                    {activeComponent.specs.map((spec, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="text-white/40 block mb-1">{spec.label}</span>
                        <span className="text-cyan-300 font-bold text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Blueprint Graphic */}
                <div className="lg:w-1/3 w-full glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-950/40 to-transparent">
                  <activeComponent.icon className={`w-16 h-16 ${activeComponent.highlightColor} mb-4 animate-pulse-glow`} />
                  <span className="text-xs font-mono text-white/50 mb-2">SCHEMATIC ID: XM6-ENG-{activeComponent.id.toUpperCase()}</span>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2">
                    <div className="w-3/4 h-full bg-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">CERTIFIED STUDIO GRADE COMPONENT</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
