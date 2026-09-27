import { Category } from "@mui/icons-material";
import z, { string } from "zod";

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string; 
}

export interface InstructionStep {
  stepNumber: number;
  instruction: string;
  durationInMinutes?: number;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface Recipe {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  cuisine?: string; // e.g., "Italian", "Mexican", "Indian"
  tags: string[]; // e.g., ["vegetarian", "quick", "gluten-free"]
  ingredients: Ingredient[];
  instructions: InstructionStep[] | string[];
  createdAt?: string; // ISO date string
  isPublic: boolean;
}

const ingredientSchema = z.object({
  ingredient: z.string(),
});
export type IngredientType = z.infer<typeof ingredientSchema>;

const directionSchema = z.object({
  direction: z.string(),
});

export const recipiSchema = z.object({
  title: z.string().min(1, "Recipe name required"),
  servings: z.coerce
    .number()
    .min(1, "Number of servings should be greater than 0"),
  cookTimeMinutes: z.coerce
    .number()
    .min(1, "Cook time should be greater than 0"),
  imageUrl: z.string().url("Invalid image URL"),
  isPublic: z.boolean(),
  ingredients: z.array(ingredientSchema).min(1,'Atleast one Ingredient required'),
  directions: z.array(directionSchema).min(1,'Atleast one direction required'),
  tags: z.array(z.string()).min(1,'Atleast one tag required'),
  category: z.string().min(1, "Category required"),
});

export type RecipeInputType = z.input<typeof recipiSchema>;

export type RecipeOutputType = z.output<typeof recipiSchema>;

