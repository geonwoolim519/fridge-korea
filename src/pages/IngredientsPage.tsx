import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { allSelectableIngredients } from '../data/ingredients';
import { useKitchenStore } from '../store/kitchenStore';
import type { StorageType } from '../types';

const tabs: { id: StorageType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fridge', label: 'Fridge' },
  { id: 'freezer', label: 'Freezer' },
  { id: 'pantry', label: 'Pantry' },
  { id: 'leftovers', label: 'Leftovers' },
];

export function IngredientsPage() {
  const selected = useKitchenStore((s) => s.selectedIngredients);
  const toggle = useKitchenStore((s) => s.toggleIngredient);
  const clear = useKitchenStore((s) => s.clearIngredients);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('fridge');

  const leftoverSelected = selected.some((id) => id.startsWith('leftover-'));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSelectableIngredients.filter((item) => {
      const inTab = q || tab === 'all' ? true : item.storageType === tab;
      const inQuery = !q || item.name.toLowerCase().includes(q) || item.subcategory.includes(q);
      return inTab && inQuery;
    });
  }, [query, tab]);

  return (
    <div className="safe-bottom safe-top min-h-dvh px-5 pt-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-navy">KITCHEN</p>
      <h1 className="mt-1 font-display text-[32px] text-charcoal">What’s in your kitchen?</h1>
      <p className="mt-1 text-sm text-muted">Search or browse. Select everything you actually have.</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search chicken, leftover pizza..."
        className="mt-4 h-12 w-full rounded-2xl border-0 bg-paper px-4 text-sm outline-none ring-0 placeholder:text-muted"
      />

      {selected.length > 0 && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-navy">{selected.length} selected</p>
          <button type="button" onClick={clear} className="text-xs text-muted">
            Clear
          </button>
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {selected.map((id) => {
            const item = allSelectableIngredients.find((i) => i.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className="shrink-0 rounded-full bg-navy px-3 py-1.5 text-xs text-ivory"
              >
                {item?.icon} {item?.name} ×
              </button>
            );
          })}
        </div>
      )}

      {leftoverSelected && (
        <div className="mt-4 rounded-[22px] bg-red px-4 py-4 text-white">
          <p className="font-display text-xl">Koreanize it</p>
          <p className="mt-1 text-sm text-white/80">Let’s turn leftover American food into a Korean-inspired plate.</p>
        </div>
      )}

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
              tab === item.id ? 'bg-charcoal text-ivory' : 'bg-paper text-muted'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {filtered.map((item) => {
          const on = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`rounded-[22px] px-3 py-4 text-left transition ${
                on ? 'bg-navy text-ivory' : 'bg-paper text-charcoal'
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="mt-2 text-sm font-semibold leading-tight">{item.name}</div>
              {item.weakKoreanMatch && <div className={`mt-1 text-[10px] ${on ? 'text-ivory/70' : 'text-muted'}`}>Weak Korean match</div>}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="mt-10 text-center text-sm text-muted">No ingredients match that search.</p>}

      <div className="h-24" />
      <div className="fixed bottom-[4.6rem] left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5">
        <Link
          to="/tools"
          className="flex h-14 items-center justify-center rounded-full bg-navy text-sm font-semibold text-ivory shadow-[0_12px_30px_rgba(49,69,92,0.28)]"
        >
          Next: kitchen tools
        </Link>
      </div>
    </div>
  );
}
