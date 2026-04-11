
import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ScratchRevealProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  brushSize?: number;
  onComplete?: () => void;
  overlayColor?: string;
  overlayImage?: string;
  className?: string;
}

const ScratchReveal: React.FC<ScratchRevealProps> = ({
  children,
  width = '100%',
  height = '100%',
  brushSize = 30,
  onComplete,
  overlayColor = '#c19a6b',
  overlayImage,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawOverlay = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (overlayImage && imageRef.current && imageRef.current.complete) {
        const img = imageRef.current;
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        ctx.fillStyle = overlayColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 10) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
      }
    };

    const resizeObserver = new ResizeObserver(drawOverlay);
    resizeObserver.observe(container);

    if (overlayImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageRef.current = img;
        drawOverlay();
      };
      img.src = overlayImage;
    } else {
      drawOverlay();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [overlayColor, overlayImage]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    checkCompletion();
  };

  const checkCompletion = () => {
    if (isFinished) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    if (percentage > 50) {
      setIsFinished(true);
      
      // Success effect: Confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c19a6b', '#ffffff', '#a67d51']
      });

      if (onComplete) onComplete();
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ width, height }}
    >
      {/* Content under the scratch layer */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Scratch layer */}
      {!isFinished && (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 cursor-crosshair touch-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <span className="text-white text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.3em] animate-pulse">
              SCRATCH TO REVEAL
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ScratchReveal;
