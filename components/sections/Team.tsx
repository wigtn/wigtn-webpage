"use client";

import { TEAM_MEMBERS } from "@/constants";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
    <section id="team" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-12 block tracking-wide">
          TEAM
        </span>

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
