# Zeland journal — review build

Static Russian educational journal for App Zeland. No new registration, API, database, process or authentication cookies. The build writes a separate `/journal/` directory into the existing Vite output. Existing course routes and staff-issued accounts stay intact.

## Content and experience

- 24 original editorial articles in four topics; six step-by-step practices; three beginner routes.
- 49 rendered HTML pages: library, full article/practice pages, books, forum preview with editorial Q&A, open module, course, about, contact, saved materials and information pages.
- Forum preview: 32 searchable, filterable discussions in one feed (first expanded), 60 fictional profiles with mostly ordinary names and initial avatars. 160 user/editorial replies with variable thread depth, progressive expansion, reply-count sorting, name search, highlighted editorial replies and related articles/practices. One concise review disclosure follows the feed; fictional profiles must never be imported as real community accounts. Login, registration and profile are disabled previews for a future unified App Zeland account; no credentials are collected and no posting backend is connected.
- Three starter routes explain each step, pacing and reflection. All five classic books have companion reading lists, practices and forum links. Articles, discussions and practices connect bidirectionally, with contextual first-module invitations.
- Full text Russian search and filters run in the browser. The search index loads only on library/practice/saved pages.
- Browser-local bookmarks, notes, completion marks, lesson progress, reading theme, JSON export/import. Shared browser users can read local notes; these are not encrypted or synced. Clearing browser data removes them.
- Private questions prepare a Telegram message. The visitor sends it. No fake submission success or invented community activity.
- The open editorial lesson remains available without an account. `/learn/first-module/` previews the real first module curriculum with six lessons and assignments; original lesson media and future free access are not connected.
- Responsive school header, visible login/menu controls, topic index and separate full menu. All 24 articles have original topic-specific explanations, examples, questions and next steps (over 24,000 words total). Reading time is calculated at 155 words/minute, ranging from 5 to 15 minutes; no per-article fake duration override. Actual publication dates are retained in expandable material details, without backdating. Library topics and practices are interleaved.
- Six unique generated practice covers, worked examples, contextual step guidance, a short version, completion criteria, return prompts, reusable note templates and browser-local step checkboxes. The user-supplied embrace illustration is on the homepage. The real course cover comes from https://app.zeland.it.com/images/kod-smotritelya-cover.png.
- Prices ($95 / 7,900 RUB; $600 / 49,000 RUB), curriculum and introductory video were taken from `Gamber7778/watcher-code` at `3322c0e8700849f4d1f3c68ef7cdf373a4a7ff36`, reviewed 2026-11-21. Purchase goes to the existing sales site/team; this journal does not claim payment confirmation or grant access.
- Vadim Zeland is presented as the author of the underlying approach. His participation in this new resource is pending approval. No new personal quotes, testimonials, staff names or community statistics are fabricated.
- Generated engraving-style illustrations; fonts carried over from the existing site (Cormorant Garamond, Manrope). Articles are new editorial drafts, not excerpts or claims of scientific efficacy.

## Build

Requires Node 20+; no journal dependencies.

```sh
node --test journal/tests/*.test.mjs
node journal/build.mjs --out client/dist/journal --base /journal/
```

Run after the Vite build, because Vite empties `client/dist`. The integrated `client/package.json` build does both in order. This works on the existing deployment build runner; the production machine serves the generated files and performs no rendering.

To preview separately, use `--out dist --base / --origin https://your-preview-host.example`. `--origin` controls canonical and sharing URLs.

Draft is the default: all pages are `noindex,nofollow` and the sitemap is empty. `--published` enables public indexing only after approval. `/saved/`, `/account/` and the 404 remain noindex. A nested robots.txt cannot control the whole host; update the actual host root robots.txt when publishing.

## Serving on App Zeland

Recommended target: `https://app.zeland.it.com/journal/`. Existing deployment packages `client/dist`, including the generated journal. Confirm the existing Nginx static document root points to that directory. An explicit route prevents missing journal paths falling into the authenticated SPA:

```nginx
location = /journal { return 301 /journal/; }
location /journal/ {
    try_files $uri $uri/ =404;
}
```

Do not change the existing SPA or `/api/` locations. The optional `client/dist/journal/_headers` is for compatible static hosts; Nginx does not consume it. Set cache and security headers in the existing Nginx configuration as appropriate. Keep draft noindex headers until approved. No journal-specific server change has been applied by this PR.

## Load and performance

The existing course droplet is 1 CPU / 1 GB RAM. Static pages and browser search add no Node or SQLite workload per interaction. Compressed WebP illustrations and local fonts are cacheable; article covers use distinct imagery. Video loads only after a click from the existing Cloudinary URL. These characteristics reduce load, but are not a traffic-capacity guarantee; CPU, memory, bandwidth and traffic metrics were not available for a load assessment. A separate CDN/static host is an option if paid traffic grows.

## Analytics

GA4 `G-TBKC4J9949` matches the existing public site. Nothing is sent to GA before an explicit opt-in through **Настройки статистики**. Notes, questions and raw search strings are excluded. URL query strings are stripped; restricted UTM campaign fields are mapped separately. Revoke stops subsequent events, existing cookies can be removed in browser settings.

Events: `page_view`, `article_open`, `practice_open`, `article_scroll_depth`, `bookmark_toggle`, `library_search`, `library_filter`, `practice_timer_start`, `practice_completion_marked`, `lesson_start`, `lesson_step_marked`, `lesson_completion_marked`, `course_view`, `course_intro_play`, `team_question_open`, plus explicitly marked outgoing course links. Scroll and completion clicks are not evidence of reading or learning. No synthetic checkout/purchase events. Receipt in the GA account and cross-domain attribution remain to be verified by the account owner.

Advertising entry pages:

| Promise | Page |
| --- | --- |
| Reduce importance while keeping a goal | `/journal/articles/snizit-vazhnost/` |
| Try a three-minute observation practice | `/journal/practices/pauza-smotritelya/` |
| Review the introductory module curriculum | `/journal/learn/first-module/` |
| Try an open editorial exercise | `/journal/learn/pauza-i-vybor/` |

## Before public launch

Review the generated texts and working name, confirm Vadim's role and permitted presentation, current offers, refund terms and operator details. The review build retains its overall review status and one disclosure for fictional forum dialogues. Two user-supplied CRM/chat exports informed only broad topic selection; no raw exports, personal identities, direct quotes or identifiable stories are included in the source or deployment. There is no working public forum, moderation or response notification backend; the Q&A is marked editorial. Real discussions, staff-authored replies and account-synced progress can reuse the existing authenticated backend in a later change. Public payment automation is not added.

Run the journal tests and existing client tests/build before merge. Inspect mobile reading/search and a practice save/reload. Keep draft preview isolated until approval; merging the PR into main triggers the existing production deployment.
