"use client";

import Image from "next/image";
import { TEAM_MEMBERS } from "@/constants";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

function Avatar({ member }: { member: (typeof TEAM_MEMBERS)[number] }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  if (member.image) {
    return (
      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="80px"
          className="object-cover grayscale"
          style={{ objectPosition: member.imagePosition || "center top" }}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet/20 to-violet/5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
      <span className="text-xl font-semibold text-violet">{initials}</span>
    </div>
  );
}

export function Team() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  const rows: (typeof TEAM_MEMBERS)[] = [];
  for (let i = 0; i < TEAM_MEMBERS.length; i += 2) {
    rows.push(TEAM_MEMBERS.slice(i, i + 2));
  }

  const getGlobalIndex = (rowIndex: number, memberIndex: number) => rowIndex * 2 + memberIndex;

  return (
    <section id="team" className="snap-start py-16 md:py-24">
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
                  {/* Mobile: centered photo above name */}
                  {/* Desktop: photo left, info right */}
                  <div className="flex flex-col items-center md:flex-row md:items-start gap-4 mb-4">
                    <Avatar member={member} />
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold group-hover:text-violet transition-colors">
                        {(() => {
                          const match = member.name.match(/^([\u3131-\uD79D\s]+)\s+(.+)$/);
                          if (match) {
                            return (
                              <>
                                <span className="text-foreground">{match[1]}</span>{" "}
                                <span className="text-gray-400 text-[0.85em]">{match[2]}</span>
                              </>
                            );
                          }
                          return <span className="text-foreground">{member.name}</span>;
                        })()}
                      </h3>
                      <span className="text-sm text-violet">{member.role}</span>
                    </div>
                  </div>

                  {/* Bio */}
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
