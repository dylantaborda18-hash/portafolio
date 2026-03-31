import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

export const BeforeAfter = ({ before, after, label }: { before: string, after: string, label: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden rounded-urban cursor-ew-resize group shadow-2xl border-4 border-white"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* After Image */}
        <img 
          src={after} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img 
            src={before} 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-brand-accent pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-accent rounded-sm flex items-center justify-center border border-white/20">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-white/40 rounded-full" />
              <div className="w-0.5 h-3 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 sticker bg-brand-ink text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
          Antes
        </div>
        <div className="absolute top-4 right-4 sticker opacity-0 group-hover:opacity-100 transition-opacity z-20">
          Después
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sticker bg-brand-ink/80 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 scale-75">
          Desliza
        </div>
      </div>
      <p className="text-center display text-brand-ink/60">{label}</p>
    </div>
  );
};

export const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16 space-y-2">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-6xl md:text-8xl display leading-none"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="sticker text-sm"
      >
        {subtitle}
      </motion.div>
    )}
  </div>
);
