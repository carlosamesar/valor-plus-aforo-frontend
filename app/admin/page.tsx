'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data
const stats = [
  {
    title: 'Total Eventos',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: 'event',
    href: '/admin/eventos',
  },
  {
    title: 'Tickets Vendidos',
    value: '1,847',
    change: '+23%',
    trend: 'up',
    icon: 'confirmation_number',
    href: '/admin/tickets',
  },
  {
    title: 'Ingresos Totales',
    value: '$124,500',
    change: '+18%',
    trend: 'up',
    icon: 'payments',
    href: '/admin/reportes',
  },
  {
    title: 'Asistentes Registrados',
    value: '3,241',
    change: '-5%',
    trend: 'down',
    icon: 'group',
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
        <h1 className="text-xl font-extrabold tracking-tight text-[#001233]">
          Dashboard
        </h1>
        <p className="text-[13px] text-[#64748b]">
          Resumen general de la plataforma de eventos
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="border-[#e2e8f0] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[13px] font-medium text-[#64748b]">
                  {stat.title}
                </CardTitle>
                <span className="material-symbols-outlined text-xl text-[#94a3b8]">
                  {stat.icon}
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#001233]">
                  {stat.value}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <span
                    className={
                      stat.trend === 'up'
                        ? 'text-[#15803d]'
                        : 'text-[#dc2626]'
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-[#64748b]">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Events */}
        <Card className="border-[#e2e8f0] bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-[#001233]">
                Eventos Recientes
              </CardTitle>
              <Link href="/admin/eventos">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#0377a8] hover:bg-[#e0f2fe]"
                >
                  Ver todos
                  <span className="material-symbols-outlined ml-2 text-base">
                    arrow_forward
                  </span>
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border border-[#e2e8f0] p-4"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-[#001233]">{event.name}</p>
                    <p className="text-sm text-[#64748b]">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#001233]">{event.revenue}</p>
                    <p className="text-sm text-[#64748b]">
                      {event.tickets} tickets
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border-[#e2e8f0] bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-[#001233]">
                Órdenes Recientes
              </CardTitle>
              <Link href="/admin/tickets">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#0377a8] hover:bg-[#e0f2fe]"
                >
                  Ver todas
                  <span className="material-symbols-outlined ml-2 text-base">
                    arrow_forward
                  </span>
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-[#e2e8f0] p-4"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-[#001233]">{order.buyer}</p>
                    <p className="text-sm text-[#64748b]">{order.event}</p>
                    <p className="text-xs text-[#94a3b8]">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#001233]">{order.amount}</p>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === 'completed'
                          ? 'bg-[#dcfce7] text-[#15803d]'
                          : 'bg-[#fef3c7] text-[#b45309]'
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
      <Card className="border-[#e2e8f0] bg-white">
        <CardHeader>
          <CardTitle className="text-base font-bold text-[#001233]">
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/admin/eventos/nuevo">
              <Button
                className="w-full bg-[#0377a8] hover:bg-[#0369a1]"
                size="lg"
              >
                <span className="material-symbols-outlined mr-2">event</span>
                Crear Evento
              </Button>
            </Link>
            <Link href="/admin/checkin">
              <Button
                className="w-full border-[#e2e8f0] text-[#001233] hover:bg-[#f1f5f9]"
                variant="outline"
                size="lg"
              >
                <span className="material-symbols-outlined mr-2">
                  qr_code_scanner
                </span>
                Iniciar Check-in
              </Button>
            </Link>
            <Link href="/admin/reportes">
              <Button
                className="w-full border-[#e2e8f0] text-[#001233] hover:bg-[#f1f5f9]"
                variant="outline"
                size="lg"
              >
                <span className="material-symbols-outlined mr-2">
                  bar_chart
                </span>
                Ver Reportes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
