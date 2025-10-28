import { IsOptional, IsString } from "class-validator";
import { AddressDto } from "../../utils/dtos/address.dto";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  address?: AddressDto;
}
