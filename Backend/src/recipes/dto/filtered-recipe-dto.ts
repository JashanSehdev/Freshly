import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class RecipeFilterDto {

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minCookingTime?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxCookingTime?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

}