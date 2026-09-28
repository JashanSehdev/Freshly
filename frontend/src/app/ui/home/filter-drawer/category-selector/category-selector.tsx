import { ChangeEvent, useId, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import styles from "./category-selector.module.css";
import { foodCategories } from "@/data/food-categories";
import { FilterType } from "../filter.type";

type Prop = {
  setValue: UseFormSetValue<FilterType>;
  getValue: UseFormGetValues<FilterType>;
  errors: FieldErrors<FilterType>;
  watch : UseFormWatch<FilterType>
};
export default function CategorySelector({ setValue, errors, watch }: Prop) {
  const [filteredCategories, setFilteredCategories] =
    useState<string[]>(foodCategories);

  const id = useId();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { value } = e.target;
    setFilteredCategories(
      foodCategories.filter((item) => {
        if (value.length < 2) return foodCategories;
        const searchTerm = value.toLowerCase();
        return item.toLowerCase().includes(searchTerm);
      }),
    );
  };
  return (
    <div className={styles.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon color="primary" />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
        >
          <Typography component="span">Category</Typography>
        </AccordionSummary>

        <Box className={styles.categorySelector}>
          <Typography>Set Category as</Typography>
          <FormControl>
            <RadioGroup
              value={watch("category")}
              onChange={(e) => {
                const value = e.target.value;
                setValue("category", value);
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  placeholder="search"
                  size="small"
                  onChange={handleChange}
                />
                {filteredCategories.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
              
                  />
                ))}
              </Box>
            </RadioGroup>
            {errors.category && (
              <FormHelperText error>{errors.category.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Accordion>
    </div>
  );
}
