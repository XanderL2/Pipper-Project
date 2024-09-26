import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @ApiProperty({ example: "username123", description: 'Username must be unique', required: true })
    @IsString({ message: "Please enter correct data" })
    @MinLength(8, { message: 'Your username does not have the minimum length' })
    @MaxLength(20, { message: 'Your username has exceeded the maximum length' })
    @IsAlphanumeric()
    username: string;


    @IsNotEmpty()
    @ApiProperty({ example: "example@example.com", description: 'The minimum length is 8', required: true })
    @IsString({ message: "Please enter correct data" })
    @MinLength(8, { message: 'Your password does not have the minimum length' })
    @MaxLength(200, { message: 'Your password has reached the maximum length' })
    password: string;

}
