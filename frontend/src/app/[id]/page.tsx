'use client'
import { Box } from "@mui/material";
import RecipePage from "../ui/recipe/recipe";
import { use, useEffect } from "react";
import { useAppDispatch } from "@/features/store";
import { fetchRecipeById } from "@/features/recipe-slice/handle-recipe/recipe.action";

type Prop = {
    params: Promise<{id : number}>
}
export default function Recipe ({params} : Prop) {
    const {id}  = use(params);
    const dispatch = useAppDispatch();

    useEffect(() => {
    console.log(dispatch(fetchRecipeById(Number(id))).unwrap())
}, [dispatch, id]);
    return(
        <Box>
            <RecipePage/>
        </Box>
    )
}