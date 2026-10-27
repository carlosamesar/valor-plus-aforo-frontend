'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Ticket } from '@/types/ticket';
import { Download, Share2, Smartphone, Calendar, MapPin, Clock, Video } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DigitalTicketProps {
  ticket: Ticket;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventCity: string;
  eventImageUrl: string;
  eventId: string;
}

export function DigitalTicket({
  ticket,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventCity,
  eventImageUrl,
  eventId
}: DigitalTicketProps) {
  const router = useRouter();
  const [qrCode, setQrCode] = useState(ticket.qrCode);
  const [timeLeft, setTimeLeft] = useState(15);
  const [copied, setCopied] = useState(false);

  // Verificar si el evento está en vivo o próximo
  const eventDateTime = new Date(eventDate);
  const now = new Date();
  const hoursUntilEvent = (eventDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  const isLiveOrSoon = hoursUntilEvent <= 24 && hoursUntilEvent >= -3; // 24h antes hasta 3h después

  // Rotar QR cada 15 segundos
  useEffect(() => {
    const rotateQR = () => {
      const timestamp = Date.now();
      const newQR = `${ticket.id}-${timestamp.toString(36).toUpperCase()}`;
      setQrCode(newQR);
      setTimeLeft(15);
    };

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          rotateQR();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket.id]);

  const handleDownload = () => {
    // Mock: En producción, generaría un PDF
    alert('Descargando ticket en PDF...');
  };

  const handleAddToWallet = (type: 'apple' | 'google') => {
    // Mock: En producción, generaría un .pkpass o deep link
    alert(`Agregando a ${type === 'apple' ? 'Apple' : 'Google'} Wallet...`);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ticket Card */}
      <Card className="overflow-hidden border-2 border-primary/20">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img src={eventImageUrl} alt={eventTitle} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge
              variant="outline"
              style={{
                borderColor: ticket.ticketType.color,
                color: ticket.ticketType.color,
                backgroundColor: `${ticket.ticketType.color}20`
              }}
              className="mb-2"
            >
              {ticket.ticketType.name}
            </Badge>
            <h2 className="text-xl font-bold text-white">{eventTitle}</h2>
          </div>
        </div>

        <CardContent className="space-y-6 p-6">
          {/* QR Code */}
          <div className="rounded-xl border-2 border-dashed border-border/40 bg-white p-8 text-center">
            <div className="mx-auto mb-4 inline-block">
              <QRCodeCanvas value={qrCode} size={200} level="H" />
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                El código se actualiza en <strong>{timeLeft}s</strong>
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Muestra este código QR en el punto de check-in
            </p>
          </div>

          {/* Live Event Button */}
          {isLiveOrSoon && (
            <Button
              onClick={() => router.push(`/evento/${eventId}/live`)}
              className="w-full animate-pulse gap-2 bg-primary text-lg font-bold shadow-lg shadow-primary/25"
              size="lg"
            >
              <Video className="h-5 w-5" />
              Entrar al Evento Live
            </Button>
          )}

          {/* Attendee Info */}
          <div className="space-y-3 rounded-lg border border-border/40 bg-card/50 p-4">
            <div>
              <p className="text-sm text-muted-foreground">Asistente</p>
              <p className="font-semibold">{ticket.attendeeName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm">{ticket.attendeeEmail}</p>
            </div>
            {ticket.attendeePhone && (
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="text-sm">{ticket.attendeePhone}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Ticket ID</p>
              <p className="font-mono text-sm">{ticket.id}</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-3 rounded-lg border border-border/40 bg-card/50 p-4">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Fecha y Hora</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(eventDate), "EEEE, d 'de' MMMM, yyyy", { locale: es })}
                </p>
                <p className="text-sm text-muted-foreground">{eventTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Ubicación</p>
                <p className="text-sm text-muted-foreground">{eventLocation}</p>
                <p className="text-sm text-muted-foreground">{eventCity}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleDownload} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleAddToWallet('apple')}
                variant="outline"
                size="sm"
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Apple Wallet
              </Button>
              <Button
                onClick={() => handleAddToWallet('google')}
                variant="outline"
                size="sm"
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Google Pay
              </Button>
            </div>

            <Button onClick={handleShare} variant="outline" className="w-full" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              {copied ? 'Link Copiado!' : 'Compartir Ticket'}
            </Button>
          </div>

          {/* Status Badge */}
          {ticket.status === 'active' && (
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center">
              <p className="text-sm font-medium text-green-500">✓ Ticket Válido</p>
            </div>
          )}

          {ticket.checkInDate && (
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-center">
              <p className="text-sm font-medium text-blue-500">
                Check-in realizado el{' '}
                {format(new Date(ticket.checkInDate), "d/MM/yyyy 'a las' HH:mm", { locale: es })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-border/40 bg-card/50">
        <CardContent className="p-6">
          <h3 className="mb-3 font-semibold">Instrucciones para el Check-in</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>Llega al evento 15 minutos antes del inicio</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>Abre este ticket digital en tu teléfono</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>Muestra el QR al personal en el punto de check-in</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">4.</span>
              <span>Recibirás tu badge/manilla de acceso</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">5.</span>
              <span>¡Disfruta el evento!</span>
            </li>
          </ol>

          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
            <p className="text-sm text-amber-600">
              💡 <strong>Tip:</strong> Asegúrate de tener batería en tu teléfono o descarga el PDF
              como respaldo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
