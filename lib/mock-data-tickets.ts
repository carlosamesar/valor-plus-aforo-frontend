import { TicketType, PaymentMethod, Order, Ticket } from '@/types/ticket';
import { MOCK_EVENTS } from './mock-data';

// Tipos de tickets por evento
export const mockTicketTypes: Record<string, TicketType[]> = {
  '1': [ // Summit Innovación Digital 2026
    {
      id: 'tt-1-general',
      eventId: '1',
      name: 'Entrada General',
      description: 'Acceso a todas las conferencias y exhibiciones',
      price: 150000,
      currency: 'COP',
      availability: 245,
      maxPerOrder: 10,
      features: [
        'Acceso a todas las conferencias',
        'Material del evento digital',
        'Certificado de asistencia',
        'Coffee breaks incluidos',
        'Networking area'
      ],
      color: '#3b82f6' // blue
    },
    {
      id: 'tt-1-vip',
      eventId: '1',
      name: 'Entrada VIP',
      description: 'Experiencia premium con beneficios exclusivos',
      price: 350000,
      currency: 'COP',
      availability: 15,
      maxPerOrder: 4,
      features: [
        'Todo lo de Entrada General',
        'Asientos reservados en primera fila',
        'Almuerzo gourmet incluido',
        'Acceso a Speaker Lounge',
        'Welcome kit premium',
        'Sesión de fotos con speakers',
        'Parking gratuito'
      ],
      color: '#f59e0b' // amber
    },
    {
      id: 'tt-1-backstage',
      eventId: '1',
      name: 'Backstage Pass',
      description: 'Acceso total detrás de escena',
      price: 800000,
      currency: 'COP',
      availability: 3,
      maxPerOrder: 2,
      features: [
        'Todo lo de Entrada VIP',
        'Acceso backstage completo',
        'Reunión privada con 3 speakers',
        'Cena exclusiva con organizadores',
        'Grabación del evento en USB',
        'Merchandising completo',
        'Reconocimiento en créditos'
      ],
      color: '#8b5cf6' // violet
    }
  ],
  '2': [ // Bogotá Music Fest
    {
      id: 'tt-2-general',
      eventId: '2',
      name: 'General Admission',
      description: 'Acceso general al festival',
      price: 120000,
      currency: 'COP',
      availability: 1850,
      maxPerOrder: 8,
      features: [
        'Acceso a todos los escenarios',
        'Festival wristband',
        'Lockers disponibles (adicional)',
        'Food court access',
        'Zonas de descanso'
      ],
      color: '#3b82f6'
    },
    {
      id: 'tt-2-golden',
      eventId: '2',
      name: 'Golden Circle',
      description: 'Zona preferencial cerca del escenario',
      price: 280000,
      currency: 'COP',
      availability: 142,
      maxPerOrder: 4,
      features: [
        'Zona preferencial escenario principal',
        'Entrada prioritaria',
        'Baños exclusivos',
        'Bar VIP incluido',
        'Charging stations',
        'Área de sombra'
      ],
      color: '#f59e0b'
    }
  ],
  '3': [ // Workshop Design Thinking
    {
      id: 'tt-3-individual',
      eventId: '3',
      name: 'Ticket Individual',
      description: 'Acceso individual al workshop',
      price: 80000,
      currency: 'COP',
      availability: 18,
      maxPerOrder: 1,
      features: [
        'Material del workshop',
        'Certificado de participación',
        'Coffee break',
        'Kit de herramientas digitales',
        'Acceso a comunidad online'
      ],
      color: '#3b82f6'
    },
    {
      id: 'tt-3-team',
      eventId: '3',
      name: 'Ticket Corporativo (5 personas)',
      description: 'Paquete para equipos de trabajo',
      price: 350000,
      currency: 'COP',
      availability: 4,
      maxPerOrder: 2,
      features: [
        'Todo lo de Ticket Individual x5',
        'Sesión privada post-workshop',
        'Consultoría de seguimiento (1 hora)',
        'Templates exclusivos',
        'Descuento 15% para futuros eventos'
      ],
      color: '#8b5cf6'
    }
  ],
  '4': [ // Webinar IA
    {
      id: 'tt-4-free',
      eventId: '4',
      name: 'Acceso Gratuito',
      description: 'Streaming en vivo gratis',
      price: 0,
      currency: 'COP',
      availability: 9850,
      maxPerOrder: 1,
      features: [
        'Streaming en vivo',
        'Acceso al chat',
        'Q&A participación',
        'Certificado de asistencia'
      ],
      color: '#10b981' // green
    }
  ],
  '5': [ // Feria Gastronómica
    {
      id: 'tt-5-general',
      eventId: '5',
      name: 'Entrada General',
      description: 'Acceso a la feria',
      price: 25000,
      currency: 'COP',
      availability: 2450,
      maxPerOrder: 10,
      features: [
        'Acceso a todos los stands',
        'Mapa de la feria',
        'Descuentos en consumos',
        'Parking disponible (adicional)'
      ],
      color: '#3b82f6'
    },
    {
      id: 'tt-5-tasting',
      eventId: '5',
      name: 'Tasting Pass',
      description: 'Incluye degustaciones',
      price: 60000,
      currency: 'COP',
      availability: 324,
      maxPerOrder: 6,
      features: [
        'Todo lo de Entrada General',
        '10 degustaciones incluidas',
        'Copa de bienvenida',
        'Recetario digital',
        'Descuento 20% en compras'
      ],
      color: '#f59e0b'
    }
  ],
  '6': [ // Campus Party
    {
      id: 'tt-6-day',
      eventId: '6',
      name: 'Day Pass',
      description: 'Acceso por 1 día',
      price: 45000,
      currency: 'COP',
      availability: 1240,
      maxPerOrder: 5,
      features: [
        'Acceso a conferencias',
        'WiFi de alta velocidad',
        'Áreas de trabajo',
        'Hackathons',
        'Gaming zone'
      ],
      color: '#3b82f6'
    },
    {
      id: 'tt-6-full',
      eventId: '6',
      name: 'Full Event Pass (3 días)',
      description: 'Acceso completo 3 días',
      price: 110000,
      currency: 'COP',
      availability: 458,
      maxPerOrder: 3,
      features: [
        'Todo lo de Day Pass x3 días',
        'Campusero badge especial',
        'Descuento 20% en food court',
        'Acceso a workshops premium',
        'Kit de swag completo'
      ],
      color: '#8b5cf6'
    }
  ]
};

// Métodos de pago disponibles
export const paymentMethods: PaymentMethod[] = [
  {
    type: 'card',
    label: 'Tarjeta de Crédito/Débito',
    icon: 'CreditCard',
    description: 'Paga con Visa, Mastercard, AmEx vía Stripe'
  },
  {
    type: 'mercadopago',
    label: 'Mercado Pago',
    icon: 'Wallet',
    description: 'PSE, Efecty, tarjetas y más'
  },
  {
    type: 'transfer',
    label: 'Transferencia Bancaria',
    icon: 'Building2',
    description: 'Confirmación manual en 24-48 horas'
  }
];

// Helper: Calcular resumen de precios
export function calculatePricing(
  subtotal: number,
  serviceFeePercent: number = 5,
  taxPercent: number = 19
) {
  const serviceFee = Math.round(subtotal * (serviceFeePercent / 100));
  const taxableAmount = subtotal + serviceFee;
  const tax = Math.round(taxableAmount * (taxPercent / 100));
  const total = subtotal + serviceFee + tax;

  return {
    subtotal,
    serviceFee,
    serviceFeePercent,
    tax,
    taxPercent,
    total,
    currency: 'COP'
  };
}

// Helper: Generar QR code único
export function generateQRCode(ticketId: string): string {
  return `AFORO-${ticketId}-${Date.now().toString(36).toUpperCase()}`;
}

// Helper: Generar orden mock
export function generateMockOrder(
  eventId: string,
  items: { ticketType: TicketType; quantity: number }[],
  attendees: { name: string; email: string; phone: string }[]
): Order {
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
  const subtotal = items.reduce((sum, item) => sum + (item.ticketType.price * item.quantity), 0);
  const pricing = calculatePricing(subtotal);

  // Generar tickets
  const tickets: Ticket[] = [];
  let ticketIndex = 0;

  items.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}-${ticketIndex++}`;
      const attendee = attendees[ticketIndex - 1] || attendees[0];

      tickets.push({
        id: ticketId,
        orderId,
        eventId,
        ticketTypeId: item.ticketType.id,
        ticketType: item.ticketType,
        attendeeName: attendee.name,
        attendeeEmail: attendee.email,
        attendeePhone: attendee.phone,
        qrCode: generateQRCode(ticketId),
        qrRotation: Date.now(),
        status: 'active',
        purchaseDate: new Date().toISOString()
      });
    }
  });

  return {
    id: orderId,
    eventId,
    items: items.map(item => ({
      ticketType: item.ticketType,
      quantity: item.quantity,
      subtotal: item.ticketType.price * item.quantity
    })),
    attendees,
    billing: {
      fullName: attendees[0].name,
      email: attendees[0].email,
      phone: attendees[0].phone,
      documentType: 'CC',
      documentNumber: '1234567890',
      address: 'Calle 123 #45-67',
      city: 'Bogotá',
      country: 'Colombia'
    },
    payment: {
      method: 'card',
      status: 'completed',
      transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`
    },
    subtotal: pricing.subtotal,
    serviceFee: pricing.serviceFee,
    tax: pricing.tax,
    total: pricing.total,
    currency: pricing.currency,
    status: 'completed',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    tickets
  };
}

// Órdenes mock de ejemplo
export const mockOrders: Order[] = [
  generateMockOrder(
    '1',
    [
      { ticketType: mockTicketTypes['1'][0], quantity: 2 }
    ],
    [
      { name: 'Juan Pérez', email: 'juan@example.com', phone: '+57 300 1234567' },
      { name: 'María García', email: 'maria@example.com', phone: '+57 301 7654321' }
    ]
  ),
  generateMockOrder(
    '2',
    [
      { ticketType: mockTicketTypes['2'][1], quantity: 1 }
    ],
    [
      { name: 'Carlos Rodríguez', email: 'carlos@example.com', phone: '+57 302 9876543' }
    ]
  )
];

// Mock: Mis tickets (usuario logueado)
export const myTickets: Ticket[] = mockOrders.flatMap(order => order.tickets);
