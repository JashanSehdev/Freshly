"use client";
import { Box, Chip, TextField, Typography } from "@mui/material";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RecipeInputType } from "../../recipe/add-recipe/add-recipe.type";
import { ChangeEvent, useState } from "react";
import styles from './tag-input.module.css'

type Prop = {
  setValue: UseFormSetValue<RecipeInputType>;
  watch: UseFormWatch<RecipeInputType>;
  errors : FieldErrors<RecipeInputType>
};
export default function TagInput({ setValue, watch, errors }: Prop) {
  const [tagInput, setTagInput] = useState<string>("");
  const tags = watch("tags");

  const addTag = () => {
    const tag = tagInput.trim();

    if (!tag) return;

    if (tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setValue("tags", [...tags, tag], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };
  return (
    <Box className={styles.container}>
        <Typography>Set Tags</Typography>
      <TextField
      fullWidth
      error={!!errors?.tags}
      helperText = {errors?.tags?.message}
      className={styles.input}
      placeholder={"eg: Indian"}
        value={tagInput}
        onChange={(
          e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
        ) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
      />

      <Box className={styles.preview}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} />
        ))}
      </Box>
    </Box>
  );
}
