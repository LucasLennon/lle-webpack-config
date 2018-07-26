const path = require('path');
const express = require('express');
const webpack = require('webpack');
const merge = require('webpack-merge')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

// HTTPS
const fs = require('fs');
const http = require('http');
const https = require('https');

var privateKey  = fs.readFileSync('/Users/lucas-snow/Documents/Projetos/Volvo-AfterSales-Pt2/processing/http/server.key', 'utf8');
var certificate = fs.readFileSync('/Users/lucas-snow/Documents/Projetos/Volvo-AfterSales-Pt2/processing/http/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
const Port = 443;
const opn = require('opn');
const handler = require('serve-handler');

module.exports = (config) => {

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  var httpsServer = https.createServer(credentials, app);

  // httpServer.listen(Port);
  httpsServer.listen(Port, function () {
    console.log(`Example app listening on port ${Port}!`);
    opn(`https://localhost`, {app: 'google chrome'});
  });
}
