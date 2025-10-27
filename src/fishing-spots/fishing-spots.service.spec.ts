import { Test, TestingModule } from '@nestjs/testing';
import { FishingSpotsService } from './fishing-spots.service';

describe('FishingSpotsService', () => {
  let service: FishingSpotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FishingSpotsService],
    }).compile();

    service = module.get<FishingSpotsService>(FishingSpotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
