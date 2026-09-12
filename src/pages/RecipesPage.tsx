import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticityBadge } from '../components/AuthenticityBadge';
import { recipes } from '../data/recipes';
import { koreanTouchTotal } from '../lib/recommend';
import type { Authenticity } from '../types';

const filters: Array<'All' | Authenticity> = ['All', 'Authentic Korean', 'Korean-inspired', 'Korean-touched'];

export function RecipesPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const inFilter = filter === 'All' || recipe.authenticity === filter;
      const inQuery = !q || recipe.name.toLowerCase().includes(q) || recipe.description.toLowerCase().includes(q);
      return inFilter && inQuery;
    });
  }, [query, filter]);

  return (
    <div className="safe-bottom safe-top min-h-dvh px-5 pt-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-navy">RECIPES</p>
      <h1 className="mt-1 font-display text-[32px] text-charcoal">Explore</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search bibimbap, leftover pizza..."
        className="mt-4 h-12 w-full rounded-2xl bg-paper px-4 text-sm outline-none"
      />
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
              filter === item ? 'bg-charcoal text-ivory' : 'bg-paper text-muted'
            }`}
          >
            {item === 'All' ? 'All' : item.replace(' Korean', '')}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4">
        {list.map((recipe) => (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="overflow-hidden rounded-[28px] bg-paper">
            <img src={recipe.image} alt={recipe.name} className="h-40 w-full object-cover" />
            <div className="space-y-2 p-4">
              <AuthenticityBadge authenticity={recipe.authenticity} />
              <h2 className="font-display text-[22px] leading-tight">{recipe.name}</h2>
              <p className="text-xs text-muted">
                ⏱ {recipe.cookingTime} min · {recipe.difficulty} · {koreanTouchTotal(recipe)} Korean Touch
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
