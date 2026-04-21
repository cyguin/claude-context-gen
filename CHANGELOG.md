# Changelog

## 1.1.0

- Switched the language, framework, and testing prompts from free-text to numbered selections with an "Other" option:
  - Language: TypeScript, JavaScript, Python, Go, Rust, or custom.
  - Framework: React, Next.js, Node.js/Express, Vue, Svelte, or custom/none.
  - Testing: Vitest, Jest, Playwright/Cypress, None yet, or custom.
- Kept `UserAnswers` shape the same (`string` fields) so generators and output formats are unchanged.
- Improved package manager prompt labels to show numbers (1) npm, 2) yarn, etc.) for a consistent UX.

## 1.0.5

- Improved `README.md` with:
  - Clearer positioning (why to use it, how it helps AI coding assistants like Claude Code, Cursor, etc.).
  - Example snippets of generated `CLAUDE.md` and `AGENTS.md` content.
  - Editor / tool integration notes for better discoverability on npm.
- Added `keywords` and refined `description` in `package.json` for improved npm search ranking.
- No runtime behavior changes; CLI prompts and output format are unchanged.

## 1.0.4

- Added explicit `CHANGELOG.md` and updated README with security notes:
  - No network access (no HTTP calls).
  - Filesystem access restricted to CLAUDE/AGENTS files in the current working directory, with an overwrite prompt for existing files.
  - Minimal environment variable usage: `CLAUDE_MD_FILENAME`, `AGENTS_MD_FILENAME`, and optional `NPM_USERNAME`. No tokens or secrets required.
- No behavioral changes from 1.0.3; all tests still pass (46 tests across 6 files).

## 1.0.3

- Documented security posture in README:
  - No network access.
  - Filesystem access scoped to the two generated files in the cwd with overwrite confirmation.
  - Minimal environment variable usage for filenames and optional metadata.
- No code changes to the CLI runtime; documentation-only release.

## 1.0.2

- Switched build from `tsup` bundle to plain `tsc` compilation for clearer, auditable JS output.
- Excluded test files from the `dist/` output via `tsconfig.json`.
- Kept `@clack/prompts@0.7.0` and `dotenv@^16.6.1` as runtime dependencies, not bundled.
- `npm publish --dry-run` clean with 0 warnings; all tests passing.

## 1.0.1

- Added `README.md` with usage, configuration, and basic documentation.
- No functional changes to the CLI behavior compared to 1.0.0.

## 1.0.0

- Initial public release:
  - Interactive `@clack/prompts`-based CLI.
  - Generates `CLAUDE.md` and `AGENTS.md` based on seven project questions.
  - Overwrite protection for existing `CLAUDE.md` / `AGENTS.md` files.
