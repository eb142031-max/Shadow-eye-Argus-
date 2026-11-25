# Shadow Imperium–Argus Investigative TRICELL
## Architecture compilation and foundation blueprint

**Status:** Architecture baseline / first build specification  
**Repository:** eb142031-max/Shadow-eye-Argus-  
**Branch:** architecture/investigative-tricell-foundation

## 1. Purpose and boundaries

Build a modular investigation and case-management platform for lawful, accountable research. The platform organizes cases, evidence, public-source research, incident reconstruction, analysis, and presentation. It supports human investigators and analysts; it does not autonomously determine identity, culpability, ownership, or wrongdoing.

Preserve the established boundaries:
- **Shadow Imperium** — investigative agency and operational layer.
- **Argus** — intelligence and investigative capability platform.
- **Investigative TRICELL** — operational bridge carrying casework from intake through reconstruction to presentation.
- **EYE-TRI IMPERIUM** — larger reusable master architecture integrating three distinct TRICELLs into nine cells. Do not collapse the University, Argus Governance, and Investigative TRICELL into one.
- **Shadow Sentry University** — separate education and instructional-production system. It may supply training and presentation assets through explicit interfaces.

## 2. The Investigative TRICELL

### Cell A — Case & Evidence Management
The system of record for matters, evidence, source records, tasks, decisions, and audit history.

Core capabilities:
- Case intake, purpose, scope, authority/consent basis, classification, owner, status, and retention schedule.
- Case workspace, participants, role-based access, tasks, deadlines, notes, and activity history.
- Evidence registry with stable evidence IDs, type, source, collector, collection time/time zone, acquisition method, original location, hash, handling history, and related case entities.
- Preserve originals as read-only; create working copies for annotation, transcription, redaction, or analysis.
- Provenance and chain-of-custody events: who handled an item, when, why, what changed, and where it was stored.
- Source register, source reliability notes, collection limitations, and rights/terms restrictions.
- Audit log for access, edits, exports, approvals, and disclosure.

### Cell B — Investigation & Incident Reconstruction
The analytical workbench that turns leads and evidence into testable explanations.

Core capabilities:
- Investigation objectives, scoped research plans, lead queues, task assignments, and hypothesis register.
- OSINT research runs with query, source, collection time, result, citation, and analyst notes retained.
- Source evaluation: origin, author/publisher, date, method, corroboration, conflicts, possible manipulation, and confidence/limitations.
- Entity and relationship graph linking people, organizations, accounts, domains, locations, events, and evidence items. Candidate links remain explicitly unconfirmed until reviewed.
- Chronology/timeline builder with time-zone normalization, time precision, source attribution, and conflicting-time handling.
- Incident reconstruction workspace: event sequence, competing hypotheses, supporting/contradicting evidence, assumptions, gaps, and alternative explanations.
- Geospatial/contextual analysis only where source and purpose support it; avoid exposing private residential or sensitive location data without a clear lawful basis.
- Analyst review and referee/quality-review checkpoints before conclusions are promoted.

### Cell C — Presentation & Testimony
The output and communication layer. It converts reviewed case material into understandable, traceable products.

Core capabilities:
- Bottom-Line-Up-Front (BLUF) brief and executive summary.
- Investigation report, case chronology, evidence index, source notes, exhibit list, and methodology/limitations section.
- Incident reconstruction walkthrough showing each step, evidence used, assumptions, alternatives, and unresolved questions.
- Visual timelines, relationship diagrams, maps where appropriate, and evidence boards.
- Briefing deck, printable dossier, PDF export, and accessible versions.
- Every factual statement maps back to evidence/source records; analyst interpretation is distinguished from established fact.
- Testimony/preparation mode may organize exhibits and questions but must not fabricate testimony or coach false statements.

## 3. Argus Governance TRICELL — role and review layer

Keep the previously established governance roles distinct from the Investigative TRICELL's three operational cells:
1. **Case Lead** — defines objectives, scope, priority, authorized purpose, assignments, and case decisions.
2. **Specialist** — performs a bounded task using a defined skill or domain workflow; returns findings, sources, confidence, and limitations.
3. **Referee** — performs independent quality review, checks provenance/corroboration, challenges unsupported inferences, and records approval, qualification, or rejection.

These are governance roles, not a replacement for the three Investigative TRICELL cells. Use least-privilege access and explicit human approval for consequential actions.

## 4. Shared platform engines

Build these as reusable services rather than hard-coding them into one cell:
- Identity, authentication, authorization, role and case-membership service.
- Case and matter registry.
- Evidence/object storage and immutable-original handling.
- Provenance, hash, custody, and audit event service.
- Document/media intake, OCR, transcription, metadata extraction, and safe preview.
- Search and source connector orchestration.
- OSINT workflow/skill runner with source-specific terms and limits.
- Entity resolution and relationship graph service.
- Timeline and event reconstruction service.
- Task/workflow and review/approval engine.
- Reporting, visualization, redaction, and export service.
- Retention, deletion, legal hold, and disclosure controls.
- Monitoring, error handling, and connector health.

## 5. OSINT capability catalogue

Start with public, lawful, purpose-limited research workflows. Each workflow must declare its question, permitted sources, required inputs, outputs, limitations, retention, and review requirements.

Initial capability groups:
- **Web and publication research:** advanced public-web search, news/adverse-media timeline, source archive, and citation capture.
- **Organization and business research:** public registries, corporate roles, filings, beneficial-ownership records where lawfully available, and vendor/due-diligence checks.
- **Public digital identity research:** username/profile discovery and public cross-link verification. Similar names or reused handles are leads, not proof of common identity.
- **Domain and infrastructure research:** domain registration, DNS, certificates, public IP/domain reputation, and defensive security context.
- **Image/video verification:** reverse-image lead discovery, metadata review, geolocation/context verification, manipulation checks, and source provenance. Visual similarity is not an identity finding.
- **Geospatial and event research:** public imagery, maps, weather/event context, and time/location corroboration where lawful and proportionate.
- **Document and data analysis:** extraction, deduplication, structured data review, spreadsheet analysis, and source comparison.
- **Protective and cyber research:** defensive exposure review, authorized asset inventory, and scoped bug-bounty/security work only with documented authorization.

Do not build unrestricted people-finding, doxxing, stalking, covert tracking, unauthorized account access, credential acquisition, or surveillance workflows. Do not infer sensitive traits. Personal-data investigations require a defined lawful purpose, necessity, minimization, access controls, and retention limits. Treat identity, phone, address, and account associations as candidate leads until independently corroborated and reviewed.

## 6. University integration — reuse, do not duplicate

Shadow Sentry University remains a separate education system. It can consume approved, sanitized case examples and generate learning products through these interfaces:
- **UDL:** accessibility, differentiated learning pathways, plain-language and multi-format explanations for investigative walkthroughs.
- **HYDRA Course Forge:** structured courses and guided incident-reconstruction/investigation modules.
- **Infographic Booklet/Manual Maker:** field guides, SOP manuals, checklists, evidence-handling guides, reconstruction workbooks, and printable case-study booklets.
- **Skill Forge:** short lessons for source evaluation, corroboration, timeline construction, evidence provenance, and report writing.
- **Persona Forge / Guardian Instructor Studio / HeyGen Instructor integration:** optional instructor-led demonstrations and narrated walkthroughs. These are instructional presentation tools, not evidence authorities.
- **Intake Desk (Knowledge Acquisition & Routing):** ingests reference manuals, standards, public training material, and approved knowledge assets into the University knowledge pipeline.

**Critical separation:** University reference knowledge and training material must not be silently mixed into a case's evidence record. A case evidence item needs its own provenance, source, acquisition event, and custody record. Reusable training examples must be sanitized and approved before export.

## 7. Data model — first-pass entities

- Case
- CaseParticipant / RoleGrant
- InvestigationObjective
- ResearchPlan / ResearchRun
- Source / SourceSnapshot
- EvidenceItem / EvidenceVersion
- CustodyEvent / AuditEvent
- Entity / EntityIdentifier
- Relationship / RelationshipAssertion
- Event / TimelineEntry
- Hypothesis / Assessment
- Lead / Task
- Finding / AnalystNote
- ReviewDecision
- Report / Exhibit / Export

All relationships and findings retain source references. Store time zone and time precision, not just a timestamp. Keep original evidence separate from derived artifacts and analyst interpretations.

## 8. Suggested delivery sequence

### Release 0 — Architecture and controls
Confirm case lifecycle, data model, roles, access rules, audit events, retention, and evidence-original/working-copy separation. Establish synthetic test fixtures and tests.

### Release 1 — Case & Evidence Foundation
Create case workspace, participants, tasks, evidence registry, file upload, hash calculation, source records, custody events, audit history, and basic PDF export. No automated person-identification claims.

### Release 2 — OSINT Workbench
Add source register, search/run records, public-web and organization research workflows, source capture, citations, analyst notes, and manual corroboration. Add connector adapters only after terms, access, costs, data handling, and provenance are reviewed.

### Release 3 — Entity Graph and Reconstruction
Add entities, candidate relationships, timeline, hypothesis matrix, contradiction tracking, incident reconstruction, and referee review.

### Release 4 — Presentation & Testimony
Add BLUF, evidence-linked reports, exhibit bundles, visual walkthroughs, accessible briefing products, and approved export.

### Release 5 — University learning bridge
Publish sanitized case studies to UDL/Course Forge/Booklet Maker and connect approved training outputs back as reference knowledge—not as case evidence.

## 9. Existing assets and repository audit — current findings

This is an inventory, not a claim that all components are production-ready:
- **Shadow-eye-Argus repository** — dedicated investigation-software repository. Its current README is only a short “Investigation software” placeholder. It is a clean home for the architecture and implementation foundation; no functioning case/OSINT platform was verified from the README.
- **Hydra Omega ecosystem repository** — the feature/argus-investigator-corps branch exists. The currently fetched branch README describes Guardian OS and the War of the 5 Crowns prototype, not an operational Argus investigator platform. Earlier project notes describe an Argus investigator-corps concept (Case Lead / Investigator / Referee, specialist personas, OSINT/source corroboration, entity graphs, provenance, human review, scoped delegation, and recursive TriCell/Lou Shu patterns); these details require a file-by-file branch audit before being treated as implemented code.
- **nexus-os2 repository** — README describes “Nexus OS 2 - Multi-tool Python operating system with Omega Hydra orchestration.” Treat as a candidate orchestration/code asset pending source and dependency audit; no investigative capability was verified from its README alone.
- **super-funicular** — separate Director Shadow/Fanvue workbench. Do not merge its creator workflow into the investigative platform except through intentional, separately scoped integrations.
- **Notion search** — connected workspace search returned no matching pages for the specific Argus/TRICELL terms in this audit. This does not prove no related material exists elsewhere.

## 10. External reference products to evaluate, not copy

- **Nexus by Next Sight (https://www.nexus-osint.ai/)** — agentic OSINT workspace with skill-based research, cited findings, case saving, relationship analysis on higher tiers, chain-of-custody options, and PDF exports. Useful as a workflow benchmark. Vendor claims, pricing, data residency, contractual terms, and access should be independently reviewed before procurement or integration.
- **OSINT Radar (https://osintradar.com/)** — public-source workflow/tool directory with a case-file handoff and browser-local utilities for some helpers. Useful as a discovery and workflow-reference benchmark, not an assumed backend dependency.
- **NITE ASP** — exact name not verified in current research. Do not create an integration or architecture dependency until the exact product spelling, URL, or reference is supplied.

## 11. Build principles

1. Preserve the three TRICELL identities and their independent operation.
2. Evidence is not the same thing as a lead, inference, training reference, or generated summary.
3. Every material finding must be traceable to its source and collection context.
4. Preserve originals; annotate working copies; record every custody and audit event.
5. Use confidence labels and explicit uncertainty; never convert a candidate match into a fact automatically.
6. Human review is required for consequential conclusions and external reports.
7. Apply lawful-purpose, data-minimization, least-privilege, retention, and security controls from the first release.
8. Prefer modular connectors and replaceable services over vendor lock-in.
9. Reuse University tools for education and presentation, but keep the University and investigative case system separate.
10. Keep synthetic fixtures separate from real case data in tests and demonstrations.
