import { IsNotEmpty } from 'class-validator';

export declare class CreateDto {
  // TODO:
  // @IsNotEmpty()
  // thing: string;
  @IsNotEmpty()
  data: any;
}
