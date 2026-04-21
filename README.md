> ⚠️ This package has moved to [@cyguin/claude-context-gen](https://www.npmjs.com/package/@cyguin/claude-context-gen). Please update your dependency.

# claude-context-gen

Generate high-quality `CLAUDE.md` and `AGENTS.md` context files for AI coding assistants from a short interactive CLI.

- 🧠 **Optimized for Claude Code and other AI agents**
- 📝 **Standardizes project rules and workflow** in a single place
- ⚙️ **Zero-setup**: run once per repo, commit the files, and every AI tool gets the same context

## Install & Usage

You can run it via `npx` without installing:

```sh
npx claude-context-gen
```

Or add it as a dev dependency:

```sh
npm install --save-dev claude-context-gen
npx claude-context-gen
```

No project configuration required. Run it from the root of any repo.

## What it does

The CLI asks you seven questions about your project:

- Primary language
- Main framework or library
- Testing setup
- Package manager
- CI/CD provider
- Workflow preferences
- Brief project description

Then it writes two files into the current directory:

- **`CLAUDE.md`** — instructions for Claude Code (includes `@AGENTS.md` import, behavioral rules, and conditional test discipline)
- **`AGENTS.md`** — instructions for other AI agents and tools (stack, workflow, conventions, done conditions)

If either file already exists, you’ll be prompted before overwrite.

## Why use this?

Most AI coding tools work better when they have a clear, project-specific contract. This CLI:

- Gives **Claude Code**, Cursor, VS Code extensions, and other AI agents a consistent view of:
  - Tech stack and frameworks
  - Testing setup and expectations
  - CI/CD and deployment details
  - Behavioral rules ("never auto-commit", etc.)
- Reduces repeated “Here’s how this project works…” explanations in chat
- Makes it easy for new contributors (human or AI) to get up to speed

Commit the generated files once, and every AI tool in your editor can read them.

## Example (truncated)

A generated `CLAUDE.md` might start like:

```md
@AGENTS.md

# Claude Instructions

## Project Overview

This project is a TypeScript/React app using Vite and Vitest.
...
```

And `AGENTS.md` might include sections like:

```md
# Agents

## Stack
- Language: TypeScript
- Framework: React
- Testing: Vitest
...

## Workflow
- Never auto-commit. Only commit when explicitly asked.
- Ask before installing new dependencies.
...
```

The exact content is derived from the answers you give in the prompt flow.

## Configuration

Configuration is optional. By default, the CLI writes `CLAUDE.md` and `AGENTS.md` in the current directory.

To customize filenames or add an npm username into generated metadata, copy `.env.example` to `.env` and edit:

```sh
# Output filenames (defaults shown)
CLAUDE_MD_FILENAME=CLAUDE.md
AGENTS_MD_FILENAME=AGENTS.md

# Your npm username (used in generated metadata, optional)
NPM_USERNAME=your-username
```

## Security notes

- **No network access**: the CLI does not make HTTP requests or talk to external services.
- **Filesystem access is scoped**: it only reads/writes the configured `CLAUDE.md` / `AGENTS.md` paths in the current working directory (with an overwrite prompt if files exist).
- **Environment variable usage is minimal**: it reads `CLAUDE_MD_FILENAME`, `AGENTS_MD_FILENAME`, and `NPM_USERNAME` to control filenames and optional metadata; no secrets or tokens are required.

These behaviors can trigger generic "filesystem" and "environment variable" alerts in automated scanners, but are expected for an interactive CLI that writes project documentation.

## Editor / tool integration

`CLAUDE.md` and `AGENTS.md` can be consumed by many tools, including:

- **Claude Code** (VS Code, JetBrains, Neovim) via `CLAUDE.md`
- **Cursor** and other AI-first editors that read project context files
- Custom scripts or bots that want a structured description of your stack and rules

Once generated, commit the files to your repo so every collaborator and tool can use them.

## Requirements

- Node.js 18+

## License

MIT — cyguin LLC
