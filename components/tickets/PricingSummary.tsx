'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { PricingSummary as PricingSummaryType } from '@/types/ticket';

interface PricingSummaryProps {
  pricing: PricingSummaryType;
  ticketCount: number;
  showTitle?: boolean;
}

export function PricingSummary({ pricing, ticketCount, showTitle = true }: PricingSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: pricing.currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="border-border/40">
      {showTitle && (
        <CardHeader>
          <CardTitle className="text-lg">Resumen</CardTitle>
        </CardHeader>
      )}
      <CardContent className={showTitle ? '' : 'pt-6'}>
        <div className="space-y-3">
          {/* Ticket count */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
            </span>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Subtotal</span>
            <span className="font-medium">{formatPrice(pricing.subtotal)}</span>
          </div>

          {/* Service Fee */}
          <div className="flex items-center justify-between">
            <span className="text-sm">
              Fee de servicio ({pricing.serviceFeePercent}%)
            </span>
            <span className="font-medium">{formatPrice(pricing.serviceFee)}</span>
          </div>

          {/* Tax */}
          <div className="flex items-center justify-between">
            <span className="text-sm">IVA ({pricing.taxPercent}%)</span>
            <span className="font-medium">{formatPrice(pricing.tax)}</span>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(pricing.total)}</span>
          </div>

          {/* Info */}
          <p className="text-xs text-muted-foreground">
            Los precios incluyen IVA. El fee de servicio cubre costos de procesamiento y emisión
            de tickets digitales.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
