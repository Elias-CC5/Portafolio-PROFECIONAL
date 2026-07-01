import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi';
import { profile } from '@/data/portfolio';

const ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  phone: FiMail,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-ink)] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="font-display text-2xl font-bold text-[var(--color-paper)]">
              Elías Cárdenas
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-paper-dim)]">
              {profile.shortAbout}
            </p>
            <div className="mt-5 flex gap-3">
              {profile.socials
                .filter((s) => s.icon === 'github' || s.icon === 'linkedin' || s.icon === 'email')
                .map((social) => {
                  const Icon = ICONS[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-paper-dim)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-bright)]"
                      aria-label={social.label}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">Navegación</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: '/sobre-mi', label: 'Sobre mí' },
                { to: '/proyectos', label: 'Proyectos' },
                { to: '/experiencia', label: 'Experiencia' },
                { to: '/habilidades', label: 'Skills' },
                { to: '/contacto', label: 'Contacto' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">Contacto</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]">
                  {profile.phone}
                </a>
              </li>
              <li className="text-[var(--color-paper-dim)]">{profile.location}</li>
            </ul>
            <Link
              to="/contacto"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-bright)] transition-colors hover:text-[var(--color-paper)]"
            >
              Iniciar conversación <FiArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} Elías Salomón Cárdenas Cuellar. Todos los derechos reservados.</p>
          <p className="font-mono">Diseñado y construido con React + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
