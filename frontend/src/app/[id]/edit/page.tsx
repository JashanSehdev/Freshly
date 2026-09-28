"use client";
import EditRecipePage from "@/app/ui/edit-page/edit-page";
import { fetchRecipeById } from "@/features/recipe-slice/handle-recipe/recipe.action";
import { useAppDispatch } from "@/features/store";
import { Box } from "@mui/material";
import { use, useEffect } from "react";

type Prop = {
  params: Promise<{ id: number }>;
};

export default function EditPage({ params }: Prop) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);
  return (
    <Box>
      <EditRecipePage id={id} />
    </Box>
  );
}
