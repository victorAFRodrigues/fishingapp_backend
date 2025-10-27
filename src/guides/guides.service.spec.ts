import { Test, TestingModule } from '@nestjs/testing';
import { GuidesService } from './guides.service';
import { PrismaService } from "../utils/prisma/prisma.service";

describe('GuidesService', () => {
  let service: GuidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuidesService, PrismaService],
    }).compile();

    service = module.get<GuidesService>(GuidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
