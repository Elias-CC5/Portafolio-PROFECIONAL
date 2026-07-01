import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi';

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/experiencia', label: 'Experiencia' },
  { to: '/habilidades', label: 'Skills' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-5 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 md:px-4 ${
            scrolled
              ? 'border-[var(--color-border)] bg-[var(--color-surface)]/85 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl'
              : 'border-transparent bg-[var(--color-surface)]/40 backdrop-blur-md'
          }`}
        >
          <Link
            to="/"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] font-display text-sm font-bold text-white"
            aria-label="Inicio"
          >
            E
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const active = pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${
                      active ? 'text-[var(--color-ink)]' : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[var(--color-paper)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            to="/contacto"
            className="hidden shrink-0 rounded-full bg-[var(--color-paper)] px-4 py-1.5 text-sm font-semibold text-[var(--color-ink)] transition-transform duration-300 hover:scale-105 lg:inline-block"
          >
            Hablemos
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-paper)] lg:hidden"
            aria-label="Abrir menú"
          >
            {open ? <HiOutlineX size={20} /> : <HiOutlineMenuAlt4 size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--color-ink)]/95 backdrop-blur-lg lg:hidden"
          >
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-6"
            >
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    className={`font-display text-3xl font-semibold ${
                      pathname === link.to ? 'text-[var(--color-accent-bright)]' : 'text-[var(--color-paper)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
