/**
 * Scroll-snap carousel.
 *
 * The scrolling itself is native: the track is an overflow container with
 * scroll snapping, so swipe, trackpad, keyboard and screen-reader navigation
 * keep working if this script never runs. Everything here is the optional
 * layer on top — arrows, markers, a progress rail and the active state they
 * share. Slides can be hidden by a filter, so positions are read from the
 * live DOM on every pass rather than cached.
 */

export type Carousel = { refresh: () => void };

const reduced = () =>
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initCarousel(root: HTMLElement): Carousel | null {
  const track = root.querySelector<HTMLElement>("[data-carousel-track]");
  if (!track) return null;

  const allSlides = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-slide]"));
  const markers = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-carousel-marker]"));
  const previous = root.querySelector<HTMLButtonElement>("[data-carousel-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const rail = root.querySelector<HTMLElement>("[data-carousel-progress]");
  const status = root.querySelector<HTMLElement>("[data-carousel-status]");
  if (!allSlides.length) return null;

  const shown = () => allSlides.filter((slide) => !slide.hidden);

  /** Scroll position that brings a slide flush with the start of the track. */
  const offsetOf = (slide: HTMLElement) =>
    track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left;

  /**
   * Everything is measured from slide centres, so the same code drives a track
   * that snaps slides to its centre and one that snaps them to its start.
   */
  const centreOf = (slide: HTMLElement) => offsetOf(slide) + slide.getBoundingClientRect().width / 2;

  const activeIndex = () => {
    const slides = shown();
    const viewCentre = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let closest = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const distance = Math.abs(centreOf(slide) - viewCentre);
      if (distance < closest) {
        closest = distance;
        best = index;
      }
    });
    return best;
  };

  /**
   * At the end of the track the last slide can never reach the start edge, so
   * the nearest-slide reading would leave the final marker unreachable.
   */
  const current = () => {
    const span = track.scrollWidth - track.clientWidth;
    if (span > 1 && track.scrollLeft >= span - 1) return shown().length - 1;
    return activeIndex();
  };

  const goTo = (slide: HTMLElement | undefined) => {
    if (!slide) return;
    const span = Math.max(0, track.scrollWidth - track.clientWidth);
    const left = Math.min(span, Math.max(0, centreOf(slide) - track.clientWidth / 2));
    track.scrollTo({ left, behavior: reduced() ? "auto" : "smooth" });
  };

  /** Centre snapping leaves scroll position 0 between slides, so settle on the first. */
  const alignFirst = () => {
    const first = shown()[0];
    if (!first) return;
    const span = Math.max(0, track.scrollWidth - track.clientWidth);
    track.scrollTo({ left: Math.min(span, Math.max(0, centreOf(first) - track.clientWidth / 2)), behavior: "auto" });
  };

  const sync = () => {
    const slides = shown();
    const index = current();

    markers.forEach((marker) => {
      const slide = allSlides[Number(marker.dataset.carouselMarker)];
      if (!slide) return;
      marker.hidden = slide.hidden;
      marker.setAttribute("aria-current", String(slides[index] === slide));
    });

    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index >= slides.length - 1;
    if (rail) {
      const seen = track.scrollWidth > 0 ? (track.scrollLeft + track.clientWidth) / track.scrollWidth : 1;
      rail.style.setProperty("--carousel-progress", String(Math.min(1, Math.max(0, seen))));
    }
    if (status) status.textContent = `${index + 1} of ${slides.length}`;
  };

  const step = (direction: 1 | -1) => {
    const slides = shown();
    const target = Math.min(slides.length - 1, Math.max(0, current() + direction));
    goTo(slides[target]);
  };

  let queued = false;
  track.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        sync();
      });
    },
    { passive: true }
  );

  previous?.addEventListener("click", () => step(-1));
  next?.addEventListener("click", () => step(1));
  markers.forEach((marker) => {
    marker.addEventListener("click", () => goTo(allSlides[Number(marker.dataset.carouselMarker)]));
  });

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(() => sync()).observe(track);
  } else {
    addEventListener("resize", sync);
  }

  root.dataset.carouselReady = "true";
  alignFirst();
  sync();

  return {
    refresh: () => {
      alignFirst();
      sync();
    },
  };
}
