import { Recipe } from "@/app/type/recipe.type";
import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipeById } from "./handle-recipe/recipe.action";

type InitialState = {
    recipe : Recipe | null
}

const initialState : InitialState = {
    recipe : null
}

export const recipeSlice = createSlice({
    name : 'recipe slice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchRecipeById.fulfilled , (state, action) => {
            state.recipe = action.payload
        })
    }
})

export default recipeSlice.reducer 