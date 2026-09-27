"use client";
import { Box, Button } from "@mui/material";
import RecipiGeneralInfo from "./recipe-general-information/recipe-general-information";
import RecipiDetails from "./recipi-details/recipi-details";
import styles from "./add-recipe.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  RecipeInputType,
  RecipeOutputType,
  recipiSchema,
} from "./add-recipe.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipe } from "@/features/recipe-slice/handle-recipe/recipe.action";
import { useAppDispatch } from "@/features/store";
import { enqueueSnackbar } from "notistack";

export default function AddRecipePage() {

  const dispatch = useAppDispatch();
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
    defaultValues: {
      title: "",
      servings: "",
      cookTimeMinutes: "",
      imageUrl: "",
      isPublic: false,
      ingredients: [],
      directions: [],
      tags: [],
      category: "",
    },
  });
  const onSubmit: SubmitHandler<RecipeOutputType> = async(data: RecipeOutputType) => {
    console.log(data);
    await  dispatch(createRecipe(data))
    reset()
    enqueueSnackbar('Recipe published', {variant: 'success'})
  }

  console.log("errors" , errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <Box className={styles.publish_bar}>
        <p></p>
        <Button type="submit" variant="contained">
          Publish
        </Button>
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
