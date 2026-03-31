import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { siteConfig } from '../config';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show logo after scrolling down 40% of the viewport height
      setIsScrolled(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', show: true },
    { name: 'Imágenes', href: '#imagenes', show: siteConfig.showImages },
    { name: 'Videos', href: '#videos', show: siteConfig.showVideos },
    { name: 'Servicios', href: '#servicios', show: siteConfig.showServices },
    { name: 'Sobre Mí', href: '#sobre-mi', show: siteConfig.showAbout },
    { name: 'Contacto', href: '#contacto', show: true },
  ].filter(item => item.show);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    e.preventDefault();
    setIsOpen(false);

    if (item.isRoute) {
      navigate(item.href);
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/' + item.href);
      return;
    }

    const targetId = item.href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const showLogo = location.pathname !== '/' || isScrolled;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="w-40 flex items-center">
          <AnimatePresence>
            {showLogo && (
              <motion.a 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                href="#home" 
                onClick={(e) => handleNavClick(e, { href: '#home', isRoute: false })}
                className="display text-3xl font-black tracking-tighter relative group block"
              >
                TABITO
                <span className="absolute -bottom-2 -right-4 sticker scale-50 opacity-0 group-hover:opacity-100 transition-opacity">STUDIO</span>
              </motion.a>
            )}
          </AnimatePresence>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="text-xs uppercase tracking-[0.2em] font-black hover:text-brand-accent transition-colors relative group"
            >
              {item.name}
              <span className="absolute -top-4 -right-4 sticker scale-50 opacity-0 group-hover:opacity-100 transition-opacity">GO</span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-cream border-b border-brand-ink/10 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-4xl display hover:text-brand-accent transition-colors flex items-center justify-between group"
                >
                  {item.name}
                  <span className="sticker scale-50 opacity-0 group-hover:opacity-100 transition-opacity">GO</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
