'use client';

import { useState } from 'react';
import { EventFilters } from '@/components/events/EventFilters';
import { EventGrid } from '@/components/events/EventGrid';
import { RecommendedEvents } from '@/components/events/RecommendedEvents';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { MOCK_EVENTS } from '@/lib/mock-data';
import type { EventFilters as EventFiltersType } from '@/types/event';

export default function EventosPage() {
  const [filters, setFilters] = useState<EventFiltersType>({});

  const handleFiltersChange = (newFilters: Partial<EventFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  // Filter events based on current filters
  const filteredEvents = MOCK_EVENTS.filter((event) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location?.city?.toLowerCase().includes(searchLower) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(event.category)) return false;
    }

    // Type filter
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(event.type)) return false;
    }

    // Free filter
    if (filters.isFree !== undefined) {
      if (event.isFree !== filters.isFree) return false;
    }

    // City filter
    if (filters.city) {
      const cityLower = filters.city.toLowerCase();
      if (!event.location?.city?.toLowerCase().includes(cityLower)) return false;
    }

    // Price range filter
    if (filters.priceMin !== undefined && event.price !== undefined) {
      if (event.price < filters.priceMin) return false;
    }
    if (filters.priceMax !== undefined && event.price !== undefined) {
      if (event.price > filters.priceMax) return false;
    }

    // Date range filter
    if (filters.dateFrom) {
      if (new Date(event.startDate) < new Date(filters.dateFrom)) return false;
    }
    if (filters.dateTo) {
      if (new Date(event.startDate) > new Date(filters.dateTo)) return false;
    }

    return true;
  });

  // Detectar categorías del usuario basadas en los filtros
  const userCategories = filters.category || [];

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Explorar Eventos
          </h1>
          <p className="mt-2 text-muted-foreground">
            Descubre eventos increíbles cerca de ti o en línea
          </p>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-8">
          <EventFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </ScrollReveal>

      {/* Results Count */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''}{' '}
            {filteredEvents.length !== MOCK_EVENTS.length && 'encontrados'}
          </p>
        </div>
      </ScrollReveal>

      {/* Events Grid */}
      <EventGrid
        events={filteredEvents}
        emptyMessage="No se encontraron eventos con los filtros seleccionados"
      />

      {/* Recommended Events */}
      {filteredEvents.length > 0 && (
        <div className="mt-16">
          <RecommendedEvents userCategories={userCategories} limit={3} />
        </div>
      )}
    </div>
  );
}
