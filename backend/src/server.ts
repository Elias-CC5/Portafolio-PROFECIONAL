import app from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Conexión a PostgreSQL establecida');

    app.listen(env.PORT, () => {
      console.log(`🚀 API escuchando en http://localhost:${env.PORT}/api`);
      console.log(`   Entorno: ${env.NODE_ENV}`);
    });
  } catch (err) {
    console.error('❌ No se pudo iniciar el servidor:', err);
    process.exit(1);
  }
}

main();

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
