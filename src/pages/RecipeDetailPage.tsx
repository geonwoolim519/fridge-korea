import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthenticityBadge } from '../components/AuthenticityBadge';
import { recipeMap } from '../data/recipes';
import { analyzeRecipe, ingredientName, koreanTouchTotal, toolName } from '../lib/recommend';
import { useKitchenStore } from '../store/kitchenStore';

export function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = id ? recipeMap.get(id) : undefined;
  const selected = useKitchenStore((s) => s.selectedIngredients);
  const tools = useKitchenStore((s) => s.selectedTools);
  const saved = useKitchenStore((s) => s.savedIds);
  const toggleSaved = useKitchenStore((s) => s.toggleSaved);

  if (!recipe) {
    return (
      <div className="px-5 pt-16">
        <p>Recipe not found.</p>
        <Link to="/recipes" className="text-navy">
          Back
        </Link>
      </div>
    );
  }

  const scored = analyzeRecipe(recipe, new Set(selected), new Set(tools));
  const have = recipe.ingredients.filter((i) => scored.have.includes(i.id));
  const coveredBySub = recipe.ingredients.filter((i) => scored.substituteCovered.includes(i.id));
  const need = recipe.ingredients.filter((i) => scored.missing.includes(i.id));
  const total = koreanTouchTotal(recipe);
  const isSaved = saved.includes(recipe.id);

  return (
    <div className="safe-bottom min-h-dvh">
      <div className="relative h-64">
        <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
        <button type="button" onClick={() => navigate(-1)} className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-sm">
          Back
        </button>
        <button
          type="button"
          onClick={() => toggleSaved(recipe.id)}
          className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-sm"
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="px-5 pt-5">
        <AuthenticityBadge authenticity={recipe.authenticity} />
        <h1 className="mt-3 font-display text-[32px] leading-[1.1] text-charcoal">{recipe.name}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">{recipe.description}</p>
        <p className="mt-3 text-xs text-muted">
          ⏱ {recipe.cookingTime} min · {recipe.difficulty} · {total} Korean Touch
        </p>

        <section className="mt-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-navy">YOU HAVE</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {have.length === 0 && <li className="text-muted">Nothing selected yet — pick ingredients to see a match.</li>}
            {have.map((item) => (
              <li key={item.id}>✅ {ingredientName(item.id)} · {item.amount}</li>
            ))}
          </ul>
        </section>

        {(need.length > 0 || coveredBySub.length > 0) && (
          <section className="mt-5">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-navy">YOU NEED</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {need.map((item) => (
                <li key={item.id}>Need {ingredientName(item.id)} · {item.amount}</li>
              ))}
              {coveredBySub.map((item) => (
                <li key={item.id}>Need {ingredientName(item.id)} — substitute available</li>
              ))}
            </ul>
          </section>
        )}

        {recipe.substitutes.length > 0 && (
          <section className="mt-5 space-y-3">
            {recipe.substitutes.map((sub) => (
              <div key={sub.ingredientId} className="rounded-[22px] bg-paper px-4 py-3">
                <p className="text-sm font-semibold">{ingredientName(sub.ingredientId)} → {sub.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{sub.note}</p>
                <p className="mt-1 text-xs text-navy">Try: {sub.using.map(ingredientName).join(', ')}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mt-8">
          <h2 className="font-display text-2xl">Korean Touch</h2>
          <p className="mt-1 text-xs text-muted">A playful app score, not an academic rating.</p>
          <p className="mt-2 font-display text-4xl">{total} / 100</p>
          <div className="mt-4 space-y-3">
            {(
              [
                ['Seasoning', recipe.koreanTouch.seasoning],
                ['Cooking', recipe.koreanTouch.cookingMethod],
                ['Ingredients', recipe.koreanTouch.ingredients],
                ['Serving', recipe.koreanTouch.servingStyle],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ivory-deep">
                  <div className="h-full rounded-full bg-navy" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl">Korean Touch notes</h2>
          <div className="mt-3 space-y-3">
            {recipe.koreanTouches.map((item) => (
              <div key={item.title} className="rounded-[22px] bg-paper px-4 py-3">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl">Why Korean?</h2>
          {(
            [
              ['Ingredient', recipe.whyKorean.ingredients],
              ['Seasoning', recipe.whyKorean.seasoning],
              ['Cooking method', recipe.whyKorean.cookingMethod],
              ['Serving style', recipe.whyKorean.servingStyle],
              ['Food culture', recipe.whyKorean.culture],
            ] as const
          ).map(([label, body]) => (
            <div key={label} className="mt-4">
              <h3 className="text-xs font-semibold tracking-[0.16em] text-navy">{label.toUpperCase()}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink">{body}</p>
            </div>
          ))}
        </section>

        {recipe.kitchenTools.length > 0 && (
          <p className="mt-6 text-xs text-muted">Tools: {recipe.kitchenTools.map(toolName).join(', ')}</p>
        )}

        <Link
          to={`/cook/${recipe.id}`}
          className="mt-8 mb-10 flex h-14 items-center justify-center rounded-full bg-red text-sm font-semibold text-white"
        >
          Cook now
        </Link>
      </div>
    </div>
  );
}
