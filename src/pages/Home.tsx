import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Instagram, Mail, ExternalLink, Scissors, Palette, Zap, Camera, 
  ChevronRight, X
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { siteConfig } from '../config';
import { BeforeAfter, SectionHeading } from '../components/Shared';

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        <motion.div 
          style={{ opacity }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <h1 className="text-[20vw] md:text-[15vw] display leading-none relative z-10 text-brand-ink">
              Tabito
            </h1>
            <h1 className="text-[20vw] md:text-[15vw] display leading-none absolute top-4 left-4 blur-3xl text-brand-accent opacity-30 select-none">
              Tabito
            </h1>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-10 -right-10 sticker text-xl md:text-3xl px-6 py-2"
            >
              URBAN EDIT
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="sticker text-sm md:text-lg px-8 py-3"
          >
            Editor de Imagen & Video
          </motion.div>
        </motion.div>

        {/* Floating elements for aesthetic */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border-4 border-brand-accent/20 rounded-urban animate-pulse rotate-12" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 border-4 border-brand-ink/5 rounded-urban animate-bounce" style={{ animationDuration: '8s' }} />
        
        {/* Background Text Accent */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 text-[30vh] font-black opacity-[0.02] select-none pointer-events-none display -rotate-90">
          CREATIVE
        </div>
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 text-[30vh] font-black opacity-[0.02] select-none pointer-events-none display rotate-90">
          VISUALS
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Scroll Down</span>
          <div className="w-1.5 h-16 bg-brand-ink rounded-full relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 64, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-full h-1/2 bg-brand-accent rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Images Section */}
      {siteConfig.showImages && (
        <section id="imagenes" className="py-32 max-w-7xl mx-auto px-6">
          <SectionHeading title="FOTOS" subtitle="Edición & Retoque" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-16">
              <BeforeAfter 
                before="/images/antes1.jpg" 
                after="/images/despues1.jpg"
                label="Corrección de color y eliminación de ruido"
              />
              <BeforeAfter 
                before="/images/antes2.jpg" 
                after="/images/despues2.jpg"
                label="Retoque de piel y eliminación de objetos"
              />
              
              <div className="pt-8 flex justify-center lg:justify-start">
                <Link 
                  to="/galeria" 
                  className="flex items-center gap-4 px-10 py-5 bg-brand-ink text-brand-cream rounded-urban hover:bg-brand-accent hover:text-brand-ink transition-all group font-black uppercase tracking-widest text-sm"
                >
                  Ver más proyectos
                  <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:sticky lg:top-32 space-y-12">
              <div className="space-y-8">
                <h3 className="text-4xl display italic">Lo que hago</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Scissors size={24} />, title: 'Recorte', desc: 'Composiciones precisas y reencuadre.' },
                    { icon: <Palette size={24} />, title: 'Color', desc: 'Gradación y corrección profesional.' },
                    { icon: <Zap size={24} />, title: 'Ruido', desc: 'Limpieza de grano y artefactos.' },
                    { icon: <X size={24} />, title: 'Eliminación', desc: 'Borrado de objetos no deseados.' },
                    { icon: <Camera size={24} />, title: 'Retoque', desc: 'Mejora de detalles y texturas.' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 urban-card group"
                    >
                      <div className="text-brand-ink mb-4 group-hover:text-brand-accent transition-colors">{item.icon}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-black uppercase italic">{item.title}</h4>
                        {i === 0 && <span className="sticker scale-75">PRO</span>}
                      </div>
                      <p className="text-sm text-brand-ink/60 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest font-black opacity-40">Herramientas</h3>
                <div className="flex flex-wrap gap-4">
                  <span className="px-6 py-3 bg-brand-ink text-brand-accent rounded-full text-sm font-black italic">Lightroom</span>
                  <span className="px-6 py-3 bg-brand-ink text-brand-accent rounded-full text-sm font-black italic">Photoshop</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {siteConfig.showVideos && (
        <section id="videos" className="py-32 bg-brand-ink text-brand-cream overflow-hidden rounded-[4rem] mx-4 md:mx-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="space-y-4">
                <h2 className="text-7xl md:text-9xl display leading-none">VIDEO</h2>
                <div className="sticker text-sm">Montaje & Post-Producción</div>
              </div>
              <div className="max-w-md text-right">
                <p className="display italic text-2xl text-brand-accent opacity-80">
                  "Dando vida a cada frame a través del ritmo y la narrativa visual."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="aspect-video bg-brand-cream/10 rounded-urban overflow-hidden relative group cursor-pointer border-2 border-brand-cream/10 hover:border-brand-accent transition-all"
                >
                  <img 
                    src={`https://picsum.photos/seed/video${i}/800/450`} 
                    alt="Video Work" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand-accent rounded-sm flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 border border-white/20">
                      <ChevronRight size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-brand-ink to-transparent">
                    <div className="sticker scale-75 -ml-2 mb-2">PROYECTO {i}</div>
                    <p className="display italic text-lg opacity-60">Edición de ritmo & color</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                <h3 className="text-4xl display italic">Capacidades</h3>
                <ul className="space-y-6">
                  {[
                    { text: 'Recorte y montaje rítmico', icon: <Scissors size={20} /> },
                    { text: 'Corrección de color cinematográfica', icon: <Palette size={20} /> },
                    { text: 'Diseño sonoro y mezcla de audio', icon: <Zap size={20} /> },
                    { text: 'Animación de textos y elementos 2D', icon: <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}><Zap size={20} /></motion.div> },
                    { text: 'Transiciones personalizadas', icon: <ChevronRight size={20} /> },
                    { text: 'Limpieza de imagen y estabilización', icon: <Camera size={20} /> }
                  ].map((skill, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-6 text-xl group"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-ink transition-all">
                        {skill.icon}
                      </div>
                      <span className="font-bold">{skill.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col justify-center items-center lg:items-end gap-8">
                <div className="p-16 border-4 border-brand-accent/20 rounded-urban aspect-square flex items-center justify-center relative bg-brand-cream/5 group overflow-hidden">
                  <div className="text-center relative z-10">
                    <p className="text-xs uppercase tracking-widest mb-4 opacity-40 font-black">Software</p>
                    <p className="text-5xl display font-black text-brand-accent group-hover:scale-110 transition-transform">After Effects</p>
                    <div className="sticker mt-4">MOTION MASTER</div>
                  </div>
                  
                  {/* Gusanito Line Animation */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect
                      x="1"
                      y="1"
                      width="98"
                      height="98"
                      rx="8"
                      fill="none"
                      stroke="var(--color-brand-accent)"
                      strokeWidth="1"
                      strokeDasharray="20 80"
                      pathLength="100"
                      className="animate-gusanito"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Summary */}
      {siteConfig.showServices && (
        <section id="servicios" className="py-32 max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-urban p-12 md:p-24 shadow-urban border-4 border-brand-ink relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 sticker text-4xl px-10 py-4 rotate-6">
              TOP QUALITY
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-6xl display leading-none italic">Soluciones visuales.</h2>
                <p className="text-2xl text-brand-ink/70 leading-relaxed font-medium">
                  Desde la captura hasta el resultado final, me encargo de que cada imagen y video cuente su propia historia con la máxima calidad técnica.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-8 py-4 bg-brand-ink text-brand-accent rounded-sm border border-brand-accent/20 hover:bg-brand-accent hover:text-white transition-all">
                    <Scissors size={20} />
                    <span className="font-black text-sm uppercase italic">Edición</span>
                  </div>
                  <div className="flex items-center gap-3 px-8 py-4 bg-brand-ink text-brand-accent rounded-sm border border-brand-accent/20 hover:bg-brand-accent hover:text-white transition-all">
                    <Palette size={20} />
                    <span className="font-black text-sm uppercase italic">Color</span>
                  </div>
                  <div className="flex items-center gap-3 px-8 py-4 bg-brand-ink text-brand-accent rounded-sm border border-brand-accent/20 hover:bg-brand-accent hover:text-white transition-all">
                    <Zap size={20} />
                    <span className="font-black text-sm uppercase italic">Post-Pro</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-10 border-l-8 border-brand-accent bg-brand-cream/50 rounded-r-urban space-y-4">
                  <div className="sticker text-[10px] scale-75 -ml-4">ENFOQUE</div>
                  <p className="text-3xl display italic text-brand-ink">"Menos es más, pero el detalle es todo."</p>
                </div>
                <p className="text-xl text-brand-ink/60 font-medium italic">
                  Especializado en retoque editorial, corrección de color avanzada y montaje dinámico para redes sociales y publicidad.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {siteConfig.showAbout && (
        <section id="sobre-mi" className="py-32 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[3/4] bg-brand-ink rounded-urban overflow-hidden relative shadow-2xl group"
            >
              <img 
                src="https://picsum.photos/seed/tabito_portrait/800/1000" 
                alt="Tabito Portrait" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border-[30px] border-brand-cream rounded-urban" />
              <div className="absolute bottom-12 left-12 sticker text-lg">
                TABITO STUDIO
              </div>
              <div className="absolute top-12 right-12 sticker bg-brand-ink text-brand-accent">
                EST. 2021
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sticker opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-2xl">
                CREATIVE SOUL
              </div>
            </motion.div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-7xl md:text-8xl display italic leading-none">Soy Dylan.</h2>
                <div className="sticker text-sm -rotate-2">SOBRE MÍ</div>
              </div>
              
              <div className="space-y-8 text-2xl text-brand-ink/80 leading-relaxed font-medium">
                <p>
                  Soy un apasionado de la narrativa visual con años de experiencia transformando material bruto en piezas de arte digital. Mi trabajo se centra en la precisión técnica y la sensibilidad estética.
                </p>
                <p>
                  No solo edito; busco la esencia de cada proyecto para potenciarla. Ya sea una fotografía que necesita ese toque editorial perfecto o un video que requiere un ritmo frenético y envolvente, mi objetivo es siempre la excelencia.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-12 border-t-4 border-brand-ink/5">
                <div>
                  <p className="text-5xl display font-black text-brand-accent">5+</p>
                  <div className="sticker text-[10px] scale-75 -ml-4 mt-2">AÑOS EXP</div>
                </div>
                <div>
                  <p className="text-5xl display font-black text-brand-accent">100+</p>
                  <div className="sticker text-[10px] scale-75 -ml-4 mt-2">PROYECTOS</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contacto" className="py-32 bg-brand-ink text-brand-cream rounded-t-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-raw opacity-30" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-20 relative z-10">
          <div className="space-y-6">
            <h2 className="text-7xl md:text-9xl display leading-none text-brand-accent italic">Hablemos.</h2>
            <div className="sticker text-xl md:text-3xl px-8 py-3">GET IN TOUCH</div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-10">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-6 px-12 py-8 border-4 border-brand-cream/10 rounded-urban hover:bg-brand-accent hover:text-brand-ink hover:border-brand-accent transition-all group"
            >
              <Instagram size={32} />
              <span className="text-3xl display italic">Instagram</span>
              <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="mailto:contacto@tabito.com" 
              className="flex items-center justify-center gap-6 px-12 py-8 bg-brand-accent text-brand-ink rounded-urban hover:bg-white transition-all group"
            >
              <Mail size={32} />
              <span className="text-3xl display font-black italic">Email Me</span>
              <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="pt-40 flex flex-col md:flex-row justify-between items-center gap-10 border-t-2 border-brand-cream/5 opacity-40 text-xs uppercase tracking-[0.3em] font-black">
            <div className="sticker scale-75 bg-brand-cream/10 text-brand-cream border border-brand-cream/20">© 2026 TABITO STUDIO</div>
            <div className="flex gap-10">
              <a href="#" className="hover:text-brand-accent transition-colors">Behance</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Vimeo</a>
              <a href="#" className="hover:text-brand-accent transition-colors">LinkedIn</a>
            </div>
            <div className="sticker scale-75 bg-brand-cream/10 text-brand-cream border border-brand-cream/20">HECHO CON PASIÓN</div>
          </div>
        </div>
      </section>
    </>
  );
};
