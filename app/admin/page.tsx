'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Ticket,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const stats = [
  {
    title: 'Total Eventos',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: Calendar,
    href: '/admin/eventos',
  },
  {
    title: 'Tickets Vendidos',
    value: '1,847',
    change: '+23%',
    trend: 'up',
    icon: Ticket,
    href: '/admin/tickets',
  },
  {
    title: 'Ingresos Totales',
    value: '$124,500',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    href: '/admin/reportes',
  },
  {
    title: 'Asistentes Registrados',
    value: '3,241',
    change: '-5%',
    trend: 'down',
    icon: Users,
    href: '/admin/asistentes',
  },
];

const recentEvents = [
  {
    id: '1',
    name: 'Tech Summit 2026',
    date: '2026-11-15',
    tickets: 450,
    revenue: '$45,000',
    status: 'active',
  },
  {
    id: '2',
    name: 'Marketing Conference',
    date: '2026-11-20',
    tickets: 320,
    revenue: '$32,000',
    status: 'active',
  },
  {
    id: '3',
    name: 'Music Festival',
    date: '2026-12-01',
    tickets: 850,
    revenue: '$85,000',
    status: 'draft',
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    event: 'Tech Summit 2026',
    buyer: 'Juan Pérez',
    amount: '$250',
    status: 'completed',
    date: '2026-10-28 10:30',
  },
  {
    id: 'ORD-002',
    event: 'Marketing Conference',
    buyer: 'María García',
    amount: '$180',
    status: 'completed',
    date: '2026-10-28 09:15',
  },
  {
    id: 'ORD-003',
    event: 'Tech Summit 2026',
    buyer: 'Carlos López',
    amount: '$500',
    status: 'pending',
    date: '2026-10-28 08:45',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general de la plataforma de eventos
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendIcon
                      className={`h-3 w-3 ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                    <span
                      className={
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground">vs mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Eventos Recientes</CardTitle>
              <Link href="/admin/eventos">
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{event.revenue}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.tickets} tickets
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Órdenes Recientes</CardTitle>
              <Link href="/admin/tickets">
                <Button variant="ghost" size="sm">
                  Ver todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{order.buyer}</p>
                    <p className="text-sm text-muted-foreground">{order.event}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs ${
                        order.status === 'completed'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}
                    >
                      {order.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/admin/eventos/nuevo">
              <Button className="w-full" size="lg">
                <Calendar className="mr-2 h-5 w-5" />
                Crear Evento
              </Button>
            </Link>
            <Link href="/admin/checkin">
              <Button className="w-full" variant="outline" size="lg">
                <Ticket className="mr-2 h-5 w-5" />
                Iniciar Check-in
              </Button>
            </Link>
            <Link href="/admin/reportes">
              <Button className="w-full" variant="outline" size="lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                Ver Reportes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
