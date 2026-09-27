import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { RecipeInputType } from "../../recipe/add-recipe/add-recipe.type";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  UseFormRegister,
} from "react-hook-form";
import { foodCategories } from "@/data/food-categories";
import styles from './category-input.module.css'

type Prop = {
  label?: string;
  placeholder: string;
  register: UseFormRegister<RecipeInputType>;
  errors: FieldErrors<RecipeInputType>;
  name: FieldPath<RecipeInputType>;
  control: Control<RecipeInputType>;
};

export default function CategoryInput({ control }: Prop) {
  return (
    <Box className={styles.container}>
      <Typography>Set Category</Typography>
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <Autocomplete
            options={foodCategories}
            value={field.value || ""}
            getOptionLabel={(option) => option}
            onChange={(_, newValue) => {
              field.onChange(newValue ?? "");
            }}
            onBlur={field.onBlur}
            renderInput={(params) => (
              <TextField
                className={styles.input}
                {...params}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      />
    </Box>
  );
}
