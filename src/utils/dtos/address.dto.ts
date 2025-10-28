import { IsString, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  mapUrl: string;
}