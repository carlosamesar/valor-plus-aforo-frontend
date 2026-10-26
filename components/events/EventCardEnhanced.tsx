'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialProofBadge } from './SocialProofBadge';
import { EventDetailModal } from './EventDetailModal';
import type { Event } from '@/types/event';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

interface EventCardEnhancedProps {
  event: Event;
  className?: string;
  index?: number;
}

export function EventCardEnhanced({ event, className, index = 0 }: EventCardEnhancedProps) {
  const eventDate = new Date(event.startDate);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn('group perspective-1000', className)}
    >
      <Card className="relative overflow-hidden border-border/40 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
        {/* Glassmorphism overlay */}
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 transition-opacity"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start justify-between gap-2 z-20">
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
              {event.type === 'virtual' && (
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm shadow-lg">
                  Virtual
                </Badge>
              )}
            </div>
            <SocialProofBadge eventId={event.id} />
          </div>

          {/* Date Badge with Glassmorphism */}
          <motion.div
            animate={{
              y: isHovered ? -5 : 0,
            }}
            className="absolute bottom-3 right-3 z-20"
          >
            <div className="flex flex-col items-center rounded-xl border border-border/40 bg-background/80 backdrop-blur-md px-4 py-2 shadow-xl">
              <span className="text-3xl font-bold text-primary">
                {format(eventDate, 'd')}
              </span>
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                {format(eventDate, 'MMM', { locale: es })}
              </span>
            </div>
          </motion.div>
        </div>

        <CardHeader className="space-y-2 relative z-20">
          <div className="flex items-start justify-between gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 text-left group/title cursor-pointer"
            >
              <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover/title:text-primary">
                {event.title}
              </h3>
            </button>
          </div>

          {event.shortDescription && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {event.shortDescription}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-3 relative z-20">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {format(eventDate, "d 'de' MMMM, HH:mm", { locale: es })}
            </span>
          </div>

          {/* Location */}
          {event.location && event.location.type !== 'online' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="line-clamp-1">
                {event.location.city || event.location.venue}
              </span>
            </div>
          )}

          {/* Social Proof */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {event.attendeesCount !== undefined && event.attendeesCount > 0 && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-primary" />
                <span>{event.attendeesCount} asistentes</span>
              </div>
            )}
            {event.rating !== undefined && event.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{event.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/40 pt-4 relative z-20">
          <div className="flex flex-col">
            {!event.isFree && event.price && (
              <>
                <span className="text-xs text-muted-foreground">Desde</span>
                <span className="text-xl font-bold text-primary">
                  ${event.price.toLocaleString()}
                </span>
              </>
            )}
            {event.isFree && (
              <span className="text-xl font-bold text-green-500">Gratis</span>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group/btn inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:gap-3"
          >
            Ver Detalles
            <ArrowRight className="h-4 w-4 transition-transform" />
          </button>
        </CardFooter>

        {/* Shine effect on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30"
          animate={{
            background: isHovered
              ? 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 50%)'
              : 'none',
          }}
          style={{
            // @ts-ignore
            '--mouse-x': `${x.get() * 100 + 50}%`,
            '--mouse-y': `${y.get() * 100 + 50}%`,
          }}
        />
      </Card>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={event}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </motion.div>
  );
}
