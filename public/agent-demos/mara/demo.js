// Public fixture. The production Mara client uses Google Apps Script RPC and is intentionally absent.
(() => {
  const prospects = [
    { id: "harborview", name: "Harborview Dental Studio", location: "Makati City · fictional", observation: "the sample clinic lists two branches and an appointment channel", evidence: ["Sample website: two locations listed", "Sample profile: appointment requests available"] },
    { id: "southline", name: "Southline Family Clinic", location: "Pasig City · fictional", observation: "the sample clinic shares outpatient services and operating updates", evidence: ["Sample website: outpatient services listed", "Sample profile: recent operating update"] },
  ];
  const view = document.getElementById("view");
  const context = document.getElementById("workspace-context");
  const message = document.getElementById("agent-message");
  const mode = document.getElementById("agent-mode");
  const titles = { briefing: "Daily briefing", review: "Draft review", replies: "Replies", leads: "Leads", discovery: "Find prospects" };
  const requestedView = new URLSearchParams(location.search).get("view");
  const state = { view: ["review", "replies", "leads", "discovery"].includes(requestedView) ? requestedView : "briefing", selected: 0, approved: new Set(), replyHandled: false, searched: false, notice: "" };
  const current = () => prospects[state.selected];
  const pending = () => prospects.length - state.approved.size;

  function setView(next) {
    state.view = next;
    state.notice = "";
    render();
    document.getElementById("main").focus({ preventScroll: true });
  }

  function briefing() {
    const reply = state.replyHandled ? 0 : 1;
    return `<section class="briefing-hero"><div><h1>${reply ? "Start with the people who replied." : pending() ? "Your next move is a careful review." : "The sample desk is clear."}</h1><p>${reply ? "One sample reply needs a human decision before any new outreach." : "Review the evidence beside each draft before approving it."}</p></div><div class="briefing-priority"><span>Mara recommends</span><strong>${reply ? "1 waiting" : `${pending()} drafts`}</strong></div></section>
      <div class="grid cols-3 metric-grid"><div class="stat"><div class="value">${pending()}</div><div class="label">Waiting for review</div></div><div class="stat"><div class="value">0</div><div class="label">Scheduled to send</div></div><div class="stat live"><div class="value">${reply}</div><div class="label">Replies to handle</div></div><div class="stat"><div class="value">0</div><div class="label">Sent today</div></div></div>
      <div class="today-lower"><div class="card"><h2>Next best actions</h2><div class="next-action-list"><button class="next-action" data-action="replies"><span><strong>Handle replies</strong><small>${reply} waiting for a decision</small></span><b>Priority</b></button><button class="next-action" data-action="review"><span><strong>Review prepared drafts</strong><small>${pending()} ready with sample evidence</small></span><b>Open</b></button><button class="next-action" data-action="discovery"><span><strong>Research new prospects</strong><small>Inspect a fictional prospect list</small></span><b>Open</b></button></div></div><div class="card"><h2>Operating status</h2><ul class="meta-list"><li><span class="key">Production sending</span><span>disabled</span></li><li><span class="key">Data source</span><span>fictional fixtures</span></li><li><span class="key">Mailbox</span><span>not connected</span></li></ul><div class="notice warn">No outreach leaves this demo.</div></div></div>`;
  }

  function prospectList() {
    return prospects.map((prospect, index) => `<button class="demo-item" type="button" data-prospect="${index}" data-active="${state.selected === index}"><strong>${prospect.name}</strong><small>${prospect.location}</small></button>`).join("");
  }

  function review() {
    const prospect = current();
    const approved = state.approved.has(prospect.id);
    return `<div class="demo-toolbar"><h1>Draft review</h1><span class="demo-note">${pending()} awaiting approval</span></div><p class="lede">Inspect the sample evidence and draft before making a decision.</p><div class="split"><div><div class="card"><h2>Review queue</h2>${prospectList()}</div><div class="card"><h2>Evidence · ${prospect.name}</h2><ul class="demo-evidence">${prospect.evidence.map((fact) => `<li>${fact}</li>`).join("")}</ul><p class="demo-note">All sources shown here are fictional fixtures.</p></div></div><div><div class="card"><h2>Prepared outreach</h2><label for="draft-subject">Subject</label><input id="draft-subject" value="A practical workflow idea for your team" readonly><label for="draft-body">Body</label><textarea class="demo-draft" id="draft-body" readonly>Hi ${prospect.name} team,\n\nI noticed that ${prospect.observation}. Would a short workflow review be useful?\n\nRegards,\nThe StackWise team</textarea><div class="actions"><button class="primary" type="button" data-action="approve" ${approved ? "disabled" : ""}>${approved ? "Approved in demo" : "Approve sample draft"}</button></div><p class="demo-note">Approval changes this browser's sample state only. No email is sent or scheduled.</p></div></div></div>`;
  }

  function replies() {
    return `<h1>Replies</h1><p class="lede">A sample response stops the follow-up and waits for human review.</p><div class="card"><span class="demo-note">Harborview Dental Studio · fictional</span><h2>${state.replyHandled ? "Handled in demo" : "Reply needs attention"}</h2><p>“Thanks for reaching out. Can you share a brief overview first?”</p><div class="actions"><button type="button" data-action="handle-reply" ${state.replyHandled ? "disabled" : ""}>${state.replyHandled ? "Follow-up paused" : "Pause follow-up and mark reviewed"}</button></div><p class="demo-note">No real message was received or changed.</p></div>`;
  }

  function leads() {
    return `<h1>Leads</h1><p class="lede">The sample pipeline keeps observations beside each prospect.</p><div class="card table-wrap"><table><thead><tr><th>Prospect</th><th>Location</th><th>Draft</th></tr></thead><tbody>${prospects.map((prospect) => `<tr><td>${prospect.name}</td><td>${prospect.location}</td><td>${state.approved.has(prospect.id) ? "Approved in demo" : "Needs review"}</td></tr>`).join("")}</tbody></table></div><button class="primary" type="button" data-action="review">Open draft review</button>`;
  }

  function discovery() {
    return `<h1>Find prospects</h1><p class="lede">Try the discovery flow using fictional businesses.</p><div class="card"><h2>Sample search</h2><p>Service businesses in Metro Manila</p><button class="primary" type="button" data-action="search">Find sample prospects</button></div>${state.searched ? `<div class="card"><h2>Sample results</h2>${prospectList()}<div class="actions"><button type="button" data-action="review">Review selected prospect</button></div></div>` : ""}`;
  }

  function render() {
    context.textContent = titles[state.view];
    mode.textContent = state.view;
    document.querySelectorAll("[data-view]").forEach((button) => {
      if (button.dataset.view === state.view) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    document.getElementById("draft-count").textContent = pending();
    document.getElementById("reply-count").textContent = state.replyHandled ? "0" : "1";
    view.innerHTML = (state.notice ? `<p class="demo-status" role="status">${state.notice}</p>` : "") + ({ briefing, review, replies, leads, discovery }[state.view]());
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.view) return setView(target.dataset.view);
    if (target.dataset.prospect !== undefined) { state.selected = Number(target.dataset.prospect); state.notice = ""; render(); return; }
    if (target.id === "reset-demo") { state.selected = 0; state.approved.clear(); state.replyHandled = false; state.searched = false; message.textContent = "The sample workspace is reset."; setView("briefing"); return; }
    const action = target.dataset.action || target.dataset.command;
    if (!action) return;
    if (action === "priorities") { message.textContent = state.replyHandled ? "Review the remaining sample drafts next." : "Start with the fictional reply, then review prepared drafts."; setView("briefing"); return; }
    if (action === "prospects") return setView("discovery");
    if (["review", "replies", "leads", "discovery"].includes(action)) { message.textContent = `Opening ${titles[action].toLowerCase()} in this sample workspace.`; return setView(action); }
    if (action === "approve") { state.approved.add(current().id); state.notice = "Sample draft approved. Nothing was sent or scheduled."; message.textContent = state.notice; render(); }
    if (action === "handle-reply") { state.replyHandled = true; state.notice = "Fictional reply handled. Follow-up paused in this demo."; message.textContent = state.notice; render(); }
    if (action === "search") { state.searched = true; state.notice = "Two fictional prospects found. Open one to inspect its evidence."; message.textContent = state.notice; render(); }
  });

  document.getElementById("agent-command-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("agent-command-input");
    const command = input.value.toLowerCase();
    input.value = "";
    if (/repl/.test(command)) setView("replies");
    else if (/review|draft/.test(command)) setView("review");
    else if (/lead/.test(command)) setView("leads");
    else if (/find|prospect|discover/.test(command)) setView("discovery");
    else { message.textContent = "I can open sample replies, draft review, leads, or discovery. Try one of those."; return; }
    message.textContent = `Opened ${titles[state.view].toLowerCase()} in this sample workspace.`;
  });

  render();
})();
