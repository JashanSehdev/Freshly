import { ChangeEvent, useId, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import {
  Box,
  Slider,
} from "@mui/material";
import clsx from "clsx";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import styles from "./cooking-time.module.css";
import { FilterType } from "../filter.type";
import { watch } from "fs";

type Prop = {
  setValue: UseFormSetValue<FilterType>;
  getValue: UseFormGetValues<FilterType>;
  errors: FieldErrors<FilterType>;
  watch : UseFormWatch<FilterType>
};
export default function CookingTimeFilter({
  setValue,
  getValue,
  errors,
}: Prop) {


  const id = useId();

  const minDistance = 20;
  const [value1, setValue1] = useState<number[]>([getValue("min_cooking_time") ?? 0, getValue("max_cooking_time") ?? 180]);

  const handleChange1 = (event: Event, newValue: number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      setValue("min_cooking_time" ,Math.min(newValue[0], value1[1] - minDistance))
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      setValue("max_cooking_time" ,Math.max(newValue[1], value1[0] + minDistance))
    }
  };

  function valuetext(value: number) {
  return `${value} minutes`;
}
  return (
    <div className={styles.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon color="primary" />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
        >
          <Typography component="span">Cooking time filter</Typography>
        </AccordionSummary>

        <Box className={styles.sliderContainer}>
          <Typography>Set cooking time</Typography>

          <Box sx={{ width: 200, margin: ' 1rem auto' }}>
      <Slider
        min={5}
        max={180}
        step={2}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />

    </Box>
        </Box>
      </Accordion>
    </div>
  );
}
