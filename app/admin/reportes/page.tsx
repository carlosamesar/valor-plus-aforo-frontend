'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes y Analytics</h1>
          <p className="text-muted-foreground">Análisis y estadísticas de la plataforma</p>
        </div>
        <Button size="lg">
          <Download className="mr-2 h-5 w-5" />
          Exportar Reporte
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Ingresos Totales</div>
                <div className="text-2xl font-bold">$124,500</div>
                <div className="text-xs text-green-500">+18% vs mes anterior</div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Tickets Vendidos</div>
                <div className="text-2xl font-bold">1,847</div>
                <div className="text-xs text-green-500">+23% vs mes anterior</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Asistentes</div>
                <div className="text-2xl font-bold">3,241</div>
                <div className="text-xs text-red-500">-5% vs mes anterior</div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Eventos Activos</div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-green-500">+12% vs mes anterior</div>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              [Gráfico de Ventas por Mes]
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eventos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              [Gráfico de Eventos por Categoría]
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top 10 Eventos por Ingresos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Tech Summit 2026', revenue: '$45,000', tickets: 450 },
              { name: 'Marketing Conference', revenue: '$32,000', tickets: 320 },
              { name: 'Music Festival 2026', revenue: '$28,500', tickets: 285 },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.tickets} tickets</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{event.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
