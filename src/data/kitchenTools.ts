import type { KitchenTool } from '../types';

export const kitchenTools: KitchenTool[] = [
  { id: 'frying-pan', name: 'Frying pan', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['stir-fry', 'sear'] },
  { id: 'saucepan', name: 'Saucepan', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['rice', 'sauce'] },
  { id: 'large-pot', name: 'Large pot', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['soup', 'pasta'] },
  { id: 'nonstick-skillet', name: 'Nonstick skillet', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['eggs', 'pancakes'] },
  { id: 'oven', name: 'Oven', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['roast', 'bake'] },
  { id: 'microwave', name: 'Microwave', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['steam-eggs', 'reheat'] },
  { id: 'air-fryer', name: 'Air fryer', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['wings', 'nuggets', 'fries'] },
  { id: 'toaster', name: 'Toaster', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['toast'] },
  { id: 'blender', name: 'Blender', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['sauces'] },
  { id: 'knife', name: 'Knife', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['prep'] },
  { id: 'cutting-board', name: 'Cutting board', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['prep'] },
  { id: 'spatula', name: 'Spatula', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['flip', 'stir'] },
  { id: 'tongs', name: 'Tongs', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['fry', 'toss'] },
  { id: 'wooden-spoon', name: 'Wooden spoon', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['stir'] },
  { id: 'whisk', name: 'Whisk', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['eggs', 'batter'] },
  { id: 'mixing-bowl', name: 'Mixing bowl', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['marinade', 'mix'] },
  { id: 'baking-sheet', name: 'Baking sheet', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['oven'] },
  { id: 'measuring-cups', name: 'Measuring cups', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['measure'] },
  { id: 'measuring-spoons', name: 'Measuring spoons', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['measure'] },
  { id: 'colander', name: 'Colander', category: 'kitchen-tool', commonInUSKitchen: true, requiredForRecipes: ['pasta', 'drain'] },
];

export const kitchenToolMap = new Map(kitchenTools.map((t) => [t.id, t]));

export const DEFAULT_TOOLS = [
  'frying-pan',
  'saucepan',
  'large-pot',
  'nonstick-skillet',
  'oven',
  'microwave',
  'air-fryer',
  'knife',
  'cutting-board',
  'spatula',
  'tongs',
  'mixing-bowl',
  'baking-sheet',
  'measuring-cups',
  'measuring-spoons',
];
