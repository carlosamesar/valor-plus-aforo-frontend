import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contacto - Aforo',
  description: 'Contáctanos para cualquier pregunta o consulta',
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Respuesta en menos de 24 horas',
    value: 'hola@aforo.com',
    href: 'mailto:hola@aforo.com',
  },
  {
    icon: MessageSquare,
    title: 'Ventas',
    description: 'Consultas comerciales',
    value: 'ventas@aforo.com',
    href: 'mailto:ventas@aforo.com',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    description: 'Lun-Vie 9am-6pm',
    value: '+57 (XXX) XXX-XXXX',
    href: 'tel:+57XXXXXXXXX',
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    description: 'Colombia',
    value: 'Bogotá, Colombia',
    href: '#',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-background/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Estamos Aquí
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Contáctanos
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Respuestas honestas a tus preguntas. Sin presión, solo conversación.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.href}
                  className="flex flex-col items-center gap-3 rounded-lg border border-border/40 bg-card p-6 text-center transition-colors hover:border-primary/50 hover:bg-accent"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{method.title}</h3>
                    <p className="mb-2 text-xs text-muted-foreground">{method.description}</p>
                    <p className="text-sm font-medium">{method.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
              <CardDescription>
                Completa el formulario y te responderemos en menos de 24 horas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                      Nombre *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Juan"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                      Apellido *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Pérez"
                      required
                    />
                  </div>
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
                    Empresa / Organización
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Mi Empresa SAS"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Selecciona un tema...</option>
                    <option value="demo">Solicitar demo</option>
                    <option value="pricing">Consulta de pricing</option>
                    <option value="roadmap">Pregunta sobre roadmap</option>
                    <option value="support">Soporte técnico</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:w-auto"
                >
                  Enviar Mensaje
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-t border-border/40 bg-card/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">¿Buscas Algo Específico?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Te ayudamos a encontrar lo que necesitas
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                href="/demo"
                className="flex flex-col items-center gap-2 rounded-lg border border-border/40 bg-card p-6 transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <MessageSquare className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Ver Demo</h3>
                <p className="text-xs text-muted-foreground">Agenda demostración</p>
              </Link>

              <Link
                href="/pricing"
                className="flex flex-col items-center gap-2 rounded-lg border border-border/40 bg-card p-6 transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <MessageSquare className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Pricing</h3>
                <p className="text-xs text-muted-foreground">Ver planes y precios</p>
              </Link>

              <Link
                href="/roadmap"
                className="flex flex-col items-center gap-2 rounded-lg border border-border/40 bg-card p-6 transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <MessageSquare className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Roadmap</h3>
                <p className="text-xs text-muted-foreground">Qué está listo hoy</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
