import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto.js';
import { UpdateRecipeDto } from './dto/update-recipe.dto.js';
import { Recipe } from './entities/recipe.entity.js';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeFilterDto } from './dto/filtered-recipe-dto.js';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipeRepository.create(createRecipeDto);
    return await this.recipeRepository.save(recipe);
  }

  // async findAll() {
    
  //   return await this.recipeRepository.find()
  // }
  async findAll(filters: RecipeFilterDto) {
  const query = this.recipeRepository
    .createQueryBuilder("recipe");
  

  if (filters.search) {
    query.andWhere(
      "recipe.title ILIKE :search",
      {
        search : `%${filters.search}%`
      } 
    )
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

  return query.getMany();
}
  async findOne(id: number) {
    return  await this.recipeRepository.findOneOrFail({ where: { id } }); 
  
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
