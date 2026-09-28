interface Ingredient {
  ingredient: string;
}

interface Direction {
  direction: string;
}

export interface Recipe {
  id: number;
  title: string;
  servings: number;
  cookTimeMinutes: number;
  imageUrl: string;
  isPublic: boolean;
  ingredients: Ingredient[];
  directions: Direction[];
  tags: string[];
  category: string;
  user: User
}   

export type User = {
  id : number,
  username : string
}