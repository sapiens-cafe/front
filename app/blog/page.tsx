import { type Metadata } from 'next';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';

export const metadata: Metadata = {
  title: 'Blog — Bientôt disponible',
  robots: { index: false, follow: false },
};

export default async function Blog() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <AmbientColor />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <span>Bientôt disponible...</span>
        </div>
      </Container>
    </div>
  );
}
