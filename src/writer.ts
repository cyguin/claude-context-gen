import fs from 'fs';
import path from 'path';
import { generateAgentsMd } from './generators/agents';
import { generateClaudeMd } from './generators/claude';
import type { AppConfig, UserAnswers } from './types';

/**
 * Prompts before overwriting existing files, then writes both output files
 * to cwd. Exits cleanly if user declines overwrite.
 */
export async function writeFiles(answers: UserAnswers, config: AppConfig): Promise<void> {
  const p = await import('@clack/prompts');
  const claudePath = path.join(process.cwd(), config.CLAUDE_MD_FILENAME);
  const agentsPath = path.join(process.cwd(), config.AGENTS_MD_FILENAME);
  const claudeExists = fs.existsSync(claudePath);
  const agentsExists = fs.existsSync(agentsPath);

  if (claudeExists || agentsExists) {
    const existingNames = [
      claudeExists ? config.CLAUDE_MD_FILENAME : '',
      agentsExists ? config.AGENTS_MD_FILENAME : '',
    ]
      .filter(Boolean)
      .join(' and ');

    const overwrite = await p.confirm({
      message: `${existingNames} already exist. Overwrite?`,
      initialValue: false,
    });

    if (p.isCancel(overwrite) || !overwrite) {
      p.cancel('Aborted - existing files preserved.');
      process.exit(0);
    }
  }

  const claudeContent = generateClaudeMd(answers);
  const agentsContent = generateAgentsMd(answers);

  fs.writeFileSync(claudePath, claudeContent, 'utf8');
  fs.writeFileSync(agentsPath, agentsContent, 'utf8');

  p.log.success(`Written: ${config.CLAUDE_MD_FILENAME} and ${config.AGENTS_MD_FILENAME}`);
}
