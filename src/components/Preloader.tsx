import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: (images: HTMLImageElement[]) => void;
  frameCount?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, frameCount = 240 }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const loadNextBatch = (startIndex: number, batchSize: number) => {
      const endIndex = Math.min(startIndex + batchSize, frameCount);
      for (let i = startIndex; i < endIndex; i++) {
        const img = new Image();
        const frameNum = String(i + 1).padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${frameNum}.jpg`;

        img.onload = () => {
          loadedCount++;
          const percent = Math.floor((loadedCount / frameCount) * 100);
          setProgress(percent);

          if (loadedCount === frameCount) {
            setTimeout(() => {
              setIsFinished(true);
              setTimeout(() => onComplete(images), 600);
            }, 300);
          }
        };

        img.onerror = () => {
          // Fallback if image load fails
          loadedCount++;
          const percent = Math.floor((loadedCount / frameCount) * 100);
          setProgress(percent);
          if (loadedCount === frameCount) {
            setIsFinished(true);
            onComplete(images);
          }
        };

        images[i] = img;
      }

      if (endIndex < frameCount) {
        setTimeout(() => loadNextBatch(endIndex, batchSize), 10);
      }
    };

    // Load in batches of 30 for high parallel speed
    loadNextBatch(0, 30);
  }, [frameCount, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white px-6"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-60" />

          {/* Center Brand & Audio Wave */}
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
            {/* Audio Wave Visualizer Animation */}
            <div className="flex items-center justify-center space-x-1.5 mb-8 h-10">
              {[0.4, 0.8, 0.3, 1, 0.6, 0.9, 0.5, 0.7].map((heightScale, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scaleY: [heightScale, 1.2, heightScale * 0.5, heightScale],
                    opacity: [0.6, 1, 0.7, 0.6],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: idx * 0.1,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full h-8 origin-center"
                />
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
              SONY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">WH-1000XM6</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-8 font-medium">
              Loading Scrollytelling Experience
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-4 p-0.5 border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 rounded-full shadow-[0_0_12px_rgba(0,214,255,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            <div className="flex justify-between w-full text-xs text-white/60 font-mono">
              <span>INITIALIZING 8K DIAGRAMS</span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
