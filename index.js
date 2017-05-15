'use strict';
const express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  config = require('./config'),
  {port} = config,
  webpack = require('webpack'), 
  webpackMiddleware = require('webpack-dev-middleware'),  
  webPackConfig = require('./webpack.config.js'),
  compiler = webpack(webPackConfig),
  treeRepository = require('./db/treeRepository.js');

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(webpackMiddleware(compiler)); 

/*
  General error handler
*/
const handleError = (res) => (err) => {
  console.error(err);
  return res.status(500).json({
    message: 'Internal server error: ' + err
  });
};

/*
  resolves the '/' on the initial load and 
  serves up the index.html static file.
*/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

/*
  inital getTree call that populates the UI after page load.
*/
app.get('/getTree', (req, res) => {
  treeRepository.getAllFactories().then((tree) => {
    if(!tree){
      return handleError(res);
    }
    return res.send(tree);
  });
});

/*
  Socket connection that listens for the following:
  create factory
  delete factory
  update factory
  @param socket
*/
io.on('connection', (socket) => {
  socket.on('create factory', (factory) => {
    treeRepository.createFactory(factory).then((tree) => {
      io.emit('create factory', tree);
    });
  });
  socket.on('delete factory', (factory) => {
    treeRepository.deleteFactory(factory).then((tree) => {
      io.emit('create factory', tree);
    });
  });
  socket.on('update factory', (factory) => {
    treeRepository.updateFactory(factory).then((tree) => {
      io.emit('create factory', tree);
    });
   });
});

/*
  Server is listening on 3000 port
*/
http.listen(port, ()=>{
  console.log('listening on *:3000');
});