'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, UserCheck, Users, Calendar } from 'lucide-react';

export default function CheckinPage() {
  const [scanning, setScanning] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Check-in</h1>
        <p className="text-muted-foreground">Escaneador QR para validación de tickets</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Check-ins Hoy</div>
                <div className="text-2xl font-bold">127</div>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Esperados</div>
                <div className="text-2xl font-bold">450</div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Tasa de Asistencia</div>
                <div className="text-2xl font-bold">28%</div>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Escáner QR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6 flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
              <QrCode className="h-24 w-24 text-muted-foreground" />
            </div>
            <Button
              size="lg"
              onClick={() => setScanning(!scanning)}
            >
              {scanning ? 'Detener Escáner' : 'Iniciar Escáner'}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {scanning
                ? 'Esperando código QR...'
                : 'Haz clic para activar el escáner de códigos QR'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check-ins Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Juan Pérez', ticket: 'TCK-001', time: '10:30' },
              { name: 'María García', ticket: 'TCK-002', time: '10:28' },
              { name: 'Carlos López', ticket: 'TCK-003', time: '10:25' },
            ].map((checkin, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">{checkin.name}</p>
                  <p className="text-sm text-muted-foreground">{checkin.ticket}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">✓ Validado</p>
                  <p className="text-xs text-muted-foreground">{checkin.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
