import { IsOptional, IsString } from 'class-validator';

export declare class SignupDto {
  @IsString()
  email: string;

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
