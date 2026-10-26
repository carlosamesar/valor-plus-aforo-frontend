'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-card border-border text-foreground',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
          error: 'bg-destructive text-destructive-foreground border-destructive',
          success: 'bg-green-500 text-white border-green-600',
          warning: 'bg-yellow-500 text-white border-yellow-600',
          info: 'bg-blue-500 text-white border-blue-600',
        },
      }}
    />
  );
}
