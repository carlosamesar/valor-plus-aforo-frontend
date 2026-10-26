'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Tag, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_EVENTS, CATEGORIES } from '@/lib/mock-data';

interface SearchResult {
  type: 'event' | 'category' | 'city' | 'tag';
  title: string;
  subtitle?: string;
  href: string;
  icon: React.ReactNode;
}

export function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Popular searches
  const popularSearches = [
    { query: 'conferencias tech', icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { query: 'eventos gratis', icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { query: 'networking', icon: <TrendingUp className="h-3.5 w-3.5" /> },
  ];

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const queryLower = query.toLowerCase();

    // Search events
    MOCK_EVENTS.filter((event) =>
      event.title.toLowerCase().includes(queryLower) ||
      event.description.toLowerCase().includes(queryLower)
    )
      .slice(0, 3)
      .forEach((event) => {
        searchResults.push({
          type: 'event',
          title: event.title,
          subtitle: event.location?.city || 'Virtual',
          href: `/eventos/${event.slug}`,
          icon: <Calendar className="h-4 w-4 text-primary" />,
        });
      });

    // Search categories
    CATEGORIES.filter((cat) =>
      cat.name.toLowerCase().includes(queryLower)
    )
      .slice(0, 2)
      .forEach((cat) => {
        searchResults.push({
          type: 'category',
          title: cat.name,
          subtitle: `${cat.count} eventos`,
          href: `/eventos?categoria=${cat.id}`,
          icon: <Tag className="h-4 w-4 text-primary" />,
        });
      });

    // Search cities
    const cities = Array.from(
      new Set(
        MOCK_EVENTS.map((e) => e.location?.city).filter(Boolean) as string[]
      )
    );
    cities
      .filter((city) => city.toLowerCase().includes(queryLower))
      .slice(0, 2)
      .forEach((city) => {
        const count = MOCK_EVENTS.filter(
          (e) => e.location?.city === city
        ).length;
        searchResults.push({
          type: 'city',
          title: city,
          subtitle: `${count} eventos`,
          href: `/eventos?ciudad=${city}`,
          icon: <MapPin className="h-4 w-4 text-primary" />,
        });
      });

    setResults(searchResults);
    setHighlightedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[highlightedIndex]) {
          window.location.href = results[highlightedIndex].href;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Buscar eventos, categorías, ciudades..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-14 pl-12 pr-4 text-base"
        />
      </div>

      <AnimatePresence>
        {isOpen && (query.length >= 2 || query.length === 0) && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border/40 bg-card/95 backdrop-blur-lg shadow-2xl z-50 overflow-hidden"
          >
            {query.length < 2 ? (
              /* Popular Searches */
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">
                  Búsquedas Populares
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(item.query);
                        setIsOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/50 px-3 py-1.5 text-sm transition-all hover:border-primary hover:bg-primary/10"
                    >
                      {item.icon}
                      {item.query}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              /* Search Results */
              <div className="max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <Link
                    key={index}
                    href={result.href}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      index === highlightedIndex
                        ? 'bg-primary/10'
                        : 'hover:bg-muted/50'
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-sm text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {result.type}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No se encontraron resultados para "{query}"
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            )}

            {/* Footer Hint */}
            <div className="border-t border-border/40 bg-muted/30 px-4 py-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">
                    ↑↓
                  </kbd>{' '}
                  navegar
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">
                    ⏎
                  </kbd>{' '}
                  seleccionar
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">
                    esc
                  </kbd>{' '}
                  cerrar
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
