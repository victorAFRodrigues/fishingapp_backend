import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { PrismaService } from "../utils/prisma/prisma.service";

@Injectable()
export class GuidesService {
  constructor(private readonly prisma: PrismaService,) {}

  create(createGuideDto: CreateGuideDto) {
    const { address, ...newGuide } = createGuideDto;
    return this.prisma.guide.create({
      data: {
        ...newGuide,
        ...(address && { address: { create: { ...address } } }),
      }
    });
  }

  findAll() {
    return this.prisma.guide.findMany();
  }

  findOne(id: number) {
    return this.prisma.guide.findUnique({ where: { id } });
  }

  update(id: number, updateGuideDto: UpdateGuideDto) {
    return this.prisma.guide.update({
      where: { id },
      data: { ...updateGuideDto },
    });
  }

  remove(id: number) {
    this.prisma.guide.delete({ where: { id } }); // ação de remover
  }
}
