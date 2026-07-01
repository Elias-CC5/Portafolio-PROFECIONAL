import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import Reveal, { StaggerGroup, staggerItem } from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-bright)]">Trabajo seleccionado</p>
            <h2 className="font-display text-4xl font-bold text-[var(--color-paper)] md:text-5xl">Proyectos destacados</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/proyectos"
              className="group inline-flex items-center gap-2 font-medium text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
              data-cursor-pointer
            >
              Ver todos
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="grid gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectPreviewCard
                slug={project.slug}
                title={project.title}
                description={project.description}
                tech={project.tech}
                period={project.period}
              />
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ProjectPreviewCard({
  slug,
  title,
  description,
  tech,
  period,
}: {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  period?: string;
}) {
  return (
    <Link to={`/proyectos/${slug}`} data-cursor-pointer>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[var(--color-accent)]/10" />

        <div className="flex items-start justify-between">
          {period && <span className="font-mono text-xs text-[var(--color-muted)]">{period}</span>}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-paper-dim)] opacity-0 transition-opacity group-hover:opacity-100"
          >
            <FiArrowUpRight size={15} />
          </motion.div>
        </div>

        <h3 className="mt-6 font-display text-xl font-semibold text-[var(--color-paper)]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-paper-dim)]">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] text-[var(--color-paper-dim)]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
}