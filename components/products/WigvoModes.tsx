"use client";

import type { CommunicationMode } from "@/constants/projects";
import { useBudouX } from "@/lib/hooks/useBudouX";

interface WigvoModesProps {
  label: string;
  modes: CommunicationMode[];
  modeTranslations: Record<string, string>;
}

export function WigvoModes({ label, modes, modeTranslations }: WigvoModesProps) {
  const { processText } = useBudouX();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-8 block tracking-wide">
          {label}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className="rounded-2xl border border-gray-200 p-6 hover:border-violet/30 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-violet" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {modeTranslations[mode.titleKey] || mode.id}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {processText(modeTranslations[mode.descriptionKey] || "")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
