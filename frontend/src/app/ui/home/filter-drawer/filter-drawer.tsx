import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import CategorySelector from "./category-selector/category-selector";
import { filterSchema, FilterType } from "./filter.type";
import { SubmitHandler, useForm } from "react-hook-form";
import CookingTimeFilter from "./cooking-time-filter/cooking-time";
import styles from './filter-drawer.module.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/features/store";
import { FetchRecipeByFilters } from "@/features/recipe-slice/handle-recipe/recipe.action";

export default function FilterDrawer() {
  const [state, setState] = React.useState(false);
  const dispatch = useAppDispatch();
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FilterType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
        category: '',
        min_cooking_time:undefined,
        max_cooking_time:undefined
    }
  });
  const onSubmit: SubmitHandler<FilterType> = (data) => {
    console.log(data)
    const sendData = {
      category : data.category || undefined,
      minCookingTime : data.min_cooking_time,
      maxCookingTime : data.max_cooking_time
    }
    dispatch(FetchRecipeByFilters(sendData))
  };

  const list = () => (
    <Box sx={{ width: 400 }} role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CategorySelector
            setValue={setValue}
            getValue={getValues}
            errors={errors}
            watch={watch}
        />

        <CookingTimeFilter
        watch={watch}
          setValue={setValue}
          getValue={getValues}
          errors = {errors}
        />
        <Button className={styles.button} type="submit" variant="contained" size="large">Set Filters</Button>
      </form>
 
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={toggleDrawer(true)}>
          Filter
        </Button>
        <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
