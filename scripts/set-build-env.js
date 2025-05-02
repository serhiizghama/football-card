// scripts/set-build-env.js (в режиме ESM)
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse HEAD').toString().trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const now = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Bangkok',
    hour12: false
});

const content = `
VITE_COMMIT_SHA=${commitHash}
VITE_BRANCH=${branch}
VITE_DEPLOY_DATE=${now}
`;

writeFileSync(resolve('./.env'), content);
console.log('✅ .env file generated with commit, branch and deploy date');
