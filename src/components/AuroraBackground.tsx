/**
 * Global midnight ambiance: a single fixed night-sky layer rendered once,
 * behind all content. Provides the deep base wash, slowly drifting aurora
 * ribbons/glows, a subtle twinkling star field, and a masked grid.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#02040c]"
    >
      {/* Deep midnight base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.28),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(2,6,23,0.9),transparent_60%)]" />

      {/* Drifting aurora ribbons */}
      <div className="aurora-ribbon absolute -top-[15%] left-1/2 h-[55vh] w-[120vw] -translate-x-1/2 rounded-[50%]" />
      <div className="aurora-ribbon aurora-ribbon-slow animation-delay-4000 absolute top-[35%] left-1/2 h-[45vh] w-[120vw] -translate-x-1/2 rounded-[50%]" />

      {/* Soft aurora glows */}
      <div className="animate-aurora absolute left-[8%] top-[10%] h-[42vh] w-[42vh] rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="animate-aurora animation-delay-2000 absolute right-[6%] top-[24%] h-[44vh] w-[44vh] rounded-full bg-indigo-500/15 blur-[120px]" />
      <div className="animate-aurora animation-delay-4000 absolute bottom-[8%] left-[34%] h-[40vh] w-[40vh] rounded-full bg-cyan-500/12 blur-[110px]" />

      {/* Star field */}
      <div className="star-field absolute inset-0 opacity-70" />

      {/* Faint grid, masked toward the center */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
    </div>
  );
}
