import { hasIngredient, ingredientMap } from '../data/ingredients';
import { pantryMap } from '../data/koreanPantry';
import { recipes } from '../data/recipes';
import { kitchenToolMap } from '../data/kitchenTools';
import type { Recipe, ScoredRecipe } from '../types';

const SKIP_IDS = new Set(['water', 'sugar']);

export function lookupIngredient(id: string) {
  return ingredientMap.get(id) ?? pantryMap.get(id);
}

function selectedCovers(selected: Set<string>, id: string): boolean {
  if (SKIP_IDS.has(id)) return true;
  return hasIngredient(selected, id);
}

function substituteCovers(recipe: Recipe, ingredientId: string, selected: Set<string>): boolean {
  const sub = recipe.substitutes.find((s) => s.ingredientId === ingredientId);
  if (!sub) return false;
  const hits = sub.using.filter((id) => selectedCovers(selected, id)).length;
  if (sub.using.length <= 1) return hits >= 1;
  return hits >= Math.min(2, sub.using.length);
}

export function analyzeRecipe(recipe: Recipe, selected: Set<string>, tools: Set<string>): ScoredRecipe {
  const required = recipe.ingredients.filter((i) => i.required && !SKIP_IDS.has(i.id));
  const have: string[] = [];
  const substituteCovered: string[] = [];
  const missing: string[] = [];

  for (const ing of required) {
    if (selectedCovers(selected, ing.id)) have.push(ing.id);
    else if (substituteCovers(recipe, ing.id, selected)) substituteCovered.push(ing.id);
    else missing.push(ing.id);
  }

  const haveScore = have.length + substituteCovered.length * 0.65;
  const ingredientRatio = required.length === 0 ? 1 : haveScore / required.length;

  const neededTools = recipe.kitchenTools;
  const missingTools = neededTools.filter((id) => !tools.has(id));
  const toolRatio = neededTools.length === 0 ? 1 : (neededTools.length - missingTools.length) / neededTools.length;

  const koreanRelevance =
    recipe.authenticity === 'Authentic Korean' ? 1 : recipe.authenticity === 'Korean-inspired' ? 0.82 : 0.62;
  const difficultyScore = recipe.difficulty === 'Easy' ? 1 : recipe.difficulty === 'Medium' ? 0.72 : 0.45;
  const timeScore = Math.max(0, Math.min(1, 1 - (recipe.cookingTime - 12) / 80));

  let leftoverBoost = 0;
  if (recipe.leftoverSources?.some((id) => selectedCovers(selected, id))) leftoverBoost = 0.12;

  const score =
    ingredientRatio * 0.4 +
    toolRatio * 0.2 +
    koreanRelevance * 0.2 +
    difficultyScore * 0.1 +
    timeScore * 0.1 +
    leftoverBoost;

  return {
    recipe,
    score,
    ingredientRatio,
    toolRatio,
    have,
    substituteCovered,
    missing,
    missingTools,
  };
}

export function recommendRecipes(selectedIds: string[], toolIds: string[], limit = 5): ScoredRecipe[] {
  const selected = new Set(selectedIds);
  const tools = new Set(toolIds);
  return recipes
    .filter((recipe) => {
      if (!recipe.leftoverSources?.length) return true;
      return recipe.leftoverSources.some((id) => selectedCovers(selected, id));
    })
    .map((recipe) => analyzeRecipe(recipe, selected, tools))
    .sort((a, b) => {
      if (b.ingredientRatio !== a.ingredientRatio) return b.ingredientRatio - a.ingredientRatio;
      return b.score - a.score;
    })
    .slice(0, limit);
}

export function koreanizeRecipes(selectedIds: string[], toolIds: string[]): ScoredRecipe[] {
  const selected = new Set(selectedIds);
  const leftoverIds = selectedIds.filter((id) => id.startsWith('leftover-') || id === 'frozen-pizza' || id === 'french-fries' || id === 'chicken-nuggets');
  if (leftoverIds.length === 0) return [];
  const tools = new Set(toolIds);
  return recipes
    .filter((recipe) => recipe.leftoverSources?.some((id) => selectedCovers(selected, id)))
    .map((recipe) => analyzeRecipe(recipe, selected, tools))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export function koreanTouchTotal(recipe: Recipe): number {
  const { seasoning, cookingMethod, ingredients, servingStyle } = recipe.koreanTouch;
  return Math.round((seasoning + cookingMethod + ingredients + servingStyle) / 4);
}

export function ingredientName(id: string): string {
  return lookupIngredient(id)?.name ?? id.replace(/-/g, ' ');
}

export function toolName(id: string): string {
  return kitchenToolMap.get(id)?.name ?? id.replace(/-/g, ' ');
}
