import PageHeader from '@/components/ui/PageHeader';
import SEO from '@/components/layout/SEO';
import Reveal from '@/components/ui/Reveal';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAward } from 'react-icons/fi';
import { profile } from '@/data/portfolio';

export default function Certificates() {
  return (
    <>
      <SEO title={`Certificados — ${profile.fullName}`} description="Certificaciones y reconocimientos profesionales." />
      <PageHeader eyebrow="Reconocimientos" title="Certificados" />

      <section className="px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/40 px-8 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent-bright)]">
                <FiAward size={26} />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-[var(--color-paper)]">Próximamente</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-paper-dim)]">
                Estoy actualmente cursando mi formación en TECSUP. Las certificaciones que vaya obteniendo se publicarán
                en esta sección a medida que estén disponibles.
              </p>
              <Link
                to="/experiencia"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent-bright)] hover:text-[var(--color-accent-bright)]"
                data-cursor-pointer
              >
                Ver mi trayectoria <FiArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
