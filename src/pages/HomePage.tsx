import { Link } from 'react-router-dom';
import { InstallHint } from '../components/InstallHint';
import { useKitchenStore } from '../store/kitchenStore';

export function HomePage() {
  const selected = useKitchenStore((s) => s.selectedIngredients.length);

  return (
    <div className="safe-bottom safe-top min-h-dvh px-5 pb-8 pt-8">
      <div className="flex flex-col items-center pt-6 text-center">
        <img src="/icon-app.png" alt="Fridge Korea" className="h-[8.25rem] w-[8.25rem]" />
        <p className="mt-8 font-display text-[13px] tracking-[0.28em] text-navy">FRIDGE KOREA</p>
        <h1 className="mt-3 max-w-[16rem] font-display text-[34px] leading-[1.1] text-charcoal">Your fridge. Korean way.</h1>
        <p className="mt-3 text-sm text-muted">Use what you have. Discover Korea.</p>
      </div>

      <div className="mt-10 rounded-[28px] bg-paper px-6 py-7 text-center shadow-[0_12px_40px_rgba(43,41,37,0.06)]">
        <h2 className="font-display text-[28px] text-charcoal">What’s in your kitchen?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tell us what you have.
          <br />
          We’ll show you what Korea can taste like.
        </p>
        <Link
          to="/ingredients"
          className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-full bg-red text-base font-semibold text-white shadow-[0_10px_24px_rgba(210,75,60,0.28)]"
        >
          Start cooking
        </Link>
        <Link to="/recipes" className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold text-navy">
          Explore recipes
        </Link>
        {selected > 0 && (
          <p className="mt-1 text-xs text-muted">{selected} ingredients already selected</p>
        )}
      </div>

      <div className="mt-6 grid gap-3">
        {[
          ['Recipes', 'Korean-inspired recipes from a US kitchen'],
          ['Swaps', 'Smart ingredient substitutes, labeled honestly'],
          ['Culture', 'Why a dish feels Korean — not just soy sauce'],
        ].map(([kicker, label]) => (
          <div key={kicker} className="rounded-2xl bg-paper/80 px-4 py-3">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-navy">{kicker.toUpperCase()}</p>
            <p className="mt-1 text-sm font-medium text-ink">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <InstallHint />
      </div>
    </div>
  );
}
