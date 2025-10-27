import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "./utils/prisma/prisma.service";

@Controller('/')
export class AppController {
  constructor(private readonly prisma: PrismaService) {
  }

  @Get()
  helloWorld() {
    return { message: 'Hello World!' };
  }

  @Get('/health')
  async health() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', db: 'connected', timestamp: new Date().toISOString() };
    } catch (error) {
      throw new HttpException(
        { status: 'error', db: 'disconnected', timestamp: new Date().toISOString() },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }


}
