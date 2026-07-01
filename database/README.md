# Base de datos

Este directorio contiene copias de referencia del schema y el seed de Prisma.

**Los archivos que realmente se ejecutan viven en `backend/prisma/`:**
- `backend/prisma/schema.prisma` — define las tablas
- `backend/prisma/seed.ts` — pobla la base de datos con los datos reales del CV

Para aplicar el schema y crear las migraciones, ejecuta desde `backend/`:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Consulta `docs/manual-instalacion.md` para la guía completa paso a paso.
