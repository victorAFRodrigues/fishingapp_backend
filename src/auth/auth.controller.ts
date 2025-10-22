import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { SignInDto } from "./dto/signin.dto";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  singIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }


}
