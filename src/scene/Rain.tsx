import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ATMOSPHERE, rawColor } from "./atmosphere";
import type { Persona } from "../context/theme-context";

const VOLUME_WIDTH = 260;
const VOLUME_DEPTH = 320;
const VOLUME_HEIGHT = 220;

const vertexShader = /* glsl */ `
  attribute float aSpeed;
  attribute float aScale;

  uniform float uTime;
  uniform float uHeight;
  uniform float uSize;

  varying float vFade;

  void main() {
    vec3 p = position;
    p.y = mod(p.y - uTime * (16.0 + aSpeed * 30.0), uHeight);
    // Wind shear: the drift grows with height.
    p.x += sin(uTime * 0.4 + p.z * 0.04) * (1.4 + p.y * 0.012);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * aScale * (280.0 / max(1.0, -mvPosition.z));

    // Fade in off the ground, out near the top of the volume.
    vFade =
      smoothstep(0.0, 14.0, p.y) *
      (1.0 - smoothstep(uHeight * 0.7, uHeight, p.y));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vFade;

  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    // Thin vertical streak rather than a round droplet.
    float streak =
      smoothstep(0.5, 0.0, abs(coord.x) * 7.0) *
      smoothstep(0.5, 0.08, abs(coord.y));

    float alpha = streak * vFade * uOpacity;
    if (alpha < 0.008) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function Rain({
  persona,
  count,
  reduced,
}: {
  persona: Persona;
  count: number;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);

  const { points, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * VOLUME_WIDTH;
      positions[i * 3 + 1] = Math.random() * VOLUME_HEIGHT;
      positions[i * 3 + 2] = -VOLUME_DEPTH * 0.75 + Math.random() * VOLUME_DEPTH;
      speeds[i] = Math.random();
      scales[i] = 0.6 + Math.random() * 0.9;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const sharedUniforms = {
      uTime: { value: 0 },
      uHeight: { value: VOLUME_HEIGHT },
      uSize: { value: 9 },
      uColor: { value: rawColor(ATMOSPHERE.gotham.rain) },
      uOpacity: { value: ATMOSPHERE.gotham.rainOpacity },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: sharedUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const mesh = new THREE.Points(geometry, material);
    mesh.frustumCulled = false;

    return { points: mesh, uniforms: sharedUniforms };
  }, [count]);

  useEffect(
    () => () => {
      points.geometry.dispose();
      (points.material as THREE.Material).dispose();
    },
    [points]
  );

  const scratch = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const target = ATMOSPHERE[persona];
    const blend = reduced ? 1 : Math.min(1, delta * 3.2);

    if (!reduced) uniforms.uTime.value += delta;

    uniforms.uColor.value.lerp(scratch.copy(rawColor(target.rain)), blend);
    uniforms.uOpacity.value = THREE.MathUtils.lerp(
      uniforms.uOpacity.value,
      reduced ? 0 : target.rainOpacity,
      blend
    );

    // Keep the rain volume wrapped around the descending camera.
    if (groupRef.current) {
      groupRef.current.position.set(
        camera.position.x,
        camera.position.y - VOLUME_HEIGHT * 0.55,
        camera.position.z
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={points} />
    </group>
  );
}
