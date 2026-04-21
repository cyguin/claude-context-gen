export interface UserAnswers {
  language?: string;
  framework?: string;
  testingSetup?: string;
  packageManager?: string;
  ciProvider?: string;
  workflowNotes?: string;
  projectDescription?: string;
}

export interface AppConfig {
  CLAUDE_MD_FILENAME: string;
  AGENTS_MD_FILENAME: string;
  NPM_USERNAME: string;
}
