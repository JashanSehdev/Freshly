'use client'
import { Box, useFormControl } from "@mui/material";
import RecipiGeneralInfo from "./recipe-general-information/recipe-general-information";
import RecipiDetails from "./recipi-details/recipi-details";
import styles from './add-recipe.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { RecipeInputType } from "./add-recipe.type";

export default function AddRecipe () {
     const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RecipeInputType>({
    defaultValues: {
        isPublic: false
    }
  })
  const onSubmit: SubmitHandler<RecipeInputType> = (data : RecipeInputType) => console.log(data)

  console.log(watch())
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.container}>
            
            <RecipiGeneralInfo
                register ={register}
                errors = {errors}
                setValue={setValue}
                getValue={getValues}
            />
            {/* <RecipiDetails/> */}

        </Box>
        </form>
    )
}