"use client";
import { Box, Button } from "@mui/material";
import RecipiGeneralInfo from "./general-info/edit-general-info";
import RecipiDetails from "./details-info/edit-detail-info";
import styles from "./edit-page.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  RecipeInputType,
  RecipeOutputType,
  recipiSchema,
} from "./edit-page.type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRecipe,
  fetchRecipeById,
} from "@/features/recipe-slice/handle-recipe/recipe.action";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { enqueueSnackbar } from "notistack";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type Prop = {
  id: number;
};
export default function EditRecipePage({ id }: Prop) {
  const recipe = useAppSelector((state) => state.recipe.recipe);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, []);

  console.log(recipe);

  const handleCancel = () => {
    reset();
    redirect("/");
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<RecipeInputType, unknown, RecipeOutputType>({
    resolver: zodResolver(recipiSchema),
    defaultValues: recipe ?? {}
  });
  const onSubmit: SubmitHandler<RecipeOutputType> = async (
    data: RecipeOutputType,
  ) => {
    console.log(data);
    await dispatch(createRecipe(data));
    reset();
    enqueueSnackbar("Recipe published", { variant: "success" });
  };

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.publish_bar}>
        <p></p>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <Button type="submit" variant="contained">
            Update
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
      <Box className={styles.container}>
        <RecipiGeneralInfo
          watch={watch}
          register={register}
          errors={errors}
          setValue={setValue}
          getValue={getValues}
          control={control}
        />
        <RecipiDetails register={register} control={control} errors={errors} />
      </Box>
    </form>
  );
}
