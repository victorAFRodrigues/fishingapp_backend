import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../database/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { address, ...userData } = data;

    userData.password = await bcrypt.hash(userData.password, 10);

    return this.prisma.user.create({
      data: {
        ...userData,
        address: address ? { create: address } : undefined,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        address: {
          select: {
            address: true,
            city: true,
            state: true,
            mapUrl: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        address: {
          select: {
            address: true,
            city: true,
            state: true,
            mapUrl: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        address: {
          select: {
            address: true,
            city: true,
            state: true,
            mapUrl: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { address, ...userData } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        address: address ? { update: address } : undefined, // atualiza nested address
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        address: {
          select: {
            address: true,
            city: true,
            state: true,
            mapUrl: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
