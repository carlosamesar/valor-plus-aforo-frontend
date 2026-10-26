import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Sparkles, Clock, Gift } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Early Access - Plan Pro - Aforo',
  description: 'Únete al early access del Plan Pro con 30% de descuento',
};

const benefits = [
  {
    icon: Gift,
    title: '30% OFF de por Vida',
    description: 'Precio especial de $104/mes (en lugar de $149) mientras seas cliente',
  },
  {
    icon: Sparkles,
    title: 'Acceso Prioritario',
    description: 'Serás de los primeros en usar ticketing cuando lance en Abril 2027',
  },
  {
    icon: Clock,
    title: 'Soporte Dedicado',
    description: 'Onboarding personalizado y soporte prioritario vía email/chat',
  },
  {
    icon: CheckCircle2,
    title: 'Sin Compromiso',
    description: 'Cancela cuando quieras. Tu descuento se mantiene si vuelves',
  },
];

export default function EarlyAccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-green-500/10 text-green-500 hover:bg-green-500/20">
              30% OFF de por Vida
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Early Access al Plan Pro
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Únete ahora y ahorra $540/año cuando lancemos ticketing en Q1 2027
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground line-through">$149/mes</p>
                <p className="text-4xl font-bold text-primary">$104/mes</p>
                <p className="text-xs text-muted-foreground">+ 2.5% por ticket (vs 3%)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Beneficios de Early Access</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-border/40">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                        <CardDescription className="mt-2">{benefit.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-t border-border/40 bg-card/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Qué Incluye el Plan Pro</h2>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Disponible HOY (Plan Launch incluido)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span>Sitio público premium para tu evento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span>Búsqueda inteligente + filtros avanzados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span>Social proof en tiempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span>SEO optimizado + responsive</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Próximamente (Q1 2027 - Abril)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Venta de tickets integrada (Stripe + Mercado Pago)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Emisión de QR por email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Dashboard de organizador</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Email confirmaciones automatizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Reportes de ventas descargables</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-2xl">Únete al Early Access</CardTitle>
              <CardDescription>
                Regístrate ahora y asegura tu descuento del 30% de por vida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Nombre Completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="juan@empresa.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium">
                    Empresa / Organización *
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Mi Empresa SAS"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="events" className="mb-2 block text-sm font-medium">
                    ¿Cuántos eventos organizas al año?
                  </label>
                  <select
                    id="events"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Selecciona...</option>
                    <option value="1-3">1-3 eventos</option>
                    <option value="4-10">4-10 eventos</option>
                    <option value="11-50">11-50 eventos</option>
                    <option value="50+">Más de 50 eventos</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="attendees" className="mb-2 block text-sm font-medium">
                    Asistentes promedio por evento
                  </label>
                  <select
                    id="attendees"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Selecciona...</option>
                    <option value="0-50">Menos de 50</option>
                    <option value="50-200">50-200</option>
                    <option value="200-500">200-500</option>
                    <option value="500-1000">500-1,000</option>
                    <option value="1000+">Más de 1,000</option>
                  </select>
                </div>

                <div className="rounded-lg border border-border/40 bg-card p-4 text-sm">
                  <p className="mb-2 font-medium">¿Qué pasa después?</p>
                  <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
                    <li>Te contactamos en 24 horas para confirmar tu registro</li>
                    <li>Reservamos tu descuento del 30% de por vida</li>
                    <li>Te avisamos 1 semana antes del launch (Abril 2027)</li>
                    <li>Onboarding prioritario cuando esté listo</li>
                  </ol>
                </div>

                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Asegurar mi Descuento del 30%
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  Al registrarte, aceptas nuestros{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    términos
                  </Link>{' '}
                  y{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    política de privacidad
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/40 bg-card/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Preguntas Frecuentes</h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-border/40 bg-card p-6">
                <h3 className="mb-2 font-semibold">¿El descuento es para siempre?</h3>
                <p className="text-sm text-muted-foreground">
                  Sí. Mientras seas cliente activo, pagas $104/mes en lugar de $149/mes. Incluso si cancelas y vuelves meses después, tu descuento sigue activo.
                </p>
              </div>

              <div className="rounded-lg border border-border/40 bg-card p-6">
                <h3 className="mb-2 font-semibold">¿Cuándo puedo empezar a vender tickets?</h3>
                <p className="text-sm text-muted-foreground">
                  Abril 2027 (Q1 2027). Te avisaremos 1 semana antes con acceso beta. Mientras tanto, puedes usar el Plan Launch ($49/mes) para tu sitio público.
                </p>
              </div>

              <div className="rounded-lg border border-border/40 bg-card p-6">
                <h3 className="mb-2 font-semibold">¿Puedo cancelar cuando quiera?</h3>
                <p className="text-sm text-muted-foreground">
                  Sí, sin penalidades. Tu descuento del 30% queda guardado por si vuelves. No hay contratos anuales ni multas.
                </p>
              </div>

              <div className="rounded-lg border border-border/40 bg-card p-6">
                <h3 className="mb-2 font-semibold">¿Cuántos cupos hay de early access?</h3>
                <p className="text-sm text-muted-foreground">
                  Los primeros 100 organizadores. Si se llena, te agregamos a lista de espera con el mismo descuento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
