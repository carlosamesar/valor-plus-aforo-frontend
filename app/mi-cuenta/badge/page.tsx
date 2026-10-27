'use client';

import { useRouter } from 'next/navigation';
import { DigitalBadgeDisplay } from '@/components/checkin/DigitalBadgeDisplay';
import { mockDigitalBadge, mockAccessZones } from '@/lib/mock-data-checkin';
import { ArrowLeft } from 'lucide-react';

export default function BadgePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="py-4">
            <button
              onClick={() => router.back()}
              className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>
            <h1 className="text-2xl font-bold">Mi Badge Digital</h1>
            <p className="text-sm text-muted-foreground">
              Tu identificación para acceder al evento
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8">
        <div className="mx-auto max-w-2xl">
          <DigitalBadgeDisplay
            badge={mockDigitalBadge}
            accessZones={mockAccessZones}
            onDownload={() => alert('Descargando badge...')}
            onShare={() => alert('Compartiendo badge...')}
          />
        </div>
      </section>
    </div>
  );
}
