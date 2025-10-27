import { Test, TestingModule } from '@nestjs/testing';
import { FishingSpotsController } from './fishing-spots.controller';
import { FishingSpotsService } from './fishing-spots.service';

describe('FishingSpotsController', () => {
  let controller: FishingSpotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FishingSpotsController],
      providers: [FishingSpotsService],
    }).compile();

    controller = module.get<FishingSpotsController>(FishingSpotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
