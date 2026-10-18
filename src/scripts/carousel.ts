/** Native scrolling with shared controls, centre-based selection and quiet announcements. */
export type Carousel = { refresh: () => void };

export function initCarousel(root: HTMLElement): Carousel | null {
  const track = root.querySelector<HTMLElement>("[data-carousel-track]");
  if (!track) return null;
  const allSlides = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-slide]"));
  if (!allSlides.length) return null;
  const markers = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-carousel-marker]"));
  const previous = root.querySelector<HTMLButtonElement>("[data-carousel-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const rail = root.querySelector<HTMLElement>("[data-carousel-progress]");
  const status = root.querySelector<HTMLElement>("[data-carousel-status]");
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  const shown = () => allSlides.filter((slide) => !slide.hidden);
  let active = 0;
  let destination: number | null = null;
  let frame = 0;
  let settleTimer: ReturnType<typeof setTimeout> | undefined;

  // Read geometry together before writing styles, including after filtering or resizing.
  const measure = () => {
    const bounds = track.getBoundingClientRect();
    return shown().map((slide) => {
      const box = slide.getBoundingClientRect();
      return { slide, distance: box.left + box.width / 2 - bounds.left - track.clientWidth / 2, width: box.width };
    });
  };

  const announce = () => {
    if (!status) return;
    const slides = shown();
    const text = slides.length ? `${active + 1} of ${slides.length}` : "No projects";
    if (status.textContent !== text) status.textContent = text;
  };

  const sync = () => {
    const positions = measure();
    active = positions.reduce((best, item, index) =>
      Math.abs(item.distance) < Math.abs(positions[best].distance) ? index : best, 0);
    positions.forEach(({ slide, distance, width }, index) => {
      slide.dataset.active = String(index === active);
      slide.style.setProperty("--slide-distance", calm.matches ? "0" : String(Math.min(1, Math.abs(distance) / width)));
    });
    markers.forEach((marker) => {
      const slide = allSlides[Number(marker.dataset.carouselMarker)];
      marker.hidden = !slide || slide.hidden;
      marker.setAttribute("aria-current", String(positions[active]?.slide === slide));
    });
    // A pending destination makes repeated arrow presses advance immediately.
    const selected = destination ?? active;
    if (previous) previous.disabled = selected <= 0;
    if (next) next.disabled = selected >= positions.length - 1;
    rail?.style.setProperty("--carousel-progress", String(positions.length ? (active + 1) / positions.length : 0));
  };

  const settle = () => {
    if (settleTimer) clearTimeout(settleTimer);
    destination = null;
    sync();
    announce();
  };

  const goTo = (index: number, instant = false) => {
    const positions = measure();
    if (!positions.length) { settle(); return; }
    const target = Math.max(0, Math.min(positions.length - 1, index));
    destination = target;
    const left = Math.max(0, Math.min(track.scrollWidth - track.clientWidth, track.scrollLeft + positions[target].distance));
    track.scrollTo({ left, behavior: instant || calm.matches ? "instant" : "smooth" });
    sync();
    if (instant || calm.matches || Math.abs(positions[target].distance) < 1) settle();
    else {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 180);
    }
  };

  const step = (direction: number) => goTo((destination ?? active) + direction);
  track.addEventListener("scroll", () => {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; sync(); });
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 140);
  }, { passive: true });
  track.addEventListener("scrollend", settle);
  // Native swipes and wheel input take ownership from button navigation.
  track.addEventListener("pointerdown", () => { destination = null; }, { passive: true });
  track.addEventListener("wheel", () => { destination = null; }, { passive: true });
  previous?.addEventListener("click", () => step(-1));
  next?.addEventListener("click", () => step(1));
  markers.forEach((marker) => marker.addEventListener("click", () => {
    const index = shown().indexOf(allSlides[Number(marker.dataset.carouselMarker)]);
    if (index >= 0) goTo(index);
  }));
  track.addEventListener("keydown", (event) => {
    if (event.target !== track) return;
    const index = event.key === "ArrowRight" ? (destination ?? active) + 1
      : event.key === "ArrowLeft" ? (destination ?? active) - 1
      : event.key === "Home" ? 0 : event.key === "End" ? shown().length - 1 : null;
    if (index === null) return;
    event.preventDefault();
    goTo(index);
  });
  track.addEventListener("focusin", (event) => {
    const slide = (event.target as HTMLElement).closest<HTMLElement>("[data-carousel-slide]");
    if (slide) goTo(shown().indexOf(slide), true);
  });
  let lastWidth = track.clientWidth;
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(() => {
      if (track.clientWidth === lastWidth) return;
      lastWidth = track.clientWidth;
      goTo(destination ?? active, true);
    }).observe(track);
  }
  calm.addEventListener("change", () => goTo(destination ?? active, true));
  root.dataset.carouselReady = "true";
  goTo(0, true);
  return { refresh: () => goTo(0, true) };
}
