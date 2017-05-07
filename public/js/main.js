(function() {

  "use strict";
  var menu = $('.context-menu');
  var menuState = 0;
  var active = "context-menu--active";

  function init() {
    clickListener();
  }

  function toggleMenuOn() {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.addClass(active);
    } 
  }

  function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      menu.removeClass(active);
    } 
  }

  function clickListener() {
    $("#root").on( "click", function(e) {
      e.preventDefault();
      toggleMenuOn();
      positionMenu(e);
    });
  }

  init();

var menuPosition;
var menuPositionX;
var menuPositionY;

function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + 
                       document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + 
                       document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}

function positionMenu(e) {
  menuPosition = getPosition(e);
  menuPositionX = menuPosition.x + "px";
  menuPositionY = menuPosition.y + "px";

  menu.css('left', menuPositionX);
  menu.css('top', menuPositionY);
}




})();





let socket = io();
let createFactory =(name, num)=>{
  let factory = {
    "name": name.val(), 
    "num": num.val()
  }
  socket.emit('create factory', factory);
}

socket.on('create factory', function(factory){
  $('#factories').append($('<li>').text(factory.name));
});
