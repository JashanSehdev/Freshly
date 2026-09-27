"use client";
import AddFormInput from "@/app/ui/inputs/add-recipe-inputs";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import styles from "./recipe-general-information.module.css";

import { RecipeInputType, ValidNames } from "../add-recipe.type";
import { Control, FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import CloudinaryUploader from "@/app/ui/cloudinary-widget/cloudinary-widget";
import TagInput from "@/app/ui/inputs/tag-input/tag-input";
import CategoryInput from "@/app/ui/inputs/category-input/category.-input";

type Input = {
  name: ValidNames;
  label: string;
  placeholder: string;
  suffix?: string;
};

const inputs: Input[] = [
  {
    name: "title",
    label: "Recipe Name",
    placeholder: "eg: Savory Stuffed Bell Peppers",
  },
  {
    name: "servings",
    label: "Number of Servings",
    placeholder: "eg: 4 or  3-5",
    suffix: "person",
  },
  {
    name: "cookTimeMinutes",
    label: "Cook duration",
    placeholder: "30",
    suffix: "minutes",
  },
];

const image_placeholder = "https://placehold.net/main.svg";

type Prop = {
  register: UseFormRegister<RecipeInputType>;
  errors: FieldErrors<RecipeInputType>;
  setValue: UseFormSetValue<RecipeInputType>;
  getValue : UseFormGetValues<RecipeInputType>;
  watch : UseFormWatch<RecipeInputType>
  control: Control<RecipeInputType>
};

export default function RecipiGeneralInfo({ register, errors, setValue, getValue, watch, control }: Prop) {
  return (
    <Box className={styles.container}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        RECIPE GENERAL INPORMATION
      </Typography>
      <Paper className={styles.paper}>
        <Box className={styles.image_container}>
          <Box
            component={"img"}
            src={watch().imageUrl || image_placeholder}
            className={styles.image}
          />
          <input type="text" hidden {...register("imageUrl")} />
          <CloudinaryUploader setValue={setValue}/>
          {
            errors.imageUrl && <FormHelperText error>{errors.imageUrl.message}</FormHelperText>
          }
        </Box>
        {inputs.map((item, index) => (
          <AddFormInput
            key={index}
            suffix={item.suffix}
            label={item.label}
            placeholder={item.placeholder}
            name={item.name}
            register={register}
            errors={errors}
          />
        ))}

        <Box>
          <Typography>Set recipe as</Typography>
          <FormControl>
            <RadioGroup
              value={getValue('isPublic')}
          
        
              onChange={(e) => {
                const value = e.target.value === "true";
                setValue("isPublic", value);
              }}
            >
              <Box>
                <FormControlLabel
                  value={"true"}
                  control={<Radio />}
                  label="Public"
                  className={clsx(styles.basic_radio, {
                    [styles.select_radio_button]: getValue('isPublic') === true,
                  })}
                />
              </Box>
              <FormControlLabel
                value={"false"}
                control={<Radio />}
                label="Private"
                className={clsx(styles.basic_radio, {
                  [styles.select_radio_button]: getValue('isPublic') !== true,
                })}
              />
            </RadioGroup>
            {
              errors.isPublic && <FormHelperText error>{errors.isPublic.message}</FormHelperText>
            }
          </FormControl>
        </Box>
        <TagInput errors={errors} watch={watch} setValue={setValue}/>
        <CategoryInput register={register} errors={errors} control={control} name="category" label="category" placeholder="eg: Indian"/>
      </Paper>
    </Box>
  );
}
