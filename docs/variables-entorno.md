# Variables de Entorno

## Backend (`backend/.env`)

| Variable | Requerida | Descripción | Ejemplo |
|---|---|---|---|
| `PORT` | No (default 4000) | Puerto donde corre la API | `4000` |
| `NODE_ENV` | No (default development) | Entorno de ejecución | `development` / `production` |
| `DATABASE_URL` | **Sí** | Cadena de conexión a PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | **Sí** | Secreto para firmar tokens JWT. Usa un string largo y aleatorio | `a1b2c3...` (32+ caracteres) |
| `JWT_EXPIRES_IN` | No (default 7d) | Duración del token | `7d`, `24h`, `30m` |
| `FRONTEND_URL` | No (default localhost:5173) | URL permitida por CORS | `https://tu-dominio.com` |
| `ADMIN_NAME` | No (solo seed) | Nombre del usuario admin inicial | `Elías Cárdenas` |
| `ADMIN_EMAIL` | No (solo seed) | Email del usuario admin inicial | `failocdns871@gmail.com` |
| `ADMIN_PASSWORD` | No (solo seed) | Contraseña del usuario admin inicial | elige una segura |

## Frontend (`frontend/.env`)

| Variable | Requerida | Descripción | Ejemplo |
|---|---|---|---|
| `VITE_API_URL` | No (default `http://localhost:4000/api`) | URL base de la API backend | `https://tu-backend.com/api` |

> ⚠️ **Importante:** nunca subas archivos `.env` reales a un repositorio público. Ambos proyectos incluyen `.env.example` como plantilla — cópialos y rellena tus propios valores.
