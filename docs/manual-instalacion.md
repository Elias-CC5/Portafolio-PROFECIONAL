# Manual de Instalación

Guía paso a paso para poner en marcha el portafolio de Elías Cárdenas en tu máquina local.

## Requisitos previos

Antes de empezar, asegúrate de tener instalado:

| Herramienta | Versión mínima | Verificar con |
|---|---|---|
| Node.js | 18 LTS o superior | `node -v` |
| npm | 9 o superior | `npm -v` |
| PostgreSQL | 14 o superior | `psql --version` |
| Git (opcional) | cualquiera | `git --version` |

Si no tienes PostgreSQL instalado localmente, la alternativa más rápida es crear una base de datos gratuita en [Neon](https://neon.tech), [Supabase](https://supabase.com) o [Railway](https://railway.app) — cualquiera te da una `DATABASE_URL` lista para usar.

## 1. Descomprimir el proyecto

Extrae el archivo ZIP en la ubicación de tu elección. Verás esta estructura:

```
portfolio-elias/
├── frontend/
├── backend/
├── database/
├── docs/
└── assets/
```

## 2. Configurar la base de datos

### Opción A — PostgreSQL local

```bash
# Entra a la consola de PostgreSQL
psql -U postgres

# Crea la base de datos
CREATE DATABASE portfolio_db;
\q
```

### Opción B — Base de datos en la nube (recomendado si no quieres instalar PostgreSQL)

Crea un proyecto en Neon/Supabase/Railway y copia la cadena de conexión que te entregan (algo como `postgresql://usuario:password@host:5432/db?sslmode=require`).

## 3. Configurar el backend

```bash
cd backend
npm install
```

Copia el archivo de ejemplo y edítalo con tus datos:

```bash
cp .env.example .env
```

> 💡 **Nota sobre Prisma:** este proyecto está fijado a `prisma` y `@prisma/client` versión `6.16.2` (ver `package.json`). La versión 7 cambió por completo cómo se configura la URL de la base de datos y rompe este proyecto si npm la instala por error. Si alguna vez ves el error `The datasource property 'url' is no longer supported`, significa que se instaló Prisma 7 — corre `npm install @prisma/client@6.16.2 prisma@6.16.2 --save-exact` para volver a la versión correcta.

Abre `.env` y completa al menos:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/portfolio_db?schema=public"
JWT_SECRET="genera-un-string-aleatorio-largo-aqui"
ADMIN_EMAIL="failocdns871@gmail.com"
ADMIN_PASSWORD="elige-una-contraseña-segura"
```

> 💡 Para generar un `JWT_SECRET` seguro puedes correr: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Genera el cliente de Prisma y aplica las migraciones:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Esto crea automáticamente todas las tablas (`users`, `projects`, `skills`, `experience`, `education`, `certificates`, `messages`, `social_links`, `settings`).

Pobla la base de datos con la información real del CV:

```bash
npx prisma db seed
```

Inicia el servidor backend:

```bash
npm run dev
```

Deberías ver:

```
✅ Conexión a PostgreSQL establecida
🚀 API escuchando en http://localhost:4000/api
```

Verifica que funciona visitando `http://localhost:4000/api/health` en tu navegador.

## 4. Configurar el frontend

Abre una **nueva terminal** (deja el backend corriendo) y ejecuta:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

El `.env` del frontend solo necesita la URL del backend (por defecto ya apunta a `http://localhost:4000/api`, así que normalmente no necesitas tocarlo si seguiste los pasos anteriores).

Abre tu navegador en `http://localhost:5173`. Deberías ver el portafolio funcionando.

## 5. Verificación rápida

- [ ] El backend responde en `http://localhost:4000/api/health`
- [ ] El frontend carga en `http://localhost:5173`
- [ ] La sección de Habilidades muestra las tecnologías del CV
- [ ] El formulario de contacto envía mensajes (revisa la tabla `messages` con `npx prisma studio`)

## Problemas comunes

**"Can't reach database server"**
Verifica que PostgreSQL esté corriendo y que `DATABASE_URL` tenga el host, puerto, usuario y contraseña correctos.

**El frontend carga pero no se ven proyectos/skills**
Confirma que corriste `npx prisma db seed` y que el backend esté corriendo antes de cargar el frontend.

**Error de CORS en la consola del navegador**
Revisa que `FRONTEND_URL` en el `.env` del backend coincida exactamente con la URL donde corre tu frontend (incluyendo el puerto).

Para más detalle sobre la API, consulta `docs/api-documentation.md`. Para llevar esto a producción, consulta `docs/manual-despliegue.md`.
