import { Link } from 'react-router-dom';
import { kitchenTools } from '../data/kitchenTools';
import { useKitchenStore } from '../store/kitchenStore';

export function ToolsPage() {
  const selected = useKitchenStore((s) => s.selectedTools);
  const toggle = useKitchenStore((s) => s.toggleTool);
  const reset = useKitchenStore((s) => s.resetTools);
  const ingredients = useKitchenStore((s) => s.selectedIngredients.length);

  return (
    <div className="safe-bottom safe-top min-h-dvh px-5 pt-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-navy">TOOLS</p>
      <h1 className="mt-1 font-display text-[32px] leading-tight text-charcoal">What can you cook with?</h1>
      <p className="mt-2 text-sm text-muted">
        We assume a typical American kitchen — no rice cooker. Deselect anything you don’t have.
      </p>
      <button type="button" onClick={reset} className="mt-3 text-xs font-semibold text-navy">
        Reset to typical kitchen
      </button>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {kitchenTools.map((tool) => {
          const on = selected.includes(tool.id);
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => toggle(tool.id)}
              className={`rounded-[22px] px-4 py-4 text-left text-sm font-semibold ${
                on ? 'bg-navy text-ivory' : 'bg-paper text-charcoal'
              }`}
            >
              {tool.name}
            </button>
          );
        })}
      </div>

      <div className="h-28" />
      <div className="fixed bottom-[4.6rem] left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-5">
        <Link
          to="/discover"
          className="flex h-14 items-center justify-center rounded-full bg-red text-sm font-semibold text-white shadow-[0_12px_30px_rgba(210,75,60,0.28)]"
        >
          Find recipes{ingredients ? ` · ${ingredients} ingredients` : ''}
        </Link>
      </div>
    </div>
  );
}
