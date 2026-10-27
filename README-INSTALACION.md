# 📦 GUÍA DE INSTALACIÓN Y EJECUCIÓN - AFORO MVP

**Fecha:** 2026-10-27  
**Versión:** 1.0.0

---

## 📋 REQUISITOS PREVIOS

### **Software Necesario:**
- Node.js v22.22.1 o superior
- npm v9.2.0 o superior
- Git

### **Verificar Instalación:**
```bash
node --version   # debe mostrar v22.x
npm --version    # debe mostrar 9.x o superior
```

---

## 🚀 INSTALACIÓN

### **1. Frontend Público (Next.js)**

```bash
# Navegar al directorio
cd /home/gooderp-dev/Documentos/valor-plus/framework-sdd/develop/valor-plus/aforo/aforo-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El servidor iniciará en http://localhost:3000
```

**Comandos Disponibles:**
```bash
npm run dev      # Desarrollo (hot-reload)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

---

### **2. Administrador (Angular 18)**

```bash
# Navegar al directorio
cd /home/gooderp-dev/Documentos/valor-plus/framework-sdd/develop/valor-plus/aforo/aforo-admin

# Instalar dependencias (con legacy peer deps por Angular 18)
npm install --legacy-peer-deps

# Ejecutar en modo desarrollo
npm start

# El servidor iniciará en http://localhost:4201
```

**Comandos Disponibles:**
```bash
npm start        # Desarrollo (ng serve)
npm run build    # Build de producción
npm run test     # Tests unitarios
npm run lint     # Linter
```

---

## 🌐 URLS DE ACCESO

### **Frontend Público:**
- **Home:** http://localhost:3000
- **Eventos:** http://localhost:3000/eventos
- **Live Experience:** http://localhost:3000/evento/1/live
- **Social Wall:** http://localhost:3000/evento/1/social
- **Networking:** http://localhost:3000/evento/1/networking
- **Cashless:** http://localhost:3000/evento/1/cashless
- **Mi Cuenta:** http://localhost:3000/mi-cuenta/mis-eventos
- **Badge Digital:** http://localhost:3000/mi-cuenta/badge
- **Certificados:** http://localhost:3000/mi-cuenta/certificados

### **Administrador:**
- **Dashboard:** http://localhost:4201

---

## 📊 DATOS MOCK

### **Eventos Disponibles:**
- ID: 1 - TechConf 2024
- ID: 2 - Marketing Digital Summit
- ID: 3 - Startup Weekend
- ID: 4 - DevOps Days

### **Usuarios de Prueba:**
- Email: juan.perez@example.com
- Todos los datos están mockeados en archivos `lib/mock-data-*.ts`

---

## 🔧 CONFIGURACIÓN

### **Variables de Entorno (Futuro):**
Crear archivo `.env.local` en `aforo-frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
NEXT_PUBLIC_MERCADOPAGO_KEY=TEST-...
```

### **Puerto Personalizado:**
```bash
# Frontend
PORT=3001 npm run dev

# Admin
ng serve --port 4202
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### **Error: "Module not found"**
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### **Error: "Port already in use"**
```bash
# Cambiar puerto o matar proceso
lsof -ti:3000 | xargs kill -9
```

### **Error: Angular CLI no encontrado**
```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli@18
```

### **Error: TypeScript version mismatch**
```bash
# Verificar versión en package.json
# Frontend: TypeScript ~5.x
# Admin: TypeScript ~6.0
```

---

## 📱 TESTING

### **Navegadores Recomendados:**
- ✅ Chrome 100+
- ✅ Firefox 100+
- ✅ Safari 15+
- ✅ Edge 100+

### **Dispositivos Móviles:**
- ✅ iOS 14+
- ✅ Android 10+

### **Flujos de Prueba:**

1. **Compra de Ticket:**
   - Ir a http://localhost:3000/eventos
   - Click en "Ver detalles"
   - Click en "Comprar Tickets"
   - Seleccionar cantidad
   - Completar checkout (3 pasos)
   - Ver confirmación con QR

2. **Experiencia Live:**
   - Ir a http://localhost:3000/evento/1/live
   - Probar tabs: Stream, Q&A, Polls, Quiz
   - Enviar mensaje en chat

3. **Networking:**
   - Ir a http://localhost:3000/evento/1/networking
   - Ver asistentes
   - Enviar mensaje en chat
   - Agendar reunión
   - Ver tarjeta de presentación

4. **Cashless:**
   - Ir a http://localhost:3000/evento/1/cashless
   - Ver balance
   - Simular recarga
   - Ver historial de transacciones

5. **Badge y Certificados:**
   - Ir a http://localhost:3000/mi-cuenta/badge
   - Ver badge digital con QR
   - Ir a http://localhost:3000/mi-cuenta/certificados
   - Ver certificados disponibles

---

## 📂 ESTRUCTURA DE DIRECTORIOS

```
aforo/
├── aforo-frontend/           # Frontend público (Next.js 14)
│   ├── app/                  # Páginas (App Router)
│   ├── components/           # Componentes reutilizables
│   ├── lib/                  # Utilidades y mock data
│   ├── types/                # Definiciones TypeScript
│   ├── public/               # Assets estáticos
│   └── package.json
│
└── aforo-admin/             # Administrador (Angular 18)
    ├── src/app/
    │   ├── core/            # Servicios core
    │   ├── layout/          # Layouts
    │   ├── pages/           # Páginas del admin
    │   └── shared/          # Componentes compartidos
    └── package.json
```

---

## 🔄 ACTUALIZACIÓN

```bash
# Frontend
cd aforo-frontend
git pull
npm install
npm run dev

# Admin
cd aforo-admin
git pull
npm install --legacy-peer-deps
npm start
```

---

## 📞 SOPORTE

### **Errores Comunes:**
1. Puerto en uso → Cambiar puerto o matar proceso
2. Dependencies conflict → Usar `--legacy-peer-deps`
3. Build fails → Limpiar cache: `rm -rf .next node_modules`

### **Logs Útiles:**
```bash
# Ver logs de Next.js
tail -f .next/trace

# Ver logs de Angular
ng serve --verbose
```

---

## ✅ CHECKLIST DE INSTALACIÓN

- [ ] Node.js v22+ instalado
- [ ] npm v9+ instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (frontend)
- [ ] Dependencias instaladas (admin)
- [ ] Frontend corriendo en :3000
- [ ] Admin corriendo en :4201
- [ ] Todos los flujos probados
- [ ] Build de producción exitoso

---

## 🎉 ¡LISTO PARA USAR!

Si todos los pasos se completaron exitosamente, la plataforma Aforo MVP está lista para:
- ✅ Demos
- ✅ Testing
- ✅ Desarrollo de backend
- ✅ Presentaciones

---

**Última actualización:** 2026-10-27  
**Versión:** 1.0.0 - MVP Completo

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
