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

// const template = require('./dist/index.html');

// app.get('/', (req, res, next) => {
//   // req.accepts(['html', 'json', 'js', 'css']);
//   res.sendFile(path.resolve('webpack/dist/'));
// });

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: 'index.html',
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(path.resolve('webpack/dist/'), options))


var httpsServer = https.createServer(credentials,app);


httpsServer.listen(Port);

opn(`https://localhost`, {app: 'google chrome'});
