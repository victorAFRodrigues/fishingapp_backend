import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // remove propriedades que não existem no DTO
        forbidNonWhitelisted: true, // lança erro se vier algo fora do DTO
        transform: true, // converte tipos automaticamente (string → number)
      }),
    );

    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.log(`Falha ao iniciar o servidor erro: ${error}`);
    process.exit(1);
  }
}

bootstrap();
