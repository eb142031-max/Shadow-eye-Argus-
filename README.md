# Shadow-eye-Argus-

Argus is the intelligence and investigative capability platform supporting the Shadow Imperium investigative agency. The Investigative TRICELL is the operational casework bridge; EYE-TRI IMPERIUM preserves the nine-cell governance model.

## Digital Forensics Toolbox

The initial DFIR foundation is being developed on [feature/digital-forensics-toolbox](https://github.com/eb142031-max/Shadow-eye-Argus-/tree/feature/digital-forensics-toolbox).

- Architecture and controls: [docs/digital-forensics/ARGUS_DFIR_TOOLBOX.md](docs/digital-forensics/ARGUS_DFIR_TOOLBOX.md)
- Tool catalogue: [catalogue/dfir-tools.json](catalogue/dfir-tools.json)
- Evidence integrity core: [src/forensics/core.mjs](src/forensics/core.mjs)
- Automated tests: [tests/forensics.core.test.mjs](tests/forensics.core.test.mjs)

The foundation covers evidence registration metadata, SHA-256 hashing, hash-linked custody events, traceable findings, and Case Lead / independent Referee release gates. It is not yet a production evidence vault or a validated forensic workstation.

## Architecture boundaries

- Shadow Imperium: investigative agency and operational layer.
- Argus: intelligence and investigative capability platform.
- Investigative TRICELL: Case & Evidence, Reconstruction, Presentation.
- Knowledge & Production TRICELL: Vault, Forge, Persona.
- Argus Governance TRICELL: Case Lead, Specialist, Referee.
- Shadow Sentry University Teachers Toolbox remains a separate TRICELL.
