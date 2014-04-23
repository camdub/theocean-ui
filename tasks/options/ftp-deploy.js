module.exports = {
  build: {
    auth: {
      host: 'waws-prod-blu-001.ftp.azurewebsites.windows.net',
      port: 21,
      authKey: 'key1'
    },
    src: 'dist',
    dest: '/site/wwwroot'
  }
};
