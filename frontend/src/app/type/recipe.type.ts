
export interface Ingredient {
  name: string;
  amount: number;
  unit: string; // e.g., "g", "ml", "tbsp", "cups", "whole"
  notes?: string; // e.g., "finely chopped", "at room temperature"
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
}