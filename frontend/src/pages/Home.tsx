import Hero from '@/components/sections/Hero';
import SEO from '@/components/layout/SEO';
import { profile } from '@/data/portfolio';

export default function Home() {
  return (
    <>
      <SEO title={`${profile.fullName} — ${profile.role}`} description={profile.tagline} />
      <Hero />
    </>
  );
}
