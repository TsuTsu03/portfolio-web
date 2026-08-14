import * as THREE from "three";
import type { Persona } from "../context/theme-context";

/**
 * Build a colour without sRGB conversion. The scene renders through raw shader
 * materials on a linear-output canvas, so authored hex values reach the screen
 * unchanged and stay in step with the CSS palette.
 */
export function rawColor(hex: number): THREE.Color {
  return new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace);
}

export type Atmosphere = {
  concrete: number;
  fog: number;
  window: number;
  windowIntensity: number;
  rain: number;
  rainOpacity: number;
  signal: number;
  signalIntensity: number;
  lightDir: [number, number, number];
};

/** Gotham at night: near-black concrete, sodium windows, cold searchlight, rain. */
const GOTHAM: Atmosphere = {
  concrete: 0x0a0d11,
  fog: 0x050708,
  window: 0xe39a4f,
  windowIntensity: 0.85,
  rain: 0xa8cbe2,
  rainOpacity: 0.5,
  signal: 0xa8cbe2,
  signalIntensity: 0.5,
  lightDir: [-0.4, 0.75, 0.5],
};

/** Wayne by day: overcast concrete, dead windows, white fog, no rain. */
const WAYNE: Atmosphere = {
  concrete: 0xb9c2c9,
  fog: 0xe7eaec,
  window: 0x8fa3b2,
  windowIntensity: 0.06,
  rain: 0xffffff,
  rainOpacity: 0,
  signal: 0xffffff,
  signalIntensity: 0.06,
  lightDir: [0.25, 0.9, 0.35],
};

export const ATMOSPHERE: Record<Persona, Atmosphere> = {
  gotham: GOTHAM,
  wayne: WAYNE,
};
