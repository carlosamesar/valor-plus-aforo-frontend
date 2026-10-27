'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AttendeeInfo } from '@/types/ticket';
import { User } from 'lucide-react';

const attendeeSchema = z.object({
  name: z.string().min(3, 'Nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono debe tener al menos 10 dígitos')
});

interface AttendeeFormProps {
  attendeeIndex: number;
  totalAttendees: number;
  initialData?: AttendeeInfo;
  onSubmit: (data: AttendeeInfo) => void;
  onFillWithMe?: () => void;
}

export function AttendeeForm({
  attendeeIndex,
  totalAttendees,
  initialData,
  onSubmit,
  onFillWithMe
}: AttendeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AttendeeInfo>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: initialData
  });

  return (
    <Card className="border-border/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Asistente {attendeeIndex + 1}
              {totalAttendees > 1 && <span className="text-muted-foreground">de {totalAttendees}</span>}
            </CardTitle>
            <CardDescription>Datos del asistente al evento</CardDescription>
          </div>
          {attendeeIndex === 0 && onFillWithMe && (
            <Button type="button" variant="outline" size="sm" onClick={onFillWithMe}>
              Soy yo
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre Completo */}
          <div>
            <label htmlFor={`name-${attendeeIndex}`} className="mb-2 block text-sm font-medium">
              Nombre Completo *
            </label>
            <input
              id={`name-${attendeeIndex}`}
              type="text"
              {...register('name')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Juan Pérez García"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor={`email-${attendeeIndex}`} className="mb-2 block text-sm font-medium">
              Email *
            </label>
            <input
              id={`email-${attendeeIndex}`}
              type="email"
              {...register('email')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="juan@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              Se enviará el ticket a este correo
            </p>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor={`phone-${attendeeIndex}`} className="mb-2 block text-sm font-medium">
              Teléfono *
            </label>
            <input
              id={`phone-${attendeeIndex}`}
              type="tel"
              {...register('phone')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="+57 300 1234567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Guardar Asistente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
