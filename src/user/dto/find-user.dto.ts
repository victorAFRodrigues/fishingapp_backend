import { IsString } from "class-validator";

export class FindUserDto {
  @IsString()
  identifier: string;
}
