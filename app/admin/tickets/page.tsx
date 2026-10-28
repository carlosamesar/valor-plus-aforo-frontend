'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, Ticket, DollarSign, TrendingUp } from 'lucide-react';

const orders = [
  { id: 'ORD-001', event: 'Tech Summit 2026', buyer: 'Juan Pérez', email: 'juan@email.com', tickets: 2, amount: '$250', status: 'completed', date: '2026-10-28 10:30' },
  { id: 'ORD-002', event: 'Marketing Conference', buyer: 'María García', email: 'maria@email.com', tickets: 1, amount: '$180', status: 'completed', date: '2026-10-28 09:15' },
  { id: 'ORD-003', event: 'Tech Summit 2026', buyer: 'Carlos López', email: 'carlos@email.com', tickets: 4, amount: '$500', status: 'pending', date: '2026-10-28 08:45' },
  { id: 'ORD-004', event: 'Music Festival 2026', buyer: 'Ana Martínez', email: 'ana@email.com', tickets: 3, amount: '$300', status: 'completed', date: '2026-10-27 18:20' },
  { id: 'ORD-005', event: 'Startup Pitch Day', buyer: 'Pedro Sánchez', email: 'pedro@email.com', tickets: 1, amount: '$100', status: 'cancelled', date: '2026-10-27 14:10' },
];

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(
    (order) =>
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets y Ventas</h1>
          <p className="text-muted-foreground">
            Gestiona todas las órdenes y tickets vendidos
          </p>
        </div>
        <Button size="lg">
          <Download className="mr-2 h-5 w-5" />
          Exportar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Ventas</div>
                <div className="text-2xl font-bold">$1,330</div>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Tickets Vendidos</div>
                <div className="text-2xl font-bold">11</div>
              </div>
              <Ticket className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Completadas</div>
                <div className="text-2xl font-bold">3</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Pendientes</div>
                <div className="text-2xl font-bold">1</div>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID, nombre o email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Órdenes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Evento</th>
                  <th className="pb-3">Comprador</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Tickets</th>
                  <th className="pb-3">Monto</th>
                  <th className="pb-3">Estado</th>
                  <th className="pb-3">Fecha</th>
                  <th className="pb-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border">
                    <td className="py-4 font-mono text-sm">{order.id}</td>
                    <td className="py-4">{order.event}</td>
                    <td className="py-4 font-medium">{order.buyer}</td>
                    <td className="py-4 text-sm text-muted-foreground">{order.email}</td>
                    <td className="py-4">{order.tickets}</td>
                    <td className="py-4 font-semibold">{order.amount}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          order.status === 'completed'
                            ? 'default'
                            : order.status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                        }
                      >
                        {order.status === 'completed'
                          ? 'Completado'
                          : order.status === 'pending'
                            ? 'Pendiente'
                            : 'Cancelado'}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
                        Ver detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
