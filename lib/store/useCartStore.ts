import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CartItem,
  TicketType,
  CheckoutStep,
  AttendeeInfo,
  PaymentMethodType,
  BillingInfo,
  Order
} from '@/types/ticket';
import { calculatePricing } from '../mock-data-tickets';

interface CartStore {
  // Estado del carrito
  cart: CartItem[];
  eventId: string | null;

  // Estado del checkout
  checkoutStep: CheckoutStep;
  attendees: AttendeeInfo[];
  paymentMethod: PaymentMethodType | null;
  billing: BillingInfo | null;
  currentOrder: Order | null;

  // Acciones del carrito
  addToCart: (ticketType: TicketType, quantity: number) => void;
  removeFromCart: (ticketTypeId: string) => void;
  updateQuantity: (ticketTypeId: string, quantity: number) => void;
  clearCart: () => void;
  setEventId: (eventId: string) => void;

  // Acciones del checkout
  setCheckoutStep: (step: CheckoutStep) => void;
  setAttendees: (attendees: AttendeeInfo[]) => void;
  setPaymentMethod: (method: PaymentMethodType) => void;
  setBilling: (billing: BillingInfo) => void;
  setCurrentOrder: (order: Order) => void;

  // Helpers
  getTotalItems: () => number;
  getSubtotal: () => number;
  getPricingSummary: () => ReturnType<typeof calculatePricing>;
  getTotalTickets: () => number;
  canProceedToCheckout: () => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      cart: [],
      eventId: null,
      checkoutStep: 'attendees',
      attendees: [],
      paymentMethod: null,
      billing: null,
      currentOrder: null,

      // Acciones del carrito
      addToCart: (ticketType, quantity) => {
        const { cart, eventId } = get();

        // Si es el primer item, establecer eventId
        if (cart.length === 0) {
          set({ eventId: ticketType.eventId });
        }

        // No permitir mezclar eventos
        if (eventId && ticketType.eventId !== eventId) {
          alert('No puedes agregar tickets de diferentes eventos');
          return;
        }

        // Buscar si ya existe en el carrito
        const existingIndex = cart.findIndex(
          (item) => item.ticketType.id === ticketType.id
        );

        if (existingIndex !== -1) {
          // Actualizar cantidad
          const newCart = [...cart];
          const newQuantity = newCart[existingIndex].quantity + quantity;

          // Validar máximo por orden
          if (newQuantity > ticketType.maxPerOrder) {
            alert(`Máximo ${ticketType.maxPerOrder} tickets de este tipo por orden`);
            return;
          }

          // Validar disponibilidad
          if (newQuantity > ticketType.availability) {
            alert(`Solo quedan ${ticketType.availability} tickets disponibles`);
            return;
          }

          newCart[existingIndex].quantity = newQuantity;
          set({ cart: newCart });
        } else {
          // Agregar nuevo item
          if (quantity > ticketType.maxPerOrder) {
            alert(`Máximo ${ticketType.maxPerOrder} tickets de este tipo por orden`);
            return;
          }

          if (quantity > ticketType.availability) {
            alert(`Solo quedan ${ticketType.availability} tickets disponibles`);
            return;
          }

          set({ cart: [...cart, { ticketType, quantity }] });
        }
      },

      removeFromCart: (ticketTypeId) => {
        const { cart } = get();
        const newCart = cart.filter((item) => item.ticketType.id !== ticketTypeId);

        set({
          cart: newCart,
          // Si el carrito queda vacío, resetear eventId
          eventId: newCart.length === 0 ? null : get().eventId
        });
      },

      updateQuantity: (ticketTypeId, quantity) => {
        const { cart } = get();

        if (quantity === 0) {
          get().removeFromCart(ticketTypeId);
          return;
        }

        const newCart = cart.map((item) => {
          if (item.ticketType.id === ticketTypeId) {
            // Validar máximo por orden
            if (quantity > item.ticketType.maxPerOrder) {
              alert(`Máximo ${item.ticketType.maxPerOrder} tickets de este tipo`);
              return item;
            }

            // Validar disponibilidad
            if (quantity > item.ticketType.availability) {
              alert(`Solo quedan ${item.ticketType.availability} tickets disponibles`);
              return item;
            }

            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: newCart });
      },

      clearCart: () => {
        set({
          cart: [],
          eventId: null,
          checkoutStep: 'attendees',
          attendees: [],
          paymentMethod: null,
          billing: null,
          currentOrder: null
        });
      },

      setEventId: (eventId) => {
        set({ eventId });
      },

      // Acciones del checkout
      setCheckoutStep: (step) => {
        set({ checkoutStep: step });
      },

      setAttendees: (attendees) => {
        set({ attendees });
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },

      setBilling: (billing) => {
        set({ billing });
      },

      setCurrentOrder: (order) => {
        set({ currentOrder: order });
      },

      // Helpers
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.ticketType.price * item.quantity,
          0
        );
      },

      getPricingSummary: () => {
        const subtotal = get().getSubtotal();
        return calculatePricing(subtotal);
      },

      getTotalTickets: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      canProceedToCheckout: () => {
        const { cart } = get();
        return cart.length > 0 && get().getTotalItems() > 0;
      }
    }),
    {
      name: 'aforo-cart-storage',
      // Solo persistir el carrito, no el estado del checkout
      partialize: (state) => ({
        cart: state.cart,
        eventId: state.eventId
      })
    }
  )
);
