var db_url = 'mongodb://webapp_user:book123@ds029705.mlab.com:29705/booksdiery';
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'booksdiery'
    },
    port: process.env.PORT || 3000,
    db: db_url
  },

  test: {
    root: rootPath,
    app: {
      name: 'booksdiery'
    },
    port: process.env.PORT || 3000,
    db: db_url
  },

  production: {
    root: rootPath,
    app: {
      name: 'booksdiery'
    },
    port: process.env.PORT || 3000,
    db: db_url
  }
};

module.exports = config[env];
