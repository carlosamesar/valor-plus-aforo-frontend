# 🎯 PLAN: 100% FRONTEND PÚBLICO DEL BROCHURE

**Fecha:** 2026-10-26  
**Objetivo:** Implementar TODAS las features de frontend PÚBLICO del brochure  
**Alcance:** SOLO experiencia del usuario final/asistente (NO admin dashboard)  
**Estrategia:** UI/UX demo con datos mock para mostrar la experiencia completa  

---

## 📊 ESTADO ACTUAL vs OBJETIVO (PÚBLICO)

### ✅ Ya Implementado (40% del frontend público)
```
✅ Listado de eventos con búsqueda y filtros
✅ Detalle de evento (modal completo)
✅ Calendario interactivo
✅ Categorías y organizadores
✅ Páginas: pricing, roadmap, demo, contact, early-access
✅ Social proof en tiempo real
✅ Navegación global (Navbar + Footer)
```

### ❌ Faltante (60% del frontend público)

**Journey del Asistente Completo:**
```
❌ Compra de tickets (selección + checkout)
❌ Ticket digital con QR dinámico
❌ Check-in Zero-Wait (validación QR)
❌ Experiencia Live durante el evento:
   - Streaming virtual/híbrido
   - Q&A en vivo con el ponente
   - Polls y votaciones
   - Quizzes gamificados
❌ Networking:
   - Muro social interactivo
   - Chat privado entre asistentes
   - Meeting planner (agendar reuniones 1-a-1)
   - NFC Tap-to-network (simulado)
❌ Cashless:
   - Billetera digital
   - Recargar saldo
   - Pagar con QR
   - Historial de transacciones
❌ Certificados de asistencia:
   - Ver certificado personalizado
   - Descargar PDF
   - Compartir en LinkedIn
```

---

## 🗂️ ARQUITECTURA SIMPLIFICADA (SOLO PÚBLICO)

### **Estructura de Rutas (nuevas)**

```
app/
├── (publico)/                    # ✅ Ya existe
│   ├── page.tsx                  # ✅ Homepage
│   ├── eventos/                  # ✅ Listado
│   ├── [eventId]/                # ✅ Detalle modal
│   ├── calendario/               # ✅ Vista mensual
│   ├── categorias/               # ✅ Grid categorías
│   ├── organizadores/            # ✅ Landing organizadores
│   ├── pricing/                  # ✅ Planes
│   ├── roadmap/                  # ✅ Progreso
│   ├── demo/                     # ✅ Agendar demo
│   ├── early-access/             # ✅ Early access
│   └── contact/                  # ✅ Contacto
│
├── (compra)/                     # ⭐ NUEVO: Flujo de compra
│   ├── tickets/[eventId]/        # Selección de tickets
│   ├── checkout/                 # Proceso de pago (3 pasos)
│   └── confirmacion/             # Confirmación + descarga QR
│
├── (mi-cuenta)/                  # ⭐ NUEVO: Cuenta usuario
│   ├── mis-eventos/              # Eventos registrados
│   ├── tickets/[id]/             # Ticket digital (QR)
│   ├── perfil/                   # Editar perfil
│   └── certificados/             # Mis certificados
│
├── (evento-live)/                # ⭐ NUEVO: Experiencia en vivo
│   └── evento/[id]/live/         # Hub experiencia live
│       ├── streaming/            # Streaming player
│       ├── qa/                   # Q&A panel
│       ├── polls/                # Votaciones
│       ├── quizzes/              # Quizzes gamificados
│       ├── networking/           # Muro social + chat
│       └── cashless/             # Billetera digital
│
└── (check-in)/                   # ⭐ NUEVO: Check-in
    └── check-in/[ticketId]/      # Validación QR (asistente view)
```

---

## 📦 COMPONENTES NUEVOS (PÚBLICO)

### **1. Compra de Tickets**
```typescript
components/compra/
├── TicketSelector/
│   ├── TicketTypeCard.tsx        # Card de tipo de ticket
│   ├── QuantitySelector.tsx      # +/- cantidad
│   ├── PricingSummary.tsx        # Resumen de precios
│   └── AvailabilityBadge.tsx     # "Solo quedan X"
│
├── CheckoutFlow/
│   ├── CheckoutStepper.tsx       # Progress bar 1/2/3
│   ├── AttendeeForm.tsx          # Datos de asistentes
│   ├── PaymentMethods.tsx        # Stripe/MercadoPago mock
│   ├── BillingInfo.tsx           # Facturación
│   └── OrderSummary.tsx          # Resumen sticky
│
└── Confirmation/
    ├── OrderConfirmed.tsx        # Mensaje de éxito
    ├── TicketsGenerated.tsx      # Descargar tickets
    └── EmailSentBadge.tsx        # "Email enviado"
```

### **2. Ticket Digital**
```typescript
components/tickets/
├── TicketCard.tsx                # Card completo del ticket
├── QRDisplay.tsx                 # QR dinámico (rotación 15s)
├── WalletButton.tsx              # Agregar a Apple/Google Wallet
├── TransferButton.tsx            # Transferir ticket (si permitido)
└── EventDetails.tsx              # Detalles del evento
```

### **3. Experiencia Live**
```typescript
components/live/
├── StreamingPlayer.tsx           # Video player (Hls.js)
├── QAPanel/
│   ├── QAList.tsx                # Lista de preguntas
│   ├── QASubmit.tsx              # Enviar pregunta
│   └── QAUpvote.tsx              # Upvote preguntas
│
├── PollWidget/
│   ├── PollQuestion.tsx          # Pregunta de votación
│   ├── PollOptions.tsx           # Opciones + votar
│   └── PollResults.tsx           # Resultados en tiempo real
│
├── QuizGame/
│   ├── QuizQuestion.tsx          # Pregunta del quiz
│   ├── QuizOptions.tsx           # Opciones + submit
│   ├── QuizScore.tsx             # Puntaje
│   └── LeaderboardMini.tsx       # Top 10
│
└── LiveTabs.tsx                  # Tabs: Stream | Q&A | Polls | Quiz
```

### **4. Networking**
```typescript
components/networking/
├── SocialWall/
│   ├── PostCard.tsx              # Card de post (foto, texto)
│   ├── PostComposer.tsx          # Crear post
│   ├── Reactions.tsx             # Like, love, wow
│   └── CommentsList.tsx          # Comentarios
│
├── MeetingPlanner/
│   ├── AttendeesList.tsx         # Lista de asistentes
│   ├── ScheduleMeeting.tsx       # Agendar reunión 1-a-1
│   ├── MyMeetings.tsx            # Mis reuniones agendadas
│   └── MeetingCard.tsx           # Card de reunión
│
├── ChatPrivate/
│   ├── ChatList.tsx              # Lista de conversaciones
│   ├── ChatWindow.tsx            # Ventana de chat
│   └── ChatMessage.tsx           # Mensaje individual
│
└── NFCTap/
    ├── TapAnimation.tsx          # Animación de "tap"
    └── ContactExchanged.tsx      # "Contacto intercambiado"
```

### **5. Cashless**
```typescript
components/cashless/
├── WalletBalance.tsx             # Saldo actual
├── TopUpForm.tsx                 # Recargar saldo
├── QRPayment.tsx                 # Pagar con QR
├── TransactionHistory.tsx        # Historial
└── TransactionCard.tsx           # Card de transacción
```

### **6. Certificados**
```typescript
components/certificados/
├── CertificateViewer.tsx         # Vista del certificado
├── CertificateDownload.tsx       # Descargar PDF (jsPDF)
├── CertificateShare.tsx          # Compartir en LinkedIn
└── CertificateCard.tsx           # Card en lista
```

### **7. Check-in**
```typescript
components/check-in/
├── QRDisplay.tsx                 # Mostrar QR para escanear
├── CheckInSuccess.tsx            # Animación de éxito
├── BadgePreview.tsx              # Preview de badge/manilla
└── CheckInInstructions.tsx       # Instrucciones para asistente
```

---

## 🎨 PÁGINAS NUEVAS (PÚBLICO)

### **1. Compra de Tickets** `/tickets/[eventId]`
```typescript
Sections:
✓ Header: Imagen evento + título + fecha
✓ Tipos de tickets: General ($50), VIP ($150), Backstage ($300)
✓ Selector de cantidad: +/- por tipo
✓ Resumen: Subtotal + fees + total
✓ Disponibilidad: Badge "Solo quedan 5 VIP"
✓ CTA: "Continuar al Checkout"
✓ FAQs: Políticas de reembolso, transferencia
```

### **2. Checkout** `/checkout`
```typescript
3 Pasos:

PASO 1: Datos de Asistentes
✓ Formulario: Nombre, Email, Teléfono (por cada ticket)
✓ Checkbox: "Soy yo" (pre-llenar datos)
✓ Validación: Campos requeridos

PASO 2: Método de Pago
✓ Opciones: Tarjeta (Stripe), MercadoPago, Transferencia
✓ Formulario de tarjeta: Mock UI
✓ Guardar para próximos eventos

PASO 3: Confirmación
✓ Revisar orden completa
✓ Aceptar términos y condiciones
✓ CTA: "Confirmar y Pagar"

Sidebar (sticky):
✓ Resumen de orden
✓ Tickets seleccionados
✓ Total a pagar
✓ Badges de seguridad
```

### **3. Confirmación** `/confirmacion`
```typescript
Sections:
✓ Hero: "¡Compra exitosa! 🎉"
✓ Orden #: 123456
✓ Email enviado: Confirmación + QR
✓ Tickets generados:
  - Descargar todos (ZIP)
  - Ver individualmente
✓ Next steps:
  - Agregar al calendario
  - Ver mis tickets
  - Compartir en redes
✓ Detalles del evento (resumen)
```

### **4. Mis Eventos** `/mi-cuenta/mis-eventos`
```typescript
Sections:
✓ Tabs: Próximos | Pasados | Cancelados
✓ Grid de eventos:
  - Imagen evento
  - Título + fecha
  - Cantidad de tickets
  - CTA: "Ver tickets" | "Ver certificado"
✓ Empty state: "No tienes eventos"
✓ CTA: "Explorar eventos"
```

### **5. Ticket Digital** `/mi-cuenta/tickets/[id]`
```typescript
Sections:
✓ Hero: Imagen del evento
✓ QR Code: Dinámico (rotación 15s) + temporizador
✓ Detalles:
  - Nombre del asistente
  - Tipo de ticket
  - Fecha + hora
  - Ubicación
  - Número de orden
✓ Actions:
  - Agregar a Apple Wallet
  - Agregar a Google Wallet
  - Descargar PDF
  - Transferir (si permitido)
  - Compartir
✓ Instrucciones check-in
```

### **6. Experiencia Live** `/evento/[id]/live`
```typescript
Layout:
├── Video Player (70% ancho) │ Chat + Info (30%)
├── Tabs below player:
│   ✓ Q&A
│   ✓ Polls
│   ✓ Quizzes
│   ✓ Networking

Video Player:
✓ HLS streaming (Hls.js)
✓ Controles: Play, volumen, fullscreen
✓ Quality selector: Auto, 1080p, 720p, 480p
✓ Captions (si disponible)
✓ Live badge: "EN VIVO" parpadeando

Q&A Tab:
✓ Lista de preguntas (sorted by upvotes)
✓ Upvote button
✓ Enviar pregunta (formulario)
✓ Badge "Respondida" en las contestadas
✓ Filter: Todas | Top | Mis preguntas

Polls Tab:
✓ Votación activa (si hay)
✓ Opciones + votar
✓ Resultados en tiempo real (chart)
✓ Historial de polls anteriores

Quizzes Tab:
✓ Pregunta actual
✓ 4 opciones múltiple choice
✓ Timer: 30 segundos
✓ Leaderboard en vivo
✓ Mi puntaje acumulado
✓ Animación de respuesta correcta/incorrecta

Chat Sidebar:
✓ Mensajes en tiempo real (mock WebSocket)
✓ Avatar + nombre + mensaje
✓ Enviar mensaje
✓ Reacciones rápidas (emojis)
```

### **7. Networking** `/evento/[id]/live/networking`
```typescript
Tabs:
├── Muro Social
├── Chat Privado
├── Meeting Planner
└── Mis Contactos

Muro Social:
✓ Composer: "¿Qué estás pensando?"
✓ Subir foto
✓ Feed de posts:
  - Avatar + nombre + tiempo
  - Texto + imagen (si tiene)
  - Reacciones: Like, Love, Wow
  - Comentarios
  - Compartir
✓ Filter: Recientes | Populares | Mis posts

Chat Privado:
✓ Lista de conversaciones (sidebar)
✓ Ventana de chat (main)
✓ Enviar mensaje + emojis
✓ Ver perfil del contacto
✓ Buscar asistentes

Meeting Planner:
✓ Lista de asistentes del evento
✓ Filter por intereses/empresa
✓ Proponer reunión (fecha, hora, lugar)
✓ Mis reuniones agendadas
✓ Notificaciones 15 min antes

Mis Contactos:
✓ Contactos intercambiados (via NFC tap)
✓ Exportar a vCard
✓ Conectar en LinkedIn (deep link)
```

### **8. Billetera Cashless** `/evento/[id]/live/cashless`
```typescript
Sections:
✓ Header: Saldo disponible ($50.00)
✓ QR Code: Para pagar en stands
✓ Recargar:
  - Tarjeta
  - Efectivo en kioscos (info)
✓ Historial de transacciones:
  - Fecha + hora
  - Concepto: "Hamburguesa", "Merch"
  - Monto
  - Saldo después
✓ Vincular pulsera NFC (instrucciones)
✓ FAQs: ¿Cómo funciona? ¿Es seguro?
```

### **9. Mis Certificados** `/mi-cuenta/certificados`
```typescript
Sections:
✓ Grid de certificados:
  - Thumbnail del certificado
  - Nombre del evento
  - Fecha de emisión
  - CTA: "Ver" | "Descargar" | "Compartir"
✓ Empty state: "No tienes certificados aún"
✓ Filtros: Todos | Este año | Por evento
```

### **10. Certificado Individual** `/mi-cuenta/certificados/[id]`
```typescript
Sections:
✓ Preview grande del certificado:
  - Logo del evento
  - "Certificado de Asistencia"
  - Nombre del asistente
  - Nombre del evento
  - Fecha
  - Firma del organizador
✓ Actions:
  - Descargar PDF
  - Compartir en LinkedIn
  - Compartir en Twitter
  - Copiar link
✓ Detalles del evento (sidebar)
```

### **11. Check-in (Vista Asistente)** `/check-in/[ticketId]`
```typescript
Sections:
✓ Hero: "¡Hora de hacer check-in!"
✓ QR Code grande (para que lo escaneen)
✓ Instrucciones:
  - Acércate al punto de check-in
  - Muestra este QR
  - Recibirás tu badge/manilla
✓ Backup: Código numérico (si falla QR)
✓ Estado: "Pendiente" | "Check-in exitoso ✓"

(Cuando organizador escanea):
✓ Animación: Confetti + "¡Bienvenido!"
✓ Badge virtual preview
✓ Next: "Disfruta el evento"
```

---

## 🛠️ STACK TÉCNICO (Nuevos)

```bash
# QR Codes
npm install qrcode.react

# Streaming
npm install hls.js react-player

# Certificados PDF
npm install jspdf @react-pdf/renderer

# Animaciones
npm install canvas-confetti

# Forms
npm install react-hook-form zod @hookform/resolvers

# Mock WebSocket (Chat/Live)
npm install socket.io-client

# Charts (Polls results)
npm install recharts
```

---

## 📋 PLAN DE EJECUCIÓN (4 Fases Simplificadas)

### **FASE 1: Ticketing & Checkout (40%)** — 2-3 días
```
Prioridad: CRÍTICA

Páginas:
✓ /tickets/[eventId] — Selección de tickets
✓ /checkout — Flujo de pago (3 pasos)
✓ /confirmacion — Confirmación + descargar
✓ /mi-cuenta/mis-eventos — Mis eventos
✓ /mi-cuenta/tickets/[id] — Ticket digital

Componentes:
✓ TicketSelector (3 tipos de tickets)
✓ CheckoutFlow (3 pasos con validación)
✓ TicketCard con QR dinámico
✓ WalletButton (Apple/Google)

Mock Data:
✓ Tipos de tickets por evento
✓ Precios + fees ($5 service fee)
✓ Stripe/MercadoPago placeholders
✓ QR codes generados

Features:
✓ Selección de cantidad
✓ Validación de formularios
✓ Resumen sticky
✓ Descarga de tickets PDF
✓ Agregar a Wallet
```

### **FASE 2: Experiencia Live (35%)** — 2-3 días
```
Prioridad: ALTA

Páginas:
✓ /evento/[id]/live — Hub live completo
✓ Tabs: Stream | Q&A | Polls | Quizzes

Componentes:
✓ StreamingPlayer (Hls.js)
✓ QAPanel (enviar preguntas, upvotes)
✓ PollWidget (votar + ver resultados)
✓ QuizGame (gamificación)
✓ LiveChat (sidebar)
✓ LeaderboardMini

Mock Data:
✓ Stream URL (video de muestra Vimeo/YouTube)
✓ 15+ preguntas Q&A
✓ 5 polls activos
✓ 10 quiz questions
✓ Mensajes de chat (mock)

Features:
✓ Video player con controles
✓ Quality selector
✓ Upvote preguntas (optimistic UI)
✓ Votar en polls (resultados live)
✓ Quiz con timer
✓ Leaderboard actualizado
✓ Chat en tiempo real (mock WebSocket)
```

### **FASE 3: Networking & Cashless (15%)** — 1-2 días
```
Prioridad: MEDIA

Páginas:
✓ /evento/[id]/live/networking
✓ /evento/[id]/live/cashless

Componentes:
✓ SocialWall (posts + reacciones)
✓ PostComposer (crear post)
✓ ChatPrivate (mensajes 1-a-1)
✓ MeetingPlanner (agendar reuniones)
✓ DigitalWallet (saldo + recargar)
✓ QRPayment (pagar con QR)
✓ TransactionHistory

Mock Data:
✓ 30+ posts en muro social
✓ 10+ asistentes para chat
✓ 5 reuniones agendadas
✓ Saldo wallet: $50
✓ 10 transacciones históricas

Features:
✓ Crear post con foto
✓ Reacciones (like, love, wow)
✓ Comentar posts
✓ Chat 1-a-1 funcional
✓ Agendar reuniones (date picker)
✓ Recargar saldo (formulario)
✓ Ver historial transacciones
```

### **FASE 4: Check-in & Certificados (10%)** — 1 día
```
Prioridad: BAJA (Nice-to-have)

Páginas:
✓ /check-in/[ticketId] — Vista asistente
✓ /mi-cuenta/certificados — Lista
✓ /mi-cuenta/certificados/[id] — Detalle

Componentes:
✓ QRDisplay (check-in)
✓ CheckInSuccess (animación confetti)
✓ CertificateViewer
✓ CertificateDownload (jsPDF)
✓ CertificateShare (LinkedIn)

Mock Data:
✓ QR válidos para check-in
✓ 5 certificados de ejemplo
✓ 3 diseños de certificado

Features:
✓ Mostrar QR para check-in
✓ Animación al hacer check-in
✓ Generar certificado PDF
✓ Descargar PDF
✓ Compartir en LinkedIn (deep link)
```

---

## 🎯 RESULTADO FINAL

### **Al completar las 4 Fases:**
```
✅ 100% del frontend PÚBLICO del brochure implementado
✅ 11 páginas nuevas
✅ 40+ componentes nuevos
✅ Mock data realista para todas las features
✅ Journey completo del asistente: descubrimiento → compra → live → post-evento
```

### **Journey del Usuario Completo:**
```
1. Descubrir evento (✅ ya existe)
2. Ver detalles (✅ ya existe)
3. Comprar tickets (✅ FASE 1)
4. Recibir ticket digital (✅ FASE 1)
5. Hacer check-in (✅ FASE 4)
6. Experiencia live (✅ FASE 2):
   - Ver streaming
   - Hacer preguntas
   - Votar en polls
   - Jugar quizzes
7. Networking (✅ FASE 3):
   - Publicar en muro social
   - Chatear con asistentes
   - Agendar reuniones
8. Compras cashless (✅ FASE 3):
   - Recargar billetera
   - Pagar con QR
9. Obtener certificado (✅ FASE 4)
10. Descargar certificado (✅ FASE 4)
```

### **Disclaimer Importante:**
```
⚠️ NOTA: Todas estas features son DEMOS frontend con mock data.
El backend real (base de datos, autenticación, pagos, streaming real)
será implementado en Fase 2 y Fase 3 del roadmap (Q1-Q2 2027).

Esta implementación sirve para:
✓ Validar UX completa con usuarios reales
✓ Demos de ventas y fundraising
✓ Especificación visual para equipo backend
✓ Testing de flujos críticos
```

---

## 📊 ESTIMACIÓN FINAL

### **Tiempo Total:**
```
FASE 1: 2-3 días (Ticketing completo)
FASE 2: 2-3 días (Experiencia Live)
FASE 3: 1-2 días (Networking + Cashless)
FASE 4: 1 día (Check-in + Certificados)

TOTAL: 6-9 días de desarrollo
```

### **Esfuerzo:**
```
40+ componentes nuevos
11+ páginas nuevas
8+ mock data files
6 nuevas dependencias
15K+ líneas de código
```

---

## 🚀 RECOMENDACIÓN

Comenzar con **FASE 1: Ticketing & Checkout** porque:

✅ Es el 40% del gap funcional  
✅ Core del negocio (sin compra, no hay evento)  
✅ Genera la base: autenticación, perfil de usuario  
✅ Flujo crítico para demos/ventas  
✅ Desbloquea el resto de features (live requiere ticket)  

**¿Aprobado para comenzar FASE 1?**

Incluiría:
- Página de selección de tickets (3 tipos)
- Checkout en 3 pasos con validación
- Confirmación + descarga de tickets
- Ticket digital con QR dinámico
- Agregar a Apple/Google Wallet
- Página "Mis Eventos"

**Tiempo:** 2-3 días  
**Resultado:** Flujo completo de compra funcional
