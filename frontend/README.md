# Frontend — Portafolio Elías Cárdenas

React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + GSAP + Lenis.

## Comandos

```bash
npm install        # Instalar dependencias
npm run dev         # Servidor de desarrollo (http://localhost:5173)
npm run build       # Build de producción (genera /dist)
npm run preview     # Previsualizar el build de producción
npm run lint        # Linter (oxlint)
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta `VITE_API_URL` si tu backend no corre en `http://localhost:4000`.

## Estructura

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, Layout, SEO
│   ├── sections/   # Hero, ProjectCard, SkillCard, etc.
│   └── ui/         # Componentes reutilizables (botones, reveal, cursor...)
├── pages/          # Una página por ruta
├── data/           # Datos del portafolio (extraídos del CV)
├── hooks/          # useLenis, useGsapStagger
├── lib/            # Cliente API
└── types/          # Tipos TypeScript compartidos
```

Para la guía de instalación completa del proyecto (frontend + backend), consulta el `README.md` en la raíz del proyecto.
