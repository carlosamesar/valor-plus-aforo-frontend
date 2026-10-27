// Tipos para sistema de tickets y checkout

export type TicketStatus = 'active' | 'used' | 'cancelled' | 'transferred';
export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';
export type PaymentMethodType = 'card' | 'mercadopago' | 'transfer';
export type CheckoutStep = 'attendees' | 'payment' | 'review';

// Tipo de ticket (General, VIP, etc.)
export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  availability: number; // Tickets disponibles
  maxPerOrder: number; // Máximo por orden
  features: string[]; // Beneficios incluidos
  color: string; // Color del badge
}

// Ticket individual (después de compra)
export interface Ticket {
  id: string;
  orderId: string;
  eventId: string;
  ticketTypeId: string;
  ticketType: TicketType;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  qrCode: string; // QR code único
  qrRotation: number; // Timestamp de última rotación (15s)
  status: TicketStatus;
  purchaseDate: string;
  checkInDate?: string;
  seatNumber?: string;
}

// Item en el carrito
export interface CartItem {
  ticketType: TicketType;
  quantity: number;
}

// Datos del asistente en checkout
export interface AttendeeInfo {
  name: string;
  email: string;
  phone: string;
}

// Método de pago
export interface PaymentMethod {
  type: PaymentMethodType;
  label: string;
  icon: string;
  description: string;
}

// Información de facturación
export interface BillingInfo {
  fullName: string;
  email: string;
  phone: string;
  documentType: 'CC' | 'NIT' | 'CE' | 'Passport';
  documentNumber: string;
  address: string;
  city: string;
  country: string;
}

// Orden de compra
export interface Order {
  id: string;
  eventId: string;
  userId?: string; // Si está autenticado
  items: {
    ticketType: TicketType;
    quantity: number;
    subtotal: number;
  }[];
  attendees: AttendeeInfo[];
  billing: BillingInfo;
  payment: {
    method: PaymentMethodType;
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
  };
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  completedAt?: string;
  tickets: Ticket[]; // Tickets generados
}

// Estado del checkout
export interface CheckoutState {
  step: CheckoutStep;
  cart: CartItem[];
  attendees: AttendeeInfo[];
  paymentMethod?: PaymentMethodType;
  billing?: BillingInfo;
  order?: Order;
}

// Resumen de precios
export interface PricingSummary {
  subtotal: number;
  serviceFee: number;
  serviceFeePercent: number;
  tax: number;
  taxPercent: number;
  total: number;
  currency: string;
}
