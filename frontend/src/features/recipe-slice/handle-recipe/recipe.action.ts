import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecipeOutputType } from "@/app/ui/recipe/add-recipe/add-recipe.type";
import { api } from "@/app/api/api";
import { Recipe } from "@/app/type/recipe.type";
import axios from "axios";
export const fetchRecipeById = createAsyncThunk<
  Recipe,
  number,
  { rejectValue: string }
>(
  "fetchRecipe/fetch-by-id",

  async (id: number, thunkApi) => {
    try {
      const response = await api.get(`/recipes/${id}`);
      console.log("fetch recipe by id")
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(
          error.response?.data?.message ?? "Something went wrong",
        );
      }

      return thunkApi.rejectWithValue("Something went wrong");
    }
  },
);

export const createRecipe = createAsyncThunk(
  "create recipe",
  async (recipe: RecipeOutputType, thunkApi) => {
    try {
      const response = await api.post("/recipes", recipe);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Something went wrong",
      );
    }
  },
);

export const fetchAllRecipes = createAsyncThunk(
    'recipes/getAllRecipes',
    async (_, thunkApi) => {
        try {
            const response = await api.get('recipes')
            
            return response.data

        } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Something went wrong",
      );
    }
    }
)

type Params = {
  search ?: string,
  minCookingTime ?: number,
  maxCookingTime ?: number,
  category ?: string,
  userId ?: number

}
export const FetchRecipeByFilters = createAsyncThunk(
    'recipes/fetchRecipeByFilters',
    async ({
      userId,
      search,
      minCookingTime,
      maxCookingTime,
      category
    } : Params, thunkApi) => {
        try {
            const response = await api.get('recipes',{
              params : {
                userId,
                search,
                category,
                minCookingTime,
                maxCookingTime
              }
            })
            
            return response.data

        } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Something went wrong",
      );
    }
    }
)

type UpdateData = {
  id : number,
  data : RecipeOutputType
}
export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async({id, data} : UpdateData, thunkApi) => {
    try {
      const response = await api.put(`/recipes/${id}`, data);

      return response.data

    } catch(error : any) { 
      return thunkApi.rejectWithValue(
        error.response?.data || "Something went wrong",
      )
    }
  }
)