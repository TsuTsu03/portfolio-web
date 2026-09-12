type Prospect = {
  name: string;
  location: string;
  evidence: string[];
  observation: string;
};

const prospects: Record<string, Prospect> = {
  harborview: {
    name: "Harborview Dental Studio",
    location: "Makati City (fictional)",
    evidence: ["Sample website lists two branches.", "Sample business profile shows an appointment channel."],
    observation: "your clinic supports appointments across two listed branches",
  },
  southline: {
    name: "Southline Family Clinic",
    location: "Pasig City (fictional)",
    evidence: ["Sample website lists outpatient services.", "Sample business profile shows recent operating updates."],
    observation: "your clinic shares outpatient services and operating updates",
  },
};

function required<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Agent demo control missing: ${selector}`);
  return element;
}

function initMara(root: HTMLElement) {
  const find = required<HTMLButtonElement>(root, "[data-mara-find]");
  const results = required<HTMLElement>(root, "[data-mara-results]");
  const select = required<HTMLSelectElement>(root, "[data-mara-select]");
  const empty = required<HTMLElement>(root, "[data-mara-empty]");
  const review = required<HTMLElement>(root, "[data-mara-review]");
  const approve = required<HTMLButtonElement>(root, "[data-mara-approve]");
  const reply = required<HTMLButtonElement>(root, "[data-mara-reply]");
  const status = required<HTMLElement>(root, "[data-mara-status]");

  function renderProspect() {
    const prospect = prospects[select.value];
    if (!prospect) return;
    required<HTMLElement>(root, "[data-mara-name]").textContent = prospect.name;
    required<HTMLElement>(root, "[data-mara-location]").textContent = prospect.location;
    required<HTMLElement>(root, "[data-mara-observation]").textContent = prospect.observation;
    required<HTMLElement>(root, "[data-mara-greeting]").textContent = prospect.name;
    required<HTMLElement>(root, "[data-mara-draft]").textContent = prospect.observation;
    const evidence = required<HTMLUListElement>(root, "[data-mara-evidence]");
    evidence.replaceChildren(...prospect.evidence.map((fact) => {
      const item = document.createElement("li");
      item.textContent = fact;
      return item;
    }));
    approve.disabled = false;
    reply.disabled = false;
    status.textContent = "Awaiting human review. Nothing has been sent.";
    empty.hidden = true;
    review.hidden = false;
  }

  find.addEventListener("click", () => {
    results.hidden = false;
    renderProspect();
    select.focus();
  });
  select.addEventListener("change", renderProspect);
  approve.addEventListener("click", () => {
    approve.disabled = true;
    status.textContent = "Sample draft approved. No email was sent or scheduled.";
  });
  reply.addEventListener("click", () => {
    reply.disabled = true;
    status.textContent = "Fictional reply received. Follow-up paused and routed for human review. No email was sent.";
  });
}

function initAlfred(root: HTMLElement) {
  const title = required<HTMLElement>(root, "[data-alfred-title]");
  const response = required<HTMLElement>(root, "[data-alfred-response]");
  const approval = required<HTMLElement>(root, "[data-alfred-approval]");
  const approve = required<HTMLButtonElement>(root, "[data-alfred-approve]");
  const decline = required<HTMLButtonElement>(root, "[data-alfred-decline]");

  root.querySelectorAll<HTMLButtonElement>("[data-alfred-command]").forEach((button) => {
    button.addEventListener("click", () => {
      approval.hidden = true;
      const command = button.dataset.alfredCommand;
      if (command === "brief") {
        title.textContent = "Your day, from sample data.";
        response.textContent = "10:00 — Project review (fictional event).\nOne sample message needs a reply.\nThe sample project note was updated yesterday. No real calendar or mailbox was read.";
      } else if (command === "find") {
        title.textContent = "Found in a fictional file.";
        response.textContent = "Project Review.md → “Confirm the handoff checklist before Friday's review.” This is a hard-coded sample excerpt, not a search of the owner's files.";
      } else if (command === "draft") {
        title.textContent = "I need your approval first.";
        response.textContent = "I prepared a change to a fictional calendar event. It has not been applied.";
        approval.hidden = false;
        approve.disabled = false;
        decline.disabled = false;
      }
    });
  });
  approve.addEventListener("click", () => {
    approval.hidden = true;
    response.textContent = "Approved in this browser demo. The fictional event now reads 11:00. No external calendar was changed.";
  });
  decline.addEventListener("click", () => {
    approval.hidden = true;
    response.textContent = "Declined. The fictional event remains at 10:00. No external calendar was changed.";
  });
}

export function initAgentDemos() {
  const mara = document.querySelector<HTMLElement>("[data-mara-demo]");
  const alfred = document.querySelector<HTMLElement>("[data-alfred-demo]");
  if (mara) initMara(mara);
  if (alfred) initAlfred(alfred);
}
