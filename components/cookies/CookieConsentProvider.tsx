"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  activeOptionalCookieCategories,
  createStoredCookieConsent,
  defaultCookieConsentPreferences,
  hasCurrentCookieConsentVersion,
  readStoredCookieConsent,
  stopNonEssentialTracking,
  writeStoredCookieConsent,
  type CookieConsentCategory,
  type CookieConsentPreferences,
  type StoredCookieConsent,
} from "@/src/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: StoredCookieConsent | null;
  isReady: boolean;
  canUseAnalytics: boolean;
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function buildAcceptAllPreferences(): CookieConsentPreferences {
  return {
    ...defaultCookieConsentPreferences,
    ...Object.fromEntries(
      activeOptionalCookieCategories.map((category) => [category, true]),
    ),
  } as CookieConsentPreferences;
}

function OptionalCategoryToggle({
  id,
  title,
  description,
  enabled,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>

        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
          className={`relative mt-1 inline-flex h-7 w-12 shrink-0 rounded-full border transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
            enabled
              ? "border-blue-300/40 bg-blue-500/80"
              : "border-white/10 bg-slate-900/90"
          }`}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition duration-300 ${
              enabled ? "left-[1.45rem]" : "left-0.5"
            }`}
          />
          <span className="sr-only">{title}</span>
        </button>
      </div>
    </div>
  );
}

function CookiePreferencesModal({
  open,
  preferences,
  onPreferencesChange,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
}: {
  open: boolean;
  preferences: CookieConsentPreferences;
  onPreferencesChange: (category: CookieConsentCategory, enabled: boolean) => void;
  onClose: () => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      restoreFocusRef.current?.focus();
      return;
    }

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(2,6,23,0.8)] p-4 backdrop-blur-md"
          onMouseDown={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            aria-describedby="cookie-preferences-description"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.98),rgba(6,10,20,0.96))] p-6 shadow-[0_30px_80px_rgba(2,6,23,0.6)] sm:p-7"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white transition duration-300 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Close cookie preferences"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            <div className="pr-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
                Privacy controls
              </p>
              <h2 id="cookie-preferences-title" className="mt-3 text-2xl font-semibold text-white">
                Cookie preferences
              </h2>
              <p
                id="cookie-preferences-description"
                className="mt-4 text-sm leading-7 text-slate-300"
              >
                Necessary cookies keep the site secure and functional. Optional cookies stay off
                until you choose otherwise.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-blue-300/14 bg-blue-400/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">Necessary</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Required for core site functionality, security, and storing your privacy
                      choices.
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    Always active
                  </span>
                </div>
              </div>

              <OptionalCategoryToggle
                id="cookie-analytics"
                title="Analytics"
                description="Helps us understand anonymous site usage with Vercel Analytics. Disabled unless you opt in."
                enabled={preferences.analytics}
                onChange={(enabled) => onPreferencesChange("analytics", enabled)}
              />

              <OptionalCategoryToggle
                id="cookie-marketing"
                title="Marketing"
                description="Reserved for advertising, remarketing, and campaign tracking tools. No marketing trackers are active in the current codebase."
                enabled={preferences.marketing}
                onChange={(enabled) => onPreferencesChange("marketing", enabled)}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" onClick={onSave}>
                  Save preferences
                </Button>
                <Button type="button" variant="outline" onClick={onAcceptAll}>
                  Accept all
                </Button>
              </div>

              <Button type="button" variant="ghost" onClick={onRejectAll} className="justify-start sm:justify-center">
                Reject non-essential
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CookieConsentBanner({
  open,
  onAcceptAll,
  onRejectAll,
  onManagePreferences,
  onDismiss,
}: {
  open: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onManagePreferences: () => void;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-[110] mx-auto w-auto max-w-4xl rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.98),rgba(6,10,20,0.96))] p-5 shadow-[0_28px_90px_rgba(2,6,23,0.48)] backdrop-blur-2xl sm:inset-x-6 sm:p-6"
          aria-label="Cookie consent banner"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full border border-blue-300/18 bg-blue-300/[0.065] px-3 py-1.5 text-xs font-semibold text-blue-100 shadow-[0_0_18px_rgba(59,130,246,0.08)] backdrop-blur-xl">
                Privacy-first defaults
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
                Choose how optional cookies work on this site
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Necessary cookies are always on. Analytics and marketing stay disabled until you
                explicitly enable them. Read the{" "}
                <Link href="/cookie-policy" className="text-blue-200 underline underline-offset-4">
                  Cookie Policy
                </Link>{" "}
                or{" "}
                <Link href="/privacy-policy" className="text-blue-200 underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <button
              type="button"
              onClick={onDismiss}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white transition duration-300 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Dismiss cookie banner"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button type="button" onClick={onAcceptAll}>
              Accept all
            </Button>
            <Button type="button" variant="outline" onClick={onRejectAll}>
              Reject non-essential
            </Button>
            <Button type="button" variant="ghost" onClick={onManagePreferences} className="justify-start sm:justify-center">
              Manage preferences
            </Button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function CookiePreferencesShortcut({
  hidden,
  onOpen,
}: {
  hidden: boolean;
  onOpen: () => void;
}) {
  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          onClick={onOpen}
          className="fixed bottom-4 left-4 z-[100] inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#040917]/88 px-4 py-3 text-sm font-medium text-slate-100 shadow-[0_16px_48px_rgba(2,6,23,0.38)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/28 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:bottom-6 sm:left-6"
          aria-label="Open cookie preferences"
        >
          <ShieldCheck className="size-4 text-blue-300" aria-hidden="true" />
          Cookie preferences
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredCookieConsent | null>(null);
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(
    defaultCookieConsentPreferences,
  );
  const [isReady, setIsReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredCookieConsent();

    if (!storedConsent || !hasCurrentCookieConsentVersion(storedConsent)) {
      stopNonEssentialTracking();
      setConsent(null);
      setPreferences(defaultCookieConsentPreferences);
      setBannerOpen(true);
      setIsReady(true);
      return;
    }

    setConsent(storedConsent);
    setPreferences(storedConsent.categories);
    setBannerOpen(false);
    setIsReady(true);
  }, []);

  const persistConsent = (nextPreferences: Partial<CookieConsentPreferences>) => {
    const nextConsent = createStoredCookieConsent(nextPreferences);
    writeStoredCookieConsent(nextConsent);
    setConsent(nextConsent);
    setPreferences(nextConsent.categories);
    setBannerOpen(false);
    setPreferencesOpen(false);

    if (!nextConsent.categories.analytics || !nextConsent.categories.marketing) {
      stopNonEssentialTracking();
    }
  };

  const openPreferences = () => {
    setPreferences((current) => ({
      ...defaultCookieConsentPreferences,
      ...current,
    }));
    setPreferencesOpen(true);
  };

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isReady,
      canUseAnalytics: consent?.categories.analytics === true,
      openPreferences,
    }),
    [consent, isReady],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <CookieConsentBanner
        open={isReady && bannerOpen}
        onAcceptAll={() => persistConsent(buildAcceptAllPreferences())}
        onRejectAll={() => persistConsent(defaultCookieConsentPreferences)}
        onManagePreferences={openPreferences}
        onDismiss={() => setBannerOpen(false)}
      />
      <CookiePreferencesModal
        open={preferencesOpen}
        preferences={preferences}
        onPreferencesChange={(category, enabled) =>
          setPreferences((current) => ({
            ...current,
            [category]: enabled,
          }))
        }
        onClose={() => setPreferencesOpen(false)}
        onSave={() => persistConsent(preferences)}
        onAcceptAll={() => persistConsent(buildAcceptAllPreferences())}
        onRejectAll={() => persistConsent(defaultCookieConsentPreferences)}
      />
      <CookiePreferencesShortcut hidden={!isReady || bannerOpen} onOpen={openPreferences} />
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  }

  return context;
}
