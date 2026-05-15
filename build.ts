import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import packageJson from './package.json' with { type: 'json' };

function parseEnvFile(path: string): Record<string, string> {
  const result: Record<string, string> = {};

  const lines = readFileSync(path, 'utf-8').split('\n');

  for (const line of lines) {
    if (line.startsWith('#') || !line.includes('=')) continue;

    const [key, ...rest] = line.split('=');

    const trimmedKey = key.trim();
    const trimmedValue = rest.join('=').trim();

    result[trimmedKey] = trimmedValue;
  }

  return result;
}

function getNodeVersion(): string {
  return packageJson.volta.node;
}

function main(): void {
  const buildArgs: string[] = [];

  const nodeVersion = getNodeVersion();

  buildArgs.push('--build-arg', `NODE_VERSION=${nodeVersion}`);

  const envVars = parseEnvFile('.env.local');

  for (const [key, value] of Object.entries(envVars)) {
    buildArgs.push('--build-arg', `${key}=${value}`);
  }

  const cmd = [
    'docker build',
    ...buildArgs,
    '--secret id=gh_token,env=GH_TOKEN',
    '--secret id=private_secret_key,env=PRIVATE_SECRET_KEY',
    '-t ghcr.io/ccrsxx/portofolio:latest',
    '.'
  ].join(' ');

  process.env['GH_TOKEN'] = envVars['GH_TOKEN'];
  process.env['PRIVATE_SECRET_KEY'] = envVars['PRIVATE_SECRET_KEY'];

  execSync(cmd, { stdio: 'inherit' });
}

main();
