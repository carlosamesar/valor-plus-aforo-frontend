'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AddToCalendarButton } from './AddToCalendarButton';
import { SocialProofBadge } from './SocialProofBadge';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Share2,
  ExternalLink,
  Ticket,
  X,
} from 'lucide-react';
import type { Event } from '@/types/event';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailModal({
  event,
  open,
  onOpenChange,
}: EventDetailModalProps) {
  if (!event) return null;

  const eventDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: event.shortDescription || event.description,
          url: window.location.origin + `/eventos/${event.slug}`,
        })
        .then(() => toast.success('Compartido exitosamente'))
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        window.location.origin + `/eventos/${event.slug}`
      );
      toast.success('Enlace copiado al portapapeles');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-card border-border/40">
        <div className="relative flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/40 transition-all hover:bg-background hover:scale-110 shadow-xl"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto">
            {/* Hero Image */}
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 right-16 flex flex-wrap items-start justify-between gap-2 z-10">
                <div className="flex flex-wrap gap-2">
                  {event.featured && (
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                      <Star className="mr-1 h-3 w-3 fill-current" />
                      Destacado
                    </Badge>
                  )}
                  {event.isFree && (
                    <Badge variant="secondary" className="bg-green-500/90 text-white backdrop-blur-sm shadow-lg">
                      Gratis
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm shadow-lg capitalize">
                    {event.type}
                  </Badge>
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm shadow-lg capitalize">
                    {event.category}
                  </Badge>
                </div>
                <SocialProofBadge eventId={event.id} />
              </div>

              {/* Date Badge */}
              <div className="absolute bottom-4 right-4">
                <div className="flex flex-col items-center rounded-xl border border-border/40 bg-background/90 backdrop-blur-md px-4 py-3 shadow-xl">
                  <span className="text-3xl font-bold text-primary">
                    {format(eventDate, 'd')}
                  </span>
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {format(eventDate, 'MMM', { locale: es })}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {event.title}
                </h2>
              </div>

              {/* Key Info Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Date & Time */}
                <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      Fecha y Hora
                    </p>
                    <p className="font-semibold">
                      {format(eventDate, "EEEE, d 'de' MMMM", { locale: es })}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(eventDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      Ubicación
                    </p>
                    {event.location?.type === 'online' ? (
                      <>
                        <p className="font-semibold">Evento Virtual</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enlace enviado al registrarse
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold truncate">
                          {event.location?.venue || 'Venue TBA'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.location?.city}, {event.location?.country}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center gap-4">
                {event.attendeesCount !== undefined && event.attendeesCount > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold">{event.attendeesCount}</span>
                    <span className="text-muted-foreground">asistentes confirmados</span>
                  </div>
                )}
                {event.rating !== undefined && event.rating > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="font-semibold">{event.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">
                      ({event.reviewsCount} reseñas)
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-3 text-lg font-semibold">Acerca del Evento</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers (si existen) */}
              {event.speakers && event.speakers.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Speakers</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {event.speakers.map((speaker) => (
                      <div
                        key={speaker.id}
                        className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/50 p-4"
                      >
                        {speaker.avatar && (
                          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                            <Image
                              src={speaker.avatar}
                              alt={speaker.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{speaker.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {speaker.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Capacity Warning */}
              {event.capacity &&
                event.availableTickets !== undefined &&
                event.availableTickets < event.capacity * 0.2 && (
                  <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20">
                        <Ticket className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-orange-500">
                          ¡Últimas plazas disponibles!
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Solo quedan {event.availableTickets} de {event.capacity}{' '}
                          tickets disponibles
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Sticky Footer with Actions */}
          <div className="sticky bottom-0 border-t border-border/40 bg-card/95 backdrop-blur-xl p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Price */}
              <div>
                {!event.isFree && event.price ? (
                  <>
                    <p className="text-sm text-muted-foreground">Desde</p>
                    <p className="text-3xl font-bold text-primary">
                      ${event.price.toLocaleString()}
                      <span className="text-lg text-muted-foreground ml-1">
                        {event.currency}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-green-500">Gratis</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
                <AddToCalendarButton
                  event={event}
                  variant="outline"
                  size="lg"
                />
                <Button
                  size="lg"
                  className="gap-2 shadow-lg shadow-primary/25"
                  onClick={() => {
                    toast.success('Funcionalidad de compra próximamente');
                  }}
                >
                  {event.isFree ? (
                    <>
                      Registrarse Gratis
                      <ExternalLink className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Comprar Tickets
                      <Ticket className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
