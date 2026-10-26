# 🗺️ AFORO: PRODUCT ROADMAP COMPLETO

**Fecha:** 2026-10-26  
**Visión:** Sistema Inteligente para Eventos Extraordinarios  
**Estrategia:** Incremental MVP → Full Product  

---

## 🎯 VISIÓN DEL PRODUCTO (Del Brochure)

> **"Transformamos el caos logístico en experiencias hiperconectadas"**

**Propuesta de Valor:**
- Sistema SaaS end-to-end: registro + control de acceso + análisis en sitio
- QR dinámico + pulseras NFC + georeferenciación tiempo real
- Experiencias sin fricciones + ROI patrocinadores + decisiones data-driven

---

## ✅ FASE 1: FRONTEND PÚBLICO (COMPLETADA)

**Duración:** 2 semanas  
**Status:** ✅ **COMPLETADA** (2026-10-26)  
**Budget:** $0 (desarrollo interno)  

### **Alcance Implementado:**

#### **1. Sitio Público Premium**
```
5 páginas funcionales con UX excepcional (9.2/10)
```

**Páginas:**
- ✅ **/** — Homepage con hero parallax, eventos destacados, categorías
- ✅ **/eventos** — Listado + filtros avanzados + recomendaciones
- ✅ **/categorias** — Grid con iconos custom SVG
- ✅ **/calendario** — Vista mensual interactiva (shadcn Calendar)
- ✅ **/organizadores** — Landing con features + pricing + CTA

#### **2. Componentes Avanzados**
```
Sistema de diseño completo con animaciones profesionales
```

**Core:**
- ✅ **EventCardEnhanced** — 3D tilt + glassmorphism + social proof
- ✅ **EventDetailModal** — Modal completo con todas las acciones
- ✅ **SearchAutocomplete** — Búsqueda inteligente (eventos/categorías/ciudades)
- ✅ **EventFilters** — Filtros avanzados responsive
- ✅ **SocialProofBadge** — Contador en tiempo real ("X personas viendo")
- ✅ **RecommendedEvents** — Sistema de scoring personalizado
- ✅ **AddToCalendarButton** — Google/Apple/Outlook calendar sync
- ✅ **ScrollReveal** — Animaciones scroll-triggered (5 direcciones)

#### **3. Features Destacados**
```
Diferenciadores vs competencia básica
```

- ✅ **Dark theme** premium (#0a0e1a, #1a1e2e, #ff5722)
- ✅ **Parallax scroll** en hero con partículas animadas
- ✅ **3D card effects** con mouse tracking
- ✅ **Glassmorphism** consistente en overlays
- ✅ **Social proof simulado** (5-25 viewers, actualización 3-8s)
- ✅ **Autocomplete** con navegación por teclado
- ✅ **Scroll animations** en todas las secciones
- ✅ **Layout centrado** responsive (max-width: 1400px)
- ✅ **Toast notifications** (Sonner)
- ✅ **6 custom icons** SVG para categorías

#### **4. Tech Stack**
```
Next.js 14 + TypeScript + TailwindCSS + shadcn/ui
```

- ✅ **Next.js 14** (App Router, SSR/SSG)
- ✅ **TypeScript** (type-safe)
- ✅ **TailwindCSS** + shadcn/ui components
- ✅ **Framer Motion** (animaciones 60fps)
- ✅ **date-fns** (fechas en español)
- ✅ **Zustand** (state management preparado)
- ✅ **React Hook Form + Zod** (preparado para forms)

### **Deliverables:**
- ✅ Sitio funcional localhost:3000
- ✅ 6 mock events + 6 categorías
- ✅ Build sin errores
- ✅ Responsive mobile/tablet/desktop
- ✅ Documentación completa:
  - `FASE-2-COMPLETADA.md`
  - `MODAL-DETALLE-EVENTO.md`
  - `BROCHURE-GAP-ANALYSIS.md`

### **Métricas Proyectadas (con data real):**
```
Bounce Rate: 45%
Time on Site: 4 min
Pages per Session: 3.8
Conversion Intent: 30%
```

---

## 🚀 FASE 2: TICKETING & TRANSACCIONES

**Duración:** 3-4 meses  
**Status:** 🔴 **NO INICIADA**  
**Priority:** 🔥 **CRÍTICA** (Bloqueante para revenue)  
**Budget:** ~$80K  
**Team:** 2 FE + 2 BE + 1 QA  

### **Objetivo:**
> Habilitar venta de tickets con pagos reales y emisión de QR

### **Épicas a Implementar:**

#### **Épica 4: Pasarela Transaccional + QR Dinámico**

**Backend (NestJS/Python/Java):**
- [ ] **API de Eventos**
  - CRUD completo de eventos
  - Gestión de categorías
  - Carga de imágenes (S3/CloudFlare)
  - Publicación/despublicación
  - Gestión de disponibilidad en tiempo real
- [ ] **API de Tickets**
  - Tipos de tickets (General, VIP, Early Bird)
  - Pricing dinámico
  - Validación de stock
  - Reservas temporales (5 min hold)
- [ ] **Integración de Pagos**
  - Stripe (tarjetas internacionales)
  - Mercado Pago (LATAM)
  - Wompi (Colombia)
  - Webhooks de confirmación
  - Manejo de refunds
- [ ] **Generación de QR**
  - QR estático v1 (UUID único)
  - Almacenamiento seguro
  - Endpoint de validación
- [ ] **Notificaciones**
  - Email transaccional (SendGrid)
  - Confirmación de compra
  - QR adjunto en PDF
  - Recordatorios pre-evento

**Frontend (Next.js 14):**
- [ ] **Flujo de Compra**
  - Modal de selección de tickets
  - Carrito de compras
  - Formulario de checkout (React Hook Form + Zod)
  - Integración con Stripe Elements
  - Página de confirmación
- [ ] **Mi Cuenta**
  - Login/registro (Auth0/NextAuth)
  - Mis tickets comprados
  - Descargar QR
  - Historial de compras
- [ ] **Add to Wallet (v1)**
  - Generación de .pkpass (Apple Wallet)
  - Generación de .jwt (Google Wallet)
  - Deep links

**Testing:**
- [ ] Unit tests (Jest) — coverage ≥85%
- [ ] E2E Playwright — flujo completo de compra
- [ ] Tests de integración con Stripe Test Mode
- [ ] Security tests (SQL injection, XSS)

### **Acceptance Criteria:**
```
✅ Usuario puede comprar ticket con tarjeta
✅ Recibe email con QR en PDF
✅ QR es único y validable
✅ Stock se actualiza en tiempo real
✅ Refunds funcionan correctamente
✅ Tests pasan al 100%
```

### **Deliverables:**
- Backend API completo con docs (Swagger)
- Frontend con flujo de compra end-to-end
- Integración Stripe + MP funcionando
- QR estático generado y enviado por email
- Documentación técnica

---

## 📊 FASE 3: ADMIN PARA ORGANIZADORES

**Duración:** 5-6 meses  
**Status:** 🔴 **NO INICIADA**  
**Priority:** 🔥 **CRÍTICA**  
**Budget:** ~$120K  
**Team:** 2 FE + 2 BE + 1 QA  

### **Objetivo:**
> Dashboard completo para que organizadores gestionen sus eventos

### **Épicas a Implementar:**

#### **Épica 12: Panel de Control Centralizado (v1)**

**Dashboard Principal:**
- [ ] **Métricas en Tiempo Real**
  - Tickets vendidos / disponibles
  - Revenue total y por tipo de ticket
  - Conversión (visitas → compras)
  - Fuentes de tráfico
- [ ] **Gráficos**
  - Ventas en el tiempo (Chart.js/Recharts)
  - Revenue por día
  - Distribución por tipo de ticket
  - Embudo de conversión
- [ ] **Lista de Asistentes**
  - Tabla con búsqueda/filtros
  - Exportar CSV
  - Enviar email masivo
- [ ] **Reportes Descargables**
  - PDF con resumen ejecutivo
  - Excel con detalle de ventas
  - Lista de asistentes

#### **Épica 1: Constructor de Eventos (v1)**

**CRUD de Eventos:**
- [ ] **Crear Evento**
  - Formulario multi-step
  - Información básica (título, descripción, categoría)
  - Fecha/hora (date-time picker)
  - Ubicación (Google Maps integration)
  - Imagen destacada (drag & drop upload)
  - Galería de imágenes (opcional)
- [ ] **Configurar Tickets**
  - Tipos de tickets (agregar/eliminar)
  - Precio por tipo
  - Cantidad disponible
  - Fecha límite de venta
  - Descuentos/cupones (básico)
- [ ] **Vista Previa**
  - Cómo se ve en el sitio público
  - Mobile/desktop preview
- [ ] **Publicar/Despublicar**
  - Estado: Draft, Published, Ended
  - Fecha de publicación programada

#### **Épica 3: Campañas de Invitación (v1)**

**Email Marketing:**
- [ ] **Integración SendGrid**
  - Plantillas de email
  - Variables dinámicas
  - Tracking de opens/clicks
- [ ] **Campañas**
  - Crear campaña
  - Seleccionar destinatarios (CSV upload o segmentos)
  - Preview antes de enviar
  - Envío masivo
  - Reportes de deliverability

**Segmentación Básica:**
- [ ] Por evento anterior asistido
- [ ] Por categoría de interés
- [ ] Por ubicación

### **Acceptance Criteria:**
```
✅ Organizador puede crear evento completo
✅ Puede ver dashboard con métricas reales
✅ Puede exportar lista de asistentes
✅ Puede enviar emails masivos
✅ Puede publicar/despublicar eventos
✅ Tests E2E pasan al 100%
```

### **Deliverables:**
- Admin panel completo (Next.js admin)
- Dashboard con gráficos en tiempo real
- CRUD de eventos funcional
- Email campaigns funcionando
- Roles y permisos (admin vs organizador)
- Documentación de admin

---

## 🎫 FASE 4: CHECK-IN Y VALIDACIÓN

**Duración:** 3-4 meses  
**Status:** 🔴 **NO INICIADA**  
**Priority:** 🟡 **ALTA**  
**Budget:** ~$100K  
**Team:** 1 FE + 2 BE + 1 Mobile + 1 QA  

### **Objetivo:**
> Control de acceso en sitio con validación de QR

### **Épicas a Implementar:**

#### **Épica 5: Check-in Zero-Wait (v1 — QR Only)**

**App Móvil para Staff (React Native/Flutter):**
- [ ] **Escaneo de QR**
  - Camera access
  - Lectura de QR Code
  - Validación en tiempo real (API)
  - Feedback visual/sonoro (✅ válido / ❌ inválido)
- [ ] **Offline Mode**
  - Cache de QR válidos
  - Sincronización cuando hay red
- [ ] **Dashboard de Staff**
  - Total scaneados
  - Por tipo de ticket
  - Últimos 10 scans
- [ ] **Multi-staff**
  - Login por usuario
  - Múltiples devices validando simultáneamente

**Backend:**
- [ ] **API de Validación**
  - POST /tickets/:qrCode/validate
  - Verificar unicidad (no doble entrada)
  - Registrar timestamp de entrada
  - Webhook a dashboard en tiempo real
- [ ] **Sincronización**
  - WebSockets para updates live
  - Notificar a dashboard cuando alguien entra

#### **Épica 4: QR Dinámico (v2)**

**QR Anti-Fraude:**
- [ ] **Rotación Automática**
  - QR cambia cada 15 segundos
  - TOTP algorithm (Time-based One-Time Password)
  - Secret único por ticket
- [ ] **Wallet Integration**
  - Apple Wallet (.pkpass con auto-update)
  - Google Wallet (.jwt con push updates)
  - Deep links para agregar a wallet
- [ ] **Validación Anti-Screenshot**
  - QR solo válido en ventana de 30s
  - Timestamp incluido en QR
  - Verificación server-side

### **Acceptance Criteria:**
```
✅ Staff puede escanear QR con app móvil
✅ Validación toma <2 segundos
✅ No se permite doble entrada
✅ Dashboard se actualiza en tiempo real
✅ QR dinámico rota cada 15s
✅ Wallet integration funciona (Apple + Google)
```

### **Deliverables:**
- App móvil para staff (iOS + Android)
- API de validación en tiempo real
- QR dinámico con rotación
- Wallet integration (Apple + Google)
- Documentación de check-in

---

## 📱 FASE 5: WEBAPP DEL ASISTENTE (PWA)

**Duración:** 4-5 meses  
**Status:** 🔴 **NO INICIADA**  
**Priority:** 🟡 **ALTA**  
**Budget:** ~$125K  
**Team:** 3 FE + 2 BE + 1 QA  

### **Objetivo:**
> Experiencia en sitio para asistentes (networking + engagement)

### **Épicas a Implementar:**

#### **Épica 8: Smart Networking (v1)**

**Perfil de Asistente:**
- [ ] **Mi Perfil**
  - Nombre, bio, empresa, cargo
  - Foto de perfil
  - Redes sociales (LinkedIn, Twitter)
  - Intereses/tags
- [ ] **Búsqueda de Personas**
  - Buscar por nombre/empresa/cargo
  - Filtrar por intereses
  - Ver quién está en el evento
- [ ] **Intercambio de Contactos**
  - Escanear QR de otro asistente
  - Guardar contacto en "Mi red"
  - Exportar contactos (vCard)
- [ ] **Chat 1-a-1**
  - Mensajería privada (WebSockets)
  - Indicadores de "escribiendo..."
  - Historial de conversaciones

#### **Épica 7: Participación en Vivo (v1)**

**Engagement en Charlas:**
- [ ] **Agenda Personalizada**
  - Ver agenda del evento
  - Marcar charlas de interés
  - Notificación 5 min antes
- [ ] **Envío de Preguntas**
  - Escribir pregunta para el ponente
  - Upvote de preguntas de otros
  - Moderador aprueba/rechaza
- [ ] **Votaciones en Vivo**
  - Poll creation por organizador
  - Responder en tiempo real
  - Ver resultados live

**PWA Setup:**
- [ ] **Service Worker**
  - Offline mode
  - Cache de assets
  - Background sync
- [ ] **Push Notifications**
  - Web Push API
  - Notificaciones por ubicación (próxima fase)
  - Recordatorios de agenda
- [ ] **Instalable**
  - Add to Home Screen
  - Standalone mode
  - App-like experience

### **Acceptance Criteria:**
```
✅ Asistente puede crear perfil
✅ Puede buscar y conectar con otros
✅ Puede escanear QR para intercambiar contactos
✅ Puede chatear 1-a-1
✅ Puede enviar preguntas en charlas
✅ Recibe notificaciones push
✅ PWA instalable en móvil
```

### **Deliverables:**
- PWA completa y instalable
- Networking features funcionando
- Engagement tools en charlas
- Push notifications activas
- Chat en tiempo real

---

## 🏭 FASE 6: IoT Y GEOREFERENCIACIÓN

**Duración:** 6-8 meses  
**Status:** 🔴 **NO INICIADA**  
**Priority:** 🟢 **MEDIA** (Diferenciador avanzado)  
**Budget:** ~$200K + $86K hardware  
**Team:** 2 FE + 3 BE + 1 IoT Engineer + 1 QA  

### **Objetivo:**
> Hardware completo (NFC + Beacons) + analytics espaciales

### **Épicas a Implementar:**

#### **Épica 5: NFC Integration (v2)**

**Hardware:**
- [ ] **Pulseras NFC**
  - Partner: proveedor de pulseras (10K unidades)
  - Chip NFC (MIFARE/NTAG)
  - Diseño personalizable con logo
  - Encoding de UUID único por asistente
- [ ] **Lectores NFC**
  - Partner: proveedor de hardware (50 unidades)
  - Modelo: ACR122U o similar
  - Comunicación USB/WiFi
  - Firmware custom
- [ ] **Estaciones de Check-in**
  - Tótems con lector NFC integrado
  - Pantalla táctil (feedback visual)
  - Impresora térmica (credenciales)
  - Cámara para foto (opcional)

**Software:**
- [ ] **Firmware de Lectores**
  - Driver para comunicación
  - Validación offline (cache local)
  - Sincronización en lote
- [ ] **API de NFC**
  - Encoding de pulseras (vincular a ticket)
  - Validación ultra-rápida (<0.2s)
  - Acceso por capas (General/VIP/Backstage)
  - Logs de todas las lecturas

#### **Épica 10: Trazabilidad y Mapas de Calor**

**BLE Beacons:**
- [ ] **Despliegue de Beacons**
  - Partner: proveedor (200 unidades)
  - Modelo: Estimote o similar
  - Ubicación estratégica en recinto
  - Configuración de zonas/áreas
- [ ] **Detección de Proximidad**
  - App móvil detecta beacons cercanos
  - Triangulación de posición
  - Envío de posición a backend
- [ ] **Heatmaps en Tiempo Real**
  - Procesamiento de data de posición
  - Generación de heatmap live
  - Dashboard para organizador
  - Histórico de flujo

**Notificaciones por Ubicación:**
- [ ] **Geo-fencing**
  - Definir zonas de interés
  - Trigger cuando asistente entra/sale
  - Push notification personalizada
- [ ] **Crowd Routing**
  - Detectar saturación de zonas
  - Enviar ofertas para redistribuir
  - Notificar a staff si hay congestión

#### **Épica 9: Ecosistema Cashless (v1)**

**Billeteras Digitales:**
- [ ] **Vinculación**
  - Vincular pulsera NFC a wallet digital
  - Cargar saldo (tarjeta/efectivo)
  - Consultar saldo
- [ ] **POS (Point of Sale)**
  - Terminales con lector NFC
  - Cobro instantáneo (tap pulsera)
  - Ticket de compra (impreso/digital)
- [ ] **Reportes**
  - Dashboard de transacciones
  - Revenue por punto de venta
  - Productos más vendidos

### **Acceptance Criteria:**
```
✅ Pulseras NFC funcionan para check-in <0.2s
✅ Beacons detectan posición de asistentes
✅ Heatmaps se generan en tiempo real
✅ Notificaciones por ubicación funcionan
✅ Cashless permite comprar con tap de pulsera
✅ Hardware probado en evento piloto
```

### **Deliverables:**
- Pulseras NFC + lectores + beacons
- Firmware custom para lectores
- Heatmaps en dashboard
- Notificaciones geo-triggered
- Sistema cashless operativo
- Documentación de hardware

---

## 💼 FASE 7: PATROCINIOS Y MONETIZACIÓN

**Duración:** 3-4 meses  
**Status:** 🔴 **NO INICIADA**  
**Priority:** 🟡 **ALTA** (Revenue adicional)  
**Budget:** ~$80K  
**Team:** 2 FE + 2 BE + 1 QA  

### **Objetivo:**
> ROI medible para patrocinadores + lead retrieval

### **Épicas a Implementar:**

#### **Épica 11: Lead Retrieval y Espacios de Patrocinio**

**App para Patrocinadores:**
- [ ] **Escaneo de Gafetes**
  - App móvil (iOS + Android)
  - Escanear QR/NFC de asistente
  - Capturar info de contacto
- [ ] **Calificación de Leads**
  - Hot / Warm / Cold
  - Notas personalizadas
  - Tags custom
- [ ] **Exportación**
  - Descargar CSV
  - Integración con CRMs (Salesforce, HubSpot)
  - Envío automático post-evento
- [ ] **Dashboard de Sponsor**
  - Total de leads capturados
  - Calificación promedio
  - Gráficos de engagement
  - Tiempo de interacción promedio

**Espacios de Marca:**
- [ ] **Banners en App**
  - Espacios publicitarios en WebApp
  - Rotación de sponsors
  - Clicks rastreados
- [ ] **Push Ads Geo-Targeted**
  - Notificación cuando asistente pasa cerca de stand
  - Ofertas personalizadas
  - Tracking de conversión
- [ ] **Reportes de ROI**
  - Impresiones
  - Clicks
  - Leads generados
  - Conversiones (si aplicable)

### **Acceptance Criteria:**
```
✅ Sponsor puede escanear gafetes con app
✅ Puede calificar y etiquetar leads
✅ Puede exportar a CSV y CRM
✅ Dashboard muestra métricas de ROI
✅ Banners en app funcionan
✅ Geo-targeted ads se envían correctamente
```

### **Deliverables:**
- App de sponsors (iOS + Android)
- Dashboard de sponsor con métricas
- Integración con CRMs
- Sistema de espacios publicitarios
- Reportes de ROI automatizados

---

## 🎬 FASE 8: FEATURES AVANZADOS

**Duración:** 4-6 meses  
**Status:** 🔴 **NO INICIADA**  
**Priority:** 🟢 **BAJA** (Nice-to-have)  
**Budget:** ~$120K  
**Team:** 2 FE + 2 BE + 1 QA  

### **Objetivo:**
> Completar visión del brochure con features premium

### **Épicas a Implementar:**

#### **Épica 2: Plataforma para Eventos Virtuales e Híbridos**

**Streaming Integrado:**
- [ ] **Integración con Plataformas**
  - Twitch API
  - YouTube Live API
  - Custom RTMP server (opcional)
- [ ] **Player Custom**
  - Video player integrado en app
  - Chat en vivo al lado del stream
  - Reacciones en tiempo real
- [ ] **Reunión Presencial + Virtual**
  - Asistentes remotos ven stream
  - Pueden participar en Q&A
  - Networking virtual entre remotos

#### **Épica 6: Módulo de Certificados de Asistencia**

**Generación Automática:**
- [ ] **Plantillas de Certificados**
  - Editor visual (Canvas API)
  - Variables dinámicas (nombre, fecha, evento)
  - Logo del organizador
- [ ] **Emisión Post-Evento**
  - Trigger automático al finalizar evento
  - Envío por email
  - Descarga desde perfil
- [ ] **Verificación Blockchain (Opcional)**
  - Hash de certificado en blockchain
  - Verificación pública de autenticidad

#### **Épica 8: Muro Social (v2)**

**Social Wall:**
- [ ] **Feed de Actividad**
  - Posts de asistentes (texto + foto)
  - Like, comentar, compartir
  - Hashtags del evento
- [ ] **Moderación**
  - Aprobación de posts (opcional)
  - Reportar contenido inapropiado
  - Banear usuarios
- [ ] **Gamificación**
  - Puntos por acciones (post, comentario, checkin)
  - Leaderboard de más activos
  - Badges virtuales

### **Acceptance Criteria:**
```
✅ Eventos pueden tener streaming integrado
✅ Asistentes remotos participan en Q&A
✅ Certificados se generan y envían automáticamente
✅ Social wall funciona con moderación
✅ Gamificación muestra leaderboard
```

### **Deliverables:**
- Streaming integration completa
- Certificados automatizados
- Social wall con gamificación

---

## 📅 TIMELINE CONSOLIDADO

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROADMAP VISUAL                          │
└─────────────────────────────────────────────────────────────────┘

2026
────────────────────────────────────────────────────────────────
Oct  Nov  Dec
 |    |    |
 ✅   |    |    Fase 1: Frontend Público (COMPLETADA)
      |────────|    Fase 2: Ticketing (3-4 meses)

2027
────────────────────────────────────────────────────────────────
Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec
 |    |    |    |    |    |    |    |    |    |    |    |
      |────────────────────|    Fase 3: Admin (5-6 meses)
                     |────────────|    Fase 4: Check-in (3-4 meses)

2028
────────────────────────────────────────────────────────────────
Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec
 |    |    |    |    |    |    |    |    |    |    |    |
 |────────────────────────|    Fase 5: WebApp (4-5 meses)
                     |─────────────────────────────────|
                          Fase 6: IoT/Geo (6-8 meses)

2029
────────────────────────────────────────────────────────────────
Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov
 |    |    |    |    |    |    |    |    |    |    |
      |────────────────|    Fase 7: Sponsors (3-4 meses)
                     |─────────────────────────|
                          Fase 8: Avanzados (4-6 meses)

VISIÓN COMPLETA: ~36 meses desde hoy
```

---

## 💰 INVERSIÓN TOTAL ESTIMADA

| Fase | Team | Duración | Software | Hardware | Total |
|------|------|----------|----------|----------|-------|
| **Fase 1** | 1 dev | 2 sem | $0 | $0 | **✅ $0** |
| **Fase 2** | 5 personas | 4 meses | $80K | $0 | **$80K** |
| **Fase 3** | 5 personas | 6 meses | $120K | $0 | **$120K** |
| **Fase 4** | 5 personas | 4 meses | $100K | $0 | **$100K** |
| **Fase 5** | 6 personas | 5 meses | $125K | $0 | **$125K** |
| **Fase 6** | 7 personas | 8 meses | $200K | $86K | **$286K** |
| **Fase 7** | 5 personas | 4 meses | $80K | $0 | **$80K** |
| **Fase 8** | 5 personas | 6 meses | $120K | $0 | **$120K** |
| **TOTAL** | — | **37 meses** | **$825K** | **$86K** | **$911K** |

**+ Contingencia (15%):** ~$137K  
**TOTAL CON CONTINGENCIA:** **~$1.05M**

---

## 🎯 MVP RECOMENDADO (GO-TO-MARKET)

### **Opción A: MVP Lean (Sin Hardware)**
```
Fases: 1 ✅ + 2 + 3
Timeline: 10 meses desde hoy
Budget: ~$200K
Revenue potential: $50K-100K/mes (10-20 eventos/mes)
```

**Incluye:**
- ✅ Frontend público (ya está)
- ✅ Ticketing + pagos reales
- ✅ Admin completo
- ✅ Check-in con QR estático (v1, sin NFC)
- ✅ Email campaigns

**Excluye:**
- ❌ NFC/pulseras
- ❌ Beacons/geo
- ❌ WebApp asistente avanzada
- ❌ Lead retrieval físico

**Competencia directa:** Eventbrite, TuBoleta, Ticketshow

**Pros:**
- ✅ Rápido time-to-market (10 meses)
- ✅ Bajo riesgo ($200K)
- ✅ Revenue desde Fase 2
- ✅ Valida producto-mercado

**Contras:**
- ❌ No tiene el USP de hardware
- ❌ Compite en commoditizado
- ❌ Difícil diferenciarse

---

### **Opción B: MVP Híbrido (Software + NFC Básico)**
```
Fases: 1 ✅ + 2 + 3 + 4 + Épica 5 (NFC)
Timeline: 18 meses desde hoy
Budget: ~$450K
Revenue potential: $75K-150K/mes
```

**Incluye:**
- ✅ Todo de Opción A
- ✅ NFC para check-in rápido
- ✅ Pulseras para eventos

**Excluye:**
- ❌ Beacons/heatmaps
- ❌ Cashless
- ❌ WebApp completa

**Competencia directa:** Peewah (local) + Cvent (global)

**Pros:**
- ✅ Check-in <0.2s (diferenciador clave)
- ✅ Hardware básico sin complejidad geo
- ✅ Mejor UX que competencia
- ✅ Revenue justifica inversión

**Contras:**
- ❌ Inversión media-alta ($450K)
- ❌ Requiere partner de hardware
- ❌ No tiene analytics avanzados

---

### **Opción C: Producto Completo (Como Brochure)**
```
Fases: 1 ✅ + 2 + 3 + 4 + 5 + 6 + 7 + 8
Timeline: 36 meses desde hoy
Budget: ~$1M
Revenue potential: $150K-300K/mes (eventos enterprise)
```

**Incluye:**
- ✅ Todo del brochure
- ✅ 12 épicas completas
- ✅ Hardware NFC + Beacons
- ✅ Analytics avanzados
- ✅ Lead retrieval
- ✅ Cashless

**Competencia directa:** Cvent (único con features similares)

**Pros:**
- ✅ Producto único, difícil de replicar
- ✅ Pricing premium justificado
- ✅ Sticky (organizadores no cambian)
- ✅ Multiples revenue streams

**Contras:**
- ❌ Alto riesgo ($1M)
- ❌ 3 años de desarrollo
- ❌ Complejidad operativa alta
- ❌ Dependencia de partners hardware

---

## 🏆 RECOMENDACIÓN FINAL

### **ESTRATEGIA: MVP Lean → Validar → Escalar**

**FASE 2-3 (MVP Lean):**
```
10 meses | $200K | Revenue desde mes 10
```

1. **Lanzar con Fases 1+2+3**
   - Frontend + ticketing + admin
   - Competir con Eventbrite local
   - Validar producto-mercado

2. **Métricas de Validación (6 meses post-launch):**
   - ✅ 50+ eventos publicados
   - ✅ 10K+ tickets vendidos
   - ✅ $50K+ revenue/mes
   - ✅ NPS ≥40
   - ✅ Churn <5%

**SI SE CUMPLE → Fase 4-6 (Hardware):**
```
18 meses | $450K adicionales | Revenue $150K/mes
```

3. **Agregar Hardware NFC + Beacons**
   - Diferenciador clave
   - Pricing premium
   - Eventos enterprise

**SI NO SE CUMPLE → Pivotar:**
```
Opciones: Nicho vertical, B2B only, White-label
```

---

## 📊 MÉTRICAS DE ÉXITO POR FASE

### **Fase 2 (Ticketing):**
```
✅ 100% de compras exitosas
✅ <1% de refunds
✅ Email delivery rate >98%
✅ <2s tiempo de checkout
```

### **Fase 3 (Admin):**
```
✅ Organizador crea evento en <15 min
✅ Dashboard carga en <1s
✅ Email campaigns >25% open rate
✅ 80% de organizadores usan reportes
```

### **Fase 4 (Check-in):**
```
✅ Validación de QR en <2s
✅ 0% doble entradas
✅ App disponible 99.9% uptime
✅ Staff satisfaction ≥4.5/5
```

### **Fase 5 (WebApp):**
```
✅ 60% de asistentes instalan PWA
✅ 40% usan networking
✅ 50% envían preguntas en charlas
✅ Engagement rate ≥35%
```

### **Fase 6 (IoT):**
```
✅ Check-in NFC <0.2s
✅ Beacons accuracy ≥90%
✅ Heatmaps update <5s
✅ Cashless transactions 98% success
```

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

### **1. Decisión de Stakeholders (Esta semana)**
```
¿Qué opción elegimos?
A) MVP Lean ($200K, 10 meses)
B) MVP Híbrido ($450K, 18 meses)
C) Producto Completo ($1M, 36 meses)
```

### **2. Kickoff Fase 2 (Próximo mes)**
```
Si se aprueba Fase 2:
- Contratar 2 BE + 1 QA
- Definir tech stack backend (NestJS/Python/Java)
- Setup infra (AWS/GCP)
- Integración Stripe/MP
- Sprint 0: API design + DB schema
```

### **3. Actualizar Brochure (Paralelo)**
```
Opción 1: Reducir promesas a MVP
Opción 2: Agregar "Roadmap" al brochure
Opción 3: Dos versiones: "Hoy" vs "Visión 2029"
```

---

## 📞 CONTACTO

**Product Owner:** TBD  
**Tech Lead:** TBD  
**Documentación:** Este archivo + `BROCHURE-GAP-ANALYSIS.md`  

---

**Última actualización:** 2026-10-26  
**Autor:** Claude Sonnet 4.5 (Product Roadmap)  

🤖 Generated with [Claude Code](https://claude.com/claude-code)
