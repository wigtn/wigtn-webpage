"use client";

import { TEAM_MEMBERS } from "@/constants";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function Team() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  // Group members into rows of 2
  const rows: (typeof TEAM_MEMBERS)[] = [];
  for (let i = 0; i < TEAM_MEMBERS.length; i += 2) {
    rows.push(TEAM_MEMBERS.slice(i, i + 2));
  }

  const getGlobalIndex = (rowIndex: number, memberIndex: number) => rowIndex * 2 + memberIndex;

  return (
    <section id="team" className="min-h-screen snap-start py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-section text-violet mb-12 md:mb-16 tracking-wide">
          Team
        </h2>

        <div className="space-y-0">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid md:grid-cols-2 gap-6 py-8 ${
                rowIndex !== rows.length - 1 ? "border-b border-slate-200" : ""
              }`}
            >
              {row.map((member, memberIndex) => (
                <div key={memberIndex} className="group h-full flex flex-col">
                  {/* Name & Role */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-violet transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-sm text-violet">{member.role}</span>
                  </div>

                  {/* Bio - translated */}
                  <p className="text-gray-600 mb-5 leading-relaxed flex-grow">
                    {processText(t.team.bios[getGlobalIndex(rowIndex, memberIndex)])}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  {member.links && (
                    <div className="flex gap-3 mt-auto">
                      {member.links.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-violet transition-colors"
                        >
                          <GitHubIcon className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-violet transition-colors"
                        >
                          <LinkedInIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
