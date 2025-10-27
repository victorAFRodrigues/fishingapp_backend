import { Test, TestingModule } from '@nestjs/testing';
import { FishingTripsController } from './fishing-trips.controller';
import { FishingTripsService } from './fishing-trips.service';

describe('FishingTripsController', () => {
  let controller: FishingTripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FishingTripsController],
      providers: [FishingTripsService],
    }).compile();

    controller = module.get<FishingTripsController>(FishingTripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
