import { useState } from 'react';
import { FiImage } from 'react-icons/fi';
import type { GalleryImage } from '@/types';

interface ProjectCoverProps {
  coverImage?: string;
  gallery?: GalleryImage[];
  title: string;
  seed: number;
}

const GRADIENTS = [
  'from-[var(--color-accent)]/30 via-[var(--color-surface)] to-[var(--color-ink)]',
  'from-[#34d399]/20 via-[var(--color-surface)] to-[var(--color-ink)]',
  'from-[#fbbf24]/20 via-[var(--color-surface)] to-[var(--color-ink)]',
  'from-[#f05032]/20 via-[var(--color-surface)] to-[var(--color-ink)]',
  'from-[#818cf8]/25 via-[var(--color-surface)] to-[var(--color-ink)]',
];

export default function ProjectCover({ coverImage, gallery, title, seed }: ProjectCoverProps) {
  const [failed, setFailed] = useState(false);

  // Use coverImage first, then fall back to first gallery image
  const src = coverImage ?? gallery?.[0]?.src;

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  const gradient = GRADIENTS[seed % GRADIENTS.length];

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${gradient}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/40 text-[var(--color-paper-dim)]">
        <FiImage size={20} />
      </div>
      <p className="px-6 text-center font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-dim)]">
        Captura próximamente
      </p>
    </div>
  );
}