'use strict';

var path = require('path');

module.exports = function(app, cb) {
  var router = app.loopback.Router();
  router.get('/status', app.loopback.status());
  router.get('/', function(req, res) {
    var indexFile = path.resolve(__dirname, '../..', app.get('indexFile'));
    res.sendFile(indexFile);
  });
  app.use(router);
  app.start();
};
