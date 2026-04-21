import type { UserAnswers } from '../types';

/**
 * Generate a CLAUDE.md string from collected user answers.
 *
 * Design rules:
 * - Always opens with `@AGENTS.md` on the first line so Claude Code imports
 *   the full agent rules document automatically.
 * - Adds Claude-specific behavioral rules that complement AGENTS.md.
 * - Conditionally adds a Test Discipline section when testingSetup is non-empty.
 * - Pure sync function: no async, no I/O, no side effects.
 */
export function generateClaudeMd(answers: UserAnswers): string {
  const testDisciplineSection = answers.testingSetup?.trim()
    ? `## Test Discipline\n\n- Run the relevant test suite after code changes.\n- Test runner: ${answers.testingSetup.trim()}\n- Do not mark a task done if tests are failing.`
    : '';

  const sections = [
    `@AGENTS.md`,
    `# Claude-Specific Instructions`,
    `## Behavioral Rules\n\n- Follow the project rules in AGENTS.md exactly.\n- Enter plan mode for non-trivial tasks before writing code; get confirmation before implementing.\n- Keep changes minimal and focused; do not refactor code outside the current task scope.\n- Do not add docstrings, comments, or type annotations to code you did not change.\n- Never auto-commit. Only create git commits when explicitly asked.\n- Ask before creating files that were not explicitly requested.`,
    testDisciplineSection,
  ];

  return sections.filter(Boolean).join('\n\n').trimEnd();
}
