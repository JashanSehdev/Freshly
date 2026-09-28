import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class GoogleLoginDto {
    @IsString()
    @IsNotEmpty()
    username: string


    @IsString()
    @IsNotEmpty()
    email: string
}
