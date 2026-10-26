import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { CalendarioClient } from '@/components/calendario/CalendarioClient';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function CalendarioPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Calendario de Eventos
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explora eventos organizados por fecha
        </p>
      </div>

      <CalendarioClient />

      {/* Upcoming Events */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Próximos Eventos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_EVENTS.slice(0, 4).map((event) => (
            <Link
              key={event.id}
              href={`/eventos/${event.slug}`}
              className="group relative overflow-hidden rounded-lg border border-border/40 bg-card transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                  <CalendarIcon className="h-4 w-4" />
                  {format(new Date(event.startDate), "d 'de' MMM", {
                    locale: es,
                  })}
                </div>
                <h4 className="line-clamp-2 font-semibold group-hover:text-primary transition-colors">
                  {event.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.location?.city || 'Virtual'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
