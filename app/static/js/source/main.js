/* global io:true */

(function(){
'use strict';
//global variables
var socket, map;



  $(document).ready(initialize);


  function initialize(){
    $(document).foundation();
    initializeSocketIO();
    $('button').click(sendMessage);

    var mapCanvas = document.getElementById('mapCanvas');
    var mapOptions = {
      zoom: 6,
      center: {lat: -34.397, lng: 150.644}
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);
  }

//------Socket io----------//

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


  //-------MAP STYLES---------//

  map.set('styles', [
  {
    "featureType": "water",
    "stylers": [
      { "weight": 0.1 },
      { "saturation": 27 },
      { "gamma": 0.44 },
      { "visibility": "simplified" },
      { "hue": "#00b2ff" }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.park",
    "stylers": [
      { "visibility": "on" },
      { "gamma": 0.5 },
      { "hue": "#00ff44" },
      { "saturation": 47 }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.attraction",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.medical",
    "stylers": [
      { "visibility": "off" }
    ]
  }
]);




})();
