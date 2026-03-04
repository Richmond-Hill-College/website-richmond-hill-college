# Test and Fix — Browser QA Loop

You are running the **Test and Fix** workflow: set up the project in a Cursor browser, test pages until an issue is found, fix it, then repeat until the site is error-free or the user needs to help.

---

## 1. Project setup

- **Dev server**
  - Check the `terminals` folder (e.g. `head -n 10 *.txt` in that folder) to see if a dev server is already running.
  - If no `next dev` (or `npm run dev`) is running, start it in the background:  
    `npm run dev` from the project root, and wait 2–3 seconds then confirm it’s up (e.g. "Ready" in output).
- **Base URL**  
  Use `http://localhost:3000` for English and `http://localhost:3000/fr` for French.

---

## 2. Browser: use an unused Cursor browser tab

- Prefer a **side** browser so the main editor stays free. When opening or navigating, use **`position: "side"`** so the browser opens in the side panel (“unused” cursor browser).
- Call **`browser_tabs`** with `action: "list"` to see open tabs and their URLs.
- If a tab already exists and shows the app, use **`browser_lock`** (with that tab’s `viewId` if needed), then continue testing.
- If no suitable tab exists, use **`browser_navigate`** with `url: "http://localhost:3000"` and **`position: "side"`** to open the app in a new side tab. Then **`browser_lock`** before any interactions.
- **Lock/unlock**: Always **`browser_lock`** before a sequence of interactions and **`browser_unlock`** when done with that round of testing.

---

## 3. Test loop (repeat until no issues or user steps in)

### 3.1 Build first (optional but recommended after fixes)

- After any code fix, run `npm run build` from the project root. If the build fails, fix the error and re-run the build before continuing browser tests.

### 3.2 Routes to test

Use `lib/sitemap-routes.ts` as the source of truth. Test in this order:

**English (base URL `http://localhost:3000`):**

1. `/` (home)
2. `/about-us`, `/about-us/team`
3. `/programs`, `/course-offerings`, `/bridging-programs`
4. `/bridge-canadian-certification`, `/canadian-certification-internationally-educated`
5. `/courses`, `/courses/categories`
6. `/products`, `/contact`, `/support`
7. `/faq`, `/faq/categories`
8. `/conferences`, `/conferences/nursing-and-healthcare-2025`
9. `/privacy-policy`, `/terms-of-service`, `/sitemap`
10. One course detail: `/courses/[slug]` (pick a real slug from the app/courses data)
11. One FAQ category/detail if applicable

**French (base URL `http://localhost:3000/fr`):**

- Same path structure under `/fr/`: e.g. `/fr`, `/fr/about-us`, `/fr/courses`, `/fr/contact`, etc. Test at least: `/fr`, `/fr/about-us`, `/fr/courses`, `/fr/contact`, `/fr/faq`, `/fr/conferences`.

You may test in batches (e.g. 5–8 routes per round) and note which routes were already verified.

### 3.3 For each route (or batch)

1. **Navigate**: `browser_navigate` to the full URL (e.g. `http://localhost:3000/about-us`) with `position: "side"` if you want to keep the browser in the side panel.
2. **Wait then snapshot**: Wait 1–2 seconds, then call **`browser_snapshot`** to confirm the page loaded and see structure. If the snapshot shows an error UI (e.g. error boundary, 404, or “Application error”), treat that as a failure.
3. **Console**: Call **`browser_console_messages`** and check for:
   - **error** or **warning** messages that indicate broken behavior (e.g. React hydration errors, uncaught exceptions, failed fetches).
   - Ignore benign messages (e.g. dev-only hints, third-party scripts) unless they clearly relate to the page content or navigation.
4. **Result**:
   - If there are **no** page or console issues for that route, mark it as passed and continue to the next route.
   - If there **is** an issue: note the route, the exact error text or snapshot evidence, then **fix the code** (and run `npm run build` if applicable), then re-test that route and continue the loop.

### 3.4 After fixing an issue

- Apply the fix in the codebase.
- Run **`npm run build`**; fix any build errors.
- Re-test the failing route (and optionally the next few routes) before continuing through the list.
- Keep going until all listed routes pass or the user asks to stop or help.

---

## 4. Stopping conditions

- **Success**: All critical routes (EN + FR samples above) load without page errors and without relevant console errors → report “Test and Fix complete; no issues found on tested routes.”
- **User intervention**: User says to stop, or asks to help with a specific issue → stop the loop and summarize what was found and what was fixed so far.
- **Blocked**: Dev server or build cannot be fixed in one go → report what’s blocking and what the user should do (e.g. run a command, fix env, or provide access).

---

## 5. What to report

- After each fix: briefly say which route failed, what the error was, and what you changed.
- At the end: list routes tested, which passed, and any remaining known issues or follow-ups.

---

## Quick reference (MCP)

- **browser_tabs** `action: "list"` — list tabs.
- **browser_navigate** `url`, `position: "side"` — open/navigate in side browser.
- **browser_lock** / **browser_unlock** — lock before interactions, unlock when done.
- **browser_snapshot** — page structure and refs.
- **browser_console_messages** — console errors/warnings.

Use this workflow every time the user runs the **Test and Fix** command so the site is exercised in a real browser until it’s error-free or the user takes over.
