"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

/**
 * Lightning — WebGL lightning effect, ported from reactbits.dev/backgrounds/lightning.
 *
 * Renders an animated, flickering vertical lightning channel using fbm
 * noise distortion against a hue-coloured base. Designed to be mounted
 * briefly during the hero entrance and unmounted once it fades out.
 */
export interface LightningProps {
  /** Base hue (0-360). Violet ~ 260-275. */
  hue?: number;
  /** Horizontal offset of the bolt centre, in NDC (-1..1). */
  xOffset?: number;
  /** Time multiplier — higher = faster flicker. */
  speed?: number;
  /** Brightness multiplier on the bolt's core. */
  intensity?: number;
  /** Spatial frequency of the noise distortion. Higher = thinner / wilder. */
  size?: number;
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

uniform vec2  iResolution;
uniform float iTime;
uniform float uHue;
uniform float uXOffset;
uniform float uSpeed;
uniform float uIntensity;
uniform float uSize;

#define OCTAVE_COUNT 10

vec3 hsv2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

mat2 rotate2d(float theta) {
  float c = cos(theta);
  float s = sin(theta);
  return mat2(c, -s, s, c);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 fp = fract(p);
  float a = hash12(ip);
  float b = hash12(ip + vec2(1.0, 0.0));
  float c = hash12(ip + vec2(0.0, 1.0));
  float d = hash12(ip + vec2(1.0, 1.0));
  vec2 t = smoothstep(0.0, 1.0, fp);
  return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < OCTAVE_COUNT; ++i) {
    value += amplitude * noise(p);
    p = rotate2d(0.45) * p * 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord / iResolution.xy;
  uv = 2.0 * uv - 1.0;
  uv.x *= iResolution.x / iResolution.y;
  uv.x += uXOffset;

  uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;

  float dist = abs(uv.x);
  vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
  vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
  col = pow(col, vec3(1.0));

  gl_FragColor = vec4(col, length(col));
}
`;

export default function Lightning({
  hue = 268,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  className,
}: LightningProps) {
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

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        iResolution: { value: [1, 1] },
        iTime: { value: 0 },
        uHue: { value: hue },
        uXOffset: { value: xOffset },
        uSpeed: { value: speed },
        uIntensity: { value: intensity },
        uSize: { value: size },
      },
      transparent: true,
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.iResolution.value = [canvas.width, canvas.height];
    };
    onResize();

    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      program.uniforms.iTime.value = (t - start) * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}
