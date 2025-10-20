import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({where: {id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({where: {id}, data:{...updateUserDto}});
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: {id} });
  }
}
