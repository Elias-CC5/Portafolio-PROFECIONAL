# Manual de Despliegue

Esta guía cubre cómo llevar el portafolio a producción usando servicios gratuitos o de bajo costo, sin necesidad de gestionar un servidor propio.

## Arquitectura recomendada

| Componente | Servicio sugerido | Alternativas |
|---|---|---|
| Frontend (estático) | Vercel | Netlify, Cloudflare Pages |
| Backend (API) | Railway | Render, Fly.io |
| Base de datos | Neon o Supabase | Railway Postgres |

## 1. Desplegar la base de datos

1. Crea una cuenta en [Neon](https://neon.tech) (tiene un plan gratuito generoso).
2. Crea un nuevo proyecto y copia la `DATABASE_URL` que te entrega — algo como:
   ```
   postgresql://usuario:password@ep-xxxx.region.aws.neon.tech/portfolio_db?sslmode=require
   ```
3. Guarda esta URL, la usarás en el paso del backend.

## 2. Desplegar el backend (Railway)

1. Crea una cuenta en [Railway](https://railway.app).
2. **New Project → Deploy from GitHub repo** (sube primero este proyecto a un repositorio de GitHub) o usa **Empty Project** y conecta el CLI de Railway.
3. Selecciona la carpeta `backend` como root del servicio.
4. En la pestaña **Variables**, agrega todas las variables de tu `.env`:
   ```
   DATABASE_URL=...
   JWT_SECRET=...
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://tu-dominio-frontend.vercel.app
   NODE_ENV=production
   PORT=4000
   ```
5. En **Settings → Build Command**, configura:
   ```
   npm install && npx prisma generate && npm run build
   ```
6. En **Settings → Start Command**, configura:
   ```
   npx prisma migrate deploy && npm start
   ```
7. Despliega. Una vez activo, corre el seed una sola vez desde la pestaña de comandos/CLI de Railway:
   ```
   npx prisma db seed
   ```
8. Copia la URL pública que Railway te asigna (ej. `https://tu-backend.up.railway.app`). La API completa estará en `https://tu-backend.up.railway.app/api`.

## 3. Desplegar el frontend (Vercel)

1. Crea una cuenta en [Vercel](https://vercel.com).
2. **Add New → Project**, importa el repositorio y selecciona la carpeta `frontend` como root.
3. Framework preset: **Vite**.
4. En **Environment Variables**, agrega:
   ```
   VITE_API_URL=https://tu-backend.up.railway.app/api
   ```
5. Despliega. Vercel te entrega una URL como `https://tu-portafolio.vercel.app`.

## 4. Ajustes finales tras desplegar

- Vuelve a Railway y actualiza `FRONTEND_URL` con la URL real de Vercel (paso 2, variable 4), y vuelve a desplegar el backend para que CORS funcione correctamente.
- Actualiza `index.html` del frontend (`<link rel="canonical">` y el JSON-LD) y `public/sitemap.xml` con tu dominio real.
- Si compraste un dominio propio, configúralo en Vercel (Settings → Domains) y actualiza las URLs anteriores.

## 5. Checklist post-despliegue

- [ ] `https://tu-backend.../api/health` responde `{ "success": true }`
- [ ] El sitio carga correctamente en la URL de producción
- [ ] El formulario de contacto guarda mensajes (verifica con `npx prisma studio` apuntando a la DB de producción)
- [ ] Las imágenes y el PDF del CV cargan correctamente
- [ ] HTTPS está activo (Vercel y Railway lo activan automáticamente)

## Notas de seguridad para producción

- Nunca reutilices el `JWT_SECRET` de desarrollo en producción — genera uno nuevo.
- Cambia la contraseña del usuario admin (`ADMIN_PASSWORD`) antes de correr el seed en producción.
- Considera añadir un servicio de envío de correos (Resend, SendGrid) si quieres recibir notificaciones por email además de guardar los mensajes en la base de datos — el código del controlador de contacto está preparado para que integres esto fácilmente en `backend/src/services/message.service.ts`.
