/** Enhance the agent directory while keeping every project readable without JavaScript. */
export function initCoverflow(root: HTMLElement, interval = 7000): void {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-coverflow-slide]"));
  if (slides.length < 2 || root.dataset.coverflowReady) return;

  const markers = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-coverflow-marker]"));
  const stage = root.querySelector<HTMLElement>(".agent-stage");
  const previous = root.querySelector<HTMLButtonElement>("[data-coverflow-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-coverflow-next]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-coverflow-toggle]");
  const toggleLabel = toggle?.querySelector<HTMLElement>("[data-coverflow-toggle-label]");
  const status = root.querySelector<HTMLElement>("[data-coverflow-status]");
  const calm = matchMedia("(prefers-reduced-motion: reduce)");

  let active = 0;
  let playing = false;
  let hovered = root.matches(":hover");
  let focusPaused = root.contains(document.activeElement);
  let visible = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let leavingTimer: ReturnType<typeof setTimeout> | undefined;
  let touch: { x: number; y: number } | undefined;
  let suppressClickUntil = 0;

  const stop = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };

  const render = () => {
    slides.forEach((slide, index) => {
      const selected = index === active;
      slide.inert = !selected;
      slide.setAttribute("aria-hidden", String(!selected));
    });
    markers.forEach((marker, index) => marker.setAttribute("aria-current", String(index === active)));
    if (status) status.textContent = `${active + 1} of ${slides.length} · ${slides[active].dataset.agentName}`;
  };

  const show = (index: number, direction: number) => {
    const target = (index + slides.length) % slides.length;
    if (target === active) return;
    // A swipe can leave a link focused inside the outgoing panel.
    if (slides[active].contains(document.activeElement)) stage?.focus({ preventScroll: true });
    if (leavingTimer !== undefined) clearTimeout(leavingTimer);
    root.style.setProperty("--agent-direction", String(direction));
    slides.forEach((slide, position) => {
      slide.dataset.state = position === target ? "active" : position === active ? "leaving" : "idle";
    });
    active = target;
    render();
    leavingTimer = setTimeout(() => {
      slides.forEach((slide, position) => { if (position !== active) slide.dataset.state = "idle"; });
    }, calm.matches ? 0 : 600);
  };

  const start = () => {
    stop();
    if (!playing || calm.matches || hovered || focusPaused || document.hidden || !visible) return;
    timer = setTimeout(() => {
      show(active + 1, 1);
      start();
    }, interval);
  };

  const setPlaying = (value: boolean) => {
    playing = value && !calm.matches;
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(playing));
      toggle.setAttribute("aria-label", calm.matches ? "Automatic rotation disabled for reduced motion" : playing ? "Pause the agent carousel" : "Play the agent carousel");
      toggle.disabled = calm.matches;
    }
    if (toggleLabel) toggleLabel.textContent = playing ? "Pause" : "Play";
    status?.setAttribute("aria-live", playing ? "off" : "polite");
    start();
  };

  const steer = (index: number, direction = index > active ? 1 : -1) => {
    setPlaying(false);
    show(index, direction);
  };

  previous?.addEventListener("click", () => steer(active - 1, -1));
  next?.addEventListener("click", () => steer(active + 1, 1));
  toggle?.addEventListener("click", () => {
    // Explicit Play can start with focus on this control; later focus movement pauses it.
    if (!playing) focusPaused = false;
    setPlaying(!playing);
  });
  markers.forEach((marker, index) => {
    marker.addEventListener("click", () => steer(index));
    marker.addEventListener("keydown", (event) => {
      const target = event.key === "ArrowRight" || event.key === "ArrowDown" ? index + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp" ? index - 1
        : event.key === "Home" ? 0
        : event.key === "End" ? markers.length - 1
        : null;
      if (target === null) return;
      event.preventDefault();
      const wrapped = (target + markers.length) % markers.length;
      markers[wrapped].focus({ preventScroll: true });
      steer(wrapped, target > index ? 1 : -1);
    });
  });

  stage?.setAttribute("tabindex", "0");
  stage?.setAttribute("aria-roledescription", "carousel");
  stage?.addEventListener("keydown", (event) => {
    if (event.target !== stage) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    if (event.key === "Home") steer(0, -1);
    else if (event.key === "End") steer(slides.length - 1, 1);
    else steer(active + (event.key === "ArrowRight" ? 1 : -1), event.key === "ArrowRight" ? 1 : -1);
  });

  stage?.addEventListener("touchstart", (event) => {
    suppressClickUntil = 0;
    touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : undefined;
  }, { passive: true });
  stage?.addEventListener("touchmove", (event) => {
    if (event.touches.length !== 1) touch = undefined;
  }, { passive: true });
  stage?.addEventListener("touchend", (event) => {
    if (!touch || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touch.x;
    const dy = event.changedTouches[0].clientY - touch.y;
    touch = undefined;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.35) return;
    suppressClickUntil = performance.now() + 500;
    steer(active + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });
  stage?.addEventListener("touchcancel", () => { touch = undefined; });
  stage?.addEventListener("click", (event) => {
    if (performance.now() >= suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickUntil = 0;
  }, true);

  root.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    hovered = true;
    stop();
  });
  root.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "touch") return;
    hovered = false;
    start();
  });
  root.addEventListener("focusin", () => { focusPaused = true; stop(); });
  root.addEventListener("focusout", (event) => {
    focusPaused = root.contains(event.relatedTarget as Node | null);
    start();
  });
  document.addEventListener("visibilitychange", start);
  calm.addEventListener("change", () => setPlaying(false));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    }, { threshold: 0.15 });
    observer.observe(root);
  } else {
    visible = true;
  }

  root.dataset.coverflowReady = "true";
  render();
  setPlaying(false);
}
