import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { AddressDto } from "../../utils/dtos/address.dto";
import { Type } from "class-transformer";
import { GuideType } from "@prisma/client";

export class CreateGuideDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  rating: number;

  @IsEnum(GuideType)
  type: GuideType;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
