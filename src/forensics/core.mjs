import { createHash } from "node:crypto";

const SHA256 = /^[a-f0-9]{64}$/i;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;
const textField = (v, n) => {
  if (typeof v !== "string" || !v.trim()) throw new TypeError(n + " is required");
  return v.trim();
};
const timestamp = (v, n) => {
  if (typeof v !== "string" || !ISO.test(v) || Number.isNaN(Date.parse(v))) throw new TypeError(n + " must be ISO-8601 with timezone");
  return v;
};

export function sha256Hex(bytes) {
  if (!(bytes instanceof Uint8Array)) throw new TypeError("bytes must be a Uint8Array");
  return createHash("sha256").update(bytes).digest("hex");
}

export function registerEvidence(input) {
  const record = {
    caseId: textField(input.caseId, "caseId"),
    evidenceId: textField(input.evidenceId, "evidenceId"),
    sourceDescription: textField(input.sourceDescription, "sourceDescription"),
    acquisitionMethod: textField(input.acquisitionMethod, "acquisitionMethod"),
    acquiredAt: timestamp(input.acquiredAt, "acquiredAt"),
    collectedBy: textField(input.collectedBy, "collectedBy"),
    originalSha256: textField(input.originalSha256, "originalSha256").toLowerCase()
  };
  if (!SHA256.test(record.originalSha256)) throw new TypeError("originalSha256 must be a SHA-256 hex digest");
  return Object.freeze({
    ...record, evidenceState: "registered", originalPolicy: "immutable",
    analysisPolicy: "verified-working-copy-only", registeredAt: new Date().toISOString()
  });
}

export function createCustodyEvent(input) {
  const event = {
    evidenceId: textField(input.evidenceId, "evidenceId"),
    actorId: textField(input.actorId, "actorId"),
    action: textField(input.action, "action"),
    occurredAt: timestamp(input.occurredAt, "occurredAt"),
    previousEventHash: input.previousEventHash ?? null,
    details: input.details ?? {}
  };
  if (event.previousEventHash !== null && !SHA256.test(event.previousEventHash)) throw new TypeError("previousEventHash must be null or SHA-256");
  if (event.details === null || Array.isArray(event.details) || typeof event.details !== "object") throw new TypeError("details must be an object");
  return Object.freeze({ ...event, eventHash: createHash("sha256").update(JSON.stringify(event)).digest("hex") });
}

export function verifyCustodyEvent(event, expectedPreviousEventHash = null) {
  if (!event || event.previousEventHash !== expectedPreviousEventHash) return false;
  const { eventHash, ...payload } = event;
  if (typeof eventHash !== "string" || !SHA256.test(eventHash)) return false;
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex") === eventHash;
}

export function createFinding(input) {
  if (!["observation", "inference", "opinion"].includes(input.kind)) throw new TypeError("invalid finding kind");
  if (!Array.isArray(input.evidenceRefs) || input.evidenceRefs.length === 0) throw new TypeError("at least one evidence reference is required");
  if (!["low", "moderate", "high", "not-assessed"].includes(input.confidence)) throw new TypeError("invalid confidence");
  return Object.freeze({
    findingId: textField(input.findingId, "findingId"), caseId: textField(input.caseId, "caseId"),
    kind: input.kind, statement: textField(input.statement, "statement"),
    evidenceRefs: Object.freeze([...new Set(input.evidenceRefs.map((v) => textField(v, "evidenceRef")))]),
    method: textField(input.method, "method"), analystId: textField(input.analystId, "analystId"),
    confidence: input.confidence, limitations: textField(input.limitations, "limitations"),
    createdAt: timestamp(input.createdAt, "createdAt"), reviewState: "pending"
  });
}

export function evaluateReleaseGate(input) {
  const blockers = [];
  if (!input.caseLeadApproved) blockers.push("case-lead-approval-required");
  if (!input.refereeApproved) blockers.push("independent-referee-approval-required");
  if (input.criticalCustodyIssues !== 0) blockers.push("critical-custody-issues-unresolved");
  if (!Array.isArray(input.findings) || input.findings.length === 0) blockers.push("findings-required");
  else if (input.findings.some((f) => !Array.isArray(f.evidenceRefs) || f.evidenceRefs.length === 0)) blockers.push("all-findings-must-link-to-evidence");
  return Object.freeze({ releasable: blockers.length === 0, blockers: Object.freeze(blockers) });
}
