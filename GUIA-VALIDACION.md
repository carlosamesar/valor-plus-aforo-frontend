# 🧪 GUÍA DE VALIDACIÓN COMPLETA - AFORO v1.0.0

**Fecha:** 2026-10-26  
**Versión:** v1.0.0  
**Status:** ✅ Servidor Activo  

---

## ✅ VERIFICACIÓN AUTOMÁTICA COMPLETADA

```
🔍 RUTAS VERIFICADAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ / → 200 OK
✅ /eventos → 200 OK
✅ /categorias → 200 OK
✅ /calendario → 200 OK
✅ /organizadores → 200 OK
✅ /pricing → 200 OK
✅ /roadmap → 200 OK
✅ /demo → 200 OK
✅ /early-access → 200 OK
✅ /contact → 200 OK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TODAS LAS RUTAS FUNCIONAN CORRECTAMENTE
```

---

## 🌐 ACCESO AL PROYECTO

### **URLs Disponibles:**

```
🌐 Local (desde esta máquina):
   http://localhost:3000

🌐 Network (desde otros dispositivos en la red):
   http://192.168.78.142:3000

📱 Para móvil/tablet:
   Conecta a la misma red WiFi
   Abre: http://192.168.78.142:3000
```

---

## 🧪 PLAN DE VALIDACIÓN MANUAL

### **NIVEL 1: Navegación Básica (5 minutos)**

#### **1. Homepage (`/`)**
```
Abrir: http://localhost:3000

Verificar:
✓ Hero con parallax se mueve al scrollear
✓ Partículas animadas en el fondo
✓ Búsqueda con autocomplete funciona
✓ Eventos destacados se muestran (6 eventos)
✓ Social proof badge muestra "X personas viendo"
✓ Scroll animations al bajar
✓ Categorías con iconos custom SVG
✓ Todo responsive (redimensionar ventana)
```

#### **2. Navbar Global**
```
Desde cualquier página:

Verificar:
✓ Navbar sticky (permanece arriba al scrollear)
✓ Logo "Aforo" con icono Calendar
✓ Links: Eventos, Categorías, Calendario, Organizadores
✓ Badges "Nuevo" en Pricing y Roadmap
✓ CTA "Ver Demo" destacado en naranja
✓ Mobile menu funciona (reducir ancho ventana)
✓ Backdrop blur translúcido
```

#### **3. Footer**
```
Scrollear hasta abajo en cualquier página:

Verificar:
✓ 4 columnas de links
✓ Links a todas las páginas
✓ Iconos sociales (Twitter, LinkedIn, GitHub)
✓ Copyright 2026
✓ "Hecho con ❤ para eventos extraordinarios"
```

---

### **NIVEL 2: Páginas Principales (10 minutos)**

#### **4. Eventos (`/eventos`)**
```
Abrir: http://localhost:3000/eventos

Verificar:
✓ Header con scroll animation
✓ Filtros funcionan:
  - Por categoría (dropdown)
  - Por tipo (Virtual, Presencial, Híbrido)
  - Por fecha
  - Por precio (Gratis, De pago)
  - Búsqueda por texto
✓ 6 eventos se muestran
✓ EventCards con efecto 3D al pasar mouse
✓ Social proof badge actualiza cada 3-8 segundos
✓ Click en título → modal se abre
✓ Click en "Ver Detalles" → modal se abre
✓ Sección "Recomendado para ti" al final
✓ Todo responsive
```

#### **5. Modal de Detalle de Evento**
```
Click en cualquier evento:

Verificar:
✓ Modal se abre con animación suave
✓ Imagen hero 320px
✓ Badges (Destacado, Gratis, Tipo, Categoría)
✓ Social proof en tiempo real
✓ Date badge flotante
✓ 2 Cards de info (Fecha/Hora + Ubicación)
✓ Social proof (asistentes + rating)
✓ Descripción completa
✓ Tags del evento
✓ Warning de últimas plazas (si <20% disponible)
✓ Footer sticky visible
✓ Precio destacado
✓ Botones: Compartir, Add to Calendar, Comprar
✓ Click [X] cierra modal
✓ Click fuera del modal lo cierra
✓ ESC cierra modal
```

#### **6. Pricing (`/pricing`)** ⭐ NUEVO
```
Abrir: http://localhost:3000/pricing

Verificar:
✓ Hero "Elige el Plan Perfecto"
✓ Badge "Precios Transparentes"
✓ 3 planes claramente diferenciados:

  PLAN LAUNCH ($49/mes):
  ✓ Badge "Disponible Hoy"
  ✓ Features con ✅ verde (disponibles)
  ✓ Features con ❌ gris + badge fecha (futuros)
  ✓ CTA "Comenzar Ahora"

  PLAN PRO ($149/mes + 3%):
  ✓ Badge "Más Popular" arriba
  ✓ Badge "30% OFF" esquina superior
  ✓ Subtitle "Próximamente Q1 2027"
  ✓ CTA "Únete a Early Access"

  PLAN ENTERPRISE (Custom):
  ✓ Subtitle "Planificado 2028"
  ✓ CTA "Contactar Ventas"

✓ Sección Roadmap visual:
  - Q1 2027: Ticketing (badge "En Desarrollo")
  - Q2 2027: Admin (badge "Planificado")
  - 2028: Hardware (badge "Visión")

✓ FAQ con 5 preguntas:
  - ¿Puedo vender tickets hoy?
  - ¿Qué obtengo HOY?
  - ¿Tienen hardware NFC?
  - ¿Puedo cambiar de plan?
  - ¿Hay período de prueba?

✓ CTA final "¿Listo para empezar?"
✓ Botones "Ver Demo" y "Contactar Ventas"
✓ Todo responsive
```

#### **7. Roadmap (`/roadmap`)** ⭐ NUEVO
```
Abrir: http://localhost:3000/roadmap

Verificar:
✓ Hero "Roadmap Público"
✓ Badge "Transparencia Radical"
✓ Última actualización: 2026-10-26
✓ Próxima revisión: 2026-11-01

✓ 4 Fases documentadas:
  
  FASE 1 (Completado 100%):
  ✓ Badge verde "Completado"
  ✓ Barra de progreso verde al 100%
  ✓ 8 features con ✅ checkmark verde
  
  FASE 2 (En Progreso 35%):
  ✓ Badge azul "En Progreso (35%)"
  ✓ Barra de progreso azul al 35%
  ✓ Features completadas con ✅
  ✓ Feature actual con "← trabajando aquí"
  
  FASE 3 (Planificado 0%):
  ✓ Badge naranja "Planificado"
  ✓ Sin barra de progreso
  ✓ Todas con ⭕ sin checkmark
  
  FASES 4-8 (Visión 2028+):
  ✓ Badge púrpura "Visión 2028+"
  ✓ 10 features futuras

✓ Historial de Cambios (4 entradas):
  - 2026-10-26: Modal agregado
  - 2026-10-25: Search + animations
  - 2026-10-24: Lanzamiento Fase 1
  - 2026-10-23: Ticketing movido (con razón)

✓ Feedback Section:
  - Email roadmap@aforo.com
  - Email feedback@aforo.com
  - Disclaimer sobre fechas

✓ CTA "Ver Planes" y "Agendar Demo"
✓ Todo responsive
```

#### **8. Demo (`/demo`)** ⭐ NUEVO
```
Abrir: http://localhost:3000/demo

Verificar:
✓ Hero "Te Mostramos Todo en Vivo"
✓ Badge "Demo en Vivo"
✓ Subtítulo "Sin presión, sin ventas agresivas"

✓ Lado izquierdo "¿Qué Verás en la Demo?":
  - 3 secciones con iconos
  - Frontend público espectacular
  - Roadmap transparente
  - Casos de uso reales
  - Nota de honestidad destacada

✓ Lado derecho "Agenda Tu Demo":
  - Formulario con 4 campos:
    · Nombre Completo
    · Email
    · Empresa/Organización
    · Mensaje
  - Botón "Solicitar Demo"
  - Email alternativo demo@aforo.com

✓ CTA secundario con links a:
  - Ver Roadmap
  - Ver Precios

✓ Todo responsive
```

#### **9. Early Access (`/early-access`)** ⭐ NUEVO
```
Abrir: http://localhost:3000/early-access

Verificar:
✓ Hero con badge "30% OFF de por Vida"
✓ Precio comparativo visible:
  - $149/mes tachado
  - $104/mes destacado en naranja grande
  - + 2.5% (vs 3%)

✓ 4 Beneficios en cards:
  - 30% OFF de por vida (icono Gift)
  - Acceso prioritario (icono Sparkles)
  - Soporte dedicado (icono Clock)
  - Sin compromiso (icono CheckCircle)

✓ Qué Incluye el Plan Pro:
  - Card "Disponible HOY" con checkmarks verdes
  - Card "Próximamente Q1 2027" con relojes azules

✓ Formulario de registro completo:
  - Nombre, Email, Empresa
  - Dropdown "¿Cuántos eventos/año?"
  - Dropdown "Asistentes promedio"
  - Card explicativa "¿Qué pasa después?"
  - Botón "Asegurar mi Descuento del 30%"
  - Términos y privacidad en footer

✓ FAQ con 4 preguntas:
  - ¿El descuento es para siempre?
  - ¿Cuándo puedo vender tickets?
  - ¿Puedo cancelar?
  - ¿Cuántos cupos hay?

✓ Todo responsive
```

#### **10. Contact (`/contact`)** ⭐ NUEVO
```
Abrir: http://localhost:3000/contact

Verificar:
✓ Hero "Contáctanos"
✓ Badge "Estamos Aquí"
✓ Subtítulo "Respuestas honestas"

✓ 4 Métodos de contacto (cards clickeables):
  - Email: hola@aforo.com (icono Mail)
  - Ventas: ventas@aforo.com (icono MessageSquare)
  - Teléfono: +57 XXX... (icono Phone)
  - Ubicación: Bogotá, Colombia (icono MapPin)

✓ Formulario completo:
  - Nombre + Apellido (2 columnas)
  - Email
  - Empresa
  - Asunto (dropdown con 5 opciones)
  - Mensaje (textarea grande)
  - Botón "Enviar Mensaje"

✓ Quick Links (3 cards):
  - Ver Demo
  - Pricing
  - Roadmap

✓ Todo responsive
```

---

### **NIVEL 3: Features Avanzados (15 minutos)**

#### **11. Búsqueda Inteligente (SearchAutocomplete)**
```
Ir a homepage:

Probar:
✓ Campo de búsqueda visible en hero
✓ Click en campo → dropdown aparece
✓ Sin escribir → muestra "Búsquedas Populares"
✓ Escribir "conferencia" → muestra:
  - Eventos que coinciden (max 3)
  - Categorías que coinciden (max 2)
  - Ciudades que coinciden (max 2)
✓ Navegar con ↑↓ → highlight se mueve
✓ Enter en resultado → navega a ese resultado
✓ ESC → cierra dropdown
✓ Click fuera → cierra dropdown
✓ Footer con hints de teclado
```

#### **12. Social Proof en Tiempo Real**
```
En cualquier evento:

Observar:
✓ Badge "X personas viendo" en esquina superior
✓ Número actualiza cada 3-8 segundos
✓ Cuando >15 personas → icono cambia a Flame
✓ Cuando >15 personas → color naranja
✓ Animación suave al actualizar (fade)
✓ Glassmorphism + backdrop-blur
```

#### **13. Scroll Animations**
```
Ir a homepage y scrollear lentamente:

Verificar:
✓ Secciones aparecen desde abajo al entrar
✓ Animación solo se ejecuta 1 vez
✓ Delay escalonado en grids (cards entran en secuencia)
✓ Transición suave (no brusca)
✓ Performance fluida (60fps)
```

#### **14. EventCard 3D Effect**
```
En /eventos, pasar mouse sobre un evento:

Verificar:
✓ Card se inclina siguiendo el mouse
✓ Efecto 3D suave (rotateX/rotateY)
✓ Glassmorphism overlay aparece
✓ Imagen hace zoom in
✓ Brillo sigue el cursor (shine effect)
✓ Al quitar mouse → vuelve a posición original
✓ Transición suave
```

#### **15. Add to Calendar**
```
Abrir modal de evento y click "Add to Calendar":

Verificar:
✓ Dropdown se abre con 3 opciones:
  - Google Calendar
  - Apple Calendar
  - Outlook
✓ Click "Google Calendar" → abre nueva pestaña
✓ Click "Apple Calendar" → descarga archivo .ics
✓ Click "Outlook" → descarga archivo .ics
✓ Toast notification aparece
✓ Estado cambia a "Agregado" con check icon
```

#### **16. Compartir Evento**
```
En modal de evento, click "Compartir":

Verificar:
✓ Si navegador soporta Web Share API:
  - Dialog nativo del sistema aparece
  - Puede compartir en apps instaladas
✓ Si no soporta:
  - Toast "Enlace copiado al portapapeles"
  - URL copiada correctamente
```

---

### **NIVEL 4: Responsive & Mobile (10 minutos)**

#### **17. Mobile (Ancho <640px)**
```
Redimensionar ventana o abrir en móvil:

Homepage:
✓ Navbar colapsa a hamburger menu
✓ Hero stack vertical
✓ Eventos en 1 columna
✓ Búsqueda full width

/pricing:
✓ Planes en columna (1 por línea)
✓ Footer actions en columna
✓ Precio arriba, botones abajo

/roadmap:
✓ Fases en columna
✓ Progress bars ajustadas
✓ Cards de feedback en columna

Modal:
✓ Full screen en móvil
✓ Scroll interno funciona
✓ Footer sticky visible
✓ Botones apilados verticalmente

Navbar:
✓ Hamburger menu funcional
✓ Menu slide in desde derecha
✓ Links apilados verticalmente
✓ CTA "Ver Demo" visible
```

#### **18. Tablet (640px-1024px)**
```
Ancho medio:

Verificar:
✓ Eventos en 2 columnas
✓ Navbar completo (sin hamburger)
✓ Modal max-width respetado
✓ Footer en 2-3 columnas
✓ Todo legible y espaciado
```

#### **19. Desktop (>1024px)**
```
Ventana completa:

Verificar:
✓ Contenido centrado (max-width: 1400px)
✓ Eventos en 3 columnas
✓ Modal max-width: 896px (4xl)
✓ Footer en 4 columnas
✓ Márgenes laterales visibles
✓ Espaciado generoso
```

---

### **NIVEL 5: Performance & Quality (5 minutos)**

#### **20. Performance**
```
Abrir DevTools (F12):

Network Tab:
✓ Imágenes lazy-loaded (no todas al inicio)
✓ No requests fallidos (404)
✓ Assets desde /static cachados

Performance Tab:
✓ FPS estable ~60 al scrollear
✓ No memory leaks (cerrar/abrir modal varias veces)
✓ Animaciones sin jank

Console:
✓ Sin errores rojos
✓ Sin warnings críticos
✓ No hydration errors
```

#### **21. Accessibility**
```
Navegar con teclado (Tab):

Verificar:
✓ Focus visible en todos los elementos
✓ Navbar navegable con Tab
✓ Modal se cierra con ESC
✓ Búsqueda navegable con ↑↓ Enter
✓ Formularios navegables
✓ Skip links presentes (si aplica)
✓ Alt text en imágenes
```

#### **22. Dark Theme Consistencia**
```
Revisar todas las páginas:

Verificar:
✓ Background: #0a0e1a (deep navy) consistente
✓ Cards: #1a1e2e consistente
✓ Primary: #ff5722 (naranja) consistente
✓ Text: blanco/gris legible
✓ Contraste suficiente (WCAG AA)
✓ Borders sutiles pero visibles
✓ No text negro sobre fondo oscuro
```

---

## ✅ CHECKLIST COMPLETO DE VALIDACIÓN

### **Funcionalidad Core:**
```
□ Todas las rutas cargan (200 OK)
□ Navbar funciona en todas las páginas
□ Footer funciona en todas las páginas
□ Modal de evento abre y cierra
□ Formularios tienen campos requeridos
□ Links externos abren en nueva pestaña
□ Animaciones fluidas sin lag
```

### **Páginas Nuevas (v1.0.0):**
```
□ /pricing muestra 3 planes claramente
□ /roadmap muestra 4 fases con progreso
□ /demo tiene formulario funcional
□ /early-access muestra 30% OFF
□ /contact tiene 4 métodos de contacto
```

### **Features Avanzados:**
```
□ Búsqueda con autocomplete funciona
□ Social proof actualiza en tiempo real
□ EventCards con efecto 3D
□ Scroll animations suaves
□ Add to Calendar funciona (3 plataformas)
□ Compartir evento funciona
```

### **Responsive:**
```
□ Mobile (<640px) → 1 columna
□ Tablet (640-1024px) → 2 columnas
□ Desktop (>1024px) → 3 columnas, centrado
□ Hamburger menu en móvil
□ Modal responsive
```

### **Calidad:**
```
□ Build sin errores
□ Console sin errores
□ Performance 60fps
□ Navegable con teclado
□ Dark theme consistente
□ Imágenes cargan correctamente
```

---

## 🐛 QUÉ BUSCAR (Posibles Bugs)

### **Errores Comunes:**
```
❌ Modal no cierra con ESC
❌ Social proof se queda estancado
❌ Animaciones con lag en móvil
❌ Formularios envían sin validación
❌ Links rotos (404)
❌ Imágenes no cargan
❌ Texto ilegible (contraste bajo)
❌ Layout roto en algún ancho específico
❌ Navbar no sticky
❌ Footer cortado en móvil
```

### **Edge Cases:**
```
❌ Redimensionar ventana rápidamente
❌ Abrir/cerrar modal 10+ veces seguidas
❌ Scrollear muy rápido
❌ Click spam en botones
❌ Campos vacíos en formularios
❌ Caracteres especiales en búsqueda
❌ Internet lento simulado
```

---

## 📊 REPORTE DE VALIDACIÓN

### **Si todo funciona:**
```
✅ VALIDACIÓN EXITOSA
   - Todas las rutas: OK
   - Todas las features: OK
   - Responsive: OK
   - Performance: OK
   
   Estado: LISTO PARA PRODUCCIÓN
```

### **Si hay bugs:**
```
❌ BUGS ENCONTRADOS

1. [Descripción del bug]
   Página: [URL]
   Pasos para reproducir: [1, 2, 3...]
   Esperado: [qué debería pasar]
   Actual: [qué pasa]
   Severidad: [Crítico/Alto/Medio/Bajo]

2. [Próximo bug...]
```

---

## 🔄 COMANDOS ÚTILES

### **Restart servidor:**
```bash
cd /home/gooderp-dev/Documentos/valor-plus/framework-sdd/develop/valor-plus/aforo/aforo-frontend

# Matar servidor actual
pkill -f "next dev"

# Reiniciar
npm run dev
```

### **Build production:**
```bash
npm run build
```

### **Ver logs:**
```bash
tail -f /tmp/aforo-server.log
```

### **Verificar rutas desde terminal:**
```bash
curl -I http://localhost:3000
curl -I http://localhost:3000/pricing
curl -I http://localhost:3000/roadmap
```

---

## 🎯 SIGUIENTE PASO DESPUÉS DE VALIDACIÓN

### **Si validación es exitosa:**
```
1. ✅ Marcar como "QA Passed"
2. 📝 Documentar hallazgos positivos
3. 🚀 Preparar para deploy a staging
4. 📧 Notificar a stakeholders
5. 🎉 Celebrar el hito v1.0.0
```

### **Si hay bugs:**
```
1. 📝 Documentar todos los bugs
2. 🔴 Priorizar por severidad
3. 🛠️ Fix bugs críticos primero
4. 🔄 Re-validar después de fixes
5. ✅ Aprobar cuando todo esté OK
```

---

## 📞 RECURSOS

**Servidor:**
- Local: http://localhost:3000
- Network: http://192.168.78.142:3000

**Documentación:**
- COMMIT-SUMMARY.md
- README-OPCION-A-COMPLETO.md
- docs/OPCION-A-APROBADA.md

**Git:**
- Commit: e80fd8f
- Tag: v1.0.0
- Branch: master

---

**Última actualización:** 2026-10-26  
**Validación realizada por:** [Tu nombre]  
**Status:** ✅ Servidor activo y listo para validar  

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
