import AddFormInput from "@/app/ui/inputs/add-recipe-inputs";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import styles from "./recipi-details.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecipiDetails() {
  return (
    <Box className={styles.container}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        RECIPE DETAILS
      </Typography>

      <Paper className={styles.paper}>
        <Typography>Ingredients</Typography>
        <Box className={styles.input_container}>
          <AddFormInput placeholder="Large Bell Peper" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Button variant="outlined" fullWidth>
          + Add Ingredients
        </Button>
      </Paper>

      <Paper className={styles.paper}>
        <Typography>Directions</Typography>
        <Box className={styles.input_container}>
          <AddFormInput placeholder="Large Bell Peper" />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Button variant="outlined" fullWidth>
          + Add Direction
        </Button>
      </Paper>
    </Box>
  );
}
