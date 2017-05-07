'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {MongoClient} = require('mongodb');
const config = require('./config');
const {mongodb, port} = config;

// Database
const mongoConnection = MongoClient.connect(mongodb.url + mongodb.name, (err, success)=>{
  console.log('Connected to MongoDB at: ' + mongodb.url + mongodb.name);
});

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});



io.on('connection', function(socket){
  socket.on('create factory', function(factory){
    io.emit('create factory', factory);
    console.log(factory);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});