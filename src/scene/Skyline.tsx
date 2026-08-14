import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ATMOSPHERE, rawColor } from "./atmosphere";
import type { Persona } from "../context/theme-context";

const vertexShader = /* glsl */ `
  attribute float aSeed;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying float vSeed;
  varying float vDepth;

  void main() {
    vUv = uv;
    vSeed = aSeed;
    vNormalW = normalize(mat3(instanceMatrix) * normal);

    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    vDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uConcrete;
  uniform vec3 uFog;
  uniform vec3 uWindow;
  uniform vec3 uLightDir;
  uniform float uWindowIntensity;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying float vSeed;
  varying float vDepth;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    // Single cold key light raking the facades.
    float lambert = clamp(dot(normalize(vNormalW), normalize(uLightDir)), 0.0, 1.0);
    vec3 color = uConcrete * (0.30 + 0.70 * lambert);

    // Window grid, vertical faces only.
    float vertical = 1.0 - step(0.72, abs(vNormalW.y));
    vec2 scaled = vec2(vUv.x * 7.0, vUv.y * 17.0);
    vec2 cell = floor(scaled);
    vec2 inCell = fract(scaled);

    float pane =
      step(0.24, inCell.x) * step(inCell.x, 0.76) *
      step(0.26, inCell.y) * step(inCell.y, 0.74);

    float roll = hash(cell + vSeed * 37.0);
    float lit = step(0.63, roll);
    // A handful of panes flicker on a long, offset cycle.
    float flicker = 1.0 - 0.35 * step(0.97, roll) * step(0.5, sin(uTime * 1.7 + roll * 40.0));

    color += uWindow * pane * lit * vertical * uWindowIntensity * flicker;

    float fogAmount = smoothstep(uFogNear, uFogFar, vDepth);
    gl_FragColor = vec4(mix(color, uFog, fogAmount), 1.0);
  }
`;

type BandConfig = {
  count: number;
  zNear: number;
  zFar: number;
  spread: number;
  minHeight: number;
  maxHeight: number;
  seed: number;
};

const BANDS: BandConfig[] = [
  { count: 26, zNear: -70, zFar: -150, spread: 150, minHeight: 34, maxHeight: 108, seed: 11 },
  { count: 30, zNear: -150, zFar: -260, spread: 220, minHeight: 46, maxHeight: 150, seed: 27 },
  { count: 32, zNear: -260, zFar: -400, spread: 320, minHeight: 60, maxHeight: 190, seed: 43 },
  { count: 34, zNear: -400, zFar: -580, spread: 440, minHeight: 74, maxHeight: 230, seed: 61 },
];

/** Deterministic pseudo-random so the skyline is identical on every load. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function buildBand(band: BandConfig, material: THREE.ShaderMaterial): THREE.InstancedMesh {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const seeds = new Float32Array(band.count);
  const mesh = new THREE.InstancedMesh(geometry, material, band.count);

  const random = seeded(band.seed);
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();

  for (let i = 0; i < band.count; i += 1) {
    const height = band.minHeight + random() * (band.maxHeight - band.minHeight);
    const width = 12 + random() * 22;
    const depth = 12 + random() * 20;

    position.set(
      (random() - 0.5) * band.spread * 2,
      height / 2,
      band.zNear + random() * (band.zFar - band.zNear)
    );
    scale.set(width, height, depth);

    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(i, matrix);
    seeds[i] = random();
  }

  geometry.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));
  mesh.instanceMatrix.needsUpdate = true;
  mesh.frustumCulled = false;

  return mesh;
}

export function Skyline({ persona, quality }: { persona: Persona; quality: "full" | "reduced" }) {
  const { material, meshes, uniforms } = useMemo(() => {
    const night = ATMOSPHERE.gotham;
    const sharedUniforms = {
      uConcrete: { value: rawColor(night.concrete) },
      uFog: { value: rawColor(night.fog) },
      uWindow: { value: rawColor(night.window) },
      uLightDir: { value: new THREE.Vector3(...night.lightDir) },
      uWindowIntensity: { value: night.windowIntensity },
      uFogNear: { value: 120 },
      uFogFar: { value: 640 },
      uTime: { value: 0 },
    };

    const sharedMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: sharedUniforms,
    });

    const bands = quality === "full" ? BANDS : BANDS.slice(0, 2);

    return {
      material: sharedMaterial,
      meshes: bands.map((band) => buildBand(band, sharedMaterial)),
      uniforms: sharedUniforms,
    };
  }, [quality]);

  useEffect(
    () => () => {
      meshes.forEach((mesh) => mesh.geometry.dispose());
      material.dispose();
    },
    [meshes, material]
  );

  // Scratch targets, allocated once, so the per-frame lerp stays garbage-free.
  const targets = useMemo(
    () => ({ color: new THREE.Color(), dir: new THREE.Vector3() }),
    []
  );

  useFrame((_, delta) => {
    const target = ATMOSPHERE[persona];
    const blend = Math.min(1, delta * 3.2);

    uniforms.uTime.value += delta;
    uniforms.uConcrete.value.lerp(targets.color.copy(rawColor(target.concrete)), blend);
    uniforms.uFog.value.lerp(targets.color.copy(rawColor(target.fog)), blend);
    uniforms.uWindow.value.lerp(targets.color.copy(rawColor(target.window)), blend);
    uniforms.uLightDir.value.lerp(targets.dir.set(...target.lightDir), blend);
    uniforms.uWindowIntensity.value = THREE.MathUtils.lerp(
      uniforms.uWindowIntensity.value,
      target.windowIntensity,
      blend
    );
  });

  return (
    <>
      {meshes.map((mesh, index) => (
        <primitive key={index} object={mesh} />
      ))}
    </>
  );
}
