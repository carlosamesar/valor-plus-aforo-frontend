import { HeroEnhanced } from '@/components/layout/HeroEnhanced';
import { EventCardEnhanced } from '@/components/events/EventCardEnhanced';
import { RecommendedEvents } from '@/components/events/RecommendedEvents';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_EVENTS, CATEGORIES } from '@/lib/mock-data';
import { CategoryIcons } from '@/components/icons/CustomIcons';

export default function Home() {
  const featuredEvents = MOCK_EVENTS.filter(e => e.featured);

  return (
    <div className="flex flex-col">
      <HeroEnhanced />

      {/* Featured Events Section */}
      <section className="container py-16 md:py-24">
        <ScrollReveal direction="up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Eventos Destacados</h2>
              <p className="mt-2 text-muted-foreground">
                Los eventos más populares y mejor valorados
              </p>
            </div>
          <Link
            href="/eventos"
            className="hidden md:inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-all hover:bg-muted hover:text-foreground"
          >
            Ver Todos
            <ArrowRight className="h-4 w-4" />
          </Link>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <EventCardEnhanced key={event.id} event={event} index={index} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/eventos"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
          >
            Ver Todos los Eventos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-t bg-card/50">
        <div className="container py-16 md:py-24">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Explora por Categoría</h2>
              <p className="mt-2 text-muted-foreground">
                Encuentra eventos que se adapten a tus intereses
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const Icon = CategoryIcons[category.id as keyof typeof CategoryIcons];
              return (
                <Link
                  key={category.id}
                  href={`/eventos?categoria=${category.id}`}
                  className="group flex items-center gap-4 rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:scale-105"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 transition-all group-hover:scale-110 group-hover:from-primary/20 group-hover:to-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} evento{category.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-background to-card">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Organizas Eventos?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Únete a cientos de organizadores que confían en Aforo para gestionar y promocionar sus eventos.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/organizadores"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
              >
                Comenzar Ahora
              </Link>
              <Link
                href="/ayuda"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-all hover:bg-muted hover:text-foreground"
              >
                Más Información
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
