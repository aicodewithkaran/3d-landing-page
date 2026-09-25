import React from 'react';
import { ArrowRight, Leaf, Shield, Globe, Award } from 'lucide-react';

interface FooterCTAProps {
  onPreOrderClick: () => void;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ onPreOrderClick }) => {
  return (
    <footer className="bg-[#020202] text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Radial Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-radial-gradient pointer-events-none opacity-30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Big Banner CTA */}
        <div className="glass-panel p-10 md:p-16 rounded-3xl border border-cyan-500/20 text-center relative overflow-hidden bg-gradient-to-b from-blue-950/20 via-black to-black shadow-2xl mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6">
            <Award className="w-3.5 h-3.5" />
            <span>GLOBAL AUDIO PRODUCT OF THE YEAR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Elevate your acoustic world.
          </h2>

          <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light mb-10">
            Join millions of audiophiles, creators, and global travelers who choose Sony WH-1000XM series for supreme silence.
          </p>

          <button
            onClick={onPreOrderClick}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-extrabold text-sm uppercase tracking-widest shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 active:scale-95 inline-flex items-center space-x-3"
          >
            <span>Order Sony WH-1000XM6</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Environmental & Sustainability Badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 font-mono text-xs text-white/60">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start space-x-4">
            <Leaf className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <span className="text-white font-bold block mb-1">Zero Plastic Packaging</span>
              <span>Made with recycled plastic materials derived from automotive parts and eco-conscious paper.</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start space-x-4">
            <Shield className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <span className="text-white font-bold block mb-1">Sony 2-Year Protection</span>
              <span>Includes complete coverage against hardware defects with worldwide service centers.</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start space-x-4">
            <Globe className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
            <div>
              <span className="text-white font-bold block mb-1">Global 24/7 Support</span>
              <span>Dedicated audiophile support team available 24/7 via live chat, email, or telephone.</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs font-mono text-white/40">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="font-bold text-white uppercase tracking-widest text-sm">SONY</span>
            <span>© {new Date().getFullYear()} Sony Electronics Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Contact Sony</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
