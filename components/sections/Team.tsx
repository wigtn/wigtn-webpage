"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { TEAM_MEMBERS } from "@/constants";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

/**
 * Team — full-content 2-column roster.
 *
 * Each card uses two reactbits-inspired card behaviours, dialed down so
 * neither dominates:
 *   • TiltedCard — subtle 3-axis tilt that follows the cursor (max ±4°,
 *     spring-smoothed). Gives a sense of weight without making the page
 *     feel like a parallax demo.
 *   • SpotlightCard — a soft violet radial gradient that tracks the
 *     cursor inside the card surface. Reveals on hover, vanishes on
 *     leave.
 *
 * The section no longer compresses to one viewport — cards grow with
 * content, so a member's whole bio + every expertise chip is visible
 * without truncation. The page scroll handles vertical overflow.
 */

interface AvatarProps {
  member: (typeof TEAM_MEMBERS)[number];
}

function Avatar({ member }: AvatarProps) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  if (member.image) {
    return (
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/[0.05]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-[1.05]"
          style={{ objectPosition: member.imagePosition || "center top" }}
          unoptimized
        />
        {/* Soft gradient mask at bottom for depth */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/5] rounded-2xl bg-gradient-to-br from-violet/20 to-violet/5 flex items-center justify-center ring-1 ring-black/[0.05]">
      <span className="text-3xl font-bold text-violet">{initials}</span>
    </div>
  );
}

interface TeamCardProps {
  member: (typeof TEAM_MEMBERS)[number];
  bio: string;
  processText: (text: string) => ReactNode;
  index: number;
}

function TeamCard({ member, bio, processText, index }: TeamCardProps) {
  /* Tilt — normalised cursor offset (-0.5 ↔ 0.5) per axis, spring-smoothed
     and remapped to a small rotation. Capped at ±4° so it reads as gentle
     weight, not a 3D parallax demo. */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 200, damping: 24 });
  const sy = useSpring(rawY, { stiffness: 200, damping: 24 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  /* Spotlight — raw cursor position relative to the card top-left, fed
     into a radial-gradient template. Off-screen by default so the
     gradient is invisible until the cursor enters. */
  const spotX = useMotionValue(-300);
  const spotY = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(440px circle at ${spotX}px ${spotY}px, rgba(124,58,237,0.10), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px);
    rawY.set(py);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    spotX.set(-300);
    spotY.set(-300);
  };

  const nameMatch = member.name.match(/^([ㄱ-힝\s]+)\s+(.+)$/);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl border border-black/[0.07] bg-white/85 backdrop-blur-sm hover:border-violet/40 hover:shadow-[0_24px_48px_-24px_rgba(76,29,149,0.32)] transition-[border,box-shadow] duration-300"
    >
      {/* Spotlight overlay */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Subtle violet glow that fades in on hover, anchored to top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full bg-violet/[0.0] group-hover:bg-violet/[0.08] blur-3xl transition-colors duration-500"
      />

      {/* Layout — magazine-style float on mobile (avatar wraps with text);
          fixed 2-col grid on sm+ */}
      <div className="relative p-4 sm:p-0 sm:grid sm:grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[200px_minmax(0,1fr)] sm:gap-5 md:gap-6 sm:p-5 md:p-6">
        {/* Avatar — floated on mobile so text flows alongside and underneath */}
        <div className="float-left mr-4 mb-2 w-[110px] sm:float-none sm:m-0 sm:w-auto">
          <Avatar member={member} />
        </div>

        {/* Body */}
        <div className="flex flex-col min-w-0">
          {/* Name + role */}
          <div className="mb-2.5 sm:mb-3 mt-0.5 sm:mt-1">
            <h3 className="text-base sm:text-xl md:text-[22px] font-bold tracking-tight leading-tight">
              {nameMatch ? (
                <>
                  <span className="text-foreground">{nameMatch[1]}</span>
                  <span className="ml-2 text-gray-400 text-[0.78em] font-semibold">
                    {nameMatch[2]}
                  </span>
                </>
              ) : (
                <span className="text-foreground">{member.name}</span>
              )}
            </h3>
            <div className="mt-1.5 inline-flex items-center gap-2">
              <span className="w-3 h-px bg-violet/60 transition-all duration-300 group-hover:w-6" />
              <span className="text-[10.5px] sm:text-[11.5px] font-semibold tracking-wide text-violet uppercase leading-none">
                {member.role}
              </span>
            </div>
          </div>

          {/* Credential — verifiable one-line background, sits above the
              bio so a scanning reader gets the signal first. Only renders
              when explicitly set on the member. */}
          {member.credential && (
            <p className="text-[11.5px] sm:text-[12.5px] text-gray-700 font-medium leading-[1.55] mb-2 sm:mb-2.5">
              {processText(member.credential)}
            </p>
          )}

          {/* Bio — full text, no clamp */}
          <p className="text-[12px] sm:text-[13.5px] text-gray-600 leading-[1.65] sm:leading-[1.7]">
            {processText(bio)}
          </p>

          {/* Expertise — all chips, no truncation */}
          <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
            {member.expertise.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-gray-600 bg-gray-50 border border-black/[0.06] rounded-md group-hover:bg-violet/5 group-hover:text-violet group-hover:border-violet/20 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Social */}
          {member.links && (member.links.github || member.links.linkedin) && (
            <div className="clear-both flex gap-2 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-black/[0.06]">
              {member.links.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on GitHub`}
                  className="w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-violet hover:bg-violet/5 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
              {member.links.linkedin && (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-violet hover:bg-violet/5 transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Team() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section
      id="team"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Quiet violet washes */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-violet/[0.05] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-200/[0.18] blur-3xl pointer-events-none"
      />
      {/* Faint dot pattern, masked to the centre */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5] pointer-events-none [background-image:radial-gradient(rgba(124,58,237,0.10)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        {/* Header — eyebrow + one short header line, left-aligned with the
            same gutter as What we do and Categories. */}
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-3">
            <span className="w-6 h-px bg-violet/40" />
            <span>Team</span>
          </div>
          <h2 className="text-balance text-lg md:text-xl font-semibold text-foreground tracking-tight leading-snug">
            Five engineers shipping production AI, end to end.
          </h2>
        </div>

        {/* Card grid — 1 col mobile, 2 cols md+. Members flagged
            `featured` (the founder/lead) span both columns to anchor the
            decision-maker visually before the rest of the crew. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.name}
              className={member.featured ? "md:col-span-2" : undefined}
            >
              <TeamCard
                member={member}
                bio={t.team.bios[index]}
                processText={processText}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
