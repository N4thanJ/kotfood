export type User = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  username: string;
  password: string;
  email: string;
  imageUrl?: string;
  bio?: string;
  recipes: Recipe[];
};

export type Recipe = {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  imageUrl: string;
  category?: Category;
  difficulty?: Difficulty;
  createdBy: User;
};

// Requestbodies
// Login
export type LoginBody = {
  email: string;
  password: string;
};

// Register
export type RegisterBody = {
  email: string;
  username: string;
  password: string;
};

// CreateRecipe
export type RecipeBody = {
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  difficulty: Difficulty;
};

// Enums
export enum Category {
  Ontbijt = 'Ontbijt',
  Lunch = 'Lunch',
  Diner = 'Diner',
  Dessert = 'Dessert',
  Snack = 'Snack',
  Drankje = 'Drankje',
}

export enum Difficulty {
  Makkelijk = 'Makkelijk',
  Gemiddeld = 'Gemiddeld',
  Moeilijk = 'Moeilijk',
}
