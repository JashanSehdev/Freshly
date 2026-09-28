"use client";
import { useAppSelector } from "@/features/store";
import styles from "./recipe.module.css";
import { Box, Button, Chip, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import Link from "next/link";

export default function RecipePage({ id }: { id: number }) {
  const recipe = useAppSelector((state) => state.recipe.recipe);
  const user = useAppSelector((state) => state.user.User);
  console.log("User" , user)
  console.log("recipe", recipe)
  return (
    <Box className={styles.container}>
      <Box>
        <Typography sx={{ color: "text.primary" }} variant="h2">
          {recipe?.title}
        </Typography>
        {user?.id === recipe?.user?.id && (
          <Link href={`/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
        )}
      </Box>

      <Box className={styles.tags}>
        {recipe?.tags.map((tag, index) => (
          <Chip key={index} label={tag} />
        ))}
      </Box>
      <Box component={"img"} src={recipe?.imageUrl} alt="image" className={styles.image} />
      <Box className={styles.details}>
        <Typography variant="h3">Details</Typography>
        <List>
          <ListItem>Cook time : {recipe?.cookTimeMinutes} min</ListItem>
          <ListItem>Servings : {recipe?.servings} servings</ListItem>
          <ListItem>Category : {recipe?.category}</ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="h3">Ingredients</Typography>
        <List>
          {recipe?.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemIcon>{index + 1}</ListItemIcon>
              {ingredient.ingredient}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className={styles.direction}>
        <Typography variant="h3">Directions</Typography>
        <Box className={styles.directions_list}>
          <ol>
            {recipe?.directions.map((step, index) => {
              return <li key={index}>{step.direction}</li>;
            })}
          </ol>
        </Box>
      </Box>
    </Box>
  );
}
