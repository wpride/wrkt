
const loopback = require('loopback');
const boot = require('loopback-boot');

const app = loopback();
module.exports = app;
const path = require('path');

app.start = () => {
  const port = process.env.PORT || 3000;
  return app.listen(port, () => {
    app.emit('started');
    const staticFolder = path.dirname(
      path.resolve(__dirname, '/build')
    );
    app.use(loopback.static(staticFolder));
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
