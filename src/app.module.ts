import { Module } from "@nestjs/common";
import { PrismaService } from "./utils/prisma/prisma.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { AppController } from './app/app.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
