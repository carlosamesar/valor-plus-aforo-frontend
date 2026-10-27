'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { paymentMethods } from '@/lib/mock-data-tickets';
import type { PaymentMethodType } from '@/types/ticket';
import { CreditCard, Wallet, Building2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethodsProps {
  selectedMethod: PaymentMethodType | null;
  onSelect: (method: PaymentMethodType) => void;
}

const iconMap = {
  CreditCard,
  Wallet,
  Building2
};

export function PaymentMethods({ selectedMethod, onSelect }: PaymentMethodsProps) {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Método de Pago</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = iconMap[method.icon as keyof typeof iconMap] || CreditCard;
          const isSelected = selectedMethod === method.type;

          return (
            <button
              key={method.type}
              onClick={() => onSelect(method.type)}
              className={cn(
                'relative w-full rounded-lg border-2 p-4 text-left transition-all hover:border-primary/50',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border/40 bg-background'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    isSelected ? 'bg-primary/10' : 'bg-muted'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{method.label}</h3>
                    {isSelected && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>

                  {/* Mock Payment Form */}
                  {isSelected && method.type === 'card' && (
                    <div className="mt-4 space-y-3 rounded-lg border border-border/40 bg-background p-3">
                      <p className="text-xs font-medium text-muted-foreground">
                        Datos de la tarjeta (Demo)
                      </p>
                      <input
                        type="text"
                        placeholder="Número de tarjeta"
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                        defaultValue="4242 4242 4242 4242"
                        readOnly
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                          defaultValue="12/28"
                          readOnly
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
                          defaultValue="123"
                          readOnly
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        🔒 Pago seguro procesado por Stripe
                      </p>
                    </div>
                  )}

                  {isSelected && method.type === 'mercadopago' && (
                    <div className="mt-4 rounded-lg border border-border/40 bg-background p-3">
                      <p className="text-sm text-muted-foreground">
                        Serás redirigido a Mercado Pago para completar el pago de forma segura.
                      </p>
                    </div>
                  )}

                  {isSelected && method.type === 'transfer' && (
                    <div className="mt-4 space-y-2 rounded-lg border border-border/40 bg-background p-3 text-sm">
                      <p className="font-medium">Datos bancarios:</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Banco: Bancolombia</p>
                        <p>Cuenta: 12345678901</p>
                        <p>Titular: Aforo SAS</p>
                        <p>NIT: 900.123.456-7</p>
                      </div>
                      <p className="text-xs text-amber-600">
                        ⚠️ Confirmaremos tu pago en 24-48 horas
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
