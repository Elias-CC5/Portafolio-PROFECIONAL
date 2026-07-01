import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import SEO from '@/components/layout/SEO';
import SkillCard from '@/components/sections/SkillCard';
import { skills, profile } from '@/data/portfolio';
import type { SkillCategory } from '@/types';

const CATEGORIES: { key: SkillCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Bases de datos' },
  { key: 'tools', label: 'Herramientas' },
];

export default function Skills() {
  const [active, setActive] = useState<SkillCategory | 'all'>('all');

  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active);

  return (
    <>
      <SEO title={`Habilidades — ${profile.fullName}`} description="Tecnologías y herramientas que domino, organizadas por categoría." />
      <PageHeader
        eyebrow="Capacidades técnicas"
        title="Habilidades"
        description="Un vistazo a las tecnologías con las que construyo: del frontend a la base de datos."
      />

      <section className="px-6 pb-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Category filters */}
          <div className="mb-12 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                data-cursor-pointer
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active === cat.key ? 'text-[var(--color-ink)]' : 'border border-[var(--color-border)] text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                }`}
              >
                {active === cat.key && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full bg-[var(--color-paper)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {filtered.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SkillCard name={skill.name} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
