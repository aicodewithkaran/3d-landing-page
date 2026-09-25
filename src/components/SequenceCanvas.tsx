import React, { useRef, useEffect, useState, useCallback } from 'react';
import { StoryOverlays } from './StoryOverlays';

interface SequenceCanvasProps {
  images: HTMLImageElement[];
  onPreOrderClick: () => void;
}

export const SequenceCanvas: React.FC<SequenceCanvasProps> = ({ images, onPreOrderClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const requestRef = useRef<number | undefined>(undefined);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(images.length - 1, Math.round(frameIndex)));
    const img = images[clampedIndex];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep luxury dark background #050505
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // Ambient radial lighting aura behind product
    const ambientGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      40,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.55
    );
    ambientGradient.addColorStop(0, 'rgba(0, 80, 255, 0.15)');
    ambientGradient.addColorStop(0.4, 'rgba(0, 214, 255, 0.05)');
    ambientGradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
    ctx.fillStyle = ambientGradient;
    ctx.fillRect(0, 0, width, height);

    // Compute optimal aspect-contain scale metrics so product fills viewport prominently
    const imgAspect = img.width / img.height;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;

    const scaleFactor = width < 768 ? 1.05 : 0.98;

    if (canvasAspect > imgAspect) {
      drawHeight = height * scaleFactor;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = width * scaleFactor;
      drawHeight = drawWidth / imgAspect;
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    ctx.restore();
  }, [images]);

  // Buttery-smooth lerp loop
  useEffect(() => {
    const updateLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.70; // 1:1 instantaneous scroll tracking
        renderFrame(currentFrameRef.current);
      } else if (currentFrameRef.current !== targetFrameRef.current) {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame(currentFrameRef.current);
      }
      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [renderFrame]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);

      if (images && images.length > 0) {
        targetFrameRef.current = progress * (images.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [images]);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      {/* Sticky Viewport Frame - Stays pinned at top: 0 while scrolling through 400vh container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505] z-10">
        {/* Fullscreen Interactive Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Dynamic Story Beats & Interactive HUD */}
        <StoryOverlays scrollProgress={scrollProgress} onPreOrderClick={onPreOrderClick} />
      </div>
    </div>
  );
};
