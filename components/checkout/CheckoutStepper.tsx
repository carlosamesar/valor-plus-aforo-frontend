'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CheckoutStep } from '@/types/ticket';

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

const steps: { id: CheckoutStep; label: string; number: number }[] = [
  { id: 'attendees', label: 'Asistentes', number: 1 },
  { id: 'payment', label: 'Pago', number: 2 },
  { id: 'review', label: 'Confirmar', number: 3 }
];

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all',
                    isCompleted && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary bg-primary text-primary-foreground',
                    !isCompleted && !isCurrent && 'border-border/40 bg-background text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium',
                    isCurrent && 'text-primary',
                    !isCurrent && 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Line Connector */}
              {!isLast && (
                <div className="relative mx-2 h-[2px] flex-1 bg-border/40">
                  <div
                    className={cn(
                      'absolute left-0 top-0 h-full bg-primary transition-all',
                      isCompleted ? 'w-full' : 'w-0'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
