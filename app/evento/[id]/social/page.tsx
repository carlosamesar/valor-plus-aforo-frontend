'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { SocialWall } from '@/components/social/SocialWall';
import { mockPosts, mockSocialStats } from '@/lib/mock-data-social';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SocialPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Buscar evento
  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id);

  if (!event) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Evento no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div>
              <button
                onClick={() => router.back()}
                className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>
              <h1 className="text-2xl font-bold">{event.title}</h1>
              <p className="text-sm text-muted-foreground">Muro Social</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Wall */}
      <section className="container py-8">
        <SocialWall
          posts={mockPosts}
          stats={mockSocialStats}
          onCreatePost={(content) => console.log('New post:', content)}
          onLike={(id) => console.log('Like post:', id)}
          onComment={(id) => console.log('Comment on post:', id)}
          onShare={(id) => console.log('Share post:', id)}
        />
      </section>
    </div>
  );
}
