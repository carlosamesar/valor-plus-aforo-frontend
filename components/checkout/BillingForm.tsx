'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BillingInfo } from '@/types/ticket';

const billingSchema = z.object({
  fullName: z.string().min(3, 'Nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono debe tener al menos 10 dígitos'),
  documentType: z.enum(['CC', 'NIT', 'CE', 'Passport']),
  documentNumber: z.string().min(5, 'Número de documento inválido'),
  address: z.string().min(5, 'Dirección debe tener al menos 5 caracteres'),
  city: z.string().min(2, 'Ciudad requerida'),
  country: z.string().min(2, 'País requerido')
});

interface BillingFormProps {
  initialData?: Partial<BillingInfo>;
  onSubmit: (data: BillingInfo) => void;
  onBack?: () => void;
}

export function BillingForm({ initialData, onSubmit, onBack }: BillingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BillingInfo>({
    resolver: zodResolver(billingSchema),
    defaultValues: initialData
  });

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Información de Facturación</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
              Nombre Completo / Razón Social *
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Juan Pérez García"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="juan@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Teléfono *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="+57 300 1234567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Tipo y Número de Documento */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="documentType" className="mb-2 block text-sm font-medium">
                Tipo de Documento *
              </label>
              <select
                id="documentType"
                {...register('documentType')}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="NIT">NIT</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="Passport">Pasaporte</option>
              </select>
              {errors.documentType && (
                <p className="mt-1 text-sm text-red-500">{errors.documentType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="documentNumber" className="mb-2 block text-sm font-medium">
                Número de Documento *
              </label>
              <input
                id="documentNumber"
                type="text"
                {...register('documentNumber')}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="1234567890"
              />
              {errors.documentNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.documentNumber.message}</p>
              )}
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-medium">
              Dirección *
            </label>
            <input
              id="address"
              type="text"
              {...register('address')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Calle 123 #45-67"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Ciudad y País */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-medium">
                Ciudad *
              </label>
              <input
                id="city"
                type="text"
                {...register('city')}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Bogotá"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-medium">
                País *
              </label>
              <input
                id="country"
                type="text"
                {...register('country')}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Colombia"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {onBack && (
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                Atrás
              </Button>
            )}
            <Button type="submit" className="flex-1">
              Continuar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
