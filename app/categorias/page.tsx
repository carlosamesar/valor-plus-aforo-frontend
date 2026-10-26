import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, MOCK_EVENTS } from '@/lib/mock-data';
import { CategoryIcons } from '@/components/icons/CustomIcons';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function CategoriasPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Categorías de Eventos
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Encuentra eventos organizados por categoría
          </p>
        </div>
      </ScrollReveal>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category, index) => {
          const categoryEvents = MOCK_EVENTS.filter(
            (e) => e.category === category.id
          );
          const Icon = CategoryIcons[category.id as keyof typeof CategoryIcons];

          return (
            <ScrollReveal key={category.id} direction="up" delay={index * 0.1}>
              <Link
              key={category.id}
              href={`/eventos?categoria=${category.id}`}
              className="group relative overflow-hidden rounded-lg border border-border/40 bg-card transition-all hover:border-primary hover:shadow-xl"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-10`}
              />

              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 transition-all group-hover:scale-110 group-hover:from-primary/20 group-hover:to-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm text-muted-foreground">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {category.count}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    evento{category.count !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Ver eventos
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>

              {/* Border Animation */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-orange-400 scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Featured Events by Category */}
      <div className="mt-16 space-y-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Eventos Destacados por Categoría
          </h2>
          <p className="mt-2 text-muted-foreground">
            Los eventos más populares en cada categoría
          </p>
        </div>

        {CATEGORIES.filter((cat) => cat.count > 0)
          .slice(0, 3)
          .map((category) => {
            const categoryEvents = MOCK_EVENTS.filter(
              (e) => e.category === category.id
            ).slice(0, 3);

            if (categoryEvents.length === 0) return null;

            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                  <Link
                    href={`/eventos?categoria=${category.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Ver todos <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/eventos/${event.slug}`}
                      className="group relative overflow-hidden rounded-lg border border-border/40 bg-card transition-all hover:border-primary hover:shadow-lg"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
                      </div>
                      <div className="p-4">
                        <h4 className="line-clamp-2 font-semibold group-hover:text-primary transition-colors">
                          {event.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {event.location?.city || 'Virtual'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
