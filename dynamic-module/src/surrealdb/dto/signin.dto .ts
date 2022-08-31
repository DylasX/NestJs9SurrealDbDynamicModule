import { IsOptional, IsString } from 'class-validator';

export declare class SigninDto {
  @IsString()
  user: string;

  @IsString()
  pass: string;

  @IsOptional()
  @IsString()
  NS?: string;

  @IsOptional()
  @IsString()
  DB?: string;

  @IsOptional()
  @IsString()
  SC?: string;
}
