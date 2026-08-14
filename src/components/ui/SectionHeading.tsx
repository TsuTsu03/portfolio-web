/**
 * Dossier section header: a mono operations eyebrow above the real heading.
 * The eyebrow is deliberately not a heading element, so the document outline
 * and keyword targeting stay exactly as they were.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-16 max-w-4xl">
      <p className="data-label mb-6 flex items-center gap-3">
        <span className="text-signal">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-steel-bright" />
        <span>{eyebrow}</span>
      </p>

      <h2 className="display-wide text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.95]">{title}</h2>

      {intro && (
        <p className="mt-6 max-w-[66ch] text-lg leading-relaxed text-ash">{intro}</p>
      )}

      <div className="hairline mt-8 h-px w-28" />
    </div>
  );
}
