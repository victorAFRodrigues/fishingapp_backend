import { Test, TestingModule } from '@nestjs/testing';
import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';
import { PrismaService } from "../utils/prisma/prisma.service";

describe('GuidesController', () => {
  let controller: GuidesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuidesController],
      providers: [GuidesService, PrismaService],
    }).compile();

    controller = module.get<GuidesController>(GuidesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
