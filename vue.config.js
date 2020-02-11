// vue.config.js
module.exports = {
  // options...
  const {gitDescribe, gitDescribeSync} = require('git-f');
  process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash
    publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/platform/'
}
