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

const handleError = (res) => (err) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error: ' + err
  });
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/getTree', (req, res) => {
  treeRepository.getAllFactories().then((tree) => {
    if(!tree){
      handleError(res);
    }
    return res.send(tree);
  });
});

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

http.listen(port, ()=>{
  console.log('listening on *:3000');
});