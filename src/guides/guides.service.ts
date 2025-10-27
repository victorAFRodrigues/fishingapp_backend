import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { PrismaService } from "../utils/prisma/prisma.service";

@Injectable()
export class GuidesService {
  constructor(private readonly prisma: PrismaService) {
  }

  create(createGuideDto: CreateGuideDto) {
    return 'This action adds a new guides';
  }

  findAll() {
    return this.prisma.guide.findMany();
  }

  findOne(id: number) {
    return this.prisma.guide.findUnique({ where: { id } });
  }

  update(id: number, updateGuideDto: UpdateGuideDto) {
    return `This action updates a #${id} guide`;
  }

  remove(id: number) {
    return `This action removes a #${id} guide`;
  }
}
