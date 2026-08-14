import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Skyline } from "./Skyline";
import { Rain } from "./Rain";
import { SignalCone } from "./SignalCone";
import { useScrollProgress } from "./useScrollProgress";
import type { Persona } from "../context/theme-context";

/** Camera altitude at the top of the page (above the skyline) and at the bottom (street). */
const ROOFTOP_Y = 196;
const STREET_Y = 16;

function Descent({
  progress,
  reduced,
  allowParallax,
}: {
  progress: React.RefObject<number>;
  reduced: boolean;
  allowParallax: boolean;
}) {
  const camera = useThree((state) => state.camera);

  useFrame((state, delta) => {
    // Ease the descent so the rooftop lingers and the street arrives quickly.
    const depth = progress.current;
    const eased = depth * depth * (3 - 2 * depth);
    const targetY = THREE.MathUtils.lerp(ROOFTOP_Y, STREET_Y, eased);

    const follow = reduced ? 1 : Math.min(1, delta * 3.5);
    camera.position.y += (targetY - camera.position.y) * follow;

    if (allowParallax && !reduced) {
      const driftX = state.pointer.x * 9;
      camera.position.x += (driftX - camera.position.x) * Math.min(1, delta * 1.6);
    }

    camera.lookAt(0, camera.position.y - 34, -300);

    if (allowParallax && !reduced) {
      camera.rotation.y += state.pointer.x * 0.028;
      camera.rotation.x += state.pointer.y * 0.018;
    }
  });

  return null;
}

/** Nudges a demand-driven frameloop so the persona crossfade still renders. */
function PersonaRepaint({ persona, active }: { persona: Persona; active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;
    invalidate();
  }, [persona, active, invalidate]);

  return null;
}

export default function GothamScene({ persona }: { persona: Persona }) {
  const progress = useScrollProgress();

  const { reduced, coarse, rainCount, quality, dpr } = useMemo(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return {
      reduced: isReduced,
      coarse: isCoarse,
      rainCount: isReduced ? 0 : isCoarse ? 3000 : 12000,
      quality: (isCoarse ? "reduced" : "full") as "full" | "reduced",
      dpr: (isCoarse ? [1, 1.25] : [1, 1.75]) as [number, number],
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        flat
        linear
        dpr={dpr}
        frameloop={reduced ? "demand" : "always"}
        gl={{ antialias: !coarse, powerPreference: "high-performance" }}
        camera={{ fov: 56, near: 1, far: 900, position: [0, ROOFTOP_Y, 90] }}
      >
        <Descent progress={progress} reduced={reduced} allowParallax={!coarse} />
        <PersonaRepaint persona={persona} active={reduced} />
        <Skyline persona={persona} quality={quality} />
        {rainCount > 0 && <Rain persona={persona} count={rainCount} reduced={reduced} />}
        <SignalCone persona={persona} progress={progress} reduced={reduced} />
      </Canvas>
    </div>
  );
}
