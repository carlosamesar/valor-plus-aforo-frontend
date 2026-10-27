'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Meeting } from '@/types/networking';
import { Calendar, Clock, MapPin, User, Check, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface MeetingSchedulerProps {
  meetings: Meeting[];
  onSchedule?: (meeting: Partial<Meeting>) => void;
  onAccept?: (meetingId: string) => void;
  onDecline?: (meetingId: string) => void;
  onCancel?: (meetingId: string) => void;
}

type MeetingFilter = 'upcoming' | 'pending' | 'completed';

export function MeetingScheduler({
  meetings,
  onSchedule,
  onAccept,
  onDecline,
  onCancel
}: MeetingSchedulerProps) {
  const [filter, setFilter] = useState<MeetingFilter>('upcoming');
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const filteredMeetings = meetings.filter((meeting) => {
    const now = new Date();
    const meetingDate = new Date(meeting.date);

    switch (filter) {
      case 'upcoming':
        return (
          meetingDate > now &&
          (meeting.status === 'confirmed' || meeting.status === 'pending')
        );
      case 'pending':
        return meeting.status === 'pending';
      case 'completed':
        return meeting.status === 'completed' || meetingDate < now;
      default:
        return true;
    }
  });

  const getStatusBadge = (status: Meeting['status']) => {
    const variants = {
      pending: { label: 'Pendiente', className: 'bg-yellow-500/10 text-yellow-500' },
      confirmed: { label: 'Confirmada', className: 'bg-green-500/10 text-green-500' },
      declined: { label: 'Rechazada', className: 'bg-red-500/10 text-red-500' },
      completed: { label: 'Completada', className: 'bg-blue-500/10 text-blue-500' },
      cancelled: { label: 'Cancelada', className: 'bg-gray-500/10 text-gray-500' }
    };

    const variant = variants[status];
    return (
      <Badge variant="outline" className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('upcoming')}
          >
            Próximas
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pendientes
            {meetings.filter((m) => m.status === 'pending').length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {meetings.filter((m) => m.status === 'pending').length}
              </Badge>
            )}
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completadas
          </Button>
        </div>

        <Button onClick={() => setShowScheduleForm(!showScheduleForm)}>
          <Calendar className="mr-2 h-4 w-4" />
          Nueva reunión
        </Button>
      </div>

      {/* Schedule Form */}
      {showScheduleForm && (
        <Card className="border-primary">
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold">Agendar nueva reunión</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Mock: aquí iría la lógica real
                alert('Solicitud de reunión enviada');
                setShowScheduleForm(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Con quién quieres reunirte?
                </label>
                <input
                  type="text"
                  placeholder="Buscar asistente..."
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Título</label>
                <input
                  type="text"
                  placeholder="Ej: Café networking"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Fecha</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Hora</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Duración (minutos)
                  </label>
                  <select className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm">
                    <option>15</option>
                    <option>20</option>
                    <option>30</option>
                    <option>45</option>
                    <option>60</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Ubicación</label>
                  <input
                    type="text"
                    placeholder="Ej: Café del evento"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Mensaje (opcional)
                </label>
                <textarea
                  placeholder="Cuéntale por qué quieres reunirte..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Enviar solicitud
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduleForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                {filter === 'upcoming' && 'No tienes reuniones próximas'}
                {filter === 'pending' && 'No tienes solicitudes pendientes'}
                {filter === 'completed' && 'No hay reuniones completadas'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMeetings.map((meeting) => (
            <Card key={meeting.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={
                      meeting.requesterId === 'current-user'
                        ? meeting.attendeeAvatar
                        : meeting.requesterAvatar
                    }
                    alt="Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          con{' '}
                          {meeting.requesterId === 'current-user'
                            ? meeting.attendeeName
                            : meeting.requesterName}
                        </p>
                      </div>
                      {getStatusBadge(meeting.status)}
                    </div>

                    {meeting.description && (
                      <p className="mb-3 text-sm text-muted-foreground">
                        {meeting.description}
                      </p>
                    )}

                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(new Date(meeting.date), "EEEE, d 'de' MMMM, yyyy", {
                            locale: es
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {meeting.time} ({meeting.duration} minutos)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{meeting.location}</span>
                      </div>
                    </div>

                    {meeting.notes && (
                      <div className="mb-4 rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          <AlertCircle className="mr-2 inline h-4 w-4" />
                          <strong>Notas:</strong> {meeting.notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    {meeting.status === 'pending' &&
                      meeting.requesterId !== 'current-user' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => onAccept?.(meeting.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Aceptar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDecline?.(meeting.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Rechazar
                          </Button>
                        </div>
                      )}

                    {meeting.status === 'confirmed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onCancel?.(meeting.id)}
                      >
                        Cancelar reunión
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
