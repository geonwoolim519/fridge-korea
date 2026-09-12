export type StorageType = 'fridge' | 'freezer' | 'pantry' | 'leftovers';

export type Authenticity = 'Authentic Korean' | 'Korean-inspired' | 'Korean-touched';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  commonInUSKitchen: boolean;
  koreanUses: string[];
  possibleSubstitutes: string[];
  koreanTouchPotential: string[];
  storageType: StorageType;
  icon: string;
  weakKoreanMatch?: boolean;
}

export interface KitchenTool {
  id: string;
  name: string;
  category: 'kitchen-tool';
  commonInUSKitchen: true;
  requiredForRecipes: string[];
}

export interface RecipeIngredient {
  id: string;
  amount: string;
  required: boolean;
}

export interface Substitute {
  ingredientId: string;
  using: string[];
  label: string;
  note: string;
}

export interface KoreanTouchScore {
  seasoning: number;
  cookingMethod: number;
  ingredients: number;
  servingStyle: number;
}

export interface Recipe {
  id: string;
  name: string;
  category: Authenticity;
  description: string;
  image: string;
  ingredients: RecipeIngredient[];
  optionalIngredients: RecipeIngredient[];
  substitutes: Substitute[];
  kitchenTools: string[];
  cookingTime: number;
  difficulty: Difficulty;
  koreanTouch: KoreanTouchScore;
  authenticity: Authenticity;
  whyKorean: {
    ingredients: string;
    seasoning: string;
    cookingMethod: string;
    servingStyle: string;
    culture: string;
  };
  koreanTouches: { title: string; body: string }[];
  steps: { title: string; instruction: string }[];
  leftoverSources?: string[];
}

export interface ScoredRecipe {
  recipe: Recipe;
  score: number;
  ingredientRatio: number;
  toolRatio: number;
  have: string[];
  substituteCovered: string[];
  missing: string[];
  missingTools: string[];
}
