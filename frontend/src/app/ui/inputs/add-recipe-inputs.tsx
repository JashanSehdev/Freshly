import { Box, FormHelperText, Typography } from "@mui/material";
import styles from './add-recipe-inputs.module.css'
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RecipeInputType, ValidNames } from "../recipe/add-recipe/add-recipe.type";

type Prop = {
    label ?: string,
    placeholder : string,
    suffix ?: string
    register : UseFormRegister<RecipeInputType>
    errors : FieldErrors<RecipeInputType>
    name : ValidNames
}


export default function AddFormInput (prop : Prop) {
    const {register} = prop
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
        {
            prop.errors?.[prop.name] && <FormHelperText>{prop.errors?.[prop.name]?.message}</FormHelperText>
        }
        
    </Box>
)
}