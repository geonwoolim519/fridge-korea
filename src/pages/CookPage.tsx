import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { recipeMap } from '../data/recipes';

export function CookPage() {
  const { id } = useParams();
  const recipe = id ? recipeMap.get(id) : undefined;
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  if (!recipe) {
    return <div className="p-6">Recipe not found.</div>;
  }

  const current = recipe.steps[step];
  const last = step === recipe.steps.length - 1;

  return (
    <div className="flex min-h-dvh flex-col bg-ivory px-5 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <Link to={`/recipes/${recipe.id}`} className="text-sm text-muted">
          Close
        </Link>
        <p className="text-xs font-semibold tracking-[0.18em] text-navy">
          {step + 1} / {recipe.steps.length}
        </p>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ivory-deep">
        <div className="h-full bg-navy" style={{ width: `${((step + 1) / recipe.steps.length) * 100}%` }} />
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-red">STEP {step + 1}</p>
        <h1 className="mt-3 font-display text-[36px] leading-[1.1] text-charcoal">{current.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink">{current.instruction}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="h-14 rounded-full bg-paper text-sm font-semibold text-charcoal disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            if (last) navigate(`/recipes/${recipe.id}`);
            else setStep((s) => s + 1);
          }}
          className="h-14 rounded-full bg-navy text-sm font-semibold text-ivory"
        >
          {last ? 'Done' : 'Next'}
        </button>
      </div>
    </div>
  );
}
