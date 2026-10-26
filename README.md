# Aforo - Plataforma de Eventos

Sitio web profesional para descubrir, explorar y registrarse en eventos. Inspirado en el diseño "Mission Mars" con mejoras de UX para eventos.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **UI:** TailwindCSS + shadcn/ui + Radix UI
- **Animaciones:** Framer Motion
- **Estado:** Zustand
- **Formularios:** React Hook Form + Zod
- **Mapas:** Leaflet (open source)
- **Lenguaje:** TypeScript

## 📋 Características Implementadas

- ✅ Sistema de diseño dark theme (inspirado en Mission Mars)
- ✅ Componentes base (Header, Footer, Hero, EventCard)
- ✅ Layout responsive mobile-first
- ✅ Tipos TypeScript completos para eventos
- ✅ Store de estado con Zustand
- ✅ Homepage con hero + eventos destacados + categorías
- ✅ Animaciones con Framer Motion

## 🛠️ Setup Local

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
aforo-frontend/
├── app/                    # App Router de Next.js
│   ├── eventos/           # Rutas de eventos
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Homepage
├── components/
│   ├── events/            # Componentes de eventos
│   ├── layout/            # Componentes de layout
│   └── ui/                # Componentes shadcn/ui
├── config/
│   └── site.ts            # Configuración del sitio
├── lib/
│   ├── store/             # Zustand stores
│   └── utils.ts           # Utilidades
└── types/
    └── event.ts           # Tipos TypeScript
```

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Background:** `#0a0e1a` (Deep navy)
- **Card:** `#1a1e2e` (Navy)
- **Primary:** `#ff5722` (Orange)
- **Text:** Blanco + grises

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm start        # Ejecutar producción
npm run lint     # Lint
```

## 🚢 Deploy

Configurado para deployment en Vercel. Otros providers soportados: Netlify, Railway, Cloudflare Pages.

## 📄 Licencia

Proprietary - Valor Plus
