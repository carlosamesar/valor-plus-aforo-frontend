'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TicketTypeCard } from '@/components/tickets/TicketTypeCard';
import { PricingSummary } from '@/components/tickets/PricingSummary';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { mockTicketTypes } from '@/lib/mock-data-tickets';
import { useCartStore } from '@/lib/store/useCartStore';
import { Calendar, MapPin, ArrowRight, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TicketsPage({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  // Zustand store
  const { cart, addToCart, updateQuantity, removeFromCart, getPricingSummary, getTotalTickets, canProceedToCheckout } = useCartStore();

  // Buscar evento
  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.eventId);
  const ticketTypes = mockTicketTypes[resolvedParams.eventId] || [];

  // Inicializar cantidades locales desde el carrito
  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    cart.forEach((item) => {
      initialQuantities[item.ticketType.id] = item.quantity;
    });
    setLocalQuantities(initialQuantities);
  }, [cart]);

  if (!event) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Evento no encontrado</h1>
        <Link href="/eventos" className="mt-4 inline-block text-primary hover:underline">
          Ver todos los eventos
        </Link>
      </div>
    );
  }

  if (ticketTypes.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">No hay tickets disponibles</h1>
        <p className="mt-2 text-muted-foreground">
          Este evento no tiene tickets a la venta en este momento.
        </p>
        <Link href="/eventos" className="mt-4 inline-block text-primary hover:underline">
          Ver otros eventos
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (ticketTypeId: string, newQuantity: number) => {
    const ticketType = ticketTypes.find((tt) => tt.id === ticketTypeId);
    if (!ticketType) return;

    // Actualizar cantidad local
    setLocalQuantities((prev) => ({
      ...prev,
      [ticketTypeId]: newQuantity
    }));

    // Actualizar carrito
    if (newQuantity === 0) {
      removeFromCart(ticketTypeId);
    } else {
      const currentInCart = cart.find((item) => item.ticketType.id === ticketTypeId);
      if (currentInCart) {
        updateQuantity(ticketTypeId, newQuantity);
      } else {
        addToCart(ticketType, newQuantity);
      }
    }
  };

  const handleProceedToCheckout = () => {
    if (!canProceedToCheckout()) {
      alert('Agrega al menos 1 ticket para continuar');
      return;
    }
    router.push('/checkout');
  };

  const pricing = canProceedToCheckout() ? getPricingSummary() : null;
  const totalTickets = getTotalTickets();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Event Image */}
            <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
              <img
                src={event.coverImage}
                alt={event.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                  {event.category}
                </Badge>
                <h1 className="text-3xl font-bold text-white md:text-4xl">{event.title}</h1>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(event.startDate), "d 'de' MMMM, yyyy", { locale: es })}</span>
                <span className="text-muted-foreground">•</span>
                <span>{format(new Date(event.startDate), 'HH:mm')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {event.location?.venue || 'Online'} {event.location?.city && `• ${event.location.city}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Selection */}
      <section className="container py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {/* Left: Tickets */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold">Selecciona tus Tickets</h2>

            <div className="space-y-6">
              {ticketTypes.map((ticketType) => (
                <TicketTypeCard
                  key={ticketType.id}
                  ticketType={ticketType}
                  quantity={localQuantities[ticketType.id] || 0}
                  onQuantityChange={(quantity) => handleQuantityChange(ticketType.id, quantity)}
                />
              ))}
            </div>

            {/* FAQs */}
            <div className="mt-12 space-y-4 rounded-lg border border-border/40 bg-card/50 p-6">
              <h3 className="font-semibold">Preguntas Frecuentes</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">¿Puedo reembolsar mi ticket?</p>
                  <p className="text-muted-foreground">
                    Sí, hasta 48 horas antes del evento recibes el 100% de reembolso. Entre 48-24
                    horas: 50%. Menos de 24 horas: no hay reembolso.
                  </p>
                </div>

                <div>
                  <p className="font-medium">¿Puedo transferir mi ticket?</p>
                  <p className="text-muted-foreground">
                    Sí, puedes transferir tu ticket a otra persona desde tu cuenta en "Mis
                    Eventos" hasta 24 horas antes del evento.
                  </p>
                </div>

                <div>
                  <p className="font-medium">¿Qué pasa si pierdo mi ticket?</p>
                  <p className="text-muted-foreground">
                    Tu ticket digital siempre está disponible en tu cuenta. También lo recibes por
                    email. Si es necesario, puedes volver a descargarlo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary (Sticky) */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {pricing ? (
              <PricingSummary pricing={pricing} ticketCount={totalTickets} />
            ) : (
              <div className="rounded-lg border border-border/40 bg-card p-6 text-center">
                <ShoppingCart className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                <p className="font-medium">No hay tickets seleccionados</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Selecciona la cantidad de tickets que deseas comprar
                </p>
              </div>
            )}

            <Button
              onClick={handleProceedToCheckout}
              disabled={!canProceedToCheckout()}
              className="mt-4 w-full"
              size="lg"
            >
              Continuar al Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Security Badges */}
            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Compra 100% segura</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Tickets digitales instantáneos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
