// vue.config.js
module.exports = {
  // options...
  const {gitDescribe, gitDescribeSync} = require('git-describe');
  process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash
}
