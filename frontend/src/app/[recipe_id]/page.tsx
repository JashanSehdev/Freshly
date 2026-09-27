'use client'
import { Box } from "@mui/material";
import RecipePage from "../ui/recipe/recipe";
import { use, useEffect } from "react";
import { useAppDispatch } from "@/features/store";
import { fetchRecipeById } from "@/features/recipe-slice/handle-recipe/recipe.action";

type Prop = {
    params: Promise<{recipe_id : number}>
}
export default function Recipe ({params} : Prop) {
    const {recipe_id}  = use(params);
    const dispatch = useAppDispatch();

    useEffect(() => {
    console.log(dispatch(fetchRecipeById(Number(recipe_id))).unwrap())
}, [dispatch, recipe_id]);
    return(
        <Box>
            <RecipePage/>
        </Box>
    )
}