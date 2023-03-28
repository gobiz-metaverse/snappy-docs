module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'SnappyDocs',
      script: 'server.js',
      instances: 0,
      exec_mode: 'cluster',
      env: {},
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'ubuntu',
      host: ['18.143.136.217'],
      ref: 'origin/master',
      repo: 'git@github.com:gobiz-metaverse/snappy-docs.git',
      path: '/home/ubuntu/snappy-docs',
      'post-deploy': 'yarn install --ignore-engines && NODE_ENV=production yarn build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
