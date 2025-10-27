import { Test, TestingModule } from '@nestjs/testing';
import { FishingTripsService } from './fishing-trips.service';

describe('FishingTripsService', () => {
  let service: FishingTripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FishingTripsService],
    }).compile();

    service = module.get<FishingTripsService>(FishingTripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
