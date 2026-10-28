# Course offer refresh — review before release

Base: c2f52cac4480ae0901df91d9845bf8594dfb21a1. This PR does not deploy or change the live offer.

## Visitor experience

The opening section now explains the practical context and offers two clear routes. A light request selector connects three common situations to existing lesson titles in module 1; it does not collect personal data or diagnose visitors. Module anchors open the relevant accordion. Existing photography uses Next Image, responsive sizes and priority loading. Keyboard focus and reduced-motion preferences are supported.

Two format cards explain the difference in personal involvement, keeping the existing prices and terms. Each has USD and RUB actions. Valid configured checkout URLs open directly; missing/invalid URLs explicitly request a payment link through Telegram with the format and currency prefilled. No payment or access success is asserted.

## Configuration before release

Four current payment URLs must be supplied by the owner: CHECKOUT_SELF_USD, CHECKOUT_SELF_RUB, CHECKOUT_PERSONAL_USD, CHECKOUT_PERSONAL_RUB. See .env.example. These are public destinations, not secrets. Because the homepage is statically generated, configure them before building and rebuild after any change. No working current four-link set was found; old Stripe placeholders and a historical Tribute link were deliberately not activated.

The course passport dated October 25 marks later lessons as planned; the AI-generated October 27 knowledge file describes them as present. The current landing already displays the full planned syllabus. This PR preserves that scope, softens outcome language, and does not certify that every lesson is published. Check the production platform's actual publication state and homework text before release. The live database and payment ledger were not available for this audit.

The platform article-offer settings use independent EUR/RUB values while this landing uses USD/RUB. They are separate offers until the owner confirms a shared product mapping. Do not automatically convert currencies or copy article prices into course cards.

## Validation

Production build, TypeScript and payment mapping tests. Existing JSX quote lint errors corrected. One pre-existing unused variable warning remains in exit1/page.tsx. Cloud browser cannot reach this local preview (connection refused); responsive visual verification in a browser remains a release check. No claim of completed mobile visual QA.
