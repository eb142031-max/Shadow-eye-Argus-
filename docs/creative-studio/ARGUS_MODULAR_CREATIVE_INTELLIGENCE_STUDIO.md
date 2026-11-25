# Argus Modular Creative Intelligence Studio

Status: approved architecture requirement; implementation not yet provisioned.

## Purpose
Deliver one proprietary, cross-platform application shell and orchestration layer for the user's operating systems. It coordinates specialist engines while preserving their independent execution, versioning, licenses, and replaceability.

## Core modules
- **Blender Studio Adapter** — 3D reconstruction, spatial visualization, animation, scene comparison, and training simulations. It is not the evidence source of record.
- **GIMP Imaging Adapter** — image preparation, annotation, compositing, redaction on working copies, and visual exhibit production. Preserve originals and record every transformation.
- **Neo AI Adapter** — connect the user's selected Neo AI capability through a documented provider interface; keep provider/model identity and version explicit.
- **Dark Leyla Core** — the named orchestration/persona intelligence layer; governs routing, context, tool selection, and user-facing coordination under explicit permissions.
- **Persona Forge** — create, version, test, and deploy specialist personas, instructors, agents, and character profiles.
- **Personality & Relationship Matrix** — core Persona Forge subsystem using a 9×9×9 tensor: three dimensions of nine factors each. Each factor needs a defined schema, scale, provenance, and validation method. Relationship outputs are modeled as hypotheses/creative state, not objective facts about real people.
- **ComfyUI Generation Adapter** — workflow execution, image/video generation where supported, model registry, queue/job state, artifact return, and run metadata.
- **RunPod Compute Adapter** — remote GPU execution provider for ComfyUI, replaceable by local or other cloud GPU providers without redesigning the app.
- **Project & Asset Vault** — project records, asset versions, hashes, source lineage, permissions, and export manifests.
- **Workflow/Automation Gateway** — optional n8n integration for asynchronous orchestration and notifications; Argus remains the system of record.

## Cross-platform application approach
Use a modular desktop shell (evaluate Tauri as the preferred lightweight cross-platform host) with a local service layer and provider adapters. Keep engine adapters behind stable interfaces and communicate with Blender/GIMP as separate processes or supported automation interfaces. Do not copy GPL application code into proprietary modules or link GPL components into a proprietary combined executable without a legal review. Blender and GIMP remain independently licensed applications; the proprietary value is the orchestration shell, adapters, project system, workflows, and original modules. Confirm each engine's current license and distribution obligations before packaging.

## RunPod + ComfyUI integration
Preferred first deployment shape: private RunPod GPU Pod with ComfyUI for interactive development; evaluate RunPod Serverless ComfyUI workers for burst workloads and scale-to-zero production jobs. The app calls a backend gateway, never the RunPod API directly from an untrusted desktop client.

Flow:
1. User selects a named, approved workflow and model profile.
2. Argus gateway checks authorization, policy, budget, input types, and model/workflow allowlist.
3. Gateway submits the workflow to ComfyUI/RunPod with a correlation ID and idempotency key.
4. Job service tracks queue, progress, failure, cancellation, and retry state.
5. Completed artifacts return through a controlled storage path; the app records hashes, prompt/workflow version, model/checkpoint identifiers, seed/settings where available, timestamps, provider job ID, and operator.
6. Asset Vault stores the artifact and its provenance manifest; the user reviews before publication or case use.

Security and operations:
- Keep RunPod API keys and ComfyUI credentials server-side in a secrets manager.
- Do not expose an unauthenticated ComfyUI port publicly. Require private networking or an authenticated reverse proxy.
- Use short-lived signed artifact URLs, scoped access, encryption, quotas, spend limits, concurrency limits, and idle shutdown.
- Pin container, ComfyUI, custom-node, workflow, and model versions; scan and allowlist custom nodes.
- Do not send case evidence, personal data, or confidential source material to remote inference without explicit authorization and an approved data-handling profile.
- Separate creative-generation assets from forensic evidence. Generated media is never silently treated as evidence.
- Maintain provider portability: Pod, Serverless, local ComfyUI, or another inference provider can implement the same adapter contract.

## Suggested adapter contracts
- capabilities() — provider features and supported media.
- validateWorkflow(workflow, modelProfile) — schema and policy validation.
- submitJob(workflow, inputs, context) — returns provider job ID and Argus job ID.
- getJob(jobId) — normalized status/progress.
- cancelJob(jobId) — best-effort cancellation.
- collectArtifacts(jobId) — validated artifact references and metadata.
- health() — readiness and capacity.

## Delivery stages
1. Architecture and threat model; confirm operating systems and selected Neo AI/Dark Leyla interfaces.
2. Local desktop shell and module registry; Blender/GIMP process adapters.
3. Persona Forge schema and 9×9×9 matrix editor/versioning.
4. ComfyUI local adapter and workflow registry.
5. RunPod private Pod integration; then optional Serverless worker.
6. Vault/provenance, permissions, audit trail, and n8n workflows.
7. Packaging, installer/update channel, cross-OS QA, license review, and recovery tests.

## Boundaries
This approval locks the design requirement only. It does not mean a RunPod account, GPU Pod, endpoint, model, ComfyUI instance, API key, Neo AI connection, or desktop build has been provisioned or deployed. No cloud resource should be created and no paid compute started without explicit deployment approval.
