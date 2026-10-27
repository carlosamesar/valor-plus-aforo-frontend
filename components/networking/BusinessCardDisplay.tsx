'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BusinessCard } from '@/types/networking';
import { QRCodeCanvas } from 'qrcode.react';
import { Mail, Phone, Globe, Download, Share2, User } from 'lucide-react';

interface BusinessCardDisplayProps {
  card: BusinessCard;
  onShare?: () => void;
  onDownload?: () => void;
}

export function BusinessCardDisplay({
  card,
  onShare,
  onDownload
}: BusinessCardDisplayProps) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyContact = async () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
ORG:${card.company}
TITLE:${card.position}
EMAIL:${card.email}
${card.phone ? `TEL:${card.phone}` : ''}
${card.website ? `URL:${card.website}` : ''}
END:VCARD`;

    try {
      await navigator.clipboard.writeText(vCard);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Digital Card */}
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardContent className="p-8">
          <div className="mb-6 flex items-start gap-6">
            <img
              src={card.avatar}
              alt={card.name}
              className="h-24 w-24 rounded-full border-4 border-background shadow-lg"
            />
            <div className="flex-1">
              <h2 className="mb-1 text-2xl font-bold">{card.name}</h2>
              <p className="mb-2 text-lg font-medium text-primary">{card.position}</p>
              <p className="text-muted-foreground">{card.company}</p>
            </div>
          </div>

          {card.bio && (
            <p className="mb-6 text-sm text-muted-foreground">{card.bio}</p>
          )}

          {/* Contact Info */}
          <div className="space-y-3">
            <a
              href={`mailto:${card.email}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{card.email}</span>
            </a>

            {card.phone && (
              <a
                href={`tel:${card.phone}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{card.phone}</span>
              </a>
            )}

            {card.website && (
              <a
                href={card.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{card.website}</span>
              </a>
            )}

            {card.linkedin && (
              <a
                href={card.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>LinkedIn</span>
              </a>
            )}

            {card.twitter && (
              <a
                href={`https://twitter.com/${card.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{card.twitter}</span>
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-2">
            <Button onClick={() => setShowQR(!showQR)} className="flex-1">
              {showQR ? 'Ocultar QR' : 'Mostrar QR'}
            </Button>
            <Button variant="outline" onClick={handleCopyContact}>
              {copied ? 'Copiado!' : 'Copiar contacto'}
            </Button>
            <Button variant="outline" size="icon" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Code */}
      {showQR && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="mb-4 font-semibold">Código QR de contacto</h3>
              <div className="mx-auto mb-4 inline-block rounded-lg border-4 border-border bg-white p-4">
                <QRCodeCanvas
                  value={card.qrCode}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Escanea este código para guardar mi contacto
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 font-semibold">Estadísticas del Evento</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Conexiones</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Reuniones</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">Tarjetas intercambiadas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-6">
          <h3 className="mb-3 font-semibold">💡 Tips de Networking</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Actualiza tu perfil con información relevante</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Personaliza tus mensajes de conexión</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Agenda reuniones antes de que se llene la agenda</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Haz seguimiento después del evento</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
