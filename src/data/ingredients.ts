import type { Ingredient } from '../types';

function item(
  id: string,
  name: string,
  category: string,
  subcategory: string,
  storageType: Ingredient['storageType'],
  icon: string,
  extra: Partial<Ingredient> = {},
): Ingredient {
  return {
    id,
    name,
    category,
    subcategory,
    storageType,
    icon,
    commonInUSKitchen: true,
    koreanUses: extra.koreanUses ?? [],
    possibleSubstitutes: extra.possibleSubstitutes ?? [],
    koreanTouchPotential: extra.koreanTouchPotential ?? [],
    weakKoreanMatch: extra.weakKoreanMatch,
  };
}

export const ingredients: Ingredient[] = [
  item('chicken-breast', 'Chicken breast', 'Protein / Meat', 'chicken', 'fridge', '🍗', {
    koreanUses: ['bulgogi-style marinade', 'rice bowls', 'soup'],
    koreanTouchPotential: ['soy-garlic marinade', 'gochujang glaze'],
  }),
  item('chicken-thigh', 'Chicken thigh', 'Protein / Meat', 'chicken', 'fridge', '🍗', {
    koreanUses: ['Korean fried chicken', 'braises', 'rice bowls'],
    koreanTouchPotential: ['soy-garlic', 'spicy-sweet glaze'],
  }),
  item('ground-beef', 'Ground beef', 'Protein / Meat', 'beef', 'fridge', '🥩', {
    koreanUses: ['bulgogi-style crumble', 'bibimbap topping'],
    koreanTouchPotential: ['soy-sesame seasoning'],
  }),
  item('steak', 'Steak', 'Protein / Meat', 'beef', 'fridge', '🥩', {
    koreanUses: ['bulgogi-inspired slices', 'rice bowls'],
    koreanTouchPotential: ['soy-garlic-sesame'],
  }),
  item('ground-turkey', 'Ground turkey', 'Protein / Meat', 'turkey', 'fridge', '🦃', {
    koreanUses: ['lettuce wraps', 'seasoned crumble'],
    possibleSubstitutes: ['ground-beef', 'ground-pork'],
  }),
  item('ground-pork', 'Ground pork', 'Protein / Meat', 'pork', 'fridge', '🥩', {
    koreanUses: ['spicy stir-fry', 'dumpling filling vibe'],
  }),
  item('pork-chop', 'Pork chop', 'Protein / Meat', 'pork', 'fridge', '🥩', {
    koreanUses: ['jeyuk-inspired pan sear'],
  }),
  item('bacon', 'Bacon', 'Protein / Meat', 'pork', 'fridge', '🥓', {
    koreanUses: ['fried rice', 'kimchi-style saute'],
    koreanTouchPotential: ['sesame finish', 'rice bowl'],
  }),
  item('ham', 'Ham', 'Protein / Meat', 'pork', 'fridge', '🍖', {
    koreanUses: ['egg toast', 'fried rice'],
  }),
  item('sausage', 'Sausage', 'Protein / Meat', 'pork', 'fridge', '🌭', {
    koreanUses: ['spicy rice skillet'],
  }),
  item('hot-dog', 'Hot dog', 'Protein / Meat', 'pork', 'fridge', '🌭', {
    koreanUses: ['soy-glazed street-food style'],
    koreanTouchPotential: ['ketchup-mayo + soy'],
  }),
  item('deli-turkey', 'Deli turkey', 'Protein / Meat', 'turkey', 'fridge', '🥪', {
    koreanUses: ['egg toast filling'],
  }),
  item('deli-ham', 'Deli ham', 'Protein / Meat', 'pork', 'fridge', '🥪', {
    koreanUses: ['Korean egg toast'],
  }),
  item('rotisserie-chicken', 'Rotisserie chicken', 'Protein / Meat', 'chicken', 'fridge', '🐔', {
    koreanUses: ['dakgomtang-inspired soup', 'rice bowls'],
    koreanTouchPotential: ['soy-garlic leftover chicken'],
  }),
  item('meatballs', 'Meatballs', 'Protein / Meat', 'beef', 'fridge', '🧆', {
    koreanUses: ['Korean BBQ glaze'],
    koreanTouchPotential: ['soy-honey-garlic'],
  }),
  item('eggs', 'Eggs', 'Eggs / Dairy', 'eggs', 'fridge', '🥚', {
    koreanUses: ['gyeran-jjim', 'gyeran-mari', 'fried rice', 'bibimbap'],
    koreanTouchPotential: ['soy seasoning', 'rice topping'],
  }),
  item('milk', 'Milk', 'Eggs / Dairy', 'dairy', 'fridge', '🥛', {
    koreanUses: ['steamed eggs', 'creamy gochujang pasta'],
  }),
  item('butter', 'Butter', 'Eggs / Dairy', 'dairy', 'fridge', '🧈', {
    koreanUses: ['egg toast', 'soy-butter noodles', 'corn'],
    koreanTouchPotential: ['soy-butter glaze'],
  }),
  item('cheddar-cheese', 'Cheddar cheese', 'Eggs / Dairy', 'cheese', 'fridge', '🧀', {
    koreanUses: ['Korean-touched grills', 'mac and cheese'],
    koreanTouchPotential: ['kimchi grilled cheese'],
  }),
  item('mozzarella-cheese', 'Mozzarella cheese', 'Eggs / Dairy', 'cheese', 'fridge', '🧀', {
    koreanUses: ['Korean-style pizza'],
  }),
  item('cream-cheese', 'Cream cheese', 'Eggs / Dairy', 'cheese', 'fridge', '🧀'),
  item('parmesan-cheese', 'Parmesan cheese', 'Eggs / Dairy', 'cheese', 'fridge', '🧀'),
  item('greek-yogurt', 'Greek yogurt', 'Eggs / Dairy', 'dairy', 'fridge', '🥣', {
    koreanUses: ['cooling sauce next to heat'],
  }),
  item('sour-cream', 'Sour cream', 'Eggs / Dairy', 'dairy', 'fridge', '🥣'),
  item('heavy-cream', 'Heavy cream', 'Eggs / Dairy', 'dairy', 'fridge', '🥛', {
    koreanUses: ['gochujang cream pasta'],
  }),
  item('potato', 'Potato', 'Vegetables', 'veg', 'pantry', '🥔', {
    koreanUses: ['gamja-jeon', 'gamja jorim'],
  }),
  item('sweet-potato', 'Sweet potato', 'Vegetables', 'veg', 'pantry', '🍠', {
    koreanUses: ['roasted banchan-style'],
  }),
  item('onion', 'Onion', 'Vegetables', 'veg', 'pantry', '🧅', {
    koreanUses: ['almost every savory Korean pan dish'],
  }),
  item('green-onion', 'Green onion', 'Vegetables', 'veg', 'fridge', '🌿', {
    koreanUses: ['pajeon', 'finish for soups and bowls'],
  }),
  item('garlic', 'Garlic', 'Vegetables', 'veg', 'pantry', '🧄', {
    koreanUses: ['core Korean seasoning with soy'],
    koreanTouchPotential: ['soy-garlic base'],
  }),
  item('carrot', 'Carrot', 'Vegetables', 'veg', 'fridge', '🥕', {
    koreanUses: ['bibimbap', 'japchae-style stir-fry'],
  }),
  item('cabbage', 'Cabbage', 'Vegetables', 'veg', 'fridge', '🥬', {
    koreanUses: ['quick kimchi-style pickle', 'egg toast'],
    koreanTouchPotential: ['vinegar-chili pickle'],
  }),
  item('lettuce', 'Lettuce', 'Vegetables', 'veg', 'fridge', '🥬', {
    koreanUses: ['ssam-style wraps'],
    koreanTouchPotential: ['wrap and dip'],
  }),
  item('spinach', 'Spinach', 'Vegetables', 'veg', 'fridge', '🥬', {
    koreanUses: ['sigeumchi namul'],
  }),
  item('broccoli', 'Broccoli', 'Vegetables', 'veg', 'fridge', '🥦', {
    koreanUses: ['soy-garlic side'],
  }),
  item('cauliflower', 'Cauliflower', 'Vegetables', 'veg', 'fridge', '🥦'),
  item('bell-pepper', 'Bell pepper', 'Vegetables', 'veg', 'fridge', '🫑', {
    koreanUses: ['japchae-style mix', 'stir-fry'],
  }),
  item('jalapeno', 'Jalapeño', 'Vegetables', 'veg', 'fridge', '🌶️', {
    koreanUses: ['heat when gochugaru is missing'],
  }),
  item('mushroom', 'Mushroom', 'Vegetables', 'veg', 'fridge', '🍄', {
    koreanUses: ['namul-style saute', 'rice bowls'],
  }),
  item('zucchini', 'Zucchini', 'Vegetables', 'veg', 'fridge', '🥒', {
    koreanUses: ['hobak bokkeum'],
  }),
  item('cucumber', 'Cucumber', 'Vegetables', 'veg', 'fridge', '🥒', {
    koreanUses: ['oi muchim'],
  }),
  item('tomato', 'Tomato', 'Vegetables', 'veg', 'fridge', '🍅'),
  item('corn', 'Corn', 'Vegetables', 'veg', 'fridge', '🌽', {
    koreanUses: ['butter-soy corn'],
  }),
  item('green-beans', 'Green beans', 'Vegetables', 'veg', 'fridge', '🫘'),
  item('celery', 'Celery', 'Vegetables', 'veg', 'fridge', '🥬'),
  item('kale', 'Kale', 'Vegetables', 'veg', 'fridge', '🥬'),
  item('brussels-sprouts', 'Brussels sprouts', 'Vegetables', 'veg', 'fridge', '🥬'),
  item('asparagus', 'Asparagus', 'Vegetables', 'veg', 'fridge', '🌿'),
  item('avocado', 'Avocado', 'Vegetables', 'veg', 'fridge', '🥑', {
    koreanUses: ['Korean-inspired rice bowls'],
  }),
  item('frozen-peas', 'Frozen peas', 'Vegetables', 'veg', 'freezer', '🟢'),
  item('apple', 'Apple', 'Fruits', 'fruit', 'fridge', '🍎', {
    koreanUses: ['bulgogi marinade sweetness'],
  }),
  item('banana', 'Banana', 'Fruits', 'fruit', 'pantry', '🍌', {
    weakKoreanMatch: true,
  }),
  item('lemon', 'Lemon', 'Fruits', 'fruit', 'fridge', '🍋', {
    koreanUses: ['bright finish next to soy'],
  }),
  item('lime', 'Lime', 'Fruits', 'fruit', 'fridge', '🍋'),
  item('orange', 'Orange', 'Fruits', 'fruit', 'fridge', '🍊'),
  item('white-rice', 'White rice', 'Grains / Bakery', 'rice', 'pantry', '🍚', {
    koreanUses: ['the center of most Korean meals'],
    koreanTouchPotential: ['rice bowl structure'],
  }),
  item('brown-rice', 'Brown rice', 'Grains / Bakery', 'rice', 'pantry', '🍚', {
    possibleSubstitutes: ['white-rice'],
  }),
  item('bread', 'Bread', 'Grains / Bakery', 'bread', 'pantry', '🍞', {
    koreanUses: ['gilgeori toast'],
  }),
  item('whole-wheat-bread', 'Whole wheat bread', 'Grains / Bakery', 'bread', 'pantry', '🍞'),
  item('hamburger-buns', 'Hamburger buns', 'Grains / Bakery', 'bread', 'pantry', '🍔'),
  item('hot-dog-buns', 'Hot dog buns', 'Grains / Bakery', 'bread', 'pantry', '🌭'),
  item('tortilla', 'Tortilla', 'Grains / Bakery', 'bread', 'pantry', '🌮', {
    koreanUses: ['Korean-inspired tacos', 'quesadillas'],
  }),
  item('bagel', 'Bagel', 'Grains / Bakery', 'bread', 'pantry', '🥯'),
  item('english-muffin', 'English muffin', 'Grains / Bakery', 'bread', 'pantry', '🍞'),
  item('croissant', 'Croissant', 'Grains / Bakery', 'bread', 'pantry', '🥐', {
    weakKoreanMatch: true,
  }),
  item('pasta', 'Pasta', 'Grains / Bakery', 'noodles', 'pantry', '🍝', {
    koreanUses: ['japchae-style stand-in', 'gochujang pasta'],
    koreanTouchPotential: ['spicy-savory noodle bowl'],
  }),
  item('instant-noodles', 'Instant noodles', 'Grains / Bakery', 'noodles', 'pantry', '🍜', {
    koreanUses: ['quick spicy noodle bowl'],
  }),
  item('oatmeal', 'Oatmeal', 'Grains / Bakery', 'cereal', 'pantry', '🥣', {
    weakKoreanMatch: true,
  }),
  item('cereal', 'Cereal', 'Grains / Bakery', 'cereal', 'pantry', '🥣', {
    weakKoreanMatch: true,
  }),
  item('breadcrumbs', 'Breadcrumbs', 'Grains / Bakery', 'bread', 'pantry', '🌾', {
    koreanUses: ['Korean fried chicken crust'],
  }),
  item('soy-sauce', 'Soy sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🫙', {
    koreanUses: ['foundational Korean seasoning'],
    koreanTouchPotential: ['soy-garlic-sweet marinade'],
  }),
  item('ketchup', 'Ketchup', 'Sauces / Condiments', 'sauce', 'pantry', '🍅', {
    koreanUses: ['egg toast drizzle', 'fried chicken dip'],
  }),
  item('mustard', 'Mustard', 'Sauces / Condiments', 'sauce', 'pantry', '🟡'),
  item('mayonnaise', 'Mayonnaise', 'Sauces / Condiments', 'sauce', 'pantry', '🥚', {
    koreanUses: ['egg toast', 'spicy mayo'],
  }),
  item('bbq-sauce', 'BBQ sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🍖'),
  item('ranch', 'Ranch', 'Sauces / Condiments', 'sauce', 'pantry', '🥗'),
  item('buffalo-sauce', 'Buffalo sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🌶️', {
    koreanUses: ['gochujang-buffalo hybrid'],
  }),
  item('hot-sauce', 'Hot sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🌶️', {
    koreanUses: ['heat when Korean chili paste is missing'],
  }),
  item('sriracha', 'Sriracha', 'Sauces / Condiments', 'sauce', 'pantry', '🌶️', {
    koreanUses: ['gochujang-style substitute building block'],
    koreanTouchPotential: ['sweet-heat shortcut'],
  }),
  item('teriyaki-sauce', 'Teriyaki sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🫙', {
    koreanUses: ['quick sweet-soy stand-in — not Korean, but useful'],
  }),
  item('worcestershire-sauce', 'Worcestershire sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🫙'),
  item('honey', 'Honey', 'Sauces / Condiments', 'sweet', 'pantry', '🍯', {
    koreanUses: ['balance soy and chili'],
  }),
  item('maple-syrup', 'Maple syrup', 'Sauces / Condiments', 'sweet', 'pantry', '🍁', {
    possibleSubstitutes: ['honey'],
  }),
  item('peanut-butter', 'Peanut butter', 'Sauces / Condiments', 'spread', 'pantry', '🥜', {
    weakKoreanMatch: true,
  }),
  item('olive-oil', 'Olive oil', 'Sauces / Condiments', 'oil', 'pantry', '🫒', {
    koreanUses: ['sesame oil stand-in for cooking'],
  }),
  item('vinegar', 'Vinegar', 'Sauces / Condiments', 'acid', 'pantry', '🍶', {
    koreanUses: ['quick pickles', 'oi muchim'],
  }),
  item('apple-cider-vinegar', 'Apple cider vinegar', 'Sauces / Condiments', 'acid', 'pantry', '🍎', {
    possibleSubstitutes: ['vinegar'],
  }),
  item('steak-sauce', 'Steak sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🥩'),
  item('tomato-pasta-sauce', 'Tomato pasta sauce', 'Sauces / Condiments', 'sauce', 'pantry', '🍝'),
  item('pickle-juice', 'Pickle juice', 'Sauces / Condiments', 'acid', 'fridge', '🥒', {
    koreanUses: ['briny shortcut for quick pickles'],
  }),
  item('potato-chips', 'Potato chips', 'Snacks / Frozen / Other', 'snack', 'pantry', '🥔', {
    weakKoreanMatch: true,
  }),
  item('tortilla-chips', 'Tortilla chips', 'Snacks / Frozen / Other', 'snack', 'pantry', '🌮'),
  item('pretzels', 'Pretzels', 'Snacks / Frozen / Other', 'snack', 'pantry', '🥨', {
    weakKoreanMatch: true,
  }),
  item('crackers', 'Crackers', 'Snacks / Frozen / Other', 'snack', 'pantry', '🍘', {
    weakKoreanMatch: true,
  }),
  item('oreos', 'Oreos', 'Snacks / Frozen / Other', 'snack', 'pantry', '🍪', {
    weakKoreanMatch: true,
  }),
  item('popcorn', 'Popcorn', 'Snacks / Frozen / Other', 'snack', 'pantry', '🍿', {
    koreanUses: ['sesame oil snack'],
    koreanTouchPotential: ['sesame aroma'],
  }),
  item('frozen-pizza', 'Frozen pizza', 'Snacks / Frozen / Other', 'frozen', 'freezer', '🍕', {
    koreanUses: ['Korean-style pizza', 'pizza fried rice'],
    koreanTouchPotential: ['gochujang drizzle'],
  }),
  item('chicken-nuggets', 'Chicken nuggets', 'Snacks / Frozen / Other', 'frozen', 'freezer', '🍗', {
    koreanUses: ['Korean-touched glaze'],
  }),
  item('french-fries', 'French fries', 'Snacks / Frozen / Other', 'frozen', 'freezer', '🍟', {
    koreanUses: ['spicy Korean-style fries'],
  }),
  item('frozen-dumplings', 'Frozen dumplings', 'Snacks / Frozen / Other', 'frozen', 'freezer', '🥟', {
    koreanUses: ['pan-fried with soy dip'],
  }),
];

export const leftoverIngredients: Ingredient[] = [
  item('leftover-pizza', 'Leftover pizza', 'Leftovers', 'leftover', 'leftovers', '🍕', {
    koreanUses: ['pizza fried rice', 'Korean-style pizza'],
  }),
  item('leftover-burger', 'Burger', 'Leftovers', 'leftover', 'leftovers', '🍔', {
    koreanUses: ['Korean burger rice bowl'],
  }),
  item('leftover-fried-chicken', 'Fried chicken', 'Leftovers', 'leftover', 'leftovers', '🍗', {
    koreanUses: ['Korean-style chicken rice bowl'],
  }),
  item('leftover-chicken-sandwich', 'Chicken sandwich', 'Leftovers', 'leftover', 'leftovers', '🥪', {
    koreanUses: ['chopped chicken rice bowl'],
  }),
  item('leftover-taco', 'Taco', 'Leftovers', 'leftover', 'leftovers', '🌮', {
    koreanUses: ['Korean-inspired leftover taco bowl'],
  }),
  item('leftover-burrito', 'Burrito', 'Leftovers', 'leftover', 'leftovers', '🌯', {
    koreanUses: ['spicy Korean-style rice bowl'],
  }),
  item('leftover-french-fries', 'Leftover fries', 'Leftovers', 'leftover', 'leftovers', '🍟', {
    koreanUses: ['Korean-style spicy fries'],
  }),
  item('leftover-pasta', 'Leftover pasta', 'Leftovers', 'leftover', 'leftovers', '🍝', {
    koreanUses: ['gochujang pasta'],
  }),
  item('leftover-chipotle-bowl', 'Chipotle-style bowl', 'Leftovers', 'leftover', 'leftovers', '🥗', {
    koreanUses: ['gochujang rice bowl remix'],
  }),
  item('leftover-chinese-takeout', 'Chinese takeout', 'Leftovers', 'leftover', 'leftovers', '🥡', {
    koreanUses: ['sesame-soy leftover rice bowl'],
    weakKoreanMatch: true,
  }),
  item('leftover-rotisserie-chicken', 'Leftover rotisserie', 'Leftovers', 'leftover', 'leftovers', '🐔', {
    koreanUses: ['chicken soup', 'rice bowl'],
  }),
];

export const allSelectableIngredients: Ingredient[] = [...ingredients, ...leftoverIngredients];

export const ingredientMap = new Map(allSelectableIngredients.map((i) => [i.id, i]));

export const INGREDIENT_ALIASES: Record<string, string[]> = {
  'french-fries': ['leftover-french-fries'],
  'leftover-french-fries': ['french-fries'],
  'frozen-pizza': ['leftover-pizza'],
  'leftover-pizza': ['frozen-pizza'],
  'leftover-pasta': ['pasta', 'instant-noodles'],
  'rotisserie-chicken': ['leftover-rotisserie-chicken'],
  'leftover-rotisserie-chicken': ['rotisserie-chicken'],
  'chicken-nuggets': ['leftover-fried-chicken'],
  'leftover-fried-chicken': ['chicken-nuggets'],
  'white-rice': ['brown-rice'],
  'brown-rice': ['white-rice'],
  bread: ['whole-wheat-bread'],
  'whole-wheat-bread': ['bread'],
  vinegar: ['apple-cider-vinegar'],
  'apple-cider-vinegar': ['vinegar'],
  honey: ['maple-syrup'],
  'maple-syrup': ['honey'],
  'english-muffin': ['bagel', 'bread', 'whole-wheat-bread'],
  bagel: ['english-muffin', 'bread'],
  'hamburger-buns': ['bread'],
  'instant-noodles': ['pasta', 'leftover-pasta'],
  pasta: ['leftover-pasta', 'instant-noodles'],
  ham: ['deli-ham'],
  'deli-ham': ['ham'],
  'chicken-breast': ['chicken-thigh', 'rotisserie-chicken'],
  'chicken-thigh': ['chicken-breast', 'rotisserie-chicken'],
};

export function hasIngredient(selected: Set<string>, id: string): boolean {
  if (selected.has(id)) return true;
  return (INGREDIENT_ALIASES[id] ?? []).some((alias) => selected.has(alias));
}
