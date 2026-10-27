'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Attendee } from '@/types/networking';
import { MessageCircle, Calendar, User, MapPin, Briefcase, Check, Clock, X } from 'lucide-react';

interface AttendeeCardProps {
  attendee: Attendee;
  onConnect?: (attendeeId: string) => void;
  onMessage?: (attendeeId: string) => void;
  onScheduleMeeting?: (attendeeId: string) => void;
  onViewProfile?: (attendeeId: string) => void;
}

export function AttendeeCard({
  attendee,
  onConnect,
  onMessage,
  onScheduleMeeting,
  onViewProfile
}: AttendeeCardProps) {
  const getConnectionButton = () => {
    switch (attendee.connectionStatus) {
      case 'connected':
        return (
          <Button size="sm" variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-2 h-4 w-4" />
            Conectado
          </Button>
        );
      case 'pending':
        return (
          <Button size="sm" variant="outline" disabled>
            <Clock className="mr-2 h-4 w-4" />
            Pendiente
          </Button>
        );
      default:
        return (
          <Button size="sm" onClick={() => onConnect?.(attendee.id)}>
            <User className="mr-2 h-4 w-4" />
            Conectar
          </Button>
        );
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start gap-4">
          <div className="relative">
            <img
              src={attendee.avatar}
              alt={attendee.name}
              className="h-16 w-16 rounded-full"
            />
            {attendee.isOnline && (
              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background bg-green-500" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{attendee.name}</h3>
                {attendee.position && (
                  <p className="text-sm text-muted-foreground">{attendee.position}</p>
                )}
                {attendee.company && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Briefcase className="h-3 w-3" />
                    <span>{attendee.company}</span>
                  </div>
                )}
              </div>
              {getConnectionButton()}
            </div>
          </div>
        </div>

        {/* Bio */}
        {attendee.bio && (
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{attendee.bio}</p>
        )}

        {/* Location & Industry */}
        <div className="mb-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
          {attendee.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{attendee.location}</span>
            </div>
          )}
          {attendee.industry && (
            <Badge variant="secondary">{attendee.industry}</Badge>
          )}
        </div>

        {/* Interests */}
        {attendee.interests && attendee.interests.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {attendee.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
            {attendee.interests.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{attendee.interests.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {attendee.connectionStatus === 'connected' && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onMessage?.(attendee.id)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Mensaje
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onScheduleMeeting?.(attendee.id)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Reunión
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewProfile?.(attendee.id)}
          >
            Ver perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
