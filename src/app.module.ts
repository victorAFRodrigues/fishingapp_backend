import { Module } from "@nestjs/common";
import { PrismaService } from "./utils/prisma/prisma.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { GuidesModule } from './guides/guides.module';
import { FishingSpotsModule } from './fishing-spots/fishing-spots.module';
import { FishingTripsModule } from './fishing-trips/fishing-trips.module';

@Module({
  imports: [UserModule, AuthModule, GuidesModule, FishingSpotsModule, FishingTripsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
