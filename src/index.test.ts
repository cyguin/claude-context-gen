import { describe, expect, it } from 'vitest';
import { generateAgentsMd, generateClaudeMd } from './index';

describe('generators', () => {
  it('generates Claude and agent context from answers', () => {
    const answers = {
      language: 'TypeScript',
      framework: 'Node.js',
      testingSetup: 'Vitest',
      packageManager: 'npm',
      ciProvider: 'GitHub Actions',
      workflowNotes: 'Ask before installing dependencies.',
      projectDescription: 'A CLI for agent context files.',
    };

    expect(generateClaudeMd(answers)).toContain('@AGENTS.md');
    expect(generateClaudeMd(answers)).toContain('Test runner: Vitest');
    expect(generateAgentsMd(answers)).toContain('Language: TypeScript');
    expect(generateAgentsMd(answers)).toContain('CI/CD provider: GitHub Actions');
  });
});
