'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { EventFilters as EventFiltersType } from '@/types/event';

interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: Partial<EventFiltersType>) => void;
  onClearFilters: () => void;
}

export function EventFilters({ filters, onFiltersChange, onClearFilters }: EventFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    'conferencia',
    'taller',
    'networking',
    'webinar',
    'festival',
    'otro',
  ];

  const types = ['virtual', 'presencial', 'hibrido'];

  const hasActiveFilters =
    filters.search ||
    filters.category?.length ||
    filters.type?.length ||
    filters.isFree !== undefined;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar eventos por nombre, ubicación o palabra clave..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="pl-10 pr-4"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showAdvanced ? 'Ocultar' : 'Más'} Filtros
        </Button>

        {/* Type Filters */}
        {types.map((type) => {
          const isActive = filters.type?.includes(type as any);
          return (
            <Badge
              key={type}
              variant={isActive ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                const currentTypes = filters.type || [];
                const newTypes = isActive
                  ? currentTypes.filter((t) => t !== type)
                  : [...currentTypes, type as any];
                onFiltersChange({
                  type: newTypes.length > 0 ? newTypes : undefined,
                });
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          );
        })}

        {/* Free Filter */}
        <Badge
          variant={filters.isFree ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() =>
            onFiltersChange({
              isFree: filters.isFree ? undefined : true,
            })
          }
        >
          Gratis
        </Badge>

        {/* Clear All */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 text-muted-foreground"
          >
            <X className="h-3 w-3" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 rounded-lg border border-border/40 bg-card/50 p-4">
          <h3 className="text-sm font-semibold">Filtros Avanzados</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categorías</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = filters.category?.includes(category as any);
                  return (
                    <Badge
                      key={category}
                      variant={isActive ? 'default' : 'outline'}
                      className="cursor-pointer text-xs"
                      onClick={() => {
                        const currentCategories = filters.category || [];
                        const newCategories = isActive
                          ? currentCategories.filter((c) => c !== category)
                          : [...currentCategories, category as any];
                        onFiltersChange({
                          category:
                            newCategories.length > 0 ? newCategories : undefined,
                        });
                      }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Ciudad</label>
              <Input
                type="text"
                placeholder="Ej: Ciudad de México"
                value={filters.city || ''}
                onChange={(e) => onFiltersChange({ city: e.target.value })}
              />
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Rango de Precio</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) =>
                    onFiltersChange({
                      priceMin: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) =>
                    onFiltersChange({
                      priceMax: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Rango de Fechas</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => onFiltersChange({ dateFrom: e.target.value })}
                />
                <Input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => onFiltersChange({ dateTo: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
