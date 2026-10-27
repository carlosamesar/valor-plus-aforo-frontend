'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/lib/store/useCartStore';
import { CheckCircle2, Download, Calendar, Mail, Share2, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MOCK_EVENTS } from '@/lib/mock-data';

function ConfirmacionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');
  const { currentOrder } = useCartStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Si no hay orden actual ni orderId, redirigir
    if (!currentOrder && !orderId) {
      router.push('/eventos');
    }
  }, [currentOrder, orderId, router]);

  if (!currentOrder) {
    return null; // Loading o redirect
  }

  const event = MOCK_EVENTS.find((e) => e.id === currentOrder.eventId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currentOrder.currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleDownloadTickets = () => {
    // Mock: En producción, esto generaría un PDF con todos los tickets
    alert('En producción, esto descargará un PDF con todos los tickets');
  };

  const handleAddToCalendar = () => {
    if (!event) return;
    // Mock: En producción, esto generaría un archivo .ics
    alert(`Agregando "${event.title}" a tu calendario`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <section className="border-b border-border/40 bg-gradient-to-b from-green-500/10 via-background to-background py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <Badge className="mb-3 bg-green-500/10 text-green-500 hover:bg-green-500/20">
              Compra Exitosa
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              ¡Listo! Tu compra fue exitosa
            </h1>
            <p className="text-lg text-muted-foreground">
              Hemos enviado tus tickets a {currentOrder.billing.email}
            </p>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="container py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Order Number */}
          <Card className="border-border/40 bg-card/50">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">Número de Orden</p>
                <p className="text-2xl font-bold">{currentOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Pagado</p>
                <p className="text-2xl font-bold text-primary">{formatPrice(currentOrder.total)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Email Confirmation */}
          <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-green-500">Email enviado</p>
              <p className="text-sm text-muted-foreground">
                Revisa tu bandeja de entrada en {currentOrder.billing.email}. Si no lo ves, revisa
                la carpeta de spam.
              </p>
            </div>
          </div>

          {/* Tickets Generated */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Tus Tickets</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {currentOrder.tickets.map((ticket, index) => (
                <Card key={ticket.id} className="border-border/40">
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: ticket.ticketType.color,
                          color: ticket.ticketType.color
                        }}
                      >
                        {ticket.ticketType.name}
                      </Badge>
                      <Ticket className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="font-medium">{ticket.attendeeName}</p>
                    <p className="text-sm text-muted-foreground">{ticket.attendeeEmail}</p>
                    <Link
                      href={`/mi-cuenta/tickets/${ticket.id}`}
                      className="mt-3 block text-sm font-medium text-primary hover:underline"
                    >
                      Ver Ticket Digital →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button onClick={handleDownloadTickets} variant="outline" className="mt-4 w-full">
              <Download className="mr-2 h-4 w-4" />
              Descargar Todos los Tickets (PDF)
            </Button>
          </div>

          {/* Event Info */}
          {event && (
            <Card className="border-border/40">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Detalles del Evento</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(event.startDate), "d 'de' MMMM, yyyy", { locale: es })} •{' '}
                        {format(new Date(event.startDate), 'HH:mm')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.location?.venue || 'Online'} • {event.location?.city || ''}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Próximos Pasos</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-border/40 bg-card/50 transition-all hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <Calendar className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Agregar al Calendario</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    No te pierdas el evento, agrégalo a tu calendario
                  </p>
                  <Button onClick={handleAddToCalendar} variant="outline" size="sm" className="w-full">
                    Agregar
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 transition-all hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <Ticket className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Ver Mis Tickets</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Accede a tus tickets digitales en cualquier momento
                  </p>
                  <Link href="/mi-cuenta/mis-eventos" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Mis Eventos
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 transition-all hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <Share2 className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Compartir</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Invita a tus amigos a este evento
                  </p>
                  <Button onClick={handleShare} variant="outline" size="sm" className="w-full">
                    {copied ? 'Copiado!' : 'Compartir'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQs */}
          <Card className="border-border/40 bg-card/50">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">¿Necesitas Ayuda?</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">¿No recibiste el email?</p>
                  <p className="text-muted-foreground">
                    Revisa tu carpeta de spam. También puedes ver tus tickets en "Mis Eventos".
                  </p>
                </div>
                <div>
                  <p className="font-medium">¿Cómo uso mi ticket?</p>
                  <p className="text-muted-foreground">
                    El día del evento, abre tu ticket digital y muestra el QR en el punto de
                    check-in.
                  </p>
                </div>
                <div>
                  <p className="font-medium">¿Puedo transferir mi ticket?</p>
                  <p className="text-muted-foreground">
                    Sí, desde "Mis Eventos" puedes transferir tu ticket hasta 24 horas antes.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                Contactar Soporte →
              </Link>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link href="/eventos">
              <Button size="lg">Explorar Más Eventos</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <ConfirmacionContent />
    </Suspense>
  );
}
