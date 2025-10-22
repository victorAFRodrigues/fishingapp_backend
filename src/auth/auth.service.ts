import { Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
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

    return `Sign in successful with ${email}. \n UserData: ${JSON.stringify(user)}`;
  }
}
