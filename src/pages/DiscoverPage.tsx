import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { allSelectableIngredients } from '../data/ingredients';
import { koreanizeRecipes, recommendRecipes } from '../lib/recommend';
import { useKitchenStore } from '../store/kitchenStore';

export function DiscoverPage() {
  const selected = useKitchenStore((s) => s.selectedIngredients);
  const tools = useKitchenStore((s) => s.selectedTools);
  const koreanize = koreanizeRecipes(selected, tools);
  const koreanizeIds = new Set(koreanize.map((item) => item.recipe.id));
  const results = recommendRecipes(selected, tools, 8)
    .filter((item) => !koreanizeIds.has(item.recipe.id))
    .slice(0, 5);
  const weak = allSelectableIngredients.filter((i) => selected.includes(i.id) && i.weakKoreanMatch);

  return (
    <div className="safe-bottom safe-top min-h-dvh px-5 pt-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-navy">TONIGHT</p>
      <h1 className="mt-1 font-display text-[32px] leading-tight text-charcoal">From your kitchen</h1>
      <p className="mt-2 text-sm text-muted">
        {selected.length === 0
          ? 'You haven’t selected ingredients yet. We’ll still show strong starter recipes — add what you have for better matches.'
          : `Matched against ${selected.length} ingredients and ${tools.length} tools.`}
      </p>

      {weak.length > 0 && (
        <div className="mt-4 rounded-[22px] bg-ivory-deep px-4 py-3 text-sm text-ink">
          {weak.map((item) => item.name).join(', ')} {weak.length === 1 ? 'isn’t' : 'aren’t'} a strong match for Korean cooking. We’ll use your other ingredients first.
        </div>
      )}

      {koreanize.length > 0 && (
        <section className="mt-6">
          <h2 className="font-display text-2xl">Let’s Koreanize it</h2>
          <p className="mt-1 text-sm text-muted">Leftovers and American foods, recast — without pretending they’re traditional Korean dishes.</p>
          <div className="mt-4 grid gap-4">
            {koreanize.map((scored) => (
              <RecipeCard key={scored.recipe.id} scored={scored} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-display text-2xl">Best matches</h2>
        <div className="mt-4 grid gap-4">
          {results.map((scored) => (
            <RecipeCard key={scored.recipe.id} scored={scored} />
          ))}
        </div>
      </section>

      <Link to="/ingredients" className="mt-8 mb-4 inline-flex text-sm font-semibold text-navy">
        Adjust ingredients
      </Link>
    </div>
  );
}
