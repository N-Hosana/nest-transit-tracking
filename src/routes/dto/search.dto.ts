import { IsString } from 'class-validator';

export class SearchRouteDto {
  @IsString()
  from: string;

  @IsString()
  to: string;
}
