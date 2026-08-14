# claude-context-gen

Cyguin's agentic AI practice generates `CLAUDE.md` and `AGENTS.md` files from a short interactive CLI — the same context discipline we teach and ship in agentic AI training and consulting engagements. Run it once per repo, commit the output, and every AI agent starts with the same project context.

## Install & Usage

Run it via `npx` — no install needed:

```sh
npx claude-context-gen
```

Or add it as a dev dependency:

```sh
npm install --save-dev claude-context-gen
npx claude-context-gen
```

No config required. Run it from the root of any repo.

## What it does

The CLI asks seven questions about your project:

- Primary language
- Main framework or library
- Testing setup
- Package manager
- CI/CD provider
- Workflow preferences
- Brief project description

Then it writes two files into the current directory:

- **`CLAUDE.md`** — instructions for Claude Code (imports `@AGENTS.md`, behavioral rules, test discipline)
- **`AGENTS.md`** — instructions for other AI agents (stack, workflow, conventions, done conditions)

If either file exists, you get a prompt before overwriting.

## Why use this?

Agentic AI workflows are only as good as the context they start with. This CLI bakes your stack, conventions, and boundaries into files every agent reads first — a core practice from Cyguin's agentic AI training and consulting work. It:

- Gives Claude Code, Cursor, and other AI agents a consistent view of your project
- Removes the "here's how this project works" preamble from every new agent session
- Makes it easy for new contributors (human or AI) to get up to speed

Commit the files once. Every AI agent reads them.

## Example

A generated `CLAUDE.md` starts like:

```md
@AGENTS.md

# Claude Instructions

## Project Overview

This project is a TypeScript/React app using Vite and Vitest.
```

And `AGENTS.md` might include:

```md
# Agents

## Stack
- Language: TypeScript
- Framework: React
- Testing: Vitest

## Workflow
- Never auto-commit. Only commit when explicitly asked.
- Ask before installing new dependencies.
```

The exact content comes from the answers you give.

## Configuration

Optional. By default it writes `CLAUDE.md` and `AGENTS.md` in the current directory. To customize, copy `.env.example` to `.env`:

```sh
# Output filenames
CLAUDE_MD_FILENAME=CLAUDE.md
AGENTS_MD_FILENAME=AGENTS.md

# Used in generated metadata (optional)
NPM_USERNAME=your-username
```

## Security

- **No network access** — doesn't make HTTP requests or talk to external services
- **Filesystem is scoped** — only reads/writes the configured paths in cwd
- **No secrets required** — env vars control filenames and metadata only

These behaviors may trigger generic "filesystem" alerts in automated scanners, but they're expected for a CLI that writes project files.

## Requirements

- Node.js 18+

## License

MIT — cyguin LLC
