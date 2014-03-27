module.exports = {
  compile: {
    files: [{
      expand: true,
      cwd: 'app/styles',
      src: ['**/*.less', '!**/_*.less', '!**/flat-ui/**'],
      dest: 'tmp/result/assets/',
      ext: '.css'
    }]
  }
};
