'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Certificate } from '@/types/certificate';
import { Download, Share2, Award, Calendar, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CertificateCardProps {
  certificate: Certificate;
  onDownload?: (certificateId: string) => void;
  onShare?: (certificateId: string) => void;
  onView?: (certificateId: string) => void;
}

export function CertificateCard({
  certificate,
  onDownload,
  onShare,
  onView
}: CertificateCardProps) {
  const statusLabels = {
    available: 'Disponible',
    downloaded: 'Descargado',
    shared: 'Compartido',
    verified: 'Verificado'
  };

  const statusColors = {
    available: 'bg-blue-500/10 text-blue-500',
    downloaded: 'bg-green-500/10 text-green-500',
    shared: 'bg-purple-500/10 text-purple-500',
    verified: 'bg-orange-500/10 text-orange-500'
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">{certificate.eventName}</h3>
              <p className="text-sm text-muted-foreground">
                {certificate.organizerName}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={statusColors[certificate.status]}>
            {statusLabels[certificate.status]}
          </Badge>
        </div>

        {/* Details */}
        <div className="mb-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(certificate.eventDate), "d 'de' MMMM, yyyy", {
                locale: es
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{certificate.hoursAttended} horas de asistencia</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="h-4 w-4" />
            <span className="font-mono text-xs">
              {certificate.certificateNumber}
            </span>
          </div>
        </div>

        {/* Activities */}
        {certificate.activities.length > 0 && (
          <div className="mb-4 rounded-lg border border-border bg-muted/50 p-3">
            <p className="mb-2 text-sm font-medium">Actividades completadas:</p>
            <ul className="space-y-1">
              {certificate.activities.slice(0, 3).map((activity, index) => (
                <li key={index} className="text-xs text-muted-foreground">
                  • {activity}
                </li>
              ))}
              {certificate.activities.length > 3 && (
                <li className="text-xs text-muted-foreground">
                  • +{certificate.activities.length - 3} más
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="default"
            className="flex-1"
            onClick={() => onView?.(certificate.id)}
          >
            Ver Certificado
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDownload?.(certificate.id)}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onShare?.(certificate.id)}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
