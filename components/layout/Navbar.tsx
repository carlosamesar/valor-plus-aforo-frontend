'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const navigation = [
  { name: 'Eventos', href: '/eventos' },
  { name: 'Categorías', href: '/categorias' },
  { name: 'Calendario', href: '/calendario' },
  { name: 'Organizadores', href: '/organizadores' },
  { name: 'Pricing', href: '/pricing', badge: 'Nuevo' },
  { name: 'Roadmap', href: '/roadmap', badge: 'Nuevo' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Aforo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
                {item.badge && (
                  <Badge className="ml-1 bg-primary/10 text-primary text-[10px] px-1 py-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/demo"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Ver Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="container space-y-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                {item.badge && (
                  <Badge className="bg-primary/10 text-primary text-[10px] px-1 py-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
            <Link
              href="/demo"
              className="mt-4 flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ver Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
