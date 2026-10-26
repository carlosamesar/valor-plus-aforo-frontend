'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Rocket,
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  Shield,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrganizadoresPage() {
  const features = [
    {
      icon: Rocket,
      title: 'Lanzamiento Rápido',
      description: 'Crea y publica tu evento en minutos con nuestras herramientas intuitivas.',
    },
    {
      icon: Users,
      title: 'Audiencia Global',
      description: 'Accede a miles de usuarios activos buscando eventos como el tuyo.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avanzado',
      description: 'Obtén insights en tiempo real sobre ventas, asistencia y engagement.',
    },
    {
      icon: DollarSign,
      title: 'Pagos Seguros',
      description: 'Sistema de pagos integrado con bajas comisiones y transferencias rápidas.',
    },
    {
      icon: BarChart3,
      title: 'Marketing Integrado',
      description: 'Herramientas de promoción y email marketing para maximizar tu alcance.',
    },
    {
      icon: Shield,
      title: 'Soporte 24/7',
      description: 'Equipo dedicado listo para ayudarte en cada paso del proceso.',
    },
  ];

  const plans = [
    {
      name: 'Básico',
      price: 'Gratis',
      description: 'Perfecto para eventos pequeños',
      features: [
        'Hasta 50 asistentes',
        'Publicación ilimitada',
        'Panel de control básico',
        'Comisión 5% por venta',
      ],
    },
    {
      name: 'Pro',
      price: '$299/mes',
      description: 'Para organizadores profesionales',
      features: [
        'Asistentes ilimitados',
        'Analytics avanzado',
        'Marketing tools',
        'Comisión 3% por venta',
        'Soporte prioritario',
        'Branding personalizado',
      ],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Personalizado',
      description: 'Para grandes organizaciones',
      features: [
        'Todo en Pro',
        'API access',
        'Manager dedicado',
        'Comisión negociable',
        'White label',
        'Integraciones custom',
      ],
    },
  ];

  const stats = [
    { value: '10K+', label: 'Eventos Creados' },
    { value: '500K+', label: 'Tickets Vendidos' },
    { value: '$5M+', label: 'Procesados' },
    { value: '98%', label: 'Satisfacción' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1e2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1e2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="container relative py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Plataforma #1 para Organizadores
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Organiza Eventos{' '}
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                Extraordinarios
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Crea, promociona y gestiona tus eventos con las herramientas más
              avanzadas del mercado. Todo en un solo lugar.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="h-12 sm:w-72"
              />
              <Button size="lg" className="group h-12 gap-2">
                Comenzar Gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Sin tarjeta de crédito. Configura tu primer evento en 5 minutos.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-card/50 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Todo lo que necesitas para triunfar
            </h2>
            <p className="mt-2 text-muted-foreground">
              Herramientas profesionales al alcance de tu mano
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-t py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Planes para cada necesidad
            </h2>
            <p className="mt-2 text-muted-foreground">
              Empieza gratis, crece cuando lo necesites
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-all ${
                  plan.featured
                    ? 'border-primary shadow-xl'
                    : 'hover:border-primary hover:shadow-lg'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Más Popular
                    </span>
                  </div>
                )}

                <CardHeader>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.featured ? 'default' : 'outline'}
                  >
                    {plan.name === 'Enterprise'
                      ? 'Contactar Ventas'
                      : 'Comenzar Ahora'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-background to-card py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para crear tu próximo evento?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Únete a miles de organizadores que confían en Aforo
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2">
                Crear Cuenta Gratis
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Agendar Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
