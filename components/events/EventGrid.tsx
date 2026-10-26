import { EventCardEnhanced } from './EventCardEnhanced';
import type { Event } from '@/types/event';

interface EventGridProps {
  events: Event[];
  emptyMessage?: string;
}

export function EventGrid({ events, emptyMessage = 'No se encontraron eventos' }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border/40">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">{emptyMessage}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventCardEnhanced key={event.id} event={event} index={index} />
      ))}
    </div>
  );
}
