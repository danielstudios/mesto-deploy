require('dotenv').config({ path: './.env.deploy' });
require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO, 
  DEPLOY_REF = 'origin/master',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './dist/app.js',
    env: {
      NODE_ENV: NODE_ENV,
      JWT_SECRET: JWT_SECRET,
    },
    autorestart: true,
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      env: {
        NODE_ENV: NODE_ENV,
      },
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build && pm2 startOrRestart ecosystem.config.json --env production',
    },
  },
}; 