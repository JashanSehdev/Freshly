"use client";
import AddFormInput from "@/app/ui/inputs/add-recipe-inputs";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import styles from "./recipe-general-information.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { RecipeInputType, ValidNames } from "../add-recipe.type";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

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
  getValue : UseFormGetValues<RecipeInputType>
};

export default function RecipiGeneralInfo({ register, errors, setValue, getValue }: Prop) {
  return (
    <Box className={styles.container}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        RECIPE GENERAL INPORMATION
      </Typography>
      <Paper className={styles.paper}>
        <Box className={styles.image_container}>
          <Box
            component={"img"}
            src={image_placeholder}
            className={styles.image}
          />
          <input type="text" hidden {...register("imageUrl")} />

          <IconButton className={styles.edit_image}>
            <EditIcon />
          </IconButton>
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
              // onChange={(e) => setIsPrivate(e.target.value)}
              {...register("isPublic")}
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
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
}
