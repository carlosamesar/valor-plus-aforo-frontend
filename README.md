<div align="center">

# 🎟️ Aforo - Plataforma de Gestión de Eventos

**Sitio web profesional para descubrir, explorar y gestionar eventos en tiempo real**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

[Demo](http://localhost:3000) · [Documentación](docs/) · [Reportar Bug](https://github.com/carlosamesar/valor-plus-aforo-frontend/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Features](#-features)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Documentación Adicional](#-documentación-adicional)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**Aforo** es una plataforma moderna de gestión de eventos que permite a los usuarios descubrir eventos, comprar tickets, participar en experiencias live interactivas, hacer networking, gestionar pagos cashless y obtener certificados digitales.

Inspirado en el diseño "Mission Mars" de Figma, combina una estética **dark theme** profesional con **UX optimizada** para eventos corporativos, conferencias, conciertos y festivales.

### 🎨 Diseño

- **Paleta Dark Theme:** Navy profundo (`#0a0e1a`) con acento naranja vibrante (`#ff5722`)
- **Tipografía:** Sans-serif moderna y geométrica
- **Responsive:** Mobile-first design con breakpoints optimizados
- **Animaciones:** Framer Motion para transiciones fluidas

---

## ✨ Features

### **FASE 1: Ticketing & Checkout** ✅
- 🎫 **Sistema completo de venta de tickets**
  - Catálogo de eventos con filtros (categoría, precio, fecha, ubicación)
  - Carrito de compras con persistencia (Zustand)
  - Checkout en 3 pasos (selección, información, pago)
  - 3 métodos de pago (tarjeta, transferencia, efectivo)
- 🎟️ **Ticket digital con QR dinámico**
  - QR único por ticket con información encriptada
  - Descarga como imagen/PDF
  - Compartir en redes sociales

### **FASE 2: Experiencia Live** ✅
- 📺 **Streaming de video en tiempo real**
  - Reproductor HLS (React Player)
  - Controles personalizados
  - Chat en vivo con reacciones
- ❓ **Q&A interactivo**
  - Envío de preguntas en tiempo real
  - Sistema de upvotes/downvotes
  - Panel de preguntas destacadas
- 📊 **Encuestas (Polls) en vivo**
  - Votación instantánea
  - Resultados en tiempo real
  - Visualización con gráficos
- 🎮 **Quiz gamificado**
  - Preguntas con tiempo límite
  - Sistema de puntuación
  - Leaderboard en vivo

### **FASE 3A: Social Wall** ✅
- 📱 **Muro social de eventos**
  - Publicaciones de texto, fotos y links
  - Sistema de likes, comentarios y compartir
  - Hashtags trending
  - Estadísticas en vivo (likes, posts, usuarios activos)

### **FASE 3B: Networking** ✅
- 👥 **Perfiles de asistentes**
  - Directorio de participantes
  - Estados de conexión (online/offline)
  - Solicitudes de conexión
- 💬 **Chat privado 1:1**
  - Mensajería instantánea
  - Indicadores de escritura
  - Historial de conversaciones
- 📅 **Meeting scheduler**
  - Agendar reuniones durante el evento
  - Sistema de invitaciones
  - Gestión de disponibilidad
- 🪪 **Business card digital con QR**
  - Tarjeta de presentación digital
  - Exportar vCard
  - QR para compartir contacto

### **FASE 3C: Cashless** ✅
- 💳 **Billetera digital**
  - Saldo en tiempo real (toggle mostrar/ocultar)
  - Alertas de saldo bajo
  - Estadísticas de gastos
- 💰 **Recarga de saldo**
  - Montos rápidos ($20k, $50k, $100k, $200k)
  - Monto personalizado
  - 3 métodos de pago (tarjeta, transferencia, efectivo)
- 🏪 **Vendors con QR payment**
  - Listado de vendedores por categoría
  - Pago con QR
  - Historial de transacciones
- 📊 **Historial de transacciones**
  - Filtros (todos/pagos/recargas)
  - Exportar a CSV
  - Detalles por transacción

### **FASE 4A: Check-in & Badge** ✅
- 🎫 **Badge digital con QR**
  - Identificación digital del asistente
  - Código QR con información encriptada
  - Zonas de acceso autorizadas
  - Validación temporal
- 🚪 **Control de acceso por zonas**
  - Zonas diferenciadas (General, VIP, Staff, Speakers)
  - Capacidad y disponibilidad
  - Validación en tiempo real

### **FASE 4B: Certificados** ✅
- 🎓 **Certificados digitales**
  - Generación automática post-evento
  - Código de verificación único
  - Número de certificado trazable
- 📄 **Descarga PDF**
  - Plantilla profesional
  - Descarga instantánea
- 🔗 **Compartir en LinkedIn**
  - Integración con LinkedIn
  - Post pre-formateado

---

## 🚀 Stack Tecnológico

### **Frontend Framework**
- **[Next.js 14](https://nextjs.org/)** - App Router con Server Components
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development
- **[React 18](https://react.dev/)** - UI library

### **Styling & UI**
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Radix UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones fluidas
- **[Lucide React](https://lucide.dev/)** - Iconos modernos

### **State Management**
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Store global (carrito, wallet)
- **React Context API** - Estado compartido

### **Forms & Validation**
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### **Media & Visualization**
- **[React Player](https://www.npmjs.com/package/react-player)** - Video streaming (HLS)
- **[qrcode.react](https://www.npmjs.com/package/qrcode.react)** - QR code generation
- **[date-fns](https://date-fns.org/)** - Date formatting (locale ES)

### **Performance**
- **Dynamic imports** - Code splitting
- **Image optimization** - Next.js Image
- **Lazy loading** - React.lazy + Suspense

---

## 📦 Instalación

### **Prerrequisitos**
- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ o yarn 1.22+
- Git ([Download](https://git-scm.com/))

### **Clonar el repositorio**
```bash
git clone https://github.com/carlosamesar/valor-plus-aforo-frontend.git
cd valor-plus-aforo-frontend
```

### **Instalar dependencias**
```bash
npm install
# o
yarn install
```

### **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus configuraciones:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...
```

### **Ejecutar servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 💻 Uso

### **Desarrollo local**
```bash
npm run dev
```
Servidor de desarrollo con hot-reload en `http://localhost:3000`

### **Build de producción**
```bash
npm run build
npm start
```
Genera build optimizado y ejecuta servidor de producción.

### **Lint y validación**
```bash
npm run lint          # ESLint
npm run type-check    # TypeScript check
```

### **Testing (pendiente)**
```bash
npm run test          # Jest + React Testing Library
npm run e2e           # Playwright E2E
```

---

## 📁 Estructura del Proyecto

```
aforo-frontend/
├── app/                           # Next.js App Router
│   ├── evento/[id]/              # Páginas de evento dinámicas
│   │   ├── cashless/             # Billetera cashless
│   │   ├── live/                 # Experiencia live
│   │   ├── networking/           # Networking hub
│   │   ├── social/               # Social wall
│   │   └── page.tsx              # Detalle de evento
│   ├── eventos/                  # Catálogo de eventos
│   ├── checkout/                 # Proceso de compra
│   ├── confirmacion/             # Confirmación de compra
│   ├── mi-cuenta/                # Cuenta del usuario
│   │   ├── badge/                # Badge digital
│   │   ├── certificados/         # Certificados
│   │   ├── mis-tickets/          # Tickets comprados
│   │   └── perfil/               # Perfil de usuario
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Homepage
│
├── components/                    # Componentes React
│   ├── cashless/                 # Wallet, recharge, vendors
│   ├── certificate/              # Certificate card
│   ├── checkin/                  # Digital badge
│   ├── checkout/                 # Checkout flow
│   ├── events/                   # Event cards, grids, filters
│   ├── layout/                   # Header, Footer, Hero
│   ├── live/                     # Streaming, Q&A, polls, quiz, chat
│   ├── networking/               # Attendees, chat, meetings, business card
│   ├── social/                   # Social wall, post composer
│   ├── tickets/                  # Ticket types, cart, ticket display
│   └── ui/                       # shadcn/ui components (button, card, etc.)
│
├── lib/                          # Utilidades y lógica de negocio
│   ├── store/                    # Zustand stores
│   │   ├── cart-store.ts         # Carrito de compras
│   │   └── wallet-store.ts       # Billetera cashless
│   ├── mock-data-*.ts            # Mock data para desarrollo
│   └── utils.ts                  # Funciones de utilidad
│
├── types/                        # TypeScript types
│   ├── cashless.ts               # Wallet, transactions, vendors
│   ├── certificate.ts            # Certificates
│   ├── checkin.ts                # Check-in, badges
│   ├── event.ts                  # Events, tickets
│   ├── live.ts                   # Live features
│   ├── networking.ts             # Networking, meetings
│   └── social.ts                 # Social posts
│
├── config/
│   └── site.ts                   # Site configuration
│
├── public/                       # Assets estáticos
│   └── images/                   # Imágenes
│
├── docs/                         # Documentación del proyecto
│   ├── ENTREGA-FINAL-MVP-AFORO.md
│   ├── README-INSTALACION.md
│   └── FASE-*.md                 # Documentación de cada fase
│
├── .env.example                  # Variables de entorno ejemplo
├── next.config.mjs               # Configuración Next.js
├── tailwind.config.ts            # Configuración Tailwind
├── tsconfig.json                 # Configuración TypeScript
└── package.json                  # Dependencias y scripts
```

---

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (hot-reload) |
| `npm run build` | Build de producción |
| `npm start` | Ejecutar build de producción |
| `npm run lint` | Ejecutar ESLint |
| `npm run type-check` | Verificar tipos TypeScript |
| `npm run format` | Formatear código con Prettier |

---

## 📚 Documentación Adicional

- **[Entrega Final MVP](docs/ENTREGA-FINAL-MVP-AFORO.md)** - Resumen ejecutivo completo
- **[Guía de Instalación](docs/README-INSTALACION.md)** - Setup detallado
- **[Fase 1 - Ticketing](docs/FASE-1-COMPLETADA.md)** - Ticketing & Checkout
- **[Fase 2 - Live](docs/FASE-2-COMPLETADA.md)** - Experiencia Live
- **[Fase 3A - Social](docs/FASE-3A-COMPLETADA.md)** - Social Wall
- **[Fase 3B - Networking](docs/FASE-3B-COMPLETADA.md)** - Networking
- **[Fase 3C - Cashless](docs/FASE-3C-COMPLETADA.md)** - Cashless
- **[Frontend 100% Plan](docs/FRONTEND-100-PLAN.md)** - Plan de implementación

---

## 🗺️ Roadmap

### ✅ **Completado (MVP)**
- [x] Sistema de ticketing completo
- [x] Experiencia live con streaming, Q&A, polls, quiz
- [x] Social wall
- [x] Networking hub (chat, meetings, business cards)
- [x] Sistema cashless (wallet, recargas, vendors)
- [x] Check-in con badges digitales
- [x] Certificados digitales

### 🚧 **En Progreso**
- [ ] Integración con backend real (APIs REST)
- [ ] Autenticación JWT
- [ ] Pasarela de pagos (Stripe/MercadoPago)
- [ ] WebSocket para features en tiempo real

### 🔮 **Futuro**
- [ ] Notificaciones push
- [ ] App móvil (React Native)
- [ ] Panel de administración
- [ ] Analytics y reportes
- [ ] Multi-idioma (i18n)
- [ ] SEO avanzado
- [ ] PWA (Progressive Web App)

---

## 🧪 Testing (Pendiente)

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# Coverage
npm run test:coverage
```

**Stack de testing planeado:**
- Jest + React Testing Library
- Playwright para E2E
- MSW para mocking de APIs

---

## 🚀 Deployment

### **Vercel (Recomendado)**
```bash
npm i -g vercel
vercel
```

### **Otros providers**
- Netlify
- Railway
- Cloudflare Pages
- AWS Amplify

Ver guía de deployment: [Deployment Guide](docs/DEPLOYMENT.md)

---

## 🤝 Contributing

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

---

## 📄 Licencia

**Proprietary License** - © 2026 Valor Plus. Todos los derechos reservados.

Este código es propiedad de Valor Plus y no puede ser usado, copiado, modificado o distribuido sin autorización explícita.

---

## 📞 Contacto

**Equipo de Desarrollo Valor Plus**

- 🌐 Website: [valorplus.com](https://valorplus.com)
- 📧 Email: dev@valorplus.com
- 💼 LinkedIn: [Valor Plus](https://linkedin.com/company/valor-plus)

---

## 🙏 Agradecimientos

- Diseño inspirado en **Mission Mars** (Figma)
- Componentes UI de **[shadcn/ui](https://ui.shadcn.com/)**
- Iconos de **[Lucide](https://lucide.dev/)**
- Framework **[Next.js](https://nextjs.org/)**

---

<div align="center">

**Hecho con ❤️ por el equipo de Valor Plus**

[⬆ Volver arriba](#-aforo---plataforma-de-gestión-de-eventos)

</div>
