import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { profile, stats } from '@/data/portfolio';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  
  // Mantenemos tus efectos de scroll paralaje exactos
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-zinc-800 selection:text-white">
      
      {/* Tu grilla exacta de 2 columnas al 50% en pantallas grandes */}
      <div className="mx-auto grid min-h-screen w-full items-center lg:grid-cols-2">
        
        {/* COLUMNA IZQUIERDA: Contenido de Texto */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 flex flex-col justify-center px-8 pt-32 pb-16 sm:px-16 md:px-24 lg:pt-0 lg:pb-0"
        >
          {/* Chip de disponibilidad (Mejorado contraste y padding) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex max-w-fit items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/40 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-zinc-400 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Disponible para proyectos
          </motion.div>

          {/* Subtítulo / Rol (Aumentado el tracking para look más editorial) */}
          <span className="mb-4 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            {profile.role || "DESARROLLADOR FULL STACK"}
          </span>

          {/* Título Principal - Ajustado interlineado y ortografía corregida ("Construyo") */}
          <h1 className="max-w-xl text-[2.6rem] font-bold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-[3.5rem]">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Construyo APIs, sistemas y UIs que no se caen a las 3 a.m.')
                  .start();
              }}
              options={{
                autoStart: true,
                loop: false,
                delay: 40,
                cursor: '_',
                wrapperClassName: 'text-white inline-block',
                cursorClassName: 'text-zinc-600 animate-pulse font-light'
              }}
            />
          </h1>

          {/* Línea decorativa sutil de tu captura */}
          <div className="mt-6 h-px w-8 bg-zinc-800" />

          {/* Descripción corta (Alineada al tamaño de tu captura pero con texto más limpio) */}
          <p className="mt-6 max-w-lg text-xs leading-relaxed text-zinc-400 sm:text-sm antialiased font-normal">
            {profile.shortAbout || "Estudiante de Diseño y Desarrollo de Software en TECSUP con experiencia construyendo aplicaciones web full-stack enfocadas en autenticación, gestión de datos y arquitectura backend limpia."}
          </p>

          {/* Botones de Acción (Estilos premium sutiles sin cambiar su forma) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link 
              to="/contacto" 
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-100 active:scale-[0.98]"
            >
              Hablemos 
              <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            
            <a 
              href="/cv-elias-cardenas.pdf" 
              download 
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/20 px-6 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all hover:bg-zinc-900/60 hover:text-white hover:border-zinc-700"
            >
              Descargar CV <FiDownload className="text-zinc-400" />
            </a>
          </motion.div>

          {/* Estadísticas inferiores (Métricas) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-14 flex items-center gap-12 border-t border-zinc-900/60 pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">{stat.value}</span>
                {/* Corregido el tracking y transformamos caracteres especiales de forma segura */}
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-1">
                  {stat.label === "ANOS DE EXPERIENCIA" ? "AÑOS DE EXPERIENCIA" : stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA: Imagen de perfil con fundido exacto */}
        <motion.div 
          style={{ y: imgY }}
          className="relative h-[50vh] w-full lg:h-screen"
        >
          {/* Degradados de fundido idénticos a tu mockup */}
          <div className="absolute inset-y-0 left-0 z-10 hidden w-1/3 bg-gradient-to-r from-black via-black/80 to-transparent lg:block" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-black to-transparent lg:hidden" />

          <img 
            src="/images/elias-profile.jpg" 
            alt={profile.fullName || "Elias Salomon Cardenas Cuellar"} 
            className="h-full w-full object-cover object-center grayscale-[10%] contrast-[102%] brightness-[0.95]"
            loading="eager"
          />

          {/* Tag flotante inferior derecho */}
          <div className="absolute bottom-6 right-6 z-20 hidden rounded-lg bg-zinc-950/40 px-3 py-1.5 text-[10px] font-medium tracking-wide text-zinc-400 backdrop-blur-md border border-zinc-800/40 lg:block">
            {profile.fullName || "Elias Salomon Cardenas Cuellar"}
          </div>
        </motion.div>

      </div>

      {/* Status Flotante en la esquina inferior izquierda (Fijo como en tu UI) */}
      <div className="absolute bottom-6 left-8 z-20 hidden lg:block">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900 bg-zinc-950/60 px-3 py-1 text-[10px] font-mono tracking-wider text-zinc-500">
          <span className="h-1 w-1 rounded-full bg-zinc-500 animate-pulse" />
          status: online
        </div>
      </div>
    </section>
  );
}