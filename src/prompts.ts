import type { UserAnswers } from './types';

export async function runPrompts(): Promise<UserAnswers> {
  const p = await import('@clack/prompts');

  p.intro('claude-context-gen - Generate CLAUDE.md and AGENTS.md');

  const answers = await p.group(
    {
      language: async () => {
        const choice = await p.select({
          message: 'What is the primary programming language?',
          options: [
            { value: 'TypeScript', label: '1) TypeScript' },
            { value: 'JavaScript', label: '2) JavaScript' },
            { value: 'Python', label: '3) Python' },
            { value: 'Go', label: '4) Go' },
            { value: 'Rust', label: '5) Rust' },
            { value: 'other', label: '6) Other (custom)' },
          ],
        });

        if (!choice || p.isCancel(choice)) return '';
        if (choice === 'other') {
          const custom = await p.text({
            message: 'Enter the primary language:',
            placeholder: 'TypeScript',
          });
          return p.isCancel(custom) ? '' : custom;
        }

        return choice;
      },
      framework: async () => {
        const choice = await p.select({
          message: 'What is the main framework or library?',
          options: [
            { value: 'React', label: '1) React' },
            { value: 'Next.js', label: '2) Next.js' },
            { value: 'Express', label: '3) Node.js / Express' },
            { value: 'Vue', label: '4) Vue' },
            { value: 'Svelte', label: '5) Svelte' },
            { value: 'none', label: '6) None / custom' },
          ],
        });

        if (!choice || p.isCancel(choice)) return '';
        if (choice === 'none') {
          const custom = await p.text({
            message: 'Enter the main framework or library (or leave blank):',
            placeholder: 'React, Next.js, Express, none...',
          });
          return p.isCancel(custom) ? '' : custom;
        }

        return choice;
      },
      testingSetup: async () => {
        const choice = await p.select({
          message: 'How is testing set up?',
          options: [
            { value: 'Vitest', label: '1) Vitest' },
            { value: 'Jest', label: '2) Jest' },
            { value: 'Playwright / Cypress', label: '3) Playwright / Cypress (E2E)' },
            { value: 'None', label: '4) None yet' },
            { value: 'other', label: '5) Other (custom)' },
          ],
        });

        if (!choice || p.isCancel(choice)) return '';
        if (choice === 'other') {
          const custom = await p.text({
            message: 'Describe your testing setup:',
            placeholder: 'Vitest, Jest, Playwright, none...',
          });
          return p.isCancel(custom) ? '' : custom;
        }

        return choice;
      },
      packageManager: async () => {
        const choice = await p.select({
          message: 'Which package manager?',
          options: [
            { value: 'npm', label: '1) npm' },
            { value: 'yarn', label: '2) yarn' },
            { value: 'pnpm', label: '3) pnpm' },
            { value: 'bun', label: '4) bun' },
          ],
        });

        return p.isCancel(choice) ? '' : choice;
      },
      ciProvider: async () => {
        const value = await p.text({
          message: 'CI/CD provider (or leave blank)?',
          placeholder: 'GitHub Actions, CircleCI, none...',
        });
        return p.isCancel(value) ? '' : value;
      },
      workflowNotes: async () => {
        const value = await p.text({
          message: 'Any workflow preferences to document?',
          placeholder: 'Never auto-commit, ask before installing packages...',
        });
        return p.isCancel(value) ? '' : value;
      },
      projectDescription: async () => {
        const value = await p.text({
          message: 'Brief project description?',
          placeholder: 'A CLI tool that generates context files...',
        });
        return p.isCancel(value) ? '' : value;
      },
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    },
  );

  p.outro('Answers collected!');
  return answers as unknown as UserAnswers;
}
