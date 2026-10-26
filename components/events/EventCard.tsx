'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types/event';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const eventDate = new Date(event.startDate);

  return (
    <Card className={cn('group overflow-hidden transition-all hover:shadow-lg', className)}>
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {event.featured && (
            <Badge className="bg-primary text-primary-foreground">
              Destacado
            </Badge>
          )}
          {event.isFree && (
            <Badge variant="secondary">
              Gratis
            </Badge>
          )}
          {event.type === 'virtual' && (
            <Badge variant="outline" className="bg-background/80 backdrop-blur">
              Virtual
            </Badge>
          )}
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-3 right-3 flex flex-col items-center rounded-lg bg-card px-3 py-2 shadow-lg">
          <span className="text-2xl font-bold text-primary">
            {format(eventDate, 'd')}
          </span>
          <span className="text-xs uppercase text-muted-foreground">
            {format(eventDate, 'MMM', { locale: es })}
          </span>
        </div>
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/eventos/${event.slug}`} className="flex-1">
            <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
              {event.title}
            </h3>
          </Link>
        </div>

        {event.shortDescription && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.shortDescription}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {format(eventDate, "d 'de' MMMM, HH:mm", { locale: es })}
          </span>
        </div>

        {/* Location */}
        {event.location && event.location.type !== 'online' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {event.location.city || event.location.venue}
            </span>
          </div>
        )}

        {/* Social Proof */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {event.attendeesCount !== undefined && event.attendeesCount > 0 && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{event.attendeesCount} asistentes</span>
            </div>
          )}
          {event.rating !== undefined && event.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{event.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex flex-col">
          {!event.isFree && event.price && (
            <>
              <span className="text-xs text-muted-foreground">Desde</span>
              <span className="text-lg font-bold text-primary">
                ${event.price.toLocaleString()}
              </span>
            </>
          )}
          {event.isFree && (
            <span className="text-lg font-bold text-primary">Gratis</span>
          )}
        </div>

        <Link
          href={`/eventos/${event.slug}`}
          className="inline-flex h-7 items-center justify-center rounded-lg bg-primary px-2.5 text-[0.8rem] font-medium text-primary-foreground transition-all hover:bg-primary/80"
        >
          Ver Detalles
        </Link>
      </CardFooter>
    </Card>
  );
}
