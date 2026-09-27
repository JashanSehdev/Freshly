"use client";
import {  IconButton } from "@mui/material";
import { CldUploadWidget } from "next-cloudinary";
import { UseFormSetValue } from "react-hook-form";
import { RecipeInputType } from "../recipe/add-recipe/add-recipe.type";
import styles from './cloudinary-widget.module.css'
import EditIcon from "@mui/icons-material/Edit";

type Prop = {
  readonly setValue: UseFormSetValue<RecipeInputType>;
};
export default function CloudinaryUploader({ setValue } : Prop) {
  const handleSuccess = (result) => {
    console.log("Uploaded:", result.info.secure_url);
    setValue("imageUrl", result.info.secure_url, { shouldValidate: true });
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      onSuccess={handleSuccess}
    >
      {({ open }) => (
        <IconButton type='button' onClick={() => open()} className={styles.edit_image}>
            <EditIcon />
          </IconButton>
      )}
    </CldUploadWidget>
  );
}
