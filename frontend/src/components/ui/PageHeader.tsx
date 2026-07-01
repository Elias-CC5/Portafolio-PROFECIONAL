import TypewriterText from '@/components/ui/Typewritertext';
import Reveal from '@/components/ui/Reveal';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  noPadding?: boolean;
}

export default function PageHeader({ eyebrow, title, description, noPadding = false }: PageHeaderProps) {
  return (
    <div className={noPadding ? '' : 'px-6 pt-36 pb-12 md:px-12 md:pt-40'}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-bright)]">{eyebrow}</p>
        </Reveal>
        <TypewriterText
          text={title}
          as="h1"
          delay={0.1}
          speed={42}
          className="font-display text-4xl font-bold tracking-tight text-[var(--color-paper)] sm:text-5xl md:text-6xl"
        />
        {description && (
          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="text-base leading-relaxed text-[var(--color-paper-dim)] md:text-lg">{description}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}