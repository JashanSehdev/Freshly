import { Box, TextField } from "@mui/material";
import SimpleCard from "../cards/simple-card/simple-card";
import { useAppDispatch, useAppSelector } from "@/features/store";
import styles from "./home.module.css";
import FilterDrawer from "./filter-drawer/filter-drawer";
import { ChangeEvent } from "react";
import debounce from 'debounce';
import { FetchRecipeByFilters } from "@/features/recipe-slice/handle-recipe/recipe.action";

export default function HomePage() {
  const recipes = useAppSelector((state) => state.recipe.recipes);
  console.log('recipes:', recipes)
  const dispatch = useAppDispatch();
  const debounceSearch = debounce((value :string) => {
    dispatch(FetchRecipeByFilters({search: value}))
  }, 1000)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const {value} = e.target;
    debounceSearch(value.trim())
  }
  return (
    <Box className={styles.container}>
      <Box className={styles.search}>
        <TextField 
          onChange={handleChange}
          placeholder="search"
        />
      </Box>
        <Box className={styles.tags}>
            <FilterDrawer/>

        </Box>
      <Box className={styles.sub_container}>
        {recipes.map((item) => (
          <SimpleCard
            key={item.id}
            image={item.imageUrl}
            title={item.title}
            id={item.id}
          /> 
        ))}
    
      </Box>
    </Box>
  );
}
