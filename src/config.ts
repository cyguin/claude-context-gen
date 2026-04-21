import * as dotenv from 'dotenv';
import type { AppConfig } from './types';

dotenv.config({ quiet: true });

export const config: AppConfig = {
  CLAUDE_MD_FILENAME: process.env.CLAUDE_MD_FILENAME ?? 'CLAUDE.md',
  AGENTS_MD_FILENAME: process.env.AGENTS_MD_FILENAME ?? 'AGENTS.md',
  NPM_USERNAME: process.env.NPM_USERNAME ?? '',
};
