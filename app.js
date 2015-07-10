var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('Client connected. . .');

  socket.on('disconnect', function(){
    console.log('Client disconnected');
    io.emit('disconnect', 'Goodbye!');
  });

  socket.on('user typing', function(msg){
    console.log('message — ' + msg);
    socket.broadcast.emit('user typing', msg);
  });

  socket.on('chat message', function(name, msg){
    console.log('message — ' + name + ' : ' + msg);
    socket.broadcast.emit('chat message', name, msg);
  });
});


server.listen(8080, function(){
  console.log("Listening on port 8080. . .")
});
