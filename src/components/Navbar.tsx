import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onPreOrderClick: () => void;
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPreOrderClick, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', id: 'overview' },
    { label: 'Engineering', id: 'engineering' },
    { label: 'Noise Cancelling', id: 'anc-lab' },
    { label: 'Acoustics', id: 'acoustics' },
    { label: 'Specs', id: 'specs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav py-3'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand logo & Model */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onNavigate('overview')}>
          <span className="font-extrabold tracking-widest text-lg md:text-xl text-white uppercase group-hover:text-cyan-400 transition-colors">
            SONY
          </span>
          <span className="h-4 w-[1px] bg-white/20" />
          <span className="text-xs md:text-sm font-medium tracking-tight text-white/80 group-hover:text-white transition-colors">
            WH-1000XM6
          </span>
        </div>

        {/* Center: Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-wide uppercase">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-white/70 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: CTA Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onPreOrderClick}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-r from-blue-600 to-cyan-400 group-hover:from-blue-600 group-hover:to-cyan-400 hover:text-white text-white shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95"
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-black/80 rounded-full group-hover:bg-opacity-0 flex items-center space-x-1.5">
              <span>Experience XM6</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-1 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-white/80 hover:text-cyan-400 py-2 transition-colors border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
