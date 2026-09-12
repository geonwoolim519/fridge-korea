import type { Authenticity, Difficulty, Recipe, RecipeIngredient, Substitute } from '../../types';

export function recipe(input: {
  id: string;
  name: string;
  authenticity: Authenticity;
  description: string;
  image: string;
  ingredients: RecipeIngredient[];
  optionalIngredients?: RecipeIngredient[];
  substitutes?: Substitute[];
  kitchenTools: string[];
  cookingTime: number;
  difficulty: Difficulty;
  koreanTouch: Recipe['koreanTouch'];
  whyKorean: Recipe['whyKorean'];
  koreanTouches: Recipe['koreanTouches'];
  steps: Recipe['steps'];
  leftoverSources?: string[];
}): Recipe {
  return {
    category: input.authenticity,
    optionalIngredients: input.optionalIngredients ?? [],
    substitutes: input.substitutes ?? [],
    leftoverSources: input.leftoverSources,
    ...input,
  };
}

export const img = (file: string) => `${import.meta.env.BASE_URL}assets/recipes/${file}`;
