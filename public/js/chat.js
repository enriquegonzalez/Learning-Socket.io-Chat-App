
var typingStatus = function(field){
  var isTyping = false;

  if (field > 0 ) {
    isTyping = true;
  }

  return isTyping;

};


$('#message').on('focus', function(){
  var name = $('#name').val()

  $('#message').on('keydown', function(){
    var msgField = $('#message').val().length;

    if (typingStatus(msgField) && name !== '') {
      socket.emit('typing', name + ' is typing. . .' );
    } else if (typingStatus(msgField)) {
      socket.emit('typing', 'Someone is typing. . .' );
    }
  });

  $('#message').on('keyup', function(){
    socket.emit('stop typing');
  });

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

socket.on('typing', function(msg){
  $('#messages').append($('<li>').html(msg));
});

socket.on('stop typing', function(){
  // $('#messages li').remove(":contains('is typing')");
});

socket.on('chat message', function(name, msg){
  var chatMessage = name + ": " + msg;
  $('#messages').append($('<li>').html(chatMessage));
});
