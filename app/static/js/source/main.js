/* global io:true */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    initializeSocketIO();
    $('button').click(sendMessage);
  }

  //global variables
  var socket;

  function initializeSocketIO(){
    socket = io.connect('/app');
    socket.on('online', function(data){console.log(data);});
    socket.on('message', addMessage);
  }

  function sendMessage(){
    var data = {};
    data.text = $('textarea').val();
    socket.emit('newMessage', data);
  }

  function addMessage(data){
    var text = data.text;
    var $div = $('<div>').text(text);
    $('#messages').prepend($div);
  }

})();
