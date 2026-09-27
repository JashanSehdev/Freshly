import AddFormInput from "@/app/ui/inputs/add-recipe-inputs";
import { Box, Button, FormHelperText, IconButton, Paper, Typography } from "@mui/material";
import styles from "./recipi-details.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { RecipeInputType } from "../add-recipe.type";

type Prop = {
  control: Control<RecipeInputType>;
  register: UseFormRegister<RecipeInputType>;
  errors: FieldErrors<RecipeInputType>;
};

export default function RecipiDetails({ control, register, errors }: Prop) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: directionFields,
    append: appendDirection,
    remove: removeDirection,
  } = useFieldArray({
    control,
    name: "directions",
  });

  return (
    <Box className={styles.container}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        RECIPE DETAILS
      </Typography>

      <Paper className={styles.paper}>
        <Typography>Ingredients</Typography>
        {fields.map((field, index) => (
          <Box key={field.id} className={styles.input_container}>
            <AddFormInput
              name={`ingredients.${index}.ingredient`}
              register={register}
              placeholder="Large Bell Pepper"
              errors={errors}
            />
            <IconButton type="button" onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

         {
          errors.ingredients && (<FormHelperText error>{errors.ingredients.root?.message}</FormHelperText>)
        }
        <Button
          type="button"
          onClick={() => append({ ingredient: "" })}
          variant="outlined"
          fullWidth
        >
          + Add Ingredients
        </Button>
      </Paper>

      <Paper className={styles.paper}>
        <Typography>Directions</Typography>
        {directionFields.map((direction, index) => (
          <Box key={direction.id} className={styles.input_container}>
            <AddFormInput
              register={register}
              errors={errors}
              name={`directions.${index}.direction`}
              placeholder="Large Bell Peper"
            />
            <IconButton onClick={() => removeDirection(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        {
          errors.directions && (<FormHelperText error>{errors.directions.root?.message}</FormHelperText>)
        }
        <Button
          onClick={() => appendDirection({ direction: "" })}
          variant="outlined"
          fullWidth
        >
          + Add Direction
        </Button>
      </Paper>
    </Box>
  );
}
