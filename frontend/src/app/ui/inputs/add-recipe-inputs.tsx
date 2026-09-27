import { Box, FormHelperText, Typography } from "@mui/material";
import styles from './add-recipe-inputs.module.css'
import { FieldErrors, FieldPath, UseFormRegister, get } from "react-hook-form";
import { RecipeInputType } from "../recipe/add-recipe/add-recipe.type";

type Prop = {
    label ?: string,
    placeholder : string,
    suffix ?: string
    register : UseFormRegister<RecipeInputType>
    errors : FieldErrors<RecipeInputType>
    name : FieldPath<RecipeInputType>
}


export default function AddFormInput (prop : Prop) {
    const {register} = prop
    const error = get(prop.errors, prop.name)
    return(
    <Box className={styles.container}>
        {
            prop.label &&  <Typography>{prop.label}</Typography>
        }
        

        <Box className={styles.input_container}>
            <input type="text" 
                placeholder={prop.placeholder}  
                className={styles.input}
                {...register(prop.name)}
            />
            {
                prop.suffix && (
                    <Typography >
                        {prop.suffix}
                    </Typography>
                )
            }

            
           
        </Box>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
        
    </Box>
)
}