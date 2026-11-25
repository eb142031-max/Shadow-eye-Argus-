# n8n × Argus Orchestration Integration

**Role:** Workflow orchestration and connector layer.  
**Authority:** n8n is not the case system of record, evidence vault, forensic examination authority, or decision-maker.

## Why n8n belongs in Argus

n8n can connect Argus events to approved services, coordinate multi-step workflows, route notifications, schedule controlled jobs, and record workflow execution IDs. It can reduce custom glue code while keeping case governance in Argus.

## Recommended responsibility split

- **Argus application/API:** source of truth for case state, evidence metadata, custody, permissions, findings, approvals and audit records.
- **Evidence storage:** private, access-controlled object storage; immutable originals and verified working copies are managed here, not in n8n execution payloads.
- **n8n:** event orchestration, notifications, task routing, scheduled checks, controlled integrations and retry/error handling.
- **Forensic tools:** isolated, version-pinned analysis environments acting only on authorized working copies.
- **Human governance:** Case Lead authorization and independent Referee review remain explicit human decisions.

## Initial workflows

1. **Case intake routing:** receive a minimal case-created event; validate schema and idempotency key; create tasks for Case & Evidence; notify assigned Case Lead.
2. **Evidence registration:** accept evidence metadata and hash result from the authorized acquisition service; call Argus API to register; append custody event; never accept or store the original evidence binary in ordinary workflow execution data.
3. **Working-copy verification:** request an approved copy from the evidence service; compare expected SHA-256; stop and raise a critical alert on mismatch; write a verification record to Argus.
4. **Examination task dispatch:** after Case Lead authorization, route a task to the selected isolated analysis runner; pass case/evidence IDs and short-lived scoped references, not long-lived credentials or unrestricted storage access.
5. **Finding submission:** validate finding schema and evidence references; submit to Argus as pending review; notify Referee; no automated acceptance.
6. **Review and release:** notify Case Lead and Referee; require both approvals in Argus; n8n may orchestrate the release workflow only after Argus confirms the gate.
7. **Failure and custody alerts:** route workflow failures, hash mismatches, missing approvals and suspicious state transitions to designated humans; preserve execution IDs and sanitized error metadata.
8. **Knowledge capture:** only sanitized, approved procedures and lessons may flow into Vault/Forge; case-specific evidence and restricted personal data remain within case permissions.

## API and workflow contract

Use authenticated webhook triggers with built-in n8n credential types (header/JWT/basic as appropriate), TLS, strict schema validation, unique webhook paths, idempotency keys and explicit response codes. Separate test and production webhook URLs. Do not place secrets in node text fields or workflow exports.

For short actions, return a synchronous result. For long-running work, acknowledge with HTTP 202 and a correlation ID, then publish completion/failure events. Every fallible API/DB/HTTP node needs an explicit error path. Use structured 4xx for caller errors and 5xx for service failures; configure workflow-level error handling for unattended jobs. Retry only idempotent operations and transient errors, with bounded backoff.

## Data minimization and security

- Pass case IDs, evidence IDs, hashes, task IDs and short-lived opaque references.
- Do not pass original evidence bytes, disk images, memory dumps, malware samples, raw packet captures or full sensitive logs through n8n unless a separately assessed, explicitly approved binary-handling design exists.
- Avoid storing execution payloads containing sensitive case data; configure execution-data retention and redaction.
- Store credentials in n8n credential storage, rotate them, and use separate credentials/environments for development and production.
- Restrict who can edit workflows and access execution history.
- Use least privilege, allowlists where practical, and network segmentation between n8n, Argus APIs and analysis runners.
- Preserve n8n execution ID, workflow version, event ID, actor/service identity and outcome in Argus audit metadata.
- Do not let n8n retries create duplicate custody events; require idempotency and deduplication in Argus.

## Proposed integration event envelope

```json
{
  "eventId": "evt-unique-id",
  "eventType": "argus.evidence.registered",
  "schemaVersion": "1.0",
  "occurredAt": "2026-11-25T12:00:00Z",
  "caseId": "CASE-001",
  "evidenceId": "EVD-001",
  "actor": {"type": "service", "id": "authorized-acquisition"},
  "correlationId": "case-workflow-correlation",
  "payload": {
    "sha256": "64-character-lowercase-hex",
    "acquisitionRecordId": "acq-001"
  }
}
```

The event is a notification, not authority. Argus re-checks caller identity, case permissions, state transition, hash format, and idempotency before committing.

## Prime TRICELL recursive governance

n8n workflows are registered as implementation artifacts under the appropriate Lou Shu micro-mandala. Every workflow declares:
- Prime top-level domain and owning TRICELL/mandala/micro-mandala;
- accountable human owner and escalation route;
- input/output schema and data classification;
- permissions, credentials, environment and allowed side effects;
- idempotency, retry, timeout, error workflow and retention;
- test evidence, version, reviewer and approval status.

No workflow is Prime by virtue of being automated. Prime status belongs to the governed domain architecture and its ratified mandala structure. Child workflow instances inherit controls, not unrestricted authority.

## Deployment sequence

1. Implement Argus API contracts and authorization first.
2. Stand up a non-production n8n instance with synthetic data only.
3. Build case-intake and notification workflows.
4. Add evidence registration and hash-verification calls after API tests.
5. Add task dispatch to isolated analysis runners.
6. Add Referee and Case Lead notification/approval orchestration.
7. Review execution retention, secrets, network policy and failure handling before production.

## Not yet done

No n8n instance has been connected, no credentials have been created, no workflow has been imported or activated, and no case data has been transmitted. This document defines the integration design only.
