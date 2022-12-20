import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class EditDto {
  @ApiProperty({ example: 'lsw8168@naver.com' })
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'John' })
  @MaxLength(16)
  @MinLength(3)
  username: string;
}

export default EditDto;
