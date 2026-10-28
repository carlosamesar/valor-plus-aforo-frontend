'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminHeader() {
  return (
    <header className="fixed left-[260px] right-0 top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#64748b]">
            search
          </span>
          <Input
            type="search"
            placeholder="Buscar eventos, tickets, asistentes..."
            className="border-[#e2e8f0] pl-10 text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#001233]"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0377a8] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0377a8]"></span>
          </span>
        </Button>
      </div>
    </header>
  );
}
