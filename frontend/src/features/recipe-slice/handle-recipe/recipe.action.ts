import { createAsyncThunk } from "@reduxjs/toolkit";
import { recipes_data } from "@/data/recipi.data"; 

export const fetchRecipeById = createAsyncThunk(
    'fetchRecipe',
    async () => {
        return recipes_data[0]
    } 
)