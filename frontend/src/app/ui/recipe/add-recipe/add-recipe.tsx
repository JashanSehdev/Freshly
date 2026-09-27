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

export default function AddRecipe() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
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
  const onSubmit: SubmitHandler<RecipeInputType> = (data: RecipeInputType) =>
    console.log(data);

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
