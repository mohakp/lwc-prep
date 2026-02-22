# LWC.guide

A static blog with 21 first-principles articles for mastering Lightning Web Components at **expert-level proficiency**. Zero external dependencies — everything runs locally from the file system.

**Live site:** [https://mohakp.github.io/lwc-prep/](https://mohakp.github.io/lwc-prep/)

---

## Project Structure

```
lwc-prep/
├── README.md
├── LICENSE
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions: auto-deploys blog/ to GitHub Pages on push to main
└── blog/
    ├── index.html            # Homepage (article list, search, progress tracker)
    ├── style.css             # All styles (dark/light mode, responsive layout)
    ├── search.js             # Client-side search logic
    ├── progress.json         # Article metadata used by progress tracker
    ├── robots.txt            # Crawler permissions + sitemap reference
    ├── sitemap.xml           # XML sitemap for all 21 articles
    ├── .nojekyll             # Disables Jekyll so GitHub Pages serves files as-is
    ├── .well-known/
    │   └── security.txt      # Responsible disclosure contact info
    ├── articles/
    │   ├── 01-what-is-lwc.html
    │   ├── 02-web-standards.html
    │   ├── 03-component-structure.html
    │   ├── 04-decorators.html
    │   ├── 05-lifecycle-hooks.html
    │   ├── 06-template-directives.html
    │   ├── 07-shadow-dom-vs-light-dom.html
    │   ├── 08-component-communication.html
    │   ├── 09-salesforce-data.html
    │   ├── 10-navigation.html
    │   ├── 11-dynamic-components.html
    │   ├── 12-slds-styling.html
    │   ├── 13-security.html
    │   ├── 14-performance.html
    │   ├── 15-error-handling.html
    │   ├── 16-accessibility.html
    │   ├── 17-jest-testing.html
    │   ├── 18-deployment-targets.html
    │   ├── 19-advanced-patterns.html
    │   ├── 20-scenario-qa.html
    │   ├── 21-study-resources.html
    │   └── _article-template.html
    └── assets/
        ├── diagrams/             # SVG architecture diagrams
        │   ├── component-communication.svg
        │   ├── data-access-stack.svg
        │   ├── event-propagation.svg
        │   ├── lifecycle-execution-order.svg
        │   ├── lwc-vs-aura.svg
        │   └── shadow-dom-anatomy.svg
        ├── prism.min.js          # Syntax highlighting (bundled, no CDN needed)
        ├── prism.min.css
        ├── prism-javascript.min.js
        ├── prism-markup.min.js
        ├── prism-css.min.js
        ├── prism-json.min.js
        └── prism-apex.min.js
```

---

## Running Locally

The site is fully static — no build step, no npm, no server required. Pick **any one** of the options below.

### Option 1 — Python (quickest, built into most machines)

```bash
# from the repo root
cd lwc-prep/blog
python -m http.server 8080
```

Open **http://localhost:8080** in your browser.

### Option 2 — Node.js `http-server`

```bash
# install once (global)
npm install -g http-server

cd lwc-prep/blog
http-server -p 8080
```

Open **http://localhost:8080**.

### Option 3 — VS Code Live Server extension

1. Install the **Live Server** extension in VS Code.
2. Open the `blog/` folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.

The browser opens automatically and auto-reloads on file save.

### Option 4 — Open directly (no server)

For basic reading you can just double-click `blog/index.html` to open it in your browser.

> **Note:** The reading progress tracker uses `localStorage` to persist state across sessions. It works in all options above. The client-side search also works without a server.

---

## Deployment

The site is deployed automatically to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` triggers a deployment of the `blog/` directory to:

**https://mohakp.github.io/lwc-prep/**

No manual steps are required after merging to `main`.

---

## Features

| Feature | Details |
|---|---|
| **21 deep-dive articles** | Each 2,000–5,000 words, first-principles angle |
| **Reading progress tracker** | Persisted in `localStorage`; shown on homepage as a progress bar |
| **Dark / light mode** | Toggle in the top-right corner; preference saved in `localStorage` |
| **Client-side search** | Filters articles by title and tag instantly, no server needed |
| **Syntax highlighting** | Bundled Prism.js — JavaScript, HTML, CSS, JSON, Apex |
| **SVG diagrams** | 6 architecture diagrams embedded in articles |
| **Sticky table of contents** | On each article page for quick navigation |
| **Zero external dependencies** | No CDN calls; works fully offline |

---

## Article List

| # | Article | Key Topics |
|---|---|---|
| 01 | What is LWC? | History, engine, vs Aura |
| 02 | Web Standards Primer | Custom Elements, Shadow DOM, ES Modules |
| 03 | Component Structure | File anatomy, namespacing, slots |
| 04 | Decorators | @api, @track, @wire — internals & gotchas |
| 05 | Lifecycle Hooks | connectedCallback, renderedCallback, parent-child ordering |
| 06 | Template Directives | if:true, for:each, iterator, lwc:if, lwc:ref |
| 07 | Shadow DOM vs Light DOM | Styling piercing, slots, lwc:dom="manual" |
| 08 | Component Communication | Events, LMS, pubsub, @api methods |
| 09 | Salesforce Data | @wire LDS, uiRecordApi, imperative Apex |
| 10 | Navigation | NavigationMixin, PageReference types |
| 11 | Dynamic Components | lwc:component + lwc:is, lazy loading |
| 12 | SLDS Styling | Styling hooks, SLDS tokens, utility classes |
| 13 | Security | LWS, CSP, FLS, CRUD enforcement |
| 14 | Performance | Lazy loading, memoization, wire caching |
| 15 | Error Handling | errorCallback, boundary components, wire errors |
| 16 | Accessibility | ARIA, keyboard nav, focus management |
| 17 | Jest Testing | @salesforce mocks, wire adapters, async patterns |
| 18 | Deployment Targets | App page, record page, flow, communities |
| 19 | Advanced Patterns | Mixins, composable decorators, render strategies |
| 20 | Scenario Q&A | Expert interview / assessment scenarios with answers |
| 21 | Study Resources | Curated links, Trailhead paths, official docs |

---

## License

MIT — see [LICENSE](LICENSE).

Lightning Web Components (LWC) and Salesforce are trademarks of Salesforce, Inc. This site is an independent educational resource and is not affiliated with, endorsed by, or sponsored by Salesforce, Inc.

---

## Notes

- Reading progress is tracked **per article** — mark an article as read by clicking the button at the bottom of each article page.
- Progress resets if you clear browser storage; it is not synced across browsers.
- All files use relative paths, so the `blog/` folder can be moved anywhere as long as the internal structure is preserved.
