import { IsString, IsNumber } from 'class-validator';

export class bodyDTO {
  @IsString()
  image: string
  
  @IsNumber()
  compress: number;
  
}
