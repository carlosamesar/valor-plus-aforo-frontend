import { create } from 'zustand';
import type { Event, EventFilters } from '@/types/event';

interface EventsState {
  events: Event[];
  featuredEvents: Event[];
  filters: EventFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  setEvents: (events: Event[]) => void;
  setFeaturedEvents: (events: Event[]) => void;
  setFilters: (filters: Partial<EventFilters>) => void;
  clearFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialFilters: EventFilters = {
  category: undefined,
  type: undefined,
  dateFrom: undefined,
  dateTo: undefined,
  priceMin: undefined,
  priceMax: undefined,
  isFree: undefined,
  search: undefined,
  city: undefined,
};

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  featuredEvents: [],
  filters: initialFilters,
  isLoading: false,
  error: null,

  setEvents: (events) => set({ events }),

  setFeaturedEvents: (featuredEvents) => set({ featuredEvents }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () => set({ filters: initialFilters }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));
