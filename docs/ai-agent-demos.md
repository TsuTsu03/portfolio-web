# AI agent demo provenance

The three public pages are linked from `/#agents` and `/agents`.

- **Mara** (`/agents/mara`) is a browser-only scenario using fictional companies. Its steps are adapted from the public sample workflow in `C:\CodingProjects\StackWise\components\MaraDemo.tsx`. It does not call Mara's private Google Apps Script workspace.
- **Alfred** (`/agents/alfred`) is a scripted preview of briefing, file lookup and approval states. The live project is `C:\CodingProjects\ai-secretary-alfred`; its private files, calendar, mail, credentials and model providers are never exposed to this site.
- **AI Front Desk** (`/agent-demos/front-desk/index.html`) is a copy of the static production build from `C:\CodingProjects\ai-hotel-frontdesk\dist`. Its handoff is `PORTFOLIO_HANDOFF.md` in that project. The build runs entirely in the browser against fictional hotel data. The copied `index.html` adds `noindex, follow`; `/agents/front-desk` is the canonical explanatory page.

When refreshing the front desk demo, run the source project's `npm run verify`, replace only `public/agent-demos/front-desk/` with the new `dist/` contents, restore the `noindex, follow` meta tag, and run this portfolio's build, SEO QA and browser flow. Browser voice still requires a separate microphone and device check; typed requests are the reliable fallback.
