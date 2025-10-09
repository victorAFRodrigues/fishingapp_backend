import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.log(`Falha ao iniciar o servidor erro: ${error}`);
    process.exit(1);
  }
}

bootstrap();
