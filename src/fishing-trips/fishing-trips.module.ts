import { Module } from '@nestjs/common';
import { FishingTripsService } from './fishing-trips.service';
import { FishingTripsController } from './fishing-trips.controller';

@Module({
  controllers: [FishingTripsController],
  providers: [FishingTripsService],
})
export class FishingTripsModule {}
