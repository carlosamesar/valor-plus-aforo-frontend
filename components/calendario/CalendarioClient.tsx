'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

export function CalendarioClient() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  // Get all event dates for highlighting (memoized to avoid recreating on every render)
  const eventDates = useMemo(
    () => MOCK_EVENTS.map((event) => new Date(event.startDate)),
    []
  );

  // Get events for selected date
  const eventsForSelectedDate = selectedDate
    ? MOCK_EVENTS.filter((event) =>
        isSameDay(new Date(event.startDate), selectedDate)
      )
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Calendar */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-border/40 bg-card p-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={es}
            className="rounded-md"
            modifiers={{
              hasEvent: eventDates,
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: 'bold',
                textDecoration: 'underline',
                textDecorationColor: 'var(--primary)',
              },
            }}
          />

          <div className="mt-6 space-y-2 border-t border-border/40 pt-4">
            <p className="text-sm font-medium">Leyenda</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Días con eventos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="lg:col-span-2">
        {selectedDate ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">
                {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", {
                  locale: es,
                })}
              </h2>
            </div>

            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsForSelectedDate.map((event) => (
                  <Link
                    key={event.id}
                    href={`/eventos/${event.slug}`}
                    className="group block rounded-lg border border-border/40 bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Title */}
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>

                        {/* Time */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(new Date(event.startDate), 'HH:mm')} -{' '}
                            {format(new Date(event.endDate), 'HH:mm')}
                          </span>
                        </div>

                        {/* Location */}
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {event.location.type === 'online'
                                ? 'Evento Virtual'
                                : event.location.city || event.location.venue}
                            </span>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{event.category}</Badge>
                          <Badge variant="outline">{event.type}</Badge>
                          {event.isFree && <Badge>Gratis</Badge>}
                        </div>
                      </div>

                      {/* Price */}
                      {!event.isFree && event.price && (
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Desde</p>
                          <p className="text-2xl font-bold text-primary">
                            ${event.price}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-border/40">
                <div className="text-center">
                  <p className="text-lg font-medium text-muted-foreground">
                    No hay eventos programados
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selecciona otra fecha para ver eventos
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-border/40">
            <div className="text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">
                Selecciona una fecha
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Haz clic en una fecha del calendario para ver los eventos
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
