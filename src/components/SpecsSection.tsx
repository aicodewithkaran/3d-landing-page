import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'comparison'>('comparison');
  const [selectedColor, setSelectedColor] = useState<'black' | 'silver' | 'blue'>('black');

  const colorVariants = {
    black: { name: 'Matte Black', hex: '#0D0D0F', border: 'border-white/40' },
    silver: { name: 'Platinum Silver', hex: '#D1D5DB', border: 'border-gray-300' },
    blue: { name: 'Midnight Blue', hex: '#1E293B', border: 'border-blue-500' }
  };

  const comparisonData = [
    { feature: 'Noise Cancelling Processor', xm6: 'HD Processor V2 + Integrated V2', xm5: 'Integrated V1', xm4: 'HD QN1' },
    { feature: 'Microphone Array', xm6: '8 Mics (4 Beamforming)', xm5: '8 Mics', xm4: '4 Mics' },
    { feature: 'Driver Diaphragm', xm6: '30mm Carbon Fiber Composite', xm5: '30mm Synthetic Soft Dome', xm4: '40mm Mylar' },
    { feature: 'Battery Life (ANC ON)', xm6: '40 Hours (3 min charge = 5 hrs)', xm5: '30 Hours', xm4: '30 Hours' },
    { feature: 'Fast Charging Protocol', xm6: 'USB-PD Super Fast Charge', xm5: 'USB-PD Standard', xm4: 'Standard 10W' },
    { feature: 'AI Audio Upscaling', xm6: 'DSEE Ultimate™ AI Engine', xm5: 'DSEE Extreme™', xm4: 'DSEE Extreme™' },
    { feature: 'Bluetooth & Multipoint', xm6: 'Bluetooth 5.4 (3-Device Sync)', xm5: 'BT 5.2 (2-Device Sync)', xm4: 'BT 5.0 (2-Device Sync)' },
    { feature: 'Weight & Cushioning', xm6: '245g (Ultra-Soft Synthetic Leather)', xm5: '250g (Soft Fit Leather)', xm4: '254g (Standard Synthetic)' }
  ];

  const fullSpecs = [
    {
      category: 'Audio & Acoustics',
      items: [
        { name: 'Driver Unit', value: '30mm (Dome type, Carbon-Fiber Composite)' },
        { name: 'Frequency Response', value: '4 Hz - 40,000 Hz (JEITA)' },
        { name: 'Active Frequency (BT)', value: '20 Hz - 40,000 Hz (LDAC 990 kbps)' },
        { name: 'Hi-Res Certification', value: 'Hi-Res Audio Wireless Certified' }
      ]
    },
    {
      category: 'Noise Cancellation',
      items: [
        { name: 'NC Engine', value: 'Dual HD Processor V2 Architecture' },
        { name: 'Microphone Array', value: '8 High-Sensitivity Noise Sensor Mics' },
        { name: 'Adaptive Optimization', value: 'Auto NC Optimizer with Barometric Sensor' },
        { name: 'Ambient Sound Mode', value: '20-Level Adjustable + Voice Pass-Through' }
      ]
    },
    {
      category: 'Battery & Power',
      items: [
        { name: 'Play Time (ANC ON)', value: 'Max 40 Hours Continuous' },
        { name: 'Play Time (ANC OFF)', value: 'Max 50 Hours Continuous' },
        { name: 'Fast Charge Speed', value: '3 minutes charge = 5 hours playback' },
        { name: 'Charging Interface', value: 'USB Type-C® (USB-PD Compatible)' }
      ]
    }
  ];

  return (
    <section id="specs" className="py-24 bg-[#050505] text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3">
              <Sliders className="w-4 h-4" />
              <span>TECHNICAL SPECIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Every detail, benchmarked.
            </h2>
          </div>

          {/* Toggle Tab Switcher */}
          <div className="flex items-center space-x-2 bg-white/5 p-1.5 rounded-full border border-white/10 mt-6 md:mt-0">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'comparison'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-md shadow-cyan-500/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Model Comparison
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'specs'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-md shadow-cyan-500/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Full Spec Sheet
            </button>
          </div>
        </div>

        {/* Color Finish Selector Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-white/60 uppercase">FINISH PREVIEW:</span>
          <div className="flex items-center space-x-4">
            {(['black', 'silver', 'blue'] as const).map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => setSelectedColor(colorKey)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${
                  selectedColor === colorKey
                    ? 'border-cyan-400 bg-white/10 text-white'
                    : 'border-white/10 text-white/50 hover:text-white'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: colorVariants[colorKey].hex }} />
                <span className="text-xs font-medium">{colorVariants[colorKey].name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT: Model Comparison Table */}
        {activeTab === 'comparison' && (
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 font-mono text-xs text-white/60">
                    <th className="p-6">FEATURE / BENCHMARK</th>
                    <th className="p-6 text-cyan-300 bg-cyan-950/40 border-x border-cyan-500/20 font-bold">
                      WH-1000XM6 <span className="ml-2 text-[10px] bg-cyan-400 text-black font-extrabold px-1.5 py-0.5 rounded">FLAGSHIP</span>
                    </th>
                    <th className="p-6">WH-1000XM5</th>
                    <th className="p-6">WH-1000XM4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 font-semibold text-white/90">{row.feature}</td>
                      <td className="p-6 font-bold text-cyan-200 bg-cyan-950/20 border-x border-cyan-500/10">
                        {row.xm6}
                      </td>
                      <td className="p-6 text-white/60">{row.xm5}</td>
                      <td className="p-6 text-white/40">{row.xm4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTENT: Full Technical Specs Grid */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fullSpecs.map((cat, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold text-cyan-400 mb-6 font-mono border-b border-white/10 pb-3">
                  {cat.category}
                </h3>
                <div className="space-y-4 font-mono text-xs">
                  {cat.items.map((item, j) => (
                    <div key={j} className="border-b border-white/5 pb-2">
                      <span className="text-white/40 block mb-1">{item.name}</span>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
