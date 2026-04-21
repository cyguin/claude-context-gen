#!/usr/bin/env node

import { config } from './config';
import { runPrompts } from './prompts';
import { writeFiles } from './writer';

export { generateAgentsMd } from './generators/agents';
export { generateClaudeMd } from './generators/claude';
export type { AppConfig, UserAnswers } from './types';

const args = process.argv.slice(2);

if (require.main === module) {
  if (args.includes('--version') || args.includes('-v')) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require('../package.json') as { version: string };
    console.log(version);
    process.exit(0);
  }

  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      `
claude-context-gen - Generate CLAUDE.md and AGENTS.md for your project

Usage:
  npx claude-context-gen           Run interactive prompt session
  npx claude-context-gen --help    Show this help message
  npx claude-context-gen --version Show version

Output files (configurable via .env):
  ${config.CLAUDE_MD_FILENAME}
  ${config.AGENTS_MD_FILENAME}
`.trim(),
    );
    process.exit(0);
  }

  (async () => {
    const answers = await runPrompts();
    await writeFiles(answers, config);
  })();
}
