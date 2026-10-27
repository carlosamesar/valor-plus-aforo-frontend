'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { TicketType } from '@/types/ticket';
import { Check, AlertCircle } from 'lucide-react';

interface TicketTypeCardProps {
  ticketType: TicketType;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
}

export function TicketTypeCard({
  ticketType,
  quantity,
  onQuantityChange,
  maxQuantity = 10
}: TicketTypeCardProps) {
  const isLowStock = ticketType.availability < 20;
  const isSoldOut = ticketType.availability === 0;
  const maxAllowed = Math.min(ticketType.maxPerOrder, ticketType.availability, maxQuantity);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card
      className={`border-2 transition-all ${
        quantity > 0
          ? 'border-primary bg-primary/5'
          : 'border-border/40 hover:border-primary/50'
      } ${isSoldOut ? 'opacity-50' : ''}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{ticketType.name}</CardTitle>
              {ticketType.color && (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: ticketType.color }}
                />
              )}
            </div>
            <CardDescription className="mt-1">{ticketType.description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {ticketType.price === 0 ? 'Gratis' : formatPrice(ticketType.price)}
            </div>
            {ticketType.price > 0 && (
              <p className="text-xs text-muted-foreground">+ fee de servicio</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Features */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Incluye:</p>
          <ul className="space-y-1.5">
            {ticketType.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Availability Badge */}
        <div className="flex items-center gap-2">
          {isSoldOut ? (
            <Badge variant="destructive">Agotado</Badge>
          ) : isLowStock ? (
            <Badge variant="outline" className="border-orange-500 text-orange-500">
              <AlertCircle className="mr-1 h-3 w-3" />
              Solo quedan {ticketType.availability}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              {ticketType.availability} disponibles
            </Badge>
          )}

          {ticketType.maxPerOrder < 10 && !isSoldOut && (
            <Badge variant="outline" className="text-muted-foreground">
              Máx. {ticketType.maxPerOrder} por orden
            </Badge>
          )}
        </div>

        {/* Quantity Selector */}
        {!isSoldOut && (
          <div className="flex items-center gap-3 border-t border-border/40 pt-4">
            <span className="text-sm font-medium">Cantidad:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
                disabled={quantity === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-background text-lg font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => onQuantityChange(Math.min(maxAllowed, quantity + 1))}
                disabled={quantity >= maxAllowed}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-background text-lg font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>
            {quantity > 0 && (
              <span className="ml-auto text-sm font-medium text-primary">
                {formatPrice(ticketType.price * quantity)}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
