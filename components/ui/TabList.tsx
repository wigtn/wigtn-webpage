"use client";

/**
 * TabList — pill-style segmented control used in two places:
 *   • the homepage `<Categories />` section (Research / Awards / Open Source / Products)
 *   • the `/projects` index filter
 *
 * Visual contract: violet active fill / monochrome border idle, hover-to-violet,
 * native `role="tablist"` / `role="tab"` / `aria-selected` semantics. On mobile,
 * the parent should wrap with `overflow-x-auto` if the tab count exceeds what fits.
 */

interface Tab<K extends string = string> {
  key: K;
  label: string;
  /** Optional small count rendered after the label (e.g. "Awards · 3"). */
  count?: number;
}

interface TabListProps<K extends string = string> {
  tabs: Tab<K>[];
  activeKey: K;
  onChange: (key: K) => void;
  ariaLabel: string;
  /** Prefix used to build per-tab DOM ids — `${idPrefix}-${tabKey}`.
   *  The matching panel should set `id={`${idPrefix}-panel`}`. */
  idPrefix?: string;
  className?: string;
}

export function TabList<K extends string = string>({
  tabs,
  activeKey,
  onChange,
  ariaLabel,
  idPrefix = "tab",
  className,
}: TabListProps<K>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex flex-wrap gap-2 ${className ?? ""}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            id={`${idPrefix}-${tab.key}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel`}
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              isActive
                ? "border-violet bg-violet text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-violet hover:text-violet"
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={`text-[11px] tabular-nums ${
                  isActive ? "text-white/80" : "text-gray-400"
                }`}
              >
                · {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
