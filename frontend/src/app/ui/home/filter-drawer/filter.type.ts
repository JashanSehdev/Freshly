
import z from "zod";

export const filterSchema = z.object({
    category : z.string().optional(),
    min_cooking_time : z.number().optional(),
    max_cooking_time : z.number().optional()
})

export type FilterType = z.infer<typeof filterSchema>