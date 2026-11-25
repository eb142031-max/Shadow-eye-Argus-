# Shadow-eye-Argus-

Argus is the intelligence and investigative capability platform supporting the Shadow Imperium investigative agency. The Investigative TRICELL is the operational casework bridge; EYE-TRI IMPERIUM preserves the nine-cell governance model.

## Digital Forensics Toolbox

The initial DFIR foundation is being developed on [feature/digital-forensics-toolbox](https://github.com/eb142031-max/Shadow-eye-Argus-/tree/feature/digital-forensics-toolbox).

- Architecture and controls: [docs/digital-forensics/ARGUS_DFIR_TOOLBOX.md](docs/digital-forensics/ARGUS_DFIR_TOOLBOX.md)
- Tool catalogue: [catalogue/dfir-tools.json](catalogue/dfir-tools.json)
- Evidence integrity core: [src/forensics/core.mjs](src/forensics/core.mjs)
- Automated tests: [tests/forensics.core.test.mjs](tests/forensics.core.test.mjs)

The foundation covers evidence registration metadata, SHA-256 hashing, hash-linked custody events, traceable findings, and Case Lead / independent Referee release gates. It is not yet a production evidence vault or a validated forensic workstation.

## Unified Creative & Persona Studio

The approved next architecture is a proprietary, cross-platform Argus application with modular workspaces and replaceable adapters for GIMP, Blender and Neo AI, plus native Persona Forge, Dark Leyla persona management, the 9×9×9 personality/relationship matrix, asset vault and n8n orchestration.

- [Unified Creative & Persona Studio architecture](docs/creative-studio/ARGUS_UNIFIED_CREATIVE_PERSONA_STUDIO.md)

GIMP and Blender are planned as separately operating engines behind documented adapters and file/protocol exchange, not as GPL source code copied into a closed-source host. This is an architecture decision, not a claim that those tools are already connected or installed.

## Architecture boundaries

- Shadow Imperium: investigative agency and operational layer.
- Argus: intelligence and investigative capability platform.
- Investigative TRICELL: Case & Evidence, Reconstruction, Presentation.
- Knowledge & Production TRICELL: Vault, Forge, Persona.
- Argus Governance TRICELL: Case Lead, Specialist, Referee.
- Shadow Sentry University Teachers Toolbox remains a separate TRICELL.
