import { Injectable } from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findOne(email)
    if(!user){
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new Error("Invalid email or password, try again...");
    }

    return `Sign in successful with ${email}. \n UserData: ${JSON.stringify(user)}`;
  }
}
