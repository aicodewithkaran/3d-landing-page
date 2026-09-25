import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Truck, RotateCcw, Sparkles, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState<'black' | 'silver' | 'blue'>('black');
  const [isOrdered, setIsOrdered] = useState(false);

  const colors = {
    black: { name: 'Matte Black', hex: '#050505', code: 'XM6-BLK' },
    silver: { name: 'Platinum Silver', hex: '#D1D5DB', code: 'XM6-SLV' },
    blue: { name: 'Midnight Blue', hex: '#1E293B', code: 'XM6-BLU' }
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsOrdered(true);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl bg-[#0A0A0C] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white overflow-hidden"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient pointer-events-none opacity-40 blur-2xl" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isOrdered ? (
              <>
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>EXCLUSIVE FLAGSHIP PRE-ORDER</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
                  Sony WH-1000XM6
                </h3>

                <p className="text-xs text-white/60 mb-6 font-mono">
                  MODEL SKU: {colors[selectedColor].code} • IN STOCK & READY TO SHIP
                </p>

                {/* Color Selector */}
                <div className="mb-6">
                  <span className="text-xs font-mono text-white/50 block mb-2">SELECT FINISH:</span>
                  <div className="grid grid-cols-3 gap-3">
                    {(['black', 'silver', 'blue'] as const).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedColor(key)}
                        className={`p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                          selectedColor === key
                            ? 'border-cyan-400 bg-white/10 text-white shadow-md shadow-cyan-500/10'
                            : 'border-white/10 text-white/50 hover:border-white/20'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-white/40" style={{ backgroundColor: colors[key].hex }} />
                        <span className="text-xs font-medium">{colors[key].name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Box Contents Breakdown */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-6 text-xs font-mono">
                  <span className="text-white/40 block mb-2">INCLUDED IN THE BOX:</span>
                  <ul className="grid grid-cols-2 gap-2 text-white/80">
                    <li className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>WH-1000XM6 Headphones</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Collapsible Luxury Case</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>3.5mm OFC Audio Cable</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>USB-C Fast Charge Cable</span>
                    </li>
                  </ul>
                </div>

                {/* Benefits Badges */}
                <div className="grid grid-cols-3 gap-2 mb-6 text-[11px] font-mono text-white/60 border-t border-b border-white/10 py-3">
                  <div className="flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-cyan-400" />
                    <span>Free Express Ship</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>2-Yr Sony Warranty</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RotateCcw className="w-4 h-4 text-cyan-400" />
                    <span>30-Day Returns</span>
                  </div>
                </div>

                {/* Pricing & Checkout Action */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-white/40 block font-mono">TOTAL PRICE</span>
                    <span className="text-3xl font-black text-white">$449.99</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm Pre-Order</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/30">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">Pre-Order Confirmed!</h3>
                <p className="text-sm text-white/70 max-w-md mx-auto mb-6">
                  Thank you for securing your Sony WH-1000XM6 in <span className="text-cyan-400 font-bold">{colors[selectedColor].name}</span>. Your priority order tracking code has been dispatched.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full glass-panel border border-white/20 text-white text-xs font-semibold uppercase tracking-wider hover:border-white/40"
                >
                  Return to Experience
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
