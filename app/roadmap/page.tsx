import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Roadmap Público - Aforo',
  description: 'Conoce nuestros planes y qué estamos construyendo',
};

const roadmapPhases = [
  {
    status: 'completed',
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    badgeColor: 'bg-green-500/10 text-green-500',
    badge: 'Completado',
    phase: 'Fase 1',
    title: 'Frontend Público Premium',
    period: 'Oct 2026',
    progress: 100,
    features: [
      { name: 'Sitio público premium', done: true },
      { name: 'Búsqueda inteligente con autocomplete', done: true },
      { name: 'Calendario interactivo', done: true },
      { name: 'Filtros avanzados', done: true },
      { name: 'Modal de detalle de eventos', done: true },
      { name: 'Social proof en tiempo real', done: true },
      { name: 'Scroll animations profesionales', done: true },
      { name: 'Dark theme + responsive', done: true },
    ],
  },
  {
    status: 'in-progress',
    icon: Clock,
    iconColor: 'text-blue-500',
    badgeColor: 'bg-blue-500/10 text-blue-500',
    badge: 'En Progreso (35%)',
    phase: 'Fase 2',
    title: 'Ticketing & Transacciones',
    period: 'Nov 2026 - Abr 2027',
    progress: 35,
    features: [
      { name: 'API de eventos y tickets', done: true },
      { name: 'Autenticación de usuarios', done: true },
      { name: 'Integración Stripe', done: false, current: true },
      { name: 'Integración Mercado Pago', done: false },
      { name: 'Generación de QR estático', done: false },
      { name: 'Email transaccional (SendGrid)', done: false },
      { name: 'Flujo de compra completo', done: false },
      { name: 'Mi cuenta / Mis tickets', done: false },
    ],
  },
  {
    status: 'planned',
    icon: Clock,
    iconColor: 'text-orange-500',
    badgeColor: 'bg-orange-500/10 text-orange-500',
    badge: 'Planificado',
    phase: 'Fase 3',
    title: 'Admin Panel & Email Campaigns',
    period: 'May 2027 - Ago 2027',
    progress: 0,
    features: [
      { name: 'Dashboard con métricas en tiempo real', done: false },
      { name: 'CRUD completo de eventos', done: false },
      { name: 'Configuración de tickets y pricing', done: false },
      { name: 'Lista de asistentes + exportar CSV', done: false },
      { name: 'Email campaigns (SendGrid)', done: false },
      { name: 'Reportes descargables (PDF/Excel)', done: false },
      { name: 'App móvil de check-in (React Native)', done: false },
      { name: 'Validación de QR en tiempo real', done: false },
    ],
  },
  {
    status: 'future',
    icon: Sparkles,
    iconColor: 'text-purple-500',
    badgeColor: 'bg-purple-500/10 text-purple-500',
    badge: 'Visión 2028+',
    phase: 'Fases 4-8',
    title: 'Hardware & Analytics Avanzados',
    period: '2028 - 2029',
    progress: 0,
    features: [
      { name: 'Hardware NFC + pulseras inteligentes', done: false },
      { name: 'Check-in ultra-rápido (<0.2s)', done: false },
      { name: 'Georeferenciación con BLE Beacons', done: false },
      { name: 'Heatmaps en tiempo real', done: false },
      { name: 'WebApp para asistentes (PWA)', done: false },
      { name: 'Smart networking (Tap-to-connect)', done: false },
      { name: 'Lead retrieval para sponsors', done: false },
      { name: 'Cashless payments', done: false },
      { name: 'Eventos virtuales/híbridos (streaming)', done: false },
      { name: 'Certificados automáticos', done: false },
    ],
  },
];

const changelog = [
  {
    date: '2026-10-26',
    change: 'Modal de detalle de eventos agregado',
    type: 'feature',
  },
  {
    date: '2026-10-25',
    change: 'Search autocomplete + scroll animations',
    type: 'feature',
  },
  {
    date: '2026-10-24',
    change: 'Lanzamiento Fase 1 - Frontend Público',
    type: 'launch',
  },
  {
    date: '2026-10-23',
    change: 'Ticketing movido de Q4 2026 → Q1 2027',
    reason: 'Priorización de arquitectura backend',
    type: 'delay',
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Transparencia Radical
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Roadmap Público
            </h1>
            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              Sigue nuestro progreso en tiempo real. Sabemos exactamente qué funciona hoy y qué
              viene después.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>
                <strong>Última actualización:</strong> 2026-10-26
              </p>
              <p>
                <strong>Próxima revisión:</strong> 2026-11-01 (mensual, cada 1ro)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Phases */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-5xl space-y-8">
          {roadmapPhases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <Card
                key={index}
                className={`border-border/40 ${
                  phase.status === 'in-progress' ? 'border-primary shadow-lg shadow-primary/5' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                          phase.status === 'completed'
                            ? 'bg-green-500/10'
                            : phase.status === 'in-progress'
                            ? 'bg-blue-500/10'
                            : phase.status === 'planned'
                            ? 'bg-orange-500/10'
                            : 'bg-purple-500/10'
                        }`}
                      >
                        <Icon className={`h-6 w-6 ${phase.iconColor}`} />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            {phase.phase}
                          </span>
                          <Badge className={phase.badgeColor}>{phase.badge}</Badge>
                        </div>
                        <CardTitle className="text-2xl">{phase.title}</CardTitle>
                        <CardDescription className="mt-1">{phase.period}</CardDescription>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {phase.progress > 0 && (
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-semibold">{phase.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full transition-all ${
                            phase.status === 'completed'
                              ? 'bg-green-500'
                              : phase.status === 'in-progress'
                              ? 'bg-blue-500'
                              : 'bg-muted-foreground'
                          }`}
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {phase.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 text-sm ${
                          feature.current ? 'font-semibold text-blue-500' : ''
                        }`}
                      >
                        {feature.done ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        ) : (
                          <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-muted-foreground/30" />
                        )}
                        <span className={feature.done ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.name}
                          {feature.current && ' (← trabajando aquí)'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Changelog */}
      <section className="border-t border-border/40 bg-card/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Historial de Cambios
            </h2>

            <div className="space-y-4">
              {changelog.map((entry, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-lg border border-border/40 bg-card p-4"
                >
                  <div className="shrink-0">
                    <Badge
                      variant="outline"
                      className={
                        entry.type === 'launch'
                          ? 'bg-green-500/10 text-green-500'
                          : entry.type === 'delay'
                          ? 'bg-orange-500/10 text-orange-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }
                    >
                      {entry.date}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{entry.change}</p>
                    {entry.reason && (
                      <p className="mt-1 text-sm text-muted-foreground">Razón: {entry.reason}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <CardTitle className="text-2xl">¿Tienes Feedback?</CardTitle>
              <CardDescription>
                Tu opinión nos ayuda a priorizar. Dinos qué features son más importantes para
                ti.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="mailto:roadmap@aforo.com?subject=Feature Request"
                  className="flex h-auto flex-col items-start gap-1 rounded-lg border border-input bg-background p-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <span className="text-base font-semibold">📧 Sugerir Feature</span>
                  <span className="text-sm text-muted-foreground">roadmap@aforo.com</span>
                </Link>
                <Link
                  href="mailto:feedback@aforo.com"
                  className="flex h-auto flex-col items-start gap-1 rounded-lg border border-input bg-background p-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <span className="text-base font-semibold">💬 Dar Feedback</span>
                  <span className="text-sm text-muted-foreground">feedback@aforo.com</span>
                </Link>
              </div>

              <div className="rounded-lg border border-border/40 bg-card p-4 text-sm text-muted-foreground">
                <p>
                  <strong>Nota:</strong> No podemos prometer fechas exactas, pero tu feedback
                  influye directamente en nuestras prioridades. Si muchos clientes piden lo
                  mismo, lo aceleramos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              ¿Listo para empezar con lo que funciona hoy?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Mientras construimos el resto, puedes tener el mejor sitio público para tu evento
              desde ya.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Planes
              </Link>
              <Link
                href="/demo"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Agendar Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
