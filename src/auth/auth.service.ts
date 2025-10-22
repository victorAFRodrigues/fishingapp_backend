import { Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findOne(email)
    if(!user){
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new UnauthorizedException('Email or password incorrect, please try again...');
    }

    const payload = { sub: user.id }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
