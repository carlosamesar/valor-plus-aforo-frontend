# 🎯 PLAN: 100% FRONTEND DEL BROCHURE

**Fecha:** 2026-10-26  
**Objetivo:** Implementar TODAS las features de frontend del brochure, incluso sin backend real  
**Estrategia:** UI/UX demo con datos mock para mostrar la experiencia completa  

---

## 📊 ESTADO ACTUAL vs OBJETIVO

### ✅ Ya Implementado (30% del brochure frontend)
```
✅ Módulo 1.1: Página web del evento (plantillas fijas)
✅ Módulo 2.1: Listado y búsqueda de eventos
✅ Módulo 2.2: Filtros avanzados
✅ Módulo 2.3: Detalle de evento (modal)
✅ Módulo 2.4: Calendario interactivo
✅ Páginas complementarias: pricing, roadmap, demo, contact
```

### ❌ Faltante (70% del brochure frontend)

**Módulo 1: Setup y Publicación**
```
❌ Épica 1: Constructor Web Drag & Drop
❌ Épica 2: Plataforma Eventos Virtuales/Híbridos (streaming UI)
```

**Módulo 2: Ticketing (Frontend)**
```
❌ Épica 3: Invitaciones Omnicanal (UI de campañas)
❌ Épica 4: Compra de Tickets (checkout flow completo)
```

**Módulo 3: Control de Acceso**
```
❌ Épica 5: Check-in Zero-Wait (UI validación QR)
❌ Épica 6: Certificados de Asistencia (generador + preview)
```

**Módulo 4: Engagement**
```
❌ Épica 7: Participación en Vivo (Q&A, polls, quizzes)
❌ Épica 8: Smart Networking (muro social, chat, meeting planner)
❌ Épica 9: Cashless (billetera digital UI)
```

**Módulo 5: Inteligencia**
```
❌ Épica 10: Mapas de Calor (heatmaps en tiempo real)
❌ Épica 11: Generación de Leads (espacios patrocinio)
❌ Épica 12: Dashboard Organizador (panel de control)
```

---

## 🗂️ ARQUITECTURA DE IMPLEMENTACIÓN

### **Estructura de Rutas (nuevas)**

```
app/
├── (publico)/                    # Ya existe
│   ├── page.tsx                  # ✅ Homepage
│   ├── eventos/                  # ✅ Listado
│   ├── calendario/               # ✅ Vista mensual
│   └── ...
│
├── (organizador)/                # ⭐ NUEVO: Panel organizador
│   ├── dashboard/                # Dashboard principal
│   ├── eventos/crear/            # Constructor Drag & Drop
│   ├── eventos/[id]/editar/      # Editor visual
│   ├── eventos/[id]/analytics/   # Mapas de calor + KPIs
│   ├── eventos/[id]/leads/       # Generación de leads
│   ├── invitaciones/             # Campañas omnicanal
│   └── certificados/             # Generador certificados
│
├── (asistente)/                  # ⭐ NUEVO: Experiencia asistente
│   ├── mis-eventos/              # Eventos registrados
│   ├── tickets/[id]/             # Ticket digital (QR)
│   ├── check-in/                 # Validación QR
│   ├── evento/[id]/live/         # Experiencia en vivo
│   │   ├── streaming/            # Streaming virtual/híbrido
│   │   ├── qa/                   # Q&A en vivo
│   │   ├── polls/                # Votaciones
│   │   ├── networking/           # Muro social + chat
│   │   └── cashless/             # Billetera digital
│   └── certificados/             # Mis certificados
│
└── (compra)/                     # ⭐ NUEVO: Flujo de compra
    ├── tickets/[eventId]/        # Selección de tickets
    ├── checkout/                 # Proceso de pago
    └── confirmacion/             # Confirmación + QR
```

---

## 📦 COMPONENTES NUEVOS (25+)

### **Organizador (Dashboard)**
```typescript
components/organizador/
├── DashboardOverview.tsx         # KPIs principales
├── EventBuilder/                 # Constructor Drag & Drop
│   ├── BuilderCanvas.tsx         # Canvas visual
│   ├── ComponentPalette.tsx      # Paleta de componentes
│   └── TemplateSelector.tsx      # Plantillas predefinidas
├── AnalyticsDashboard/           # Analytics avanzado
│   ├── HeatmapViewer.tsx         # Mapas de calor
│   ├── RealtimeMetrics.tsx       # Métricas en tiempo real
│   └── AttendanceFlow.tsx        # Flujo de asistentes
├── LeadGeneration/               # Leads y patrocinios
│   ├── LeadsList.tsx             # Lista de prospectos
│   ├── SponsorSpaces.tsx         # Espacios de patrocinio
│   └── ExportTools.tsx           # Exportar a CRM
└── InvitationCampaigns/          # Campañas
    ├── CampaignBuilder.tsx       # Constructor de campañas
    ├── EmailPreview.tsx          # Preview email
    └── SMSPreview.tsx            # Preview SMS
```

### **Asistente (Experiencia)**
```typescript
components/asistente/
├── TicketDigital/                # Ticket digital
│   ├── TicketCard.tsx            # Card con QR
│   ├── QRDisplay.tsx             # QR dinámico (15s rotation)
│   └── WalletButton.tsx          # Agregar a Apple/Google Wallet
├── CheckIn/                      # Check-in
│   ├── QRScanner.tsx             # Escáner QR (organizador)
│   ├── CheckInSuccess.tsx        # Animación de éxito
│   └── BadgePrinter.tsx          # Vista de badge/manilla
├── LiveExperience/               # Experiencia en vivo
│   ├── StreamingPlayer.tsx       # Player de streaming
│   ├── QAPanel.tsx               # Panel de Q&A
│   ├── PollWidget.tsx            # Votaciones en vivo
│   ├── QuizGame.tsx              # Quizzes gamificados
│   └── LeaderboardMini.tsx       # Leaderboard
├── Networking/                   # Networking
│   ├── SocialWall.tsx            # Muro social (posts, fotos)
│   ├── ChatPrivate.tsx           # Chat 1-a-1
│   ├── MeetingPlanner.tsx        # Planificador de reuniones
│   └── NFCTap.tsx                # Tap-to-network UI
├── Cashless/                     # Cashless
│   ├── DigitalWallet.tsx         # Billetera digital
│   ├── TopUpForm.tsx             # Recargar saldo
│   ├── TransactionHistory.tsx    # Historial
│   └── QRPayment.tsx             # Pagar con QR
└── Certificates/                 # Certificados
    ├── CertificateViewer.tsx     # Vista de certificado
    ├── CertificateDownload.tsx   # Descargar PDF
    └── CertificateShare.tsx      # Compartir en LinkedIn
```

### **Compra (Checkout)**
```typescript
components/compra/
├── TicketSelector/               # Selección de tickets
│   ├── TicketTypeCard.tsx        # Card de tipo de ticket
│   ├── QuantitySelector.tsx      # Selector de cantidad
│   └── PricingSummary.tsx        # Resumen de precios
├── CheckoutFlow/                 # Flujo de pago
│   ├── AttendeeForm.tsx          # Formulario asistentes
│   ├── PaymentMethods.tsx        # Métodos de pago (Stripe/MP)
│   ├── BillingInfo.tsx           # Datos de facturación
│   └── OrderSummary.tsx          # Resumen de orden
└── Confirmation/                 # Confirmación
    ├── OrderConfirmed.tsx        # Mensaje de confirmación
    ├── TicketsGenerated.tsx      # Tickets generados
    └── EmailSent.tsx             # Email enviado
```

---

## 🎨 PÁGINAS NUEVAS (15+)

### **1. Dashboard Organizador** `/dashboard`
```typescript
Features:
✓ KPIs: Eventos activos, tickets vendidos, ingresos
✓ Gráficos: Ventas por día, asistencia esperada
✓ Quick actions: Crear evento, ver reportes
✓ Notificaciones: Alertas de ventas, check-ins
```

### **2. Constructor de Eventos** `/eventos/crear`
```typescript
Features:
✓ Drag & Drop builder (React DnD o dnd-kit)
✓ Plantillas: Conferencia, Concierto, Networking, Taller
✓ Componentes: Hero, Agenda, Speakers, Patrocinadores
✓ Preview en vivo (mobile + desktop)
✓ Guardar como borrador
```

### **3. Analytics del Evento** `/eventos/[id]/analytics`
```typescript
Features:
✓ Heatmap: Zonas de alta concurrencia (Mapbox + heatmap layer)
✓ Flujo de asistentes: Entrada → Zonas → Salida (Sankey diagram)
✓ Métricas en tiempo real: Asistentes actuales, picos de tráfico
✓ Crowd routing: Notificaciones automáticas (mock)
```

### **4. Generación de Leads** `/eventos/[id]/leads`
```typescript
Features:
✓ Lista de prospectos: Nombre, empresa, interés (Hot/Warm/Cold)
✓ Espacios de patrocinio: Stands virtuales, banners
✓ Exportar a CRM: CSV, HubSpot (mock), Salesforce (mock)
✓ Lead scoring: Algoritmo de calificación (mock)
```

### **5. Campañas de Invitación** `/invitaciones`
```typescript
Features:
✓ Constructor de campañas: Email + SMS
✓ Templates: Plantillas profesionales
✓ Personalización: Merge tags (nombre, evento, etc.)
✓ Preview: Vista previa email/SMS
✓ Programar envío: Fecha + hora
✓ Métricas: Abiertos, clicks, conversión (mock)
```

### **6. Mis Tickets** `/mis-eventos`
```typescript
Features:
✓ Lista de eventos registrados
✓ Ticket digital con QR dinámico (rotación 15s)
✓ Agregar a Apple Wallet / Google Pay
✓ Compartir ticket (si transferible)
✓ Ver detalles del evento
```

### **7. Check-in** `/check-in`
```typescript
Features:
✓ Escáner QR (Organizador): Cámara + validación
✓ Animación de éxito: "Bienvenido, Juan!" (confetti)
✓ Impresión de badge/manilla NFC (simulado)
✓ Contador de asistentes: X/Y han llegado
```

### **8. Experiencia Live** `/evento/[id]/live`
```typescript
Features:
✓ Streaming player: Video player (Hls.js o React Player)
✓ Chat en vivo: Mensajes en tiempo real (mock WebSocket)
✓ Q&A: Preguntas al ponente, upvotes
✓ Polls: Votaciones en vivo con resultados
✓ Quizzes: Gamificación con leaderboard
✓ Tabs: Stream | Q&A | Polls | Networking
```

### **9. Networking** `/evento/[id]/live/networking`
```typescript
Features:
✓ Muro social: Posts, fotos, reacciones
✓ Meeting planner: Agendar reuniones 1-a-1
✓ Chat privado: Mensajes directos
✓ NFC Tap: Simular tap entre badges
✓ Lista de asistentes: Filtrar por intereses
```

### **10. Billetera Cashless** `/cashless`
```typescript
Features:
✓ Saldo actual: $XXX disponible
✓ Recargar: Tarjeta, efectivo (mock)
✓ Historial: Transacciones (comida, merch)
✓ QR para pagar: Escanear en stands
✓ Vinculado a pulsera NFC (badge físico)
```

### **11. Mis Certificados** `/certificados`
```typescript
Features:
✓ Lista de certificados ganados
✓ Vista previa: Diseño profesional
✓ Descargar PDF: Generado con jsPDF
✓ Compartir en LinkedIn: Deep link
✓ Certificado personalizado: Nombre, fecha, evento
```

### **12. Compra de Tickets** `/tickets/[eventId]`
```typescript
Features:
✓ Tipos de tickets: General, VIP, Backstage
✓ Selector de cantidad: +/- por tipo
✓ Resumen: Subtotal, fees, total
✓ Disponibilidad: "Solo quedan 5 VIP"
✓ CTA: "Continuar al Checkout"
```

### **13. Checkout** `/checkout`
```typescript
Features:
✓ Paso 1: Datos de asistentes (nombre, email)
✓ Paso 2: Método de pago (Stripe, MercadoPago mock)
✓ Paso 3: Billing info (facturación)
✓ Resumen de orden: Lado derecho sticky
✓ Progress bar: 1/3, 2/3, 3/3
```

### **14. Confirmación** `/confirmacion`
```typescript
Features:
✓ Mensaje: "¡Compra exitosa! 🎉"
✓ Orden #: 123456
✓ Tickets generados: Descargar PDFs
✓ Email enviado: Confirmación + QR
✓ CTA: Ver mis tickets, Agregar al calendario
```

### **15. Generador de Certificados** `/eventos/[id]/certificados`
```typescript
Features (Organizador):
✓ Diseñador visual: Logo, texto, firma
✓ Plantillas: Básico, Premium, Ejecutivo
✓ Variables: {nombre}, {evento}, {fecha}
✓ Preview en vivo
✓ Emisión: Manual o automática al finalizar
```

---

## 🛠️ STACK TÉCNICO (Nuevos)

### **Drag & Drop**
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### **Mapas de Calor**
```bash
npm install mapbox-gl @mapbox/mapbox-gl-heatmap
```

### **Streaming**
```bash
npm install hls.js react-player
```

### **QR Codes**
```bash
npm install qrcode.react  # Generar QR
npm install react-qr-reader  # Escanear QR (Web API)
```

### **Certificados PDF**
```bash
npm install jspdf @react-pdf/renderer
```

### **Charts Avanzados**
```bash
npm install recharts d3-sankey  # Sankey diagram (flujo)
```

### **WebSocket (Mock)**
```bash
npm install socket.io-client  # Mock de WebSocket
```

### **Animaciones**
```bash
npm install canvas-confetti  # Confetti animation
```

---

## 📋 PLAN DE EJECUCIÓN (5 Fases)

### **FASE 1: Ticketing & Checkout (40% del gap)** — 2-3 días
```
Prioridad: ALTA (es el core del brochure)

Páginas:
✓ /tickets/[eventId] — Selección de tickets
✓ /checkout — Flujo de pago (3 pasos)
✓ /confirmacion — Confirmación + QR
✓ /mis-eventos — Mis tickets

Componentes:
✓ TicketSelector
✓ CheckoutFlow
✓ TicketDigital (QR dinámico)
✓ WalletButton (Apple/Google)

Mock Data:
✓ 3 tipos de tickets por evento
✓ Precios + fees
✓ Stripe/MercadoPago placeholders
```

### **FASE 2: Experiencia Live (30% del gap)** — 2 días
```
Prioridad: ALTA (diferenciador clave)

Páginas:
✓ /evento/[id]/live — Hub de experiencia
✓ /evento/[id]/live/streaming — Player
✓ /evento/[id]/live/qa — Q&A
✓ /evento/[id]/live/polls — Votaciones
✓ /evento/[id]/live/networking — Muro social

Componentes:
✓ StreamingPlayer
✓ QAPanel (enviar preguntas, upvotes)
✓ PollWidget (votaciones en tiempo real)
✓ QuizGame (gamificación)
✓ SocialWall (posts + reacciones)
✓ ChatPrivate
✓ MeetingPlanner

Mock Data:
✓ Stream URL (video de muestra)
✓ Preguntas Q&A (mock)
✓ Polls activos (mock)
✓ Leaderboard (mock)
```

### **FASE 3: Dashboard Organizador (15% del gap)** — 1-2 días
```
Prioridad: MEDIA (B2B importante)

Páginas:
✓ /dashboard — Overview
✓ /eventos/[id]/analytics — Analytics avanzado
✓ /eventos/[id]/leads — Generación de leads

Componentes:
✓ DashboardOverview (KPIs)
✓ HeatmapViewer (Mapbox)
✓ AttendanceFlow (Sankey)
✓ LeadsList
✓ ExportTools

Mock Data:
✓ Eventos del organizador (3-5)
✓ Ventas por día (chart)
✓ Heatmap coordinates (GeoJSON)
✓ Leads (20-30 prospectos)
```

### **FASE 4: Constructor + Invitaciones (10% del gap)** — 1-2 días
```
Prioridad: MEDIA

Páginas:
✓ /eventos/crear — Constructor Drag & Drop
✓ /invitaciones — Campañas omnicanal

Componentes:
✓ EventBuilder (React DnD)
✓ ComponentPalette (Hero, Agenda, etc.)
✓ TemplateSelector (4 plantillas)
✓ CampaignBuilder
✓ EmailPreview
✓ SMSPreview

Mock Data:
✓ 4 plantillas predefinidas
✓ Componentes drag-drop (10+)
✓ Templates de email/SMS (5+)
```

### **FASE 5: Check-in + Certificados + Cashless (5% del gap)** — 1 día
```
Prioridad: BAJA (nice-to-have)

Páginas:
✓ /check-in — Escáner QR
✓ /certificados — Mis certificados
✓ /cashless — Billetera digital
✓ /eventos/[id]/certificados — Generador (org)

Componentes:
✓ QRScanner (Web API)
✓ CheckInSuccess (animación)
✓ CertificateViewer
✓ CertificateDownload (jsPDF)
✓ DigitalWallet
✓ QRPayment

Mock Data:
✓ QR válidos/inválidos
✓ Certificados (3-5 diseños)
✓ Saldo billetera
✓ Historial transacciones
```

---

## 🎯 RESULTADO FINAL

### **Después de las 5 Fases:**
```
✅ 100% del frontend del brochure implementado
✅ 15 páginas nuevas
✅ 50+ componentes nuevos
✅ Mock data para todas las features
✅ UX completa de las 12 épicas
✅ Demos interactivos funcionales
```

### **Funcionalidades Demostradas:**
```
✅ Compra de tickets completa
✅ Ticket digital con QR dinámico
✅ Check-in sin filas
✅ Experiencia live (streaming, Q&A, polls)
✅ Networking (muro social, chat, meetings)
✅ Cashless (billetera digital)
✅ Certificados de asistencia
✅ Dashboard organizador
✅ Analytics avanzado (heatmaps)
✅ Generación de leads
✅ Constructor de eventos (Drag & Drop)
✅ Campañas de invitación
```

### **Disclaimer Necesario:**
```
⚠️ IMPORTANTE: Todas estas features son DEMOS frontend con mock data.
El backend real (pagos, base de datos, autenticación) será
implementado en Fase 2 y Fase 3 según el plan original (Q1-Q2 2027).

Esta implementación sirve para:
✓ Validar UX completa con usuarios
✓ Demos de ventas
✓ Fundraising/inversión
✓ Guía para el equipo backend
```

---

## 📊 ESTIMACIÓN

### **Tiempo Total:**
```
FASE 1: 2-3 días (Ticketing & Checkout)
FASE 2: 2 días (Experiencia Live)
FASE 3: 1-2 días (Dashboard Organizador)
FASE 4: 1-2 días (Constructor + Invitaciones)
FASE 5: 1 día (Check-in + Certificados + Cashless)

TOTAL: 7-10 días de desarrollo
```

### **Esfuerzo:**
```
50+ componentes nuevos
15+ páginas nuevas
10+ mock data files
5+ nuevas dependencias
20K+ líneas de código
```

---

## 🚀 PRÓXIMO PASO

¿Quieres que comience con **FASE 1: Ticketing & Checkout**?

Es la más crítica porque:
- 40% del gap de funcionalidad
- Core del negocio (venta de tickets)
- Flujo completo: selección → checkout → confirmación → ticket digital
- Base para el resto (autenticación, perfil de usuario)

**Incluiría:**
- Página de selección de tickets
- Checkout en 3 pasos
- Integración Stripe/MercadoPago (UI mock)
- Ticket digital con QR dinámico
- Agregar a Apple/Google Wallet
- Página "Mis Eventos"

**Tiempo estimado:** 2-3 días  
**Resultado:** Flujo completo de compra funcional (frontend)

---

**¿Aprobado para comenzar FASE 1?**
