import { authenticRecipes } from './authentic';
import { inspiredRecipes } from './inspired';
import { touchedRecipes } from './touched';
import type { Recipe } from '../../types';

export const recipes: Recipe[] = [...authenticRecipes, ...inspiredRecipes, ...touchedRecipes];

export const recipeMap = new Map(recipes.map((r) => [r.id, r]));
