'use client'
import EditRecipePage from "@/app/ui/edit-page/edit-page"
import { Box } from "@mui/material"
import {use} from 'react'


type Prop = {
    params: Promise<{id : number}>
}

export default function EditPage ({params} : Prop) {
    const {id}  = use(params);
    return(
        <Box>
            <EditRecipePage id={id} />
        </Box>
    )
}