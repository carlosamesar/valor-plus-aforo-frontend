'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const eventos = [
  {
    id: '1',
    name: 'Tech Summit 2026',
    slug: 'tech-summit-2026',
    category: 'Conferencia',
    date: '2026-11-15',
    location: 'Centro de Convenciones',
    tickets: 450,
    capacity: 500,
    revenue: '$45,000',
    status: 'active',
    image: '/images/hero-event.jpg',
  },
  {
    id: '2',
    name: 'Marketing Conference',
    slug: 'marketing-conference',
    category: 'Conferencia',
    date: '2026-11-20',
    location: 'Hotel Grand Plaza',
    tickets: 320,
    capacity: 400,
    revenue: '$32,000',
    status: 'active',
    image: '/images/hero-event.jpg',
  },
  {
    id: '3',
    name: 'Music Festival 2026',
    slug: 'music-festival-2026',
    category: 'Festival',
    date: '2026-12-01',
    location: 'Parque Central',
    tickets: 850,
    capacity: 1000,
    revenue: '$85,000',
    status: 'draft',
    image: '/images/hero-event.jpg',
  },
  {
    id: '4',
    name: 'Startup Pitch Day',
    slug: 'startup-pitch-day',
    category: 'Workshop',
    date: '2026-11-10',
    location: 'Co-working Space',
    tickets: 120,
    capacity: 150,
    revenue: '$12,000',
    status: 'active',
    image: '/images/hero-event.jpg',
  },
];

export default function EventosPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEventos = eventos.filter((evento) =>
    evento.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
          <p className="text-muted-foreground">
            Gestiona todos los eventos de la plataforma
          </p>
        </div>
        <Link href="/admin/eventos/nuevo">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Crear Evento
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar eventos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Filtrar por fecha
            </Button>
            <Button variant="outline">Estado</Button>
            <Button variant="outline">Categoría</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Eventos</div>
            <div className="text-2xl font-bold">{eventos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Activos</div>
            <div className="text-2xl font-bold">
              {eventos.filter((e) => e.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Borradores</div>
            <div className="text-2xl font-bold">
              {eventos.filter((e) => e.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Ingresos Totales</div>
            <div className="text-2xl font-bold">$174,000</div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {filteredEventos.map((evento) => (
          <Card key={evento.id} className="transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Image */}
                <div className="h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Calendar className="h-12 w-12" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{evento.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {evento.category}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          evento.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {evento.status === 'active' ? 'Activo' : 'Borrador'}
                      </Badge>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {evento.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {evento.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {evento.tickets} / {evento.capacity} tickets
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        {evento.revenue}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Link href={`/eventos/${evento.slug}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/admin/eventos/${evento.id}/editar`}>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEventos.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No se encontraron eventos</h3>
            <p className="text-muted-foreground">
              Intenta con una búsqueda diferente o crea un nuevo evento
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
