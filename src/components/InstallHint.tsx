import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallHint({ compact = false }: { compact?: boolean }) {
  const [hidden, setHidden] = useState(true);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem('fk-hide-install') === '1') {
      setHidden(true);
      return;
    }
    setIos(isIos());
    setHidden(false);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    localStorage.setItem('fk-hide-install', '1');
    setHidden(true);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    setDeferred(null);
    dismiss();
  };

  return (
    <div className={`rounded-[24px] border border-charcoal/8 bg-paper ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-start gap-3">
        <img src={`${import.meta.env.BASE_URL}icon-app.png`} alt="Fridge Korea" className="h-12 w-12" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-charcoal">Add Fridge Korea to your Home Screen</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {ios
              ? 'In Safari, tap Share, then Add to Home Screen. The fridge icon will sit on your Home Screen like a native app.'
              : deferred
                ? 'Install the app to cook from your fridge in one tap.'
                : 'Open the browser menu and choose Install app or Add to Home Screen. Look for the fridge icon.'}
          </p>
          <div className="mt-3 flex gap-2">
            {!ios && deferred && (
              <button type="button" onClick={install} className="rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-ivory">
                Install app
              </button>
            )}
            <button type="button" onClick={dismiss} className="rounded-full px-3 py-1.5 text-xs font-medium text-muted">
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
