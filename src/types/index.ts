export type User = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  username: string;
  password: string;
  email: string;
  imageUrl?: string;
  bio?: string;
  role: Role;
  recipes: Recipe[];
};

export type Recipe = {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  imageUrl: string;
  content: string;
  category?: Category;
  difficulty?: Difficulty;
  createdBy: User;
  aiReview: string;
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
  category?: Category;
  difficulty?: Difficulty;
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

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

// AiChecker
export interface AiReviewData {
  isSuspicious: boolean;
  reason: string;
  redFlags: string[];
  safetyScore: number;
}
