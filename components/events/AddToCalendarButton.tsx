'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import type { Event } from '@/types/event';
import { toast } from 'sonner';

interface AddToCalendarButtonProps {
  event: Event;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function AddToCalendarButton({
  event,
  variant = 'outline',
  size = 'default',
}: AddToCalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const generateGoogleCalendarUrl = () => {
    const startDate = format(new Date(event.startDate), "yyyyMMdd'T'HHmmss");
    const endDate = format(new Date(event.endDate), "yyyyMMdd'T'HHmmss");
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(
      event.location?.venue || event.location?.city || 'Virtual'
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  const generateICalFile = () => {
    const startDate = format(new Date(event.startDate), "yyyyMMdd'T'HHmmss");
    const endDate = format(new Date(event.endDate), "yyyyMMdd'T'HHmmss");

    const ical = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location?.venue || event.location?.city || 'Virtual'}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ical], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.slug}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const calendarOptions = [
    {
      name: 'Google Calendar',
      icon: '📅',
      action: () => {
        window.open(generateGoogleCalendarUrl(), '_blank');
        setAdded(true);
        toast.success('Abriendo Google Calendar...');
      },
    },
    {
      name: 'Apple Calendar',
      icon: '🍎',
      action: () => {
        generateICalFile();
        setAdded(true);
        toast.success('Archivo .ics descargado');
      },
    },
    {
      name: 'Outlook',
      icon: '📧',
      action: () => {
        generateICalFile();
        setAdded(true);
        toast.success('Archivo .ics descargado');
      },
    },
  ];

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Agregado
          </>
        ) : (
          <>
            <Calendar className="h-4 w-4" />
            Agregar a Calendario
          </>
        )}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-border/40 bg-card/95 backdrop-blur-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                  Selecciona tu calendario
                </p>
                {calendarOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-primary/10"
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
