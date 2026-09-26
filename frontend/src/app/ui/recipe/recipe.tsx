"use client";
import { fetchRecipeById } from "@/features/recipe-slice/handle-recipe/recipe.action";
import { useAppDispatch, useAppSelector } from "@/features/store";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "./recipe.module.css";
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export default function RecipiPage() {
  const recipe = useAppSelector((state) => state.recipe.recipe);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(dispatch(fetchRecipeById()).unwrap().then);
  }, []);
  return (
    <Box className={styles.container}>
      <Typography sx={{ color: "text.primary" }} variant="h2">
        {recipe?.title}
      </Typography>
      <Box className={styles.tags}>
        {recipe?.tags.map((tag, index) => (
          <Chip key={index} label={tag} />
        ))}
      </Box>
      <Box component={"img"} src={recipe?.imageUrl} alt="image" className={styles.image} />
      <Box className={styles.details}>
        <Typography variant="h3">Details</Typography>
        <List>
          <ListItem>Prep time : {recipe?.prepTimeMinutes} min</ListItem>
          <ListItem>Cook time : {recipe?.cookTimeMinutes} min</ListItem>
          <ListItem>Servings : {recipe?.servings} servings</ListItem>
          <ListItem>Difficulty : {recipe?.difficulty} </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="h3">Ingredients</Typography>
        <List>
          {recipe?.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemIcon>{index + 1}</ListItemIcon>
              {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="h3">Directions</Typography>
        <ol>
          {recipe?.instructions.map((step, index) => {
            if (typeof step === "string") {
              return (
     
                <li key={index}>{step}</li>
                
              );
            }
            return <li key={step.stepNumber}>{step.instruction}</li>;
          })}
        </ol>
      </Box>
    </Box>
  );
}
