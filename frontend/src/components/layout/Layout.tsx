import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import StatusBar from '@/components/ui/StatusBar';
import ScrollProgress from '@/components/ui/ScrollProgress';
import AmbientBackground from '@/components/ui/AmbientBackground';
import { useLenis } from '@/hooks/useLenis';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenisRef]);

  return (
    <>
      <div className="grain" />
      <AmbientBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <StatusBar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
