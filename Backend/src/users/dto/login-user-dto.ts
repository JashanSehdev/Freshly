import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'Password must be greater than 6 words'})
    password: string
}
