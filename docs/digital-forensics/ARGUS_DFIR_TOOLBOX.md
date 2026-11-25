# Argus Digital Forensics Toolbox

**Status:** Foundation slice; not a validated forensic product.  
**Owner:** Argus capability platform.  
**Operational bridge:** Investigative Operations TRICELL.  
**Governance:** EYE-TRI IMPERIUM / Nexus Imperium.

## Architecture boundary

Argus supplies investigative capabilities. Shadow Imperium remains the agency/operational layer. The Investigative TRICELL remains the casework bridge with Case & Evidence, Reconstruction, and Presentation cells. This toolbox does not merge with the separate Shadow Sentry University Teachers Toolbox TRICELL.

## Capability modules

1. Evidence intake and preservation: source registration, acquisition metadata, SHA-256, immutable-original policy, verified working-copy references.
2. Endpoint forensics: Windows and Linux artifact examination, registry, filesystem, execution, persistence and user-activity artifacts.
3. Disk and file-system forensics: image examination, file-system metadata, deleted-file review and timeline inputs.
4. Memory forensics: memory image registration, Volatility analysis references, process/module/network artifact findings.
5. Network and log forensics: packet/log source registration, time normalization, correlation and provenance.
6. Malware triage: isolated analysis workflow; never automatically execute untrusted samples in the Argus application.
7. Timeline and incident reconstruction: normalized events, source links, competing hypotheses and uncertainty.
8. Reporting and peer review: claim-to-evidence links, methodology, limitations, confidence, Case Lead sign-off and independent Referee review.
9. Capability and competency catalogue: tool registry, analyst skills, TryHackMe/HTB learning references and practical assessment records.

## EYE-TRI cell ownership

- **Argus Governance — Case Lead:** defines case scope, assigns work, accepts risk, and approves release/closure.
- **Argus Governance — Specialist:** performs assigned examination on authorized copies; records tools, versions, methods, findings and limitations.
- **Argus Governance — Referee:** independently challenges evidence support, methods, alternative hypotheses and conclusions.
- **Investigative Operations — Case & Evidence:** source of record for authority, intake, original preservation, hashes, custody and working-copy issuance.
- **Investigative Operations — Reconstruction:** owns timelines, event models and Blender scene requests.
- **Investigative Operations — Presentation:** produces reports and exhibits, distinguishing observation, inference and opinion.
- **Knowledge & Production — Vault:** approved references, tool profiles, templates and sanitized knowledge.
- **Knowledge & Production — Forge:** validated playbooks, collection profiles, analytic procedures and test fixtures.
- **Knowledge & Production — Persona:** scoped specialist assistants; no independent authorization or final determinations.

## Evidence lifecycle

received -> registered -> preserved -> working-copy-issued -> examined -> reviewed -> released-or-archived

The original is never an analysis target. A working copy must be tied to the original evidence ID and verified hash. Custody events are append-only and hash-linked. Corrections create new events; they do not rewrite history.

## Finding contract

Every finding records finding/case IDs, classification (observation, inference, opinion), statement, one or more evidence references, method and tool/version, analyst identity, confidence, limitations, review state and reviewer decision. A conclusion without evidence references cannot pass the release gate.

## Initial tool catalogue

The machine-readable starter catalogue is in catalogue/dfir-tools.json. It includes Autopsy, KAPE, Volatility, Velociraptor, FTK Imager, Redline and Blender. All are marked not validated in this project. Inclusion is not an endorsement, installation, or proof of forensic suitability.

TryHackMe and Hack The Box are learning/assessment references only. Store user-authorized module references, analyst notes and competency evidence; do not scrape or reproduce proprietary lab content.

## Blender boundary

Blender is a derived reconstruction/presentation studio, not an acquisition utility or evidence store. It receives sanitized manifests and approved working-copy references. Every scene element must be tagged as measured, source-derived, estimated, inferred, or illustrative. Preserve the native project, export manifests, versions, assumptions, uncertainty and review record.

## Security and governance requirements

- Named human Case Lead for each case.
- Independent Referee review for consequential findings and release.
- Least-privilege, case-scoped access; time-bound specialist access.
- Immutable originals and verified working copies.
- Append-only audit and custody events.
- Hashes for originals, working copies, exports and released exhibits.
- Tool/version registry with validation status and known limitations.
- No autonomous evidence collection, destructive actions, legal-authority decisions or final determinations by AI agents.
- Pilot with synthetic/lab fixtures until authorization, storage, access controls and operational validation are complete.

## Implementation stages

1. **Foundation (this branch):** evidence metadata contract, SHA-256 helper, hash-linked custody event, traceable finding contract, dual-approval release gate, initial tool catalogue and tests.
2. **Persistence:** case/evidence/custody/finding schema with row-level authorization, append-only controls and private object storage. Do not connect to a live project until its ownership and schema target are explicitly confirmed.
3. **Adapters:** controlled interfaces for forensic tools; no direct write access from tools to originals.
4. **DFIR workflows:** synthetic Windows/Linux/disk/memory/log fixtures and repeatable procedures.
5. **Reconstruction:** Blender manifest importer/exporter and reproducibility checks.
6. **Presentation:** report/exhibit builder and Referee review queue.

## Current limitations

This foundation does not acquire devices, mount evidence, execute forensic tools, provide a secure evidence vault, enforce storage immutability, authenticate users, or provide production authorization. Those controls require the persistence and application layers. The in-memory registration object is a contract, not a substitute for storage enforcement.
