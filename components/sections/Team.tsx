"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TEAM_MEMBERS } from "@/constants";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

/**
 * Team — single-column vertical roster. Every member uses the same
 * compact row shape (small thumbnail + name/role + bio + chips + links)
 * so no one card visually outweighs another. The previous tilt /
 * spotlight effects + featured-card-spans-two-columns layout have been
 * dropped intentionally — the user wants a uniform, project-list-style
 * read.
 */

interface TeamCardProps {
  member: (typeof TEAM_MEMBERS)[number];
  bio: string;
}

function Avatar({ member }: { member: (typeof TEAM_MEMBERS)[number] }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  if (member.image) {
    return (
      <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-black/[0.05] flex-shrink-0">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="80px"
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          style={{ objectPosition: member.imagePosition || "center top" }}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-violet/20 to-violet/5 flex items-center justify-center ring-1 ring-black/[0.05] flex-shrink-0">
      <span className="text-base font-bold text-violet">{initials}</span>
    </div>
  );
}

function TeamCard({ member, bio }: TeamCardProps) {
  const { processText } = useBudouX();
  const nameMatch = member.name.match(/^([ㄱ-힝\s]+)\s+(.+)$/);

  return (
    <article className="group flex items-start gap-4 sm:gap-5 py-5 sm:py-6">
      <Avatar member={member} />

      <div className="flex-1 min-w-0">
        {/* Name + role */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight">
            {nameMatch ? (
              <>
                <span className="text-foreground">{nameMatch[1]}</span>
                <span className="ml-2 text-gray-400 text-[0.85em] font-medium">
                  {nameMatch[2]}
                </span>
              </>
            ) : (
              <span className="text-foreground">{member.name}</span>
            )}
          </h3>
          <span className="text-[11px] font-semibold tracking-[0.12em] text-violet uppercase">
            {member.role}
          </span>
        </div>

        {/* Current role — present-tense day job at the parent company.
            Different dimension from the violet WIGTN-internal `role`
            label above, so styled distinctly: dark foreground for clear
            legibility, normal case, normal weight. Case + weight shift
            (lowercase + non-bold) keeps it visually separate from the
            uppercase violet WIGTN role above. */}
        {member.currentRole && (
          <p className="mt-1 text-[12.5px] text-foreground leading-snug">
            {processText(member.currentRole)}
          </p>
        )}

        {/* Credential — historical background ("Ex-…"), small gray.
            Currently only set on the founder. */}
        {member.credential && (
          <p className="mt-1 text-[11.5px] text-gray-400 leading-snug">
            {processText(member.credential)}
          </p>
        )}

        {/* Bio */}
        <p className="mt-1.5 text-[13px] text-gray-600 leading-relaxed">
          {processText(bio)}
        </p>

        {/* Social links — expertise chips removed entirely. */}
        {member.links && (member.links.github || member.links.linkedin) && (
          <div className="mt-3 flex gap-1">
            {member.links.github && (
              <a
                href={member.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on GitHub`}
                className="w-7 h-7 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-violet hover:bg-violet/5 transition-colors"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {member.links.linkedin && (
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="w-7 h-7 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-violet hover:bg-violet/5 transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function Team() {
  const { t } = useLanguage();

  return (
    <section
      id="team"
      className="relative min-h-screen flex flex-col justify-center py-20 md:py-28"
    >
      {/* Background blobs moved to page-level <BackgroundDecor />. */}

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        {/* Header — eyebrow + one short header line, left-aligned with the
            same gutter as What we do and Categories. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-3">
            <span className="w-6 h-px bg-violet/40" />
            <span>Who we are</span>
          </div>
          <h2 className="text-balance text-lg md:text-xl font-semibold text-foreground tracking-tight leading-snug">
            Five engineers shipping production AI, end to end.
          </h2>
        </motion.div>

        {/* 1-column vertical roster — every member same size. Hairline
            dividers between rows keep the read tight. */}
        <div className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              bio={t.team.bios[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
