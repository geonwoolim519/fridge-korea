import { Link } from 'react-router-dom';
import type { ScoredRecipe } from '../types';
import { AuthenticityBadge } from './AuthenticityBadge';
import { koreanTouchTotal } from '../lib/recommend';

export function RecipeCard({ scored }: { scored: ScoredRecipe }) {
  const { recipe, have, substituteCovered, missing } = scored;
  const required = recipe.ingredients.filter((i) => i.required).length;
  const haveCount = have.length + substituteCovered.length;

  return (
    <Link to={`/recipes/${recipe.id}`} className="block overflow-hidden rounded-[28px] bg-paper shadow-[0_10px_30px_rgba(43,41,37,0.06)]">
      <div className="relative h-44 overflow-hidden">
        <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
        <div className="absolute bottom-3 left-3">
          <AuthenticityBadge authenticity={recipe.authenticity} />
        </div>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-display text-[22px] leading-tight text-charcoal">{recipe.name}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="font-semibold text-navy">
            {haveCount}/{required} ingredients
          </span>
          {missing.length > 0 && <span>Need {missing.length}</span>}
          <span>⏱ {recipe.cookingTime} min</span>
          <span>{recipe.difficulty}</span>
          <span>{koreanTouchTotal(recipe)} Korean Touch</span>
        </div>
      </div>
    </Link>
  );
}
