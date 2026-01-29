import { Github, Linkedin } from "lucide-react";
import { TEAM_MEMBERS } from "@/constants";

export function Team() {
  // Group members into rows of 2
  const rows: (typeof TEAM_MEMBERS)[] = [];
  for (let i = 0; i < TEAM_MEMBERS.length; i += 2) {
    rows.push(TEAM_MEMBERS.slice(i, i + 2));
  }

  return (
    <section id="team" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
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
              {row.map((member, index) => (
                <div key={index} className="group h-full flex flex-col">
                  {/* Name & Role */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-violet transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-sm text-violet">{member.role}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 mb-5 leading-relaxed flex-grow">
                    {member.bio}
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

                  {/* Social Links - Icons only, black */}
                  {member.links && (
                    <div className="flex gap-3 mt-auto">
                      {member.links.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-violet transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-violet transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
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
