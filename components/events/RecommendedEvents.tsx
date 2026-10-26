'use client';

import { useEffect, useState } from 'react';
import { EventCardEnhanced } from './EventCardEnhanced';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { MOCK_EVENTS } from '@/lib/mock-data';
import type { Event } from '@/types/event';
import { Sparkles } from 'lucide-react';

interface RecommendedEventsProps {
  currentEventId?: string;
  userCategories?: string[];
  limit?: number;
}

export function RecommendedEvents({
  currentEventId,
  userCategories = [],
  limit = 3,
}: RecommendedEventsProps) {
  const [recommendations, setRecommendations] = useState<Event[]>([]);

  useEffect(() => {
    // Algoritmo simple de recomendaciones
    const scored = MOCK_EVENTS.filter((e) => e.id !== currentEventId).map(
      (event) => {
        let score = 0;

        // +3 puntos si coincide categoría
        if (userCategories.includes(event.category)) {
          score += 3;
        }

        // +2 puntos si es destacado
        if (event.featured) {
          score += 2;
        }

        // +1 punto por cada 100 asistentes
        if (event.attendeesCount) {
          score += Math.floor(event.attendeesCount / 100);
        }

        // +1 punto si rating > 4.5
        if (event.rating && event.rating > 4.5) {
          score += 1;
        }

        // Bonus aleatorio pequeño para variedad
        score += Math.random() * 0.5;

        return { event, score };
      }
    );

    // Ordenar por score y tomar top N
    const top = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.event);

    setRecommendations(top);
  }, [currentEventId, userCategories, limit]);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12">
      <ScrollReveal direction="up">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Recomendado para ti</h2>
            <p className="text-sm text-muted-foreground">
              Basado en tus intereses y eventos populares
            </p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((event, index) => (
          <ScrollReveal key={event.id} direction="up" delay={index * 0.1}>
            <EventCardEnhanced event={event} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
