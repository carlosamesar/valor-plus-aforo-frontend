import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Video, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Ver Demo en Vivo - Aforo',
  description: 'Agenda una demostración personalizada de Aforo',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Demo en Vivo
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Te Mostramos Todo en Vivo
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Sin presión, sin ventas agresivas. Solo transparencia sobre lo que funciona HOY.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: What we'll show */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">¿Qué Verás en la Demo?</h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Frontend Público Espectacular</h3>
                    <p className="text-sm text-muted-foreground">
                      Te mostramos el sitio funcionando en vivo. Navegarás por eventos, filtros, calendario y todo lo que está disponible HOY.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <Video className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Roadmap Transparente</h3>
                    <p className="text-sm text-muted-foreground">
                      Te explicamos qué está listo hoy, qué viene en Q1 2027 (Ticketing) y qué es visión de largo plazo (2028).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                    <Calendar className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Casos de Uso Reales</h3>
                    <p className="text-sm text-muted-foreground">
                      Discutimos tu evento específico y cómo Aforo puede ayudarte hoy (o cuándo estará lista la feature que necesitas).
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-border/40 bg-card p-4 text-sm text-muted-foreground">
                <p>
                  <strong>Nota:</strong> Somos honestos sobre qué funciona y qué no. Si necesitas algo que aún no está listo, te lo diremos y te recomendaremos alternativas sin rencores.
                </p>
              </div>
            </div>

            {/* Right: Contact form */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Agenda Tu Demo</CardTitle>
                <CardDescription>
                  Completa el formulario y te contactaremos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Nombre Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="juan@empresa.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium">
                      Empresa / Organización
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Mi Empresa SAS"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Cuéntanos sobre tu evento
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Ej: Organizamos conferencias anuales con ~500 asistentes. Nos interesa el ticketing para 2027."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Solicitar Demo
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    O escríbenos directamente a{' '}
                    <a href="mailto:demo@aforo.com" className="text-primary hover:underline">
                      demo@aforo.com
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">¿Prefieres Ver Nuestro Roadmap Primero?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Revisa qué está disponible hoy y qué viene después
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/roadmap"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Roadmap
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Ver Precios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
