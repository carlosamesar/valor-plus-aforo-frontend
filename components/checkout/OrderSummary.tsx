'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/useCartStore';
import { ShoppingCart } from 'lucide-react';

export function OrderSummary() {
  const { cart, getPricingSummary, getTotalTickets } = useCartStore();
  const pricing = getPricingSummary();
  const totalTickets = getTotalTickets();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: pricing.currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <Card className="border-border/40">
        <CardContent className="py-12 text-center">
          <ShoppingCart className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Tu carrito está vacío</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-lg">Resumen de Orden</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.ticketType.id} className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium">{item.ticketType.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {formatPrice(item.ticketType.price)}
                </p>
              </div>
              <Badge
                variant="outline"
                style={{
                  borderColor: item.ticketType.color,
                  color: item.ticketType.color
                }}
              >
                {formatPrice(item.ticketType.price * item.quantity)}
              </Badge>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {totalTickets} {totalTickets === 1 ? 'ticket' : 'tickets'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">{formatPrice(pricing.subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>Fee de servicio ({pricing.serviceFeePercent}%)</span>
            <span className="font-medium">{formatPrice(pricing.serviceFee)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>IVA ({pricing.taxPercent}%)</span>
            <span className="font-medium">{formatPrice(pricing.tax)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">{formatPrice(pricing.total)}</span>
        </div>

        {/* Security Badges */}
        <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Pago 100% seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Tickets digitales instantáneos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Reembolso hasta 48h antes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
