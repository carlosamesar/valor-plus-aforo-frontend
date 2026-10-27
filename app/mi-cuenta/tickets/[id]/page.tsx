'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DigitalTicket } from '@/components/tickets/DigitalTicket';
import { myTickets } from '@/lib/mock-data-tickets';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export default function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Buscar ticket
  const ticket = myTickets.find((t) => t.id === resolvedParams.id);
  const event = ticket ? MOCK_EVENTS.find((e) => e.id === ticket.eventId) : null;

  if (!ticket || !event) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Ticket no encontrado</h1>
        <Link href="/mi-cuenta/mis-eventos" className="mt-4 inline-block text-primary hover:underline">
          Ver mis eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-8">
        <div className="container">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Mis Eventos
          </button>
          <h1 className="text-3xl font-bold">Mi Ticket Digital</h1>
        </div>
      </section>

      <section className="container py-12">
        <div className="mx-auto max-w-2xl">
          <DigitalTicket
            ticket={ticket}
            eventTitle={event.title}
            eventDate={event.startDate}
            eventTime={format(new Date(event.startDate), 'HH:mm')}
            eventLocation={event.location?.venue || 'Online'}
            eventCity={event.location?.city || ''}
            eventImageUrl={event.coverImage}
            eventId={event.id}
          />
        </div>
      </section>
    </div>
  );
}
