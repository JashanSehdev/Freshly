import { Recipe } from "@/app/type/recipe.type";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRecipes, FetchRecipeByFilters, fetchRecipeById } from "./handle-recipe/recipe.action";

type InitialState = {
    recipe : Recipe | null;
    recipes : Recipe[]
}

const initialState : InitialState = {
    recipe : null,
    recipes : []
}

export const recipeSlice = createSlice({
    name : 'recipe slice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchRecipeById.fulfilled , (state, action) => {
            state.recipe = action.payload
        });

        builder.addCase(fetchAllRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload
        });
        
        builder.addCase(FetchRecipeByFilters.fulfilled, (state, action) => {
            state.recipes = action.payload
        })
    }
})

export default recipeSlice.reducer 