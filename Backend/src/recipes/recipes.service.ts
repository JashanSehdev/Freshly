import { Injectable, Req } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto.js';
import { UpdateRecipeDto } from './dto/update-recipe.dto.js';
import { Recipe } from './entities/recipe.entity.js';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeFilterDto } from './dto/filtered-recipe-dto.js';
import type { Request } from 'express';
import { PassThrough } from 'stream';
import { User } from '../users/entities/user.entity.js';
import { GoogleLoginDto } from '../users/dto/google-login.dto.js';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}
  async create(user : User,createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipeRepository.create({...createRecipeDto, user : user});
    return await this.recipeRepository.save(recipe);
  }

  async findAll(filters: RecipeFilterDto) {
  const query = this.recipeRepository
    .createQueryBuilder("recipe").leftJoinAndSelect("recipe.user", "user");
  

  if (filters.search) {
    query.andWhere(
      "recipe.title ILIKE :search",
      {
        search : `%${filters.search}%`
      } 
    )
  }

   if (filters.userId) {
    query.andWhere("user.id = :userId", { userId: filters.userId });
  } else {
    query.andWhere("recipe.isPublic = :isPublic", { isPublic: true });
  }
  if (filters.category) {
    query.andWhere(
      "recipe.category = :category",
      {
        category: filters.category,
      }
    );
  }

  if (filters.minCookingTime !== undefined) {
    query.andWhere(
      "recipe.cookTimeMinutes >= :minCookingTime",
      {
        minCookingTime: filters.minCookingTime,
      }
    );
  }

  if (filters.maxCookingTime !== undefined) {
    query.andWhere(
      "recipe.cookTimeMinutes <= :maxCookingTime",
      {
        maxCookingTime: filters.maxCookingTime,
      }
    );
  }

  return await query.getMany();
}
  async findOne(id: number) {
    return  await this.recipeRepository.findOneOrFail({ where: { id }, relations: {
      user: true,
    }, }); 
  
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    console.log(id)
    await this.recipeRepository.update(id, updateRecipeDto);
    return await this.recipeRepository.findOneBy({id});
  }

  async remove(id: number) {
    const removed_recipe = await this.recipeRepository.delete({id});
    return removed_recipe
  }

}
