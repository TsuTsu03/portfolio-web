import { lazy, Suspense, useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const GothamScene = lazy(() => import("../scene/GothamScene"));

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Static Gotham wash. Painted immediately so the page never opens on a blank
 * void, and left as the permanent backdrop wherever WebGL is unavailable.
 */
function StaticBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-void"
    >
      {/* Cold sky wash above, heavy ground shadow below */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--signal-wash) 0%, transparent 34%), radial-gradient(ellipse 90% 55% at 22% 8%, var(--signal-wash), transparent 62%)",
        }}
      />

      {/* Searchlight shaft, angled off the lower-left */}
      <div
        className="absolute -left-[8%] bottom-0 h-[130vh] w-[46vw] origin-bottom -rotate-12 opacity-70 blur-3xl"
        style={{
          background:
            "linear-gradient(to top, var(--signal-wash), transparent 72%)",
          clipPath: "polygon(46% 100%, 54% 100%, 100% 0, 0 0)",
        }}
      />

      {/* Skyline silhouette */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38vh] opacity-90"
        style={{
          background: `repeating-linear-gradient(90deg,
            var(--concrete) 0 42px, transparent 42px 58px,
            var(--concrete) 58px 96px, transparent 96px 124px,
            var(--concrete) 124px 190px, transparent 190px 214px)`,
          maskImage:
            "linear-gradient(to top, black 0%, black 46%, transparent 100%)",
        }}
      />

      <div className="grid-layer absolute inset-0" />
    </div>
  );
}

export function GothamBackdrop() {
  const { persona } = useTheme();
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) return;

    // Hold the GPU work until after first paint so LCP is untouched.
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setSceneReady(true), { timeout: 2500 })
      : window.setTimeout(() => setSceneReady(true), 900);

    return () => {
      if (window.cancelIdleCallback && typeof idle === "number") {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle as number);
      }
    };
  }, []);

  return (
    <>
      <StaticBackdrop />
      {sceneReady && (
        <Suspense fallback={null}>
          <GothamScene persona={persona} />
        </Suspense>
      )}
      <div className="vignette-layer" />
      <div className="grain-layer" />
    </>
  );
}
