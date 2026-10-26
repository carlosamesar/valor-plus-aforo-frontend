'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Flame } from 'lucide-react';

interface SocialProofBadgeProps {
  eventId: string;
  className?: string;
}

export function SocialProofBadge({ eventId, className }: SocialProofBadgeProps) {
  const [viewerCount, setViewerCount] = useState(0);
  const [isHot, setIsHot] = useState(false);

  useEffect(() => {
    // Simular contador en tiempo real
    const baseCount = Math.floor(Math.random() * 20) + 5;
    setViewerCount(baseCount);
    setIsHot(baseCount > 15);

    // Actualizar cada 3-8 segundos
    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setViewerCount((prev) => {
        const newCount = Math.max(1, prev + change);
        setIsHot(newCount > 15);
        return newCount;
      });
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, [eventId]);

  return (
    <AnimatePresence>
      {viewerCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium shadow-lg ${className}`}
        >
          {isHot ? (
            <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
          ) : (
            <Eye className="h-3.5 w-3.5 text-primary" />
          )}
          <AnimatePresence mode="wait">
            <motion.span
              key={viewerCount}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className={isHot ? 'text-orange-500' : 'text-foreground'}
            >
              {viewerCount}
            </motion.span>
          </AnimatePresence>
          <span className="text-muted-foreground">
            {viewerCount === 1 ? 'persona viendo' : 'personas viendo'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
