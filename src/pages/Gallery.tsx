import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading, BeforeAfter } from '../components/Shared';

export const Gallery = () => {
  // Aquí puedes ir agregando todos los proyectos que quieras
  const projects = [
    { 
      before: '/images/antes1.jpg', 
      after: '/images/despues1.jpg', 
      label: 'Proyecto 1: Corrección de color y eliminación de ruido' 
    },
    { 
      before: '/images/antes2.jpg', 
      after: '/images/despues2.jpg', 
      label: 'Proyecto 2: Retoque de piel y eliminación de objetos' 
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-16">
        <SectionHeading title="GALERÍA" subtitle="Todos los proyectos" />
      </div>
      
      <div className="w-full max-w-5xl space-y-32">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <BeforeAfter 
              before={project.before} 
              after={project.after}
              label={project.label}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
