import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from "./dto/signin.dto";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post()
  singIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }


}
