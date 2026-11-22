# School analytics

Production: https://zeland.it.com. Google Analytics stream: G-TBKC4J9949.

Analytics starts only after consent. Refusing consent must suppress both GA and school telemetry. Page location/referrer omit query strings; search text, profile fields and notes are not sent. UTM campaign fields are separately validated.

## Reports

In the matching GA property, use Realtime to validate a consented visit; Pages and screens for page paths; Traffic acquisition for sources; Events for interactions. Standard reports are not immediate. Counts omit people who decline analytics or block it.

| Event | Meaning |
| --- | --- |
| page_view | One page view per document in each destination |
| article_open / practice_open | A material was opened |
| page_scroll_depth | 25/50/75/90% of the page reached; not proof of reading |
| reading_progress | Article foreground active_seconds, depth_percent and end_reached; cumulative snapshots, never sum snapshots as total reading time |
| article_scroll_depth | Existing 90% article scroll signal |
| video_open / video_started | Video page opened / playback observed after consent |
| video_progress | Distinct watched coverage thresholds, progress_percent 25/50/75 |
| video_completed | At least 90% distinct coverage, NOT guaranteed 100% viewing or comprehension |
| video_unavailable | Player error |
| registration_start / login_start / course_enter | Click to app register/login/course, NOT successful registration |
| course_view | Learning program opened |
| school_navigation / video_next_step | Navigation to other school materials |
| practice_completion_marked | User-marked completion, not verified outcome |

The course introduction uses material_id video:course-intro. Seeking alone does not count as viewing. Coverage before consent is not counted.

## Verification and remaining boundaries

Node tests cover deduplication, consent, query removal, GA/server dispatch and video seeking. Production build validates TypeScript. Browser ingestion, GA property settings/custom dimensions, ad blockers and filters must be checked in GA. To break down custom events in Explorations, configure event-scoped dimensions for material_id, destination_path, topic, depth_percent and progress_percent as needed. Do not register visit_id as a high-cardinality dimension.

School events are also sent to https://app.zeland.it.com/api/school/events. Backend acceptance, per-user admin persistence, forwarding to Amplitude, registration completion and payment confirmation require separate server verification. Client tests do not prove these integrations work. Never create purchase or registration-success events from mere button clicks.
