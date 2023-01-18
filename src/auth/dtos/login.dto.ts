import { IsString, IsNotEmpty } from 'class-validator';

export class loginDTO {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

