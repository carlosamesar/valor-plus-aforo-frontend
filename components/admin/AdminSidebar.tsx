'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/admin' },
  { icon: 'event', label: 'Eventos', href: '/admin/eventos' },
  { icon: 'confirmation_number', label: 'Tickets', href: '/admin/tickets' },
  { icon: 'group', label: 'Asistentes', href: '/admin/asistentes' },
  { icon: 'qr_code_scanner', label: 'Check-in', href: '/admin/checkin' },
  { icon: 'bar_chart', label: 'Reportes', href: '/admin/reportes' },
  { icon: 'settings', label: 'Configuración', href: '/admin/configuracion' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0377a8]">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-[#001233]">
              Aforo
            </span>
            <span className="text-[9px] font-semibold tracking-wide text-[#64748b]">
              GESTIÓN DE EVENTOS
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all',
                  isActive
                    ? 'bg-[#e0f2fe] text-[#0377a8]'
                    : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#001233]'
                )}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="mb-3 flex items-center gap-3 px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0f2fe]">
            <span className="text-sm font-semibold text-[#0377a8]">AD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#001233]">Admin</p>
            <p className="text-xs text-[#64748b]">admin@aforo.com</p>
          </div>
        </div>
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#64748b] transition-all hover:bg-[#f1f5f9] hover:text-[#001233]"
          onClick={() => {
            alert('Logout functionality');
          }}
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
