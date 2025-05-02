const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Получаем текущие данные из Git
const commitHash = execSync('git rev-parse HEAD').toString().trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const now = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour12: false
});

// Записываем в .env файл
const content = `
VITE_COMMIT_SHA=${commitHash}
VITE_BRANCH=${branch}
VITE_DEPLOY_DATE=${now}
`;

fs.writeFileSync(path.resolve(__dirname, '../.env'), content);

console.log('✅ .env file generated with commit, branch and deploy date');
