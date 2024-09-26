import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsAlphanumeric

} from 'class-validator';


export class RegisterDto {
  @ApiProperty({ example: "username123", description: 'Username must be unique', required: true })
  @IsString({ message: "Please enter correct data" })
  @MinLength(8, { message: 'Your username does not have the minimum length' })
  @MaxLength(20, { message: 'Your username has exceeded the maximum length' })
  @IsAlphanumeric()
  username: string;


  @ApiProperty({ example: "example@example.com", description: 'Email must be unique', required: true })
  @IsString({ message: "Please enter correct data" })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: "Please enter a valid email address" })
  email: string;


  @ApiProperty({ example: "example@example.com", description: 'The minimum length is 8', required: true })
  @IsString({ message: "Please enter correct data" })
  @MinLength(8, { message: 'Your password does not have the minimum length' })
  @MaxLength(200, { message: 'Your password has reached the maximum length' })
  password: string;
  
}
