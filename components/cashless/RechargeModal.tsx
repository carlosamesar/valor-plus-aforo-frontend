'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { RechargeMethod } from '@/types/cashless';
import { formatCurrency } from '@/lib/mock-data-cashless';
import { CreditCard, Building, Banknote, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RechargeModalProps {
  onRecharge?: (amount: number, method: RechargeMethod) => void;
  onClose?: () => void;
}

const quickAmounts = [20000, 50000, 100000, 200000];

export function RechargeModal({ onRecharge, onClose }: RechargeModalProps) {
  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState<RechargeMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecharge = async () => {
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    if (finalAmount < 5000) {
      alert('El monto mínimo de recarga es $5,000');
      return;
    }

    setIsProcessing(true);
    // Mock: simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onRecharge?.(finalAmount, method);
    setIsProcessing(false);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recargar Billetera</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Amounts */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium">Montos rápidos</p>
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => {
                    setAmount(quickAmount);
                    setCustomAmount('');
                  }}
                  className={cn(
                    'rounded-lg border-2 p-4 text-center font-semibold transition-colors',
                    amount === quickAmount && !customAmount
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {formatCurrency(quickAmount, 'COP')}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              O ingresa un monto personalizado
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount(0);
                }}
                placeholder="50,000"
                min="5000"
                step="1000"
                className="w-full rounded-lg border border-input bg-background py-3 pl-8 pr-4 text-lg font-semibold ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Monto mínimo: {formatCurrency(5000, 'COP')}
            </p>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium">Método de pago</p>
            <div className="space-y-2">
              <button
                onClick={() => setMethod('card')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border-2 p-4 transition-colors',
                  method === 'card'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <CreditCard className="h-5 w-5" />
                <div className="flex-1 text-left">
                  <p className="font-semibold">Tarjeta de crédito/débito</p>
                  <p className="text-xs text-muted-foreground">Pago inmediato</p>
                </div>
                {method === 'card' && <Check className="h-5 w-5 text-primary" />}
              </button>

              <button
                onClick={() => setMethod('transfer')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border-2 p-4 transition-colors',
                  method === 'transfer'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Building className="h-5 w-5" />
                <div className="flex-1 text-left">
                  <p className="font-semibold">Transferencia bancaria</p>
                  <p className="text-xs text-muted-foreground">
                    Procesado en 5-10 minutos
                  </p>
                </div>
                {method === 'transfer' && <Check className="h-5 w-5 text-primary" />}
              </button>

              <button
                onClick={() => setMethod('cash')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border-2 p-4 transition-colors',
                  method === 'cash'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Banknote className="h-5 w-5" />
                <div className="flex-1 text-left">
                  <p className="font-semibold">Efectivo en punto de recarga</p>
                  <p className="text-xs text-muted-foreground">Nivel 1 - Zona de registro</p>
                </div>
                {method === 'cash' && <Check className="h-5 w-5 text-primary" />}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Monto a recargar</span>
              <span className="font-semibold">
                {formatCurrency(
                  customAmount ? parseInt(customAmount) : amount,
                  'COP'
                )}
              </span>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Comisión</span>
              <span className="font-semibold text-green-500">$0</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total a pagar</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(
                    customAmount ? parseInt(customAmount) : amount,
                    'COP'
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1"
              onClick={handleRecharge}
              disabled={isProcessing || (!amount && !customAmount)}
            >
              {isProcessing ? 'Procesando...' : 'Recargar ahora'}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
            <p className="text-xs text-muted-foreground">
              🔒 Tu información está protegida con encriptación SSL. No almacenamos datos de
              tarjetas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
