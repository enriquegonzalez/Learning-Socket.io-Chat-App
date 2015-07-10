var socket = io.connect('http://localhost:8080');

socket.on('disconnect', function(msg){
  $('#messages').append($('<li>').text(msg));
});
