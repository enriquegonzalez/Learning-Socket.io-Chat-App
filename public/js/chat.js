
$('#message').on('keyup', function(){
  var msgField = $('#message').val().length,
      name = $('#name').val();

  if (msgField > 0) {
    console.log(name + ' is typing. . .')
    if (name !== '') {
      socket.emit('user typing', name + ' is typing . . .');
    } else {
      socket.emit('user typing', 'Someone is typing . . .');
    }
  }
});


$('form').submit(function(){
  var name = $('#name').val(),
      msg = $('#message').val(),
      resetMsg = $('#message').val('');

  socket.emit('chat message', name, msg);
  $('#messages').append($('<li>').html("<span class='u-bold u-blue'>" + name + "</span>" + " : " + msg));
  resetMsg
  return false;
});

socket.on('user typing', function(msg){
  $('#messages').append($('<li>').html(msg));
});


socket.on('chat message', function(name, msg){
  var chatMessage = name + ": " + msg;
  $('#messages').append($('<li>').html(chatMessage));
});
