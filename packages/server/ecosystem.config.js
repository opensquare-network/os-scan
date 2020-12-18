module.exports = {
  apps: [
    {
      name: "OpenSquare scan server",
      script: "src/index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
