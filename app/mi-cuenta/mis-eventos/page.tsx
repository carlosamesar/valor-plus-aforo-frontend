'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockOrders } from '@/lib/mock-data-tickets';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { Calendar, MapPin, Ticket, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type Tab = 'upcoming' | 'past' | 'cancelled';

export default function MisEventosPage() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  // Agrupar órdenes por estado basado en la fecha del evento
  const now = new Date();
  const upcomingOrders = mockOrders.filter((order) => {
    const event = MOCK_EVENTS.find((e) => e.id === order.eventId);
    return event && new Date(event.startDate) > now && order.status === 'completed';
  });

  const pastOrders = mockOrders.filter((order) => {
    const event = MOCK_EVENTS.find((e) => e.id === order.eventId);
    return event && new Date(event.startDate) <= now && order.status === 'completed';
  });

  const cancelledOrders = mockOrders.filter((order) => order.status === 'cancelled');

  const tabs = [
    { id: 'upcoming' as Tab, label: 'Próximos', count: upcomingOrders.length },
    { id: 'past' as Tab, label: 'Pasados', count: pastOrders.length },
    { id: 'cancelled' as Tab, label: 'Cancelados', count: cancelledOrders.length }
  ];

  const currentOrders =
    activeTab === 'upcoming'
      ? upcomingOrders
      : activeTab === 'past'
      ? pastOrders
      : cancelledOrders;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
              Mi Cuenta
            </Badge>
            <h1 className="text-4xl font-bold">Mis Eventos</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Gestiona tus tickets y eventos registrados
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative px-6 py-4 text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        'ml-2',
                        activeTab === tab.id && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {tab.count}
                    </Badge>
                  )}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          {currentOrders.length === 0 ? (
            <div className="py-24 text-center">
              <Ticket className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-bold">No tienes eventos {activeTab === 'upcoming' ? 'próximos' : activeTab === 'past' ? 'pasados' : 'cancelados'}</h2>
              <p className="mb-6 text-muted-foreground">
                {activeTab === 'upcoming' && 'Explora eventos y compra tus tickets'}
                {activeTab === 'past' && 'Aún no has asistido a ningún evento'}
                {activeTab === 'cancelled' && 'No tienes órdenes canceladas'}
              </p>
              <Link
                href="/eventos"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Explorar Eventos
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {currentOrders.map((order) => {
                const event = MOCK_EVENTS.find((e) => e.id === order.eventId);
                if (!event) return null;

                return (
                  <Card key={order.id} className="border-border/40 transition-all hover:border-primary/50">
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-4 p-6 md:flex-row">
                        {/* Event Image */}
                        <div className="relative h-32 w-full overflow-hidden rounded-lg md:h-40 md:w-40 md:shrink-0">
                          <img
                            src={event.coverImage}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                          <Badge className="absolute right-2 top-2 bg-background/90 text-foreground">
                            {event.category}
                          </Badge>
                        </div>

                        {/* Event Info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="mb-2 text-xl font-bold">{event.title}</h3>

                            <div className="mb-3 space-y-1 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {format(new Date(event.startDate), "d 'de' MMMM, yyyy", {
                                    locale: es
                                  })}{' '}
                                  • {format(new Date(event.startDate), 'HH:mm')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {event.location?.venue || 'Online'} • {event.location?.city || ''}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Ticket className="h-4 w-4" />
                                <span>
                                  {order.tickets.length} {order.tickets.length === 1 ? 'ticket' : 'tickets'}
                                </span>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                              Orden: {order.id} • {formatPrice(order.total, order.currency)}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {order.tickets.map((ticket, index) => (
                              <Link
                                key={ticket.id}
                                href={`/mi-cuenta/tickets/${ticket.id}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent"
                              >
                                Ver Ticket {order.tickets.length > 1 ? index + 1 : ''}
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
