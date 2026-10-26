import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Planes y Precios - Aforo',
  description: 'Elige el plan perfecto para tu evento',
};

const plans = [
  {
    name: 'Launch',
    subtitle: 'Disponible Hoy',
    price: '$49',
    period: '/mes',
    description: 'Perfecto para empezar con una presencia profesional',
    features: [
      { text: 'Sitio público premium', included: true },
      { text: 'Búsqueda inteligente', included: true },
      { text: 'Calendario interactivo', included: true },
      { text: 'Filtros avanzados', included: true },
      { text: 'SEO optimizado', included: true },
      { text: 'Social proof en tiempo real', included: true },
      { text: 'Responsive (móvil/tablet/desktop)', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'Venta de tickets', included: false, note: 'Q1 2027' },
      { text: 'Dashboard de organizador', included: false, note: 'Q2 2027' },
      { text: 'Check-in con QR', included: false, note: 'Q3 2027' },
    ],
    cta: 'Comenzar Ahora',
    popular: false,
    available: true,
  },
  {
    name: 'Pro',
    subtitle: 'Próximamente Q1 2027',
    price: '$149',
    period: '/mes + 3% por ticket',
    description: 'Todo lo necesario para vender tickets y gestionar tu evento',
    features: [
      { text: 'Todo de Launch', included: true },
      { text: 'Venta de tickets integrada', included: true },
      { text: 'Pasarela de pagos (Stripe/MP)', included: true },
      { text: 'Emisión de QR por email', included: true },
      { text: 'Dashboard básico', included: true },
      { text: 'Email confirmaciones', included: true },
      { text: 'Reportes de ventas', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Check-in con QR', included: false, note: 'Q3 2027' },
      { text: 'Hardware NFC', included: false, note: '2028' },
      { text: 'Analytics avanzados', included: false, note: '2028' },
    ],
    cta: 'Únete a Early Access',
    popular: true,
    available: false,
    earlyAccessDiscount: '30% OFF',
  },
  {
    name: 'Enterprise',
    subtitle: 'Planificado 2028',
    price: 'Custom',
    period: '/mes',
    description: 'Solución completa con hardware y analytics avanzados',
    features: [
      { text: 'Todo de Pro', included: true },
      { text: 'Hardware NFC + pulseras', included: true },
      { text: 'Georeferenciación', included: true },
      { text: 'Heatmaps en tiempo real', included: true },
      { text: 'Lead retrieval', included: true },
      { text: 'Cashless payments', included: true },
      { text: 'Analytics avanzados', included: true },
      { text: 'Soporte dedicado', included: true },
      { text: 'SLA 99.9%', included: true },
      { text: 'Onboarding personalizado', included: true },
      { text: 'Integración custom', included: true },
    ],
    cta: 'Contactar Ventas',
    popular: false,
    available: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            Precios Transparentes
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Elige el Plan Perfecto
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Sin letras pequeñas. Sin sorpresas. Solo un sitio espectacular para tu evento.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col border-border/40 ${
                plan.popular ? 'border-primary shadow-xl shadow-primary/10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary px-4 py-1 text-sm font-semibold">
                    Más Popular
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.subtitle}</p>
                  </div>
                  {!plan.available && plan.earlyAccessDiscount && (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      {plan.earlyAccessDiscount}
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                      ) : (
                        <X className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/50" />
                      )}
                      <div className="flex-1">
                        <span
                          className={
                            feature.included ? 'text-foreground' : 'text-muted-foreground'
                          }
                        >
                          {feature.text}
                        </span>
                        {feature.note && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs font-normal text-muted-foreground"
                          >
                            {feature.note}
                          </Badge>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {plan.available ? (
                  <Link
                    href="/contact"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <Link
                    href="/early-access"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {plan.cta}
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="border-t border-border/40 bg-card/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Nuestro Roadmap
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Estamos construyendo el futuro de los eventos. Mira lo que viene.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              {/* Q1 2027 */}
              <div className="flex gap-6 rounded-lg border border-border/40 bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <span className="text-lg font-bold">Q1</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">2027 - Ticketing Integrado</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ Venta de tickets online</li>
                    <li>✅ Pasarelas de pago (Stripe, Mercado Pago)</li>
                    <li>✅ Emisión de QR por email</li>
                    <li>✅ Dashboard básico</li>
                  </ul>
                </div>
                <Badge className="h-fit bg-green-500/10 text-green-500">En Desarrollo</Badge>
              </div>

              {/* Q2 2027 */}
              <div className="flex gap-6 rounded-lg border border-border/40 bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <span className="text-lg font-bold">Q2</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">2027 - Admin Completo</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ CRUD de eventos</li>
                    <li>✅ Email campaigns</li>
                    <li>✅ Reportes avanzados</li>
                    <li>✅ Analytics básicos</li>
                  </ul>
                </div>
                <Badge variant="outline">Planificado</Badge>
              </div>

              {/* 2028 */}
              <div className="flex gap-6 rounded-lg border border-border/40 bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                  <span className="text-lg font-bold">2028</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">Hardware & Analytics Avanzados</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>🔮 NFC + pulseras inteligentes</li>
                    <li>🔮 Georeferenciación con heatmaps</li>
                    <li>🔮 Lead retrieval para sponsors</li>
                    <li>🔮 Cashless payments</li>
                  </ul>
                </div>
                <Badge variant="outline" className="text-muted-foreground">Visión</Badge>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/roadmap"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Roadmap Completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-border/40 bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">
                ¿Puedo vender tickets hoy con Aforo?
              </h3>
              <p className="text-muted-foreground">
                No aún. Lanzamos ticketing en Q1 2027 (Abril). Por ahora, puedes usar tu link
                de Eventbrite o TuBoleta en tu sitio Aforo. Te avisaremos cuando esté listo
                para early access con 30% de descuento.
              </p>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">
                ¿Qué obtengo HOY si contrato el Plan Launch?
              </h3>
              <p className="text-muted-foreground">
                Un sitio web espectacular para promocionar tu evento. El mejor diseño del
                mercado (9.2/10), búsqueda inteligente, calendario interactivo, y todo lo que
                necesitas para que tu evento se vea profesional. Perfecto si ya vendes tickets
                en otra plataforma.
              </p>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">
                ¿Tienen hardware NFC para check-in rápido?
              </h3>
              <p className="text-muted-foreground">
                Planificado para 2028. Por ahora nos enfocamos en hacer el mejor software de
                eventos. El check-in con QR simple estará disponible en Q3 2027 (Agosto).
              </p>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">
                ¿Puedo cambiar de plan después?
              </h3>
              <p className="text-muted-foreground">
                Sí, cuando lancemos el Plan Pro en Abril 2027, podrás upgrade automáticamente
                sin perder nada. Los usuarios de Launch tendrán acceso prioritario y descuento
                especial.
              </p>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">¿Hay período de prueba?</h3>
              <p className="text-muted-foreground">
                Sí, 14 días gratis. Sin tarjeta de crédito. Te mostramos todo en una demo en
                vivo antes de que decidas. Queremos que estés 100% seguro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              ¿Listo para empezar?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Agenda una demo en vivo y te mostramos exactamente lo que funciona hoy.
              <br />
              Sin presión, sin ventas agresivas, solo transparencia.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/demo"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Demo en Vivo
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contactar Ventas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
