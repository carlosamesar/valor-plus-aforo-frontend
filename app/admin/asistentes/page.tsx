'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Mail, Users, UserCheck } from 'lucide-react';

const asistentes = [
  { id: '1', name: 'Juan Pérez', email: 'juan@email.com', event: 'Tech Summit 2026', tickets: 2, checkIn: true, date: '2026-10-28' },
  { id: '2', name: 'María García', email: 'maria@email.com', event: 'Marketing Conference', tickets: 1, checkIn: false, date: '2026-10-28' },
  { id: '3', name: 'Carlos López', email: 'carlos@email.com', event: 'Tech Summit 2026', tickets: 4, checkIn: true, date: '2026-10-28' },
  { id: '4', name: 'Ana Martínez', email: 'ana@email.com', event: 'Music Festival 2026', tickets: 3, checkIn: false, date: '2026-10-27' },
  { id: '5', name: 'Pedro Sánchez', email: 'pedro@email.com', event: 'Startup Pitch Day', tickets: 1, checkIn: true, date: '2026-10-27' },
];

export default function AsistentesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAsistentes = asistentes.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asistentes</h1>
          <p className="text-muted-foreground">Gestiona todos los asistentes registrados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="lg">
            <Mail className="mr-2 h-5 w-5" />
            Enviar Email
          </Button>
          <Button size="lg">
            <Download className="mr-2 h-5 w-5" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Asistentes</div>
                <div className="text-2xl font-bold">{asistentes.length}</div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Check-in Realizados</div>
                <div className="text-2xl font-bold">{asistentes.filter((a) => a.checkIn).length}</div>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Pendientes</div>
                <div className="text-2xl font-bold">{asistentes.filter((a) => !a.checkIn).length}</div>
              </div>
              <UserCheck className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre o email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Asistentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3">Nombre</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Evento</th>
                  <th className="pb-3">Tickets</th>
                  <th className="pb-3">Check-in</th>
                  <th className="pb-3">Fecha Registro</th>
                  <th className="pb-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAsistentes.map((asistente) => (
                  <tr key={asistente.id} className="border-b border-border">
                    <td className="py-4 font-medium">{asistente.name}</td>
                    <td className="py-4 text-sm text-muted-foreground">{asistente.email}</td>
                    <td className="py-4">{asistente.event}</td>
                    <td className="py-4">{asistente.tickets}</td>
                    <td className="py-4">
                      <Badge variant={asistente.checkIn ? 'default' : 'secondary'}>
                        {asistente.checkIn ? 'Realizado' : 'Pendiente'}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{asistente.date}</td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">Ver detalles</Button>
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
