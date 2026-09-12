// Alfred's original HUD markup and stylesheet, powered here by isolated fictional fixtures.
// The private app's API client, credentials, model provider and file integrations are absent.
(() => {
  const $ = (id) => document.getElementById(id);
  const log = $("log");
  const input = $("input");
  let turns = 0;
  let appointmentTime = "10:00";

  $("ver").textContent = "DEMO";
  $("headTitle").textContent = "Public sample workspace";
  $("connText").textContent = "Demo only";
  $("hudLink").textContent = "00";
  $("hudConnection").textContent = "No private link";
  $("hudMode").textContent = "Text demo ready";
  $("voiceHint").textContent = "Type below or choose Briefing / Files / Calendar";
  $("emptyLine").textContent = "Good evening. Shall we inspect the sample day?";
  $("empty").querySelector(".empty__hint").textContent = "Try a daily briefing, a fictional file search, or a calendar approval.";
  $("sUser").textContent = "Visitor";
  $("sTz").textContent = "Sample";
  $("sNet").textContent = "Offline fixture";
  $("sProvider").textContent = "Not connected";
  $("sStt").textContent = "Disabled";
  $("sTts").textContent = "Disabled";
  $("sGoogle").textContent = "Sample only";
  $("sMail").textContent = "Sample only";
  $("sBriefing").textContent = "Available";
  $("sPush").textContent = "Disabled";
  $("sRoots").textContent = "No private files mounted";
  $("orb").setAttribute("aria-label", "Voice is unavailable in this public demo; use the text field");
  $("pairBtn").setAttribute("aria-label", "Device pairing is unavailable in this public demo");
  $("send").disabled = false;
  input.placeholder = "Ask about briefing, files, or calendar…";

  function date() {
    const now = new Date();
    $("hudMonth").textContent = now.toLocaleDateString("en", { month: "short" }).toUpperCase();
    $("hudDay").textContent = String(now.getDate()).padStart(2, "0");
    $("hudWeekday").textContent = now.toLocaleDateString("en", { weekday: "long" });
    $("hudClock").textContent = now.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
  }

  function appendTurn(who, message) {
    $("empty")?.remove();
    const turn = document.createElement("div");
    turn.className = `turn turn--${who}`;
    const label = document.createElement("div");
    label.className = "turn__who";
    label.textContent = who === "alfred" ? "Alfred" : who === "user" ? "You" : "System";
    const body = document.createElement("div");
    body.className = "turn__body";
    body.textContent = message;
    turn.append(label, body);
    log.append(turn);
    if (who !== "system") $("hudTurns").textContent = String(++turns).padStart(2, "0");
    log.scrollTop = log.scrollHeight;
  }

  function approval() {
    const card = document.createElement("div");
    card.className = "confirm";
    const head = document.createElement("div");
    head.className = "confirm__head";
    head.textContent = "Awaiting your approval";
    const summary = document.createElement("div");
    summary.className = "confirm__summary";
    summary.textContent = `Move the fictional Project Review from ${appointmentTime} to 11:00?`;
    const detail = document.createElement("pre");
    detail.className = "confirm__detail";
    detail.textContent = "Sample calendar only. No Google account or real event is connected.";
    const row = document.createElement("div");
    row.className = "confirm__row";
    for (const [label, approved] of [["Approve", true], ["Decline", false]]) {
      const button = document.createElement("button");
      button.className = approved ? "btn btn--go" : "btn";
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", () => {
        if (approved) appointmentTime = "11:00";
        head.textContent = approved ? "Approved in demo" : "Declined";
        summary.textContent = approved ? "The fictional event now reads 11:00. No external calendar changed." : `The fictional event remains at ${appointmentTime}.`;
        row.remove();
        appendTurn("alfred", approved ? "Very good. I moved the sample event to 11:00." : "As you wish. I left the sample event where it was.");
      }, { once: true });
      row.append(button);
    }
    card.append(head, summary, detail, row);
    log.append(card);
    log.scrollTop = log.scrollHeight;
  }

  function run(command) {
    appendTurn("user", command);
    const value = command.toLowerCase();
    if (/brief|today|day|schedule/.test(value)) {
      appendTurn("alfred", `Your sample day:\n${appointmentTime} — Project Review (fictional)\nOne sample message awaits a reply.\nThe handoff note was updated yesterday. No real calendar or mailbox was read.`);
    } else if (/file|find|search|note/.test(value)) {
      appendTurn("system", "Searched fictional files");
      appendTurn("alfred", "Found in Project Review.md: ‘Confirm the handoff checklist before Friday’s review.’ This is a sample excerpt, not a search of private files.");
    } else if (/calendar|move|reschedul|change/.test(value)) {
      appendTurn("alfred", "I can propose that change, but it needs your approval first.");
      approval();
    } else if (/mail|message|inbox/.test(value)) {
      appendTurn("alfred", "One fictional message asks for the project overview. This public demo cannot read or send email.");
    } else {
      appendTurn("alfred", "This public demo understands briefing, file search, calendar change, and sample mail. Choose one of those to continue.");
    }
  }

  $("send").addEventListener("click", () => {
    const message = input.value.trim();
    if (!message) { input.focus(); return; }
    input.value = "";
    run(message);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); $("send").click(); }
  });
  $("briefBtn").addEventListener("click", () => run("Brief my day"));
  $("orb").addEventListener("click", () => appendTurn("system", "Voice is disabled in this public demo. Use the text field below."));
  $("pairBtn").addEventListener("click", () => appendTurn("system", "Device pairing is unavailable in this public demo."));
  $("pushBtn").addEventListener("click", () => appendTurn("system", "Notifications are unavailable in this public demo."));
  $("railToggle").addEventListener("click", () => {
    const open = $("rail").getAttribute("data-open") !== "true";
    $("rail").setAttribute("data-open", String(open));
    $("railToggle").setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("[data-hud-target]").forEach((button) => button.addEventListener("click", () => {
    const target = button.dataset.hudTarget;
    if (target === "briefBtn") { $("briefBtn").click(); return; }
    if (target === "filesPanel") { run("Find the project note"); return; }
    if (target === "sGoogle") { run("Move the calendar review to 11:00"); return; }
    if (target === "sMail") { run("Check sample mail"); return; }
    if (target === "pairBtn") { $("pairBtn").click(); return; }
    if (target === "orb") { $("orb").click(); return; }
    input.focus();
  }));

  date();
  setInterval(date, 60_000);
  if (new URLSearchParams(location.search).get("scenario") === "brief") run("Brief my day");
})();
