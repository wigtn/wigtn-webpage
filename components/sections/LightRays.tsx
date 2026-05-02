"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

/**
 * LightRays — WebGL light-rays effect, ported from reactbits.dev/backgrounds/light-rays.
 *
 * A fragment shader emits two layered cones of light from a fixed origin,
 * with optional pulsation, mouse-following bias, noise, and distortion.
 * The host element should be `position: relative` (or absolute) and have
 * its own dimensions; the canvas is appended absolute and fills it.
 */

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

export interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  /** Hex string e.g. "#7C3AED". */
  raysColor?: string;
  raysSpeed?: number;
  /** Higher = tighter beam. */
  lightSpread?: number;
  /** Multiplier on viewport width for max ray reach. */
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  /** 0 = greyscale, 1 = full colour. */
  saturation?: number;
  followMouse?: boolean;
  /** 0–1, how strongly mouse warps the rays toward the cursor. */
  mouseInfluence?: number;
  /** 0–1, sprinkles film-grain into the rays. */
  noiseAmount?: number;
  /** Adds wobble to ray angle. */
  distortion?: number;
  className?: string;
}

const VERTEX = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm       = normalize(sourceToCoord);
  float cosAngle     = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(distance(coord, raySource) * 0.01 + iTime * speed) * 0.2;
  float spreadFactor   = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance       = length(sourceToCoord);
  float maxDistance    = iResolution.x * rayLength;
  float lengthFalloff  = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff    = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse          = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDir       = normalize(mouseScreenPos - rayPos);
    finalRayDir         = normalize(mix(rayDir, mouseDir, mouseInfluence));
  }

  float ray1 = rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  float ray2 = rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

  vec4 rays = vec4(0.0);
  rays.rgb  = (ray1 * 0.5 + ray2 * 0.4) * raysColor;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    rays.rgb *= 1.0 - noiseAmount + noiseAmount * n;
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  rays.rgb *= 0.45 + brightness * 0.55;
  rays.rgb  = clamp(rays.rgb, 0.0, 1.0);
  rays.a    = clamp(length(rays.rgb), 0.0, 1.0);
  rays.rgb  = mix(vec3(length(rays.rgb)), rays.rgb, saturation);

  gl_FragColor = rays;
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const full =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  return [r, g, b];
}

function originVectors(
  origin: RaysOrigin,
  w: number,
  h: number,
): { pos: [number, number]; dir: [number, number] } {
  switch (origin) {
    case "top-left":
      return { pos: [0, 0], dir: [0.5, 1] };
    case "top-right":
      return { pos: [w, 0], dir: [-0.5, 1] };
    case "left":
      return { pos: [0, h * 0.5], dir: [1, 0] };
    case "right":
      return { pos: [w, h * 0.5], dir: [-1, 0] };
    case "bottom-left":
      return { pos: [0, h], dir: [0, -1] };
    case "bottom-center":
      return { pos: [w * 0.5, h], dir: [0, -1] };
    case "bottom-right":
      return { pos: [w, h], dir: [0, -1] };
    case "top-center":
    default:
      return { pos: [w * 0.5, 0], dir: [0, 1] };
  }
}

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = false,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const colorRgb = hexToRgb(raysColor);
    const mouse = { x: 0.5, y: 0.5 };
    let raf = 0;

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: colorRgb },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1 : 0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      },
      transparent: true,
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      const cw = canvas.width;
      const ch = canvas.height;
      program.uniforms.iResolution.value = [cw, ch];
      const o = originVectors(raysOrigin, cw, ch);
      program.uniforms.rayPos.value = o.pos;
      program.uniforms.rayDir.value = [
        o.dir[0] / Math.hypot(o.dir[0], o.dir[1]),
        o.dir[1] / Math.hypot(o.dir[0], o.dir[1]),
      ];
    };
    onResize();

    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    if (followMouse) {
      window.addEventListener("mousemove", onMove);
    }

    const start = performance.now();
    const tick = (t: number) => {
      program.uniforms.iTime.value = (t - start) * 0.001;
      if (followMouse) {
        program.uniforms.mousePos.value = [mouse.x, mouse.y];
      }
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (followMouse) window.removeEventListener("mousemove", onMove);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}
