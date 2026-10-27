'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Vendor } from '@/types/cashless';
import { MapPin, QrCode, ShoppingBag, Coffee, Utensils, Gift } from 'lucide-react';

interface VendorListProps {
  vendors: Vendor[];
  onScan?: (vendorId: string) => void;
}

const categoryIcons = {
  food: Utensils,
  drink: Coffee,
  merchandise: ShoppingBag,
  sponsor: Gift,
  other: ShoppingBag
};

const categoryLabels = {
  food: 'Comida',
  drink: 'Bebidas',
  merchandise: 'Merchandising',
  sponsor: 'Patrocinador',
  other: 'Otro'
};

export function VendorList({ vendors, onScan }: VendorListProps) {
  const activeVendors = vendors.filter((v) => v.isActive && v.acceptsCashless);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Puntos de venta ({activeVendors.length})
        </h2>
        <Button onClick={() => onScan?.('')}>
          <QrCode className="mr-2 h-4 w-4" />
          Escanear QR
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {activeVendors.map((vendor) => {
          const Icon = categoryIcons[vendor.category];
          return (
            <Card key={vendor.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Logo */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-border bg-muted">
                    {vendor.logo ? (
                      <img
                        src={vendor.logo}
                        alt={vendor.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <Icon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{vendor.location}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[vendor.category]}
                      </Badge>
                    </div>

                    {vendor.description && (
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                        {vendor.description}
                      </p>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => onScan?.(vendor.id)}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Pagar aquí
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {activeVendors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No hay puntos de venta disponibles en este momento
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
