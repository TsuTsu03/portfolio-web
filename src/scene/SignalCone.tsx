import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ATMOSPHERE, rawColor } from "./atmosphere";
import type { Persona } from "../context/theme-context";

const CONE_RADIUS = 46;
const CONE_HEIGHT = 320;

const vertexShader = /* glsl */ `
  uniform float uHalfHeight;

  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vAxis;

  void main() {
    // 0 at the wide end, 1 at the apex.
    vAxis = (position.y + uHalfHeight) / (2.0 * uHalfHeight);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vAxis;

  void main() {
    // Brightest where the shell faces the viewer, which reads as looking
    // straight down the beam rather than at a solid cone.
    float facing = abs(dot(normalize(vNormalV), normalize(vViewDir)));
    float core = pow(facing, 1.7);

    // Hot at the source, dissolving into the cloud base.
    float falloff = pow(vAxis, 1.5) * (1.0 - smoothstep(0.88, 1.0, vAxis));

    float alpha = core * falloff * uIntensity;
    if (alpha < 0.004) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function SignalCone({
  persona,
  progress,
  reduced,
}: {
  persona: Persona;
  progress: React.RefObject<number>;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const { material, uniforms } = useMemo(() => {
    const sharedUniforms = {
      uColor: { value: rawColor(ATMOSPHERE.gotham.signal) },
      uIntensity: { value: ATMOSPHERE.gotham.signalIntensity },
      uHalfHeight: { value: CONE_HEIGHT / 2 },
    };

    return {
      material: new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: sharedUniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
      uniforms: sharedUniforms,
    };
  }, []);

  useEffect(() => () => material.dispose(), [material]);

  const scratch = useMemo(() => new THREE.Color(), []);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    const target = ATMOSPHERE[persona];
    const blend = reduced ? 1 : Math.min(1, delta * 3.2);
    if (!reduced) elapsed.current += delta;

    uniforms.uColor.value.lerp(scratch.copy(rawColor(target.signal)), blend);

    // The beam builds as the page descends and burns hardest at the contact section.
    const depth = progress.current;
    const scrollGain = 0.55 + 1.5 * Math.pow(depth, 2.2);
    uniforms.uIntensity.value = THREE.MathUtils.lerp(
      uniforms.uIntensity.value,
      target.signalIntensity * scrollGain,
      blend
    );

    if (groupRef.current && !reduced) {
      // Slow searchlight sweep.
      groupRef.current.rotation.z = -0.26 + Math.sin(elapsed.current * 0.12) * 0.11;
      groupRef.current.rotation.x = Math.sin(elapsed.current * 0.07) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[-96, 4, -210]}>
      {/* Apex down at the source, opening upward into the cloud base. */}
      <mesh rotation={[Math.PI, 0, 0]} position={[0, CONE_HEIGHT / 2, 0]} material={material}>
        <coneGeometry args={[CONE_RADIUS, CONE_HEIGHT, 40, 1, true]} />
      </mesh>
    </group>
  );
}
