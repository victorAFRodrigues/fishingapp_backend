import { Controller, Get, Post, Body, Patch, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../utils/prisma/prisma.service";
import { FindUserDto } from "./dto/find-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post("find")
  findOne(@Body() body: FindUserDto) {
    return this.userService.findOne(body.identifier);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  remove(@Body() body: { id: string }) {
    return this.userService.remove(body.id);
  }
}
