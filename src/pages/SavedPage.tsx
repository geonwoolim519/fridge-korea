import { Link } from 'react-router-dom';
import { AuthenticityBadge } from '../components/AuthenticityBadge';
import { recipeMap } from '../data/recipes';
import { koreanTouchTotal } from '../lib/recommend';
import { useKitchenStore } from '../store/kitchenStore';

export function SavedPage() {
  const savedIds = useKitchenStore((s) => s.savedIds);
  const recipes = savedIds.map((id) => recipeMap.get(id)).filter(Boolean);

  return (
    <div className="safe-bottom safe-top min-h-dvh px-5 pt-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-navy">SAVED</p>
      <h1 className="mt-1 font-display text-[32px] text-charcoal">Your recipes</h1>
      {recipes.length === 0 ? (
        <div className="mt-10 rounded-[28px] bg-paper px-6 py-10 text-center">
          <p className="font-display text-2xl">Nothing saved yet</p>
          <p className="mt-2 text-sm text-muted">Tap Save on a recipe you want to cook later.</p>
          <Link to="/recipes" className="mt-5 inline-flex font-semibold text-navy">
            Browse recipes
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          {recipes.map((recipe) =>
            recipe ? (
              <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="overflow-hidden rounded-[28px] bg-paper">
                <img src={recipe.image} alt={recipe.name} className="h-36 w-full object-cover" />
                <div className="space-y-2 p-4">
                  <AuthenticityBadge authenticity={recipe.authenticity} />
                  <h2 className="font-display text-xl">{recipe.name}</h2>
                  <p className="text-xs text-muted">
                    {recipe.cookingTime} min · {koreanTouchTotal(recipe)} Korean Touch
                  </p>
                </div>
              </Link>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
