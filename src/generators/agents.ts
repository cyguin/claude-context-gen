import type { UserAnswers } from '../types';

/**
 * Generate a structured AGENTS.md string from collected user answers.
 *
 * Design rules:
 * - Every interpolation site guards against empty strings.
 * - Optional sections (Testing, CI/CD) are omitted entirely when the
 *   corresponding answer is empty; they are never emitted as empty shells.
 * - Always-present sections (Stack, Workflow, What NOT to Do, Done Condition)
 *   fall back to safe placeholder text so no "undefined" can leak through.
 * - This is a pure sync function: no async, no I/O, no side effects.
 */
export function generateAgentsMd(answers: UserAnswers): string {
  const description = answers.projectDescription?.trim() || 'This project';
  const language = answers.language?.trim() || 'not specified';
  const framework = answers.framework?.trim() || 'not specified';
  const packageManager = answers.packageManager?.trim() || 'not specified';

  const testingSection = answers.testingSetup?.trim()
    ? `## Testing\n\n- Testing setup: ${answers.testingSetup.trim()}\n- Run tests before committing changes.\n- Prefer unit tests for pure functions and integration tests for API boundaries.`
    : '';

  const ciSection = answers.ciProvider?.trim()
    ? `## CI/CD\n\n- CI/CD provider: ${answers.ciProvider.trim()}\n- All checks must pass before merging pull requests.\n- Keep pipeline definitions in version control alongside source code.`
    : '';

  const workflowExtra = answers.workflowNotes?.trim()
    ? `\n\n**Project-specific workflow notes:** ${answers.workflowNotes.trim()}`
    : '';

  const sections = [
    `# Project Agent Rules\n\n${description}`,
    `## Stack\n\n- Language: ${language}\n- Framework: ${framework}\n- Package manager: ${packageManager}`,
    testingSection,
    ciSection,
    `## Workflow\n\n- Never auto-commit unless explicitly instructed.\n- Prefer small, focused changes over large refactors.\n- Respect existing code conventions and naming patterns.\n- Ask before installing new dependencies.${workflowExtra}`,
    `## What NOT to Do\n\n- Do not delete or overwrite files without explicit confirmation.\n- Do not make sweeping refactors outside the scope of the current task.\n- Do not add dependencies that were not requested.\n- Do not leave debug logging or temporary code in committed changes.\n- Do not assume missing context; ask when uncertain.`,
    `## Done Condition\n\n- The requested change is implemented and working.\n- Relevant tests pass (or new tests are written).\n- No new lint errors or type errors are introduced.\n- All modified files are clean and production-ready.`,
  ];

  return sections.filter(Boolean).join('\n\n').trimEnd();
}
