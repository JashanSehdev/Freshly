import { Box, Button, Paper, Typography } from "@mui/material";
import styles from './simple-card.module.css'
import Link from "next/link";

type Prop = {
    image : string,
    title : string,
    id : number
}

const placeholder_image = 'https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg'
export default function SimpleCard({image, title, id}: Prop) {
    return(
    <Paper className={styles.container}>
        <Box 
            component={'img'}
            src={image || placeholder_image}
            className={styles.image}
        />
        <Box className={styles.details}>
            <Typography variant="body1">
                {title}
            </Typography>
        </Box>
        <Link href={`/${id}`}>
            <Button variant="contained">View Recipe</Button>
        </Link>
        
    </Paper>)
}