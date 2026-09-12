import type { Authenticity } from '../types';

export function AuthenticityBadge({ authenticity }: { authenticity: Authenticity }) {
  const styles =
    authenticity === 'Authentic Korean'
      ? 'bg-navy text-ivory'
      : authenticity === 'Korean-inspired'
        ? 'bg-green/15 text-green'
        : 'bg-red/12 text-red';

  const label =
    authenticity === 'Authentic Korean'
      ? 'Authentic Korean'
      : authenticity === 'Korean-inspired'
        ? 'Korean-inspired'
        : 'Korean-touched';

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${styles}`}>
      {label}
    </span>
  );
}
