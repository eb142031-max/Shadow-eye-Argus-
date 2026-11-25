# RunPod + ComfyUI Integration Contract

Status: approved target integration; no resources provisioned.

## Architecture
Argus is the control plane. A server-side RunPod adapter provisions/targets GPU compute and submits ComfyUI workflows. Desktop clients authenticate to Argus, not directly to RunPod.

## Deployment options
- Development: private RunPod GPU Pod using an official ComfyUI image/template, persistent network volume for models/workflows, and restricted access.
- Production/burst: RunPod Serverless ComfyUI worker for queued jobs and scale-to-zero where cold-start and model-loading tradeoffs are acceptable.
- Portability: local ComfyUI and alternate providers implement the same normalized job interface.

## API lifecycle
1. Validate user, project, media class, model profile, workflow allowlist, quota, and budget.
2. Create Argus job UUID + idempotency key.
3. Submit workflow to ComfyUI; store returned provider prompt/job ID.
4. Track queue and execution via API/WebSocket or serverless job status.
5. Retrieve output artifacts from controlled storage; validate MIME/type/size and hash.
6. Store artifact, hash, model/checkpoint identity, workflow version, seed/settings, timestamps, provider IDs, and actor in Asset Vault.
7. Mark complete only after artifact and provenance persistence succeed.

## Security baseline
- Secret keys server-side only; rotate and scope credentials.
- Private networking or authenticated reverse proxy; never expose raw unauthenticated ComfyUI endpoints.
- TLS in transit; encryption at rest; short-lived signed download URLs.
- Allowlist workflows, nodes, and model artifacts; pin image/container and node versions.
- No case evidence or confidential data to cloud inference without explicit case authorization and data classification approval.
- Apply spend caps, per-project quotas, concurrency caps, job timeouts, retries with backoff, and idle Pod shutdown.
- Log access and job metadata; avoid logging secrets or sensitive prompt contents.

## Normalized interface
submitJob, getJob, cancelJob, collectArtifacts, health, capabilities.
Every job carries Argus project/case context, correlation ID, idempotency key, data classification, model profile, workflow version, and retention policy.

## Official references
- RunPod ComfyUI Pod template and operational notes: https://github.com/runpod/runpod-plugins-official/blob/main/plugins/runpod/skills/runpod-templates/reference/comfyui.md
- RunPod ComfyUI Serverless deployment: https://www.runpod.io/blog/deploy-comfyui-as-a-serverless-api-endpoint
- RunPod worker-comfyui: https://github.com/runpod-workers/worker-comfyui
- ComfyUI HTTP/WebSocket routes: https://github.com/Comfy-Org/docs/blob/main/development/comfyui-server/comms_routes.mdx
