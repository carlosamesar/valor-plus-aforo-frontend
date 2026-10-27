'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { DigitalBadge, AccessZone } from '@/types/checkin';
import { QRCodeCanvas } from 'qrcode.react';
import { badgeTypeLabels, badgeTypeColors } from '@/lib/mock-data-checkin';
import { Download, Share2, CheckCircle, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DigitalBadgeDisplayProps {
  badge: DigitalBadge;
  accessZones: AccessZone[];
  onDownload?: () => void;
  onShare?: () => void;
}

export function DigitalBadgeDisplay({
  badge,
  accessZones,
  onDownload,
  onShare
}: DigitalBadgeDisplayProps) {
  const allowedZones = accessZones.filter((zone) =>
    zone.requiredLevel.some((level) => badge.accessLevel.includes(level))
  );

  return (
    <div className="space-y-6">
      {/* Digital Badge Card */}
      <Card className={`overflow-hidden border-4 ${badgeTypeColors[badge.badgeType]}`}>
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <Badge
              variant="outline"
              className={`mb-4 ${badgeTypeColors[badge.badgeType]} border-0 text-white`}
            >
              {badgeTypeLabels[badge.badgeType].toUpperCase()}
            </Badge>
            <h2 className="mb-1 text-3xl font-bold">{badge.attendeeName}</h2>
            {badge.company && (
              <p className="text-lg text-muted-foreground">{badge.company}</p>
            )}
          </div>

          {/* QR Code */}
          <div className="mb-6 rounded-xl border-4 border-dashed border-border bg-white p-6 text-center">
            <div className="mx-auto mb-3 inline-block">
              <QRCodeCanvas value={badge.qrCode} size={200} level="H" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {badge.eventName}
            </p>
            {badge.isActive ? (
              <div className="mt-2 flex items-center justify-center gap-2 text-green-500">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Badge Activo</span>
              </div>
            ) : (
              <p className="mt-2 text-sm text-red-500">Badge Inactivo</p>
            )}
          </div>

          {/* Validity */}
          <div className="mb-6 rounded-lg border border-border bg-muted p-4 text-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-muted-foreground">Válido desde:</span>
              <span className="font-medium">
                {format(new Date(badge.validFrom), "d 'de' MMM, HH:mm", { locale: es })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Válido hasta:</span>
              <span className="font-medium">
                {format(new Date(badge.validUntil), "d 'de' MMM, HH:mm", { locale: es })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={onDownload} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Descargar
            </Button>
            <Button onClick={onShare} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Access Zones */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 font-semibold">Zonas de Acceso Permitidas</h3>
          <div className="space-y-3">
            {allowedZones.map((zone) => (
              <div
                key={zone.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{zone.name}</p>
                    <p className="text-sm text-muted-foreground">{zone.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  {zone.isOpen ? (
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Abierta
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-red-500 text-red-500">
                      Cerrada
                    </Badge>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {zone.currentCapacity}/{zone.maxCapacity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-6">
          <h3 className="mb-3 font-semibold">Instrucciones</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Muestra este QR al personal en cada zona de acceso</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Mantén tu badge activo durante todo el evento</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Descarga una copia por si pierdes conexión</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>No compartas tu QR con otras personas</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
