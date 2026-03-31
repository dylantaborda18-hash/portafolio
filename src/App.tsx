import React, { useState, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';

export default function App() {
  const [useCustomCursor, setUseCustomCursor] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const update = () => setUseCustomCursor(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!useCustomCursor) {
      setVisible(false);
      return;
    }

    let rafId = 0;

    const updateCursor = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += dx * 0.18;
      currentPos.current.y += dy * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentPos.current.x - 3}px, ${currentPos.current.y - 3}px)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetPos.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerenter', handlePointerMove);

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerenter', handlePointerMove);
    };
  }, [useCustomCursor]);

  return (
    <HashRouter>
      <div className="min-h-screen relative overflow-x-hidden">
        <div className="grain" />
        {useCustomCursor && (
          <div
            ref={cursorRef}
            className="pointer-events-none fixed z-[9999] rounded-full bg-brand-ink"
            style={{
              width: 10,
              height: 10,
              left: 0,
              top: 0,
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.12s ease',
            }}
          />
        )}
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Gallery />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
