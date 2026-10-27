'use client';

import { useRouter } from 'next/navigation';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { mockCertificates, generateCertificatePDF } from '@/lib/mock-data-certificates';
import { ArrowLeft, Award, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CertificadosPage() {
  const router = useRouter();

  const handleDownload = (certificateId: string) => {
    const cert = mockCertificates.find((c) => c.id === certificateId);
    if (cert) {
      generateCertificatePDF(cert);
    }
  };

  const handleShare = (certificateId: string) => {
    const cert = mockCertificates.find((c) => c.id === certificateId);
    if (cert) {
      // Mock LinkedIn share
      alert(
        `Compartir en LinkedIn:\n\n"¡Orgulloso de haber completado ${cert.eventName}! 🎓\n\nCertificado #${cert.certificateNumber}"`
      );
    }
  };

  const handleView = (certificateId: string) => {
    router.push(`/mi-cuenta/certificados/${certificateId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="py-4">
            <button
              onClick={() => router.back()}
              className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>
            <h1 className="text-2xl font-bold">Mis Certificados</h1>
            <p className="text-sm text-muted-foreground">
              {mockCertificates.length}{' '}
              {mockCertificates.length === 1 ? 'certificado' : 'certificados'}{' '}
              disponibles
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Certificados</p>
                    <p className="text-2xl font-bold">{mockCertificates.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-primary/20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Horas Totales</p>
                    <p className="text-2xl font-bold">
                      {mockCertificates.reduce((acc, c) => acc + c.hoursAttended, 0)}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-green-500/20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Compartidos</p>
                    <p className="text-2xl font-bold">
                      {mockCertificates.filter((c) => c.status === 'shared').length}
                    </p>
                  </div>
                  <Share2 className="h-8 w-8 text-blue-500/20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificates List */}
          <div className="space-y-4">
            {mockCertificates.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Award className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">
                    No tienes certificados aún
                  </h3>
                  <p className="text-muted-foreground">
                    Completa eventos para obtener tus certificados de asistencia
                  </p>
                  <Button className="mt-4" onClick={() => router.push('/eventos')}>
                    Explorar Eventos
                  </Button>
                </CardContent>
              </Card>
            ) : (
              mockCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onDownload={handleDownload}
                  onShare={handleShare}
                  onView={handleView}
                />
              ))
            )}
          </div>

          {/* Info */}
          <Card className="mt-8 border-green-500/20 bg-green-500/5">
            <CardContent className="p-6">
              <h3 className="mb-3 font-semibold">💡 Sobre tus certificados</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Los certificados están disponibles 24 horas después del evento</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Cada certificado incluye un código de verificación único</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Puedes compartirlos directamente en LinkedIn</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Descárgalos en PDF para imprimirlos</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
