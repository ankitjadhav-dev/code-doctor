import { App } from 'octokit';
import { env } from '@/lib/env';

export function githubApp() {
  if (!env.GITHUB_APP_ID || !env.GITHUB_APP_PRIVATE_KEY) throw new Error('GITHUB_APP_NOT_CONFIGURED');
  return new App({ appId: env.GITHUB_APP_ID, privateKey: env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n') });
}

export async function installationClient(installationId: bigint) {
  return githubApp().getInstallationOctokit(Number(installationId));
}
