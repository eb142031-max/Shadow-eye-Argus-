import test from "node:test";
import assert from "node:assert/strict";
import { createCustodyEvent, createFinding, evaluateReleaseGate, registerEvidence, sha256Hex, verifyCustodyEvent } from "../src/forensics/core.mjs";

const at = "2026-11-25T12:00:00Z";
const digest = "a".repeat(64);

test("registers evidence with immutable original and working-copy boundary", () => {
  const r = registerEvidence({ caseId:"C1", evidenceId:"E1", sourceDescription:"Synthetic disk", acquisitionMethod:"Lab fixture", acquiredAt:at, collectedBy:"analyst-1", originalSha256:digest });
  assert.equal(r.originalPolicy, "immutable");
  assert.equal(r.analysisPolicy, "verified-working-copy-only");
  assert.equal(r.evidenceState, "registered");
  assert.throws(() => { r.evidenceState = "changed"; }, TypeError);
});

test("rejects incomplete provenance and malformed digests", () => {
  assert.throws(() => registerEvidence({ caseId:"C1" }), /evidenceId is required/);
  assert.throws(() => registerEvidence({ caseId:"C1", evidenceId:"E1", sourceDescription:"x", acquisitionMethod:"y", acquiredAt:at, collectedBy:"z", originalSha256:"bad" }), /SHA-256/);
});

test("computes SHA-256 over bytes", () => {
  assert.match(sha256Hex(new TextEncoder().encode("argus")), /^[a-f0-9]{64}$/);
  assert.throws(() => sha256Hex("argus"), /Uint8Array/);
});

test("custody events form a verifiable append-only hash chain", () => {
  const first = createCustodyEvent({ evidenceId:"E1", actorId:"a1", action:"registered", occurredAt:at, details:{source:"lab"} });
  const second = createCustodyEvent({ evidenceId:"E1", actorId:"a2", action:"working-copy-issued", occurredAt:"2026-11-25T12:05:00Z", previousEventHash:first.eventHash });
  assert.equal(verifyCustodyEvent(first), true);
  assert.equal(verifyCustodyEvent(second, first.eventHash), true);
  assert.equal(verifyCustodyEvent(second, "f".repeat(64)), false);
});

test("findings require evidence links and limitations", () => {
  const f = createFinding({ findingId:"F1", caseId:"C1", kind:"observation", statement:"Synthetic process created file", evidenceRefs:["E1"], method:"Timeline review", analystId:"a1", confidence:"moderate", limitations:"Synthetic fixture", createdAt:at });
  assert.equal(f.reviewState, "pending");
  assert.throws(() => createFinding({ findingId:"F2", caseId:"C1", kind:"inference", statement:"Unlinked", evidenceRefs:[], method:"review", analystId:"a1", confidence:"low", limitations:"none", createdAt:at }), /evidence reference/);
});

test("release requires case lead and independent referee approval", () => {
  const findings = [{ evidenceRefs:["E1"] }];
  assert.deepEqual(evaluateReleaseGate({ caseLeadApproved:true, refereeApproved:false, criticalCustodyIssues:0, findings }), { releasable:false, blockers:["independent-referee-approval-required"] });
  assert.equal(evaluateReleaseGate({ caseLeadApproved:true, refereeApproved:true, criticalCustodyIssues:0, findings }).releasable, true);
});
