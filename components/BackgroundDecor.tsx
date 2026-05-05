/**
 * BackgroundDecor — page-level violet ambient gradient.
 *
 * Replaces the previous per-section blobs that produced visible density
 * jumps at section boundaries. A single absolutely-positioned layer spans
 * the full scrollable height of <main>, so the violet flow is continuous
 * across the page. Blobs are placed in a gentle zigzag (left/right
 * alternation) at fixed % offsets relative to the page, which keeps the
 * rhythm we had before without exposing seams.
 *
 * - `inset-0` + `pointer-events-none` so it never blocks interaction.
 * - `aria-hidden` since this is purely decorative.
 * - All blobs share the same opacity (~0.08–0.10) and blur to keep
 *   density flat across the entire page.
 */
export function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Top-left — opens the page */}
      <div className="absolute top-[2%] -left-32 w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full bg-violet/[0.10] blur-3xl" />

      {/* Mid-upper right (~Hero/WhatWeDo seam) */}
      <div className="absolute top-[20%] -right-32 w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full bg-violet/[0.09] blur-3xl" />

      {/* Mid-page left (~WhatWeDo/Categories seam) */}
      <div className="absolute top-[42%] -left-24 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-violet/[0.08] blur-3xl" />

      {/* Mid-lower right (~Categories/Team seam) */}
      <div className="absolute top-[64%] -right-24 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-violet/[0.08] blur-3xl" />

      {/* Bottom-left — closes the page */}
      <div className="absolute bottom-[2%] -left-32 w-[420px] h-[420px] md:w-[500px] md:h-[500px] rounded-full bg-violet/[0.09] blur-3xl" />
    </div>
  );
}
