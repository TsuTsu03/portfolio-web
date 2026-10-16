/**
 * Coverflow deck.
 *
 * One card holds the centre, its neighbours sit behind and to the side, and
 * anything further out is parked off stage. The slot each card is in is
 * written to `data-slot`; the CSS does the rest.
 *
 * It advances on its own, which is only acceptable with a way to stop it:
 * rotation pauses on hover, on keyboard focus, when the tab is hidden, when
 * the reader asks for reduced motion, and whenever a control is used. The
 * play and pause button states what is happening either way.
 */

export function initCoverflow(root: HTMLElement, interval = 7000): void {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-coverflow-slide]"));
  if (slides.length < 2) return;

  const markers = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-coverflow-marker]"));
  const previous = root.querySelector<HTMLButtonElement>("[data-coverflow-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-coverflow-next]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-coverflow-toggle]");
  const status = root.querySelector<HTMLElement>("[data-coverflow-status]");
  const calm = matchMedia("(prefers-reduced-motion: reduce)");

  let active = 0;
  let playing = !calm.matches;
  let timer: ReturnType<typeof setInterval> | undefined;

  const render = () => {
    const half = Math.floor(slides.length / 2);
    slides.forEach((slide, index) => {
      let slot = index - active;
      if (slot > half) slot -= slides.length;
      if (slot < -half) slot += slides.length;
      slide.dataset.slot = String(slot);
      /* Only the centre card can be read or clicked. */
      slide.inert = slot !== 0;
    });
    markers.forEach((marker, index) => marker.setAttribute("aria-current", String(index === active)));
    if (status) status.textContent = `${active + 1} of ${slides.length}`;
  };

  const show = (index: number) => {
    active = (index + slides.length) % slides.length;
    render();
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = undefined;
  };

  const start = () => {
    stop();
    if (!playing || calm.matches || document.hidden) return;
    timer = setInterval(() => show(active + 1), interval);
  };

  const setPlaying = (value: boolean) => {
    playing = value;
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(!value));
      toggle.textContent = value ? "Pause" : "Play";
      toggle.setAttribute("aria-label", value ? "Pause the agent carousel" : "Play the agent carousel");
    }
    start();
  };

  /** A control means the reader is steering, so the rotation gets out of the way. */
  const steer = (index: number) => {
    show(index);
    if (playing) setPlaying(false);
  };

  previous?.addEventListener("click", () => steer(active - 1));
  next?.addEventListener("click", () => steer(active + 1));
  markers.forEach((marker, index) => marker.addEventListener("click", () => steer(index)));
  toggle?.addEventListener("click", () => setPlaying(!playing));

  markers.forEach((marker, index) => {
    marker.addEventListener("keydown", (event) => {
      const target = event.key === "ArrowRight" ? index + 1
        : event.key === "ArrowLeft" ? index - 1
        : event.key === "Home" ? 0
        : event.key === "End" ? markers.length - 1
        : null;
      if (target === null) return;
      event.preventDefault();
      const wrapped = (target + markers.length) % markers.length;
      markers[wrapped].focus();
      steer(wrapped);
    });
  });

  root.addEventListener("pointerenter", stop);
  root.addEventListener("pointerleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) start();
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  calm.addEventListener("change", () => setPlaying(!calm.matches));

  root.dataset.coverflowReady = "true";
  render();
  setPlaying(playing);
}
