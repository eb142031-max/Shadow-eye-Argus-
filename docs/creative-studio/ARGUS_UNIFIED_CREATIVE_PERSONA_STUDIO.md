# Argus Unified Creative & Persona Studio

**Status:** Approved architectural direction; implementation not yet started.
**Parent:** Argus / EYE-TRI IMPERIUM.
**Purpose:** One proprietary, modular, cross-platform application that coordinates visual production, 3D reconstruction, AI/persona creation, personality modelling and relationship simulation.

## 1. Product decision

Build a single Argus application shell with a consistent workspace, project system, identity and access controls, asset registry, workflow engine and module marketplace/registry. Its modules are integrated behind one interface, but heavyweight creative engines remain replaceable services/adapters rather than being indiscriminately fused into one executable.

The application and its original code, UX, schemas, orchestration, persona definitions, relationship models and workflows are proprietary to the project, subject to contributor and third-party rights. Third-party engines retain their own licences and notices.

## 2. Core modules

### A. Visual Studio — GIMP integration
- Image editing, retouching, compositing, layer-based graphics, texture preparation, thumbnails, promotional artwork and visual evidence annotations.
- Launch and control GIMP as a separately installed/packaged process through supported command-line or procedural-database interfaces and documented interchange formats.
- Preserve editable source projects, exports, input asset references, hashes, author, timestamps and version metadata.
- Do not copy GIMP GPL application code into the proprietary host or create a tightly linked derivative. GIMP's own licence notes describe invocation through its PDB serial protocol as mere aggregation; validate the exact integration and distribution model before shipping.

### B. 3D & Reconstruction Studio — Blender integration
- 3D scenes, spatial reconstruction, environments, objects, camera/sightline studies, movement paths, timelines, scenario comparisons, animation and training visualizations.
- Run Blender as a separate engine/process using files, command-line jobs and documented interchange formats.
- Keep native .blend files and exports with provenance, hashes, Blender/add-on versions, assumptions and reviewer details.
- Clearly label measured, source-derived, estimated, inferred and illustrative scene elements.
- Do not embed Blender source or Blender Python API calls in proprietary host modules. Maintain process and data boundaries; review each add-on and distribution licence.

### C. AI Character & Persona Studio — Neo AI adapter + Persona Forge
- Add Neo AI as a provider/engine adapter, subject to confirming its exact product, API, licensing, export and local/cloud capabilities.
- Persona Forge is the native canonical persona system: identity, voice, appearance references, expertise, skills, motivations, values, temperament, communication style, boundaries, memory policy, objectives, operating permissions, relationships and version history.
- Dark Leyla is a named persona/profile managed by Persona Forge, not a separate uncontrolled source of truth. Her canon, visual identity, voice, behavioural rules and relationship state are versioned and governed in the project registry.
- Support provider portability: persona definitions and project data remain in Argus-owned schemas; provider-specific prompts, assets and capabilities are adapters.

### D. Personality & Relationship Matrix — 9 × 9 × 9
- Preserve the requested three-dimensional 9×9×9 matrix as a first-class Persona Forge subsystem (729 addressable coordinate positions).
- The three axes and their nine categories each must be taken from the user's established matrix specification; do not invent or silently rename them.
- Each coordinate can hold a typed relationship/personality state, rules, weights, triggers, context constraints, evidence/provenance, confidence, effective dates and review history.
- Support sparse population, inheritance, scenario simulation, change comparison and audit trails; an empty coordinate is not an implied relationship.
- Matrix output informs persona behaviour but cannot override permissions, safety boundaries, project governance or explicit human direction.
- Store relationship states as structured data, not only as prompt text. Provide visual 3D/graph/heatmap and Lou Shu-compatible views.

### E. Asset & Project Vault
- Unified asset registry for image, video, audio, 3D, documents, prompts, persona profiles, matrix versions, project files and generated outputs.
- Track originals separately from derivatives; hashes, provenance, licences, consent/usage rights, source references, versions and access events.
- Link assets to cases, productions, personas, scenes, courses or campaigns without merging their separate authorities or data boundaries.

### F. Workflow & Automation Layer
- n8n may orchestrate approved workflows through authenticated, schema-validated APIs.
- Argus remains the system of record and permission authority. n8n is not an evidence store, persona authority or final decision-maker.
- Use idempotency keys, scoped credentials, audit events, bounded retries, error queues and explicit approval gates.

## 3. Application architecture

- **Desktop host:** one cross-platform desktop shell and shared workspace. Evaluate Electron and Tauri against GPU/3D performance, native process control, packaging, update strategy, accessibility and supported OS versions before choosing.
- **Core services:** project/workspace service, identity and roles, asset registry, module registry, job queue, event bus, provenance/audit service, persona service and matrix service.
- **Adapters:** GIMP, Blender, Neo AI and future image/video/voice providers. Adapters expose stable Argus contracts and can be replaced without redesigning the host.
- **Data:** versioned, documented schemas; local-first project workspace with optional synchronized backend; encrypted secrets; backup/restore and offline operation where practical.
- **Interface:** one navigation and project context, with dedicated workspaces for Visual Studio, 3D Studio, Persona Forge, Matrix Explorer and Vault.
- **Portability:** target Windows, macOS and Linux desktop builds first; make the UI responsive and keep APIs platform-neutral so a mobile/tablet companion can be added after the actual device/OS inventory is confirmed.

## 4. Boundaries and governance

- This is a creative/persona-production platform connected to Argus, not a reason to collapse the separate Shadow Sentry University Teachers Toolbox or the investigative case system into one authority.
- Investigative evidence remains governed by the DFIR evidence lifecycle: immutable originals, verified working copies, custody and review controls. Creative edits must never overwrite evidence originals.
- Persona and relationship simulations are fictional modelling tools; they do not create real-world consent, authority or access rights.
- Human approval is required for external publication, consequential actions, disclosure of sensitive material, provider account changes and any action outside a module's granted permissions.
- Every module declares owner, purpose, inputs/outputs, permissions, data classification, licence, audit events, failure mode and disable/rollback procedure.

## 5. Licensing and proprietary strategy

GIMP and Blender are GPL-licensed applications. The proprietary strategy is therefore **proprietary host + separately operating engines + documented adapters and file/protocol exchange**, not copying their GPL application code into a closed-source combined executable. GIMP's licensing notes specifically describe PDB serial-protocol invocation as mere aggregation; Blender's FAQ describes a proprietary product operating outside Blender, using no Blender source/API, producing data for Blender and executing Blender to operate on that data. These are useful architectural guides, not a substitute for reviewing the actual implementation and distribution with counsel.

Maintain a software bill of materials and per-component licence register. Review every plugin, add-on, library, model, dataset, font, asset and provider agreement before distribution. If the project later chooses to fork or modify GIMP/Blender and distribute those modifications, comply with the applicable GPL source and notice obligations; keep those components separately licensed.

## 6. Delivery sequence

1. **Architecture and inventory:** confirm exact Neo AI product/API and Dark Leyla assets/canon; identify target OS versions and hardware; define the three matrix axes from the user's canonical 9×9×9 specification; complete licence inventory.
2. **Host shell:** project/workspace navigation, module registry, identity/permissions, local asset vault, audit and settings.
3. **Creative adapters:** GIMP process integration and Blender job/scene integration; validate round trips and metadata.
4. **Persona Forge:** canonical persona schema, Dark Leyla profile, provider adapter and versioned persona registry.
5. **Matrix Explorer:** 9×9×9 structured storage, Lou Shu/3D/graph views, simulation, diff and governance.
6. **Automation:** authenticated n8n workflows with approvals, logs, retries and safe failure handling.
7. **Cross-platform packaging:** Windows/macOS/Linux installers, signing, update channel, offline mode, backups and test matrix; mobile companion only after OS inventory.
8. **Release gates:** security review, licence review, data migration/restore test, accessibility, performance and user acceptance.

## 7. Explicit open inputs (do not guess)

- Exact product/vendor meant by “Neo AI” and whether it exposes API, MCP, local runtime or export interfaces.
- Canonical names and definitions of all three axes and their nine categories in the 9×9×9 personality/relationship matrix.
- Dark Leyla's authoritative persona source files, approved references and version.
- Exact operating systems, versions and devices to support.
- Whether GIMP and Blender should be auto-detected as existing installations or installed/updated by an optional managed installer.

**Implementation note:** This document records the approved direction only. It does not claim GIMP, Blender or Neo AI are connected, installed, licensed for redistribution, or already merged into the running application.
