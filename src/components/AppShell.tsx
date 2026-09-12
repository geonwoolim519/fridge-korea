import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/ingredients', label: 'Kitchen', icon: FridgeIcon },
  { to: '/recipes', label: 'Recipes', icon: BookIcon },
  { to: '/saved', label: 'Saved', icon: HeartIcon },
];

export function AppShell({ hideNav }: { hideNav: boolean }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className={hideNav ? 'flex-1' : 'flex-1'}>
        <Outlet />
      </div>
      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-charcoal/8 bg-paper/95 px-2 pt-2 backdrop-blur-md" style={{ paddingBottom: 'calc(0.6rem + env(safe-area-inset-bottom))' }}>
          <div className="grid grid-cols-4">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 rounded-2xl py-1 text-[11px] font-medium tracking-wide ${
                    isActive ? 'text-navy' : 'text-muted'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <tab.icon active={isActive} />
                    {tab.label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function FridgeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M6 10h12" />
      <path d="M9 6.5v2" strokeLinecap="round" />
      <path d="M9 13v3" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z" />
      <path d="M5 21.5A2.5 2.5 0 0 1 7.5 19H20" />
    </svg>
  );
}

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10Z" strokeLinejoin="round" />
    </svg>
  );
}
