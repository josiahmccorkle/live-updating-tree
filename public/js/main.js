(function() {

  "use strict";
  var rootMenu = $('.context-menu');
  var factoryMenu = $('.factory-context-menu');
  var menuState = 0;
  var active = "context-menu--active";

  function init() {
    clickListener();
  }

  function toggleMenuOn(menu) {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.addClass(active);
    } 
  }

  function toggleFactoryMenuOn() {

  }

  function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      rootMenu.removeClass(active);
      factoryMenu.removeClass(active);
    } 
  }

  function clickListener() {
    $("#root").on( "click", function(e) {
      console.log(e.target);
      e.preventDefault();
      if(e.target.id === 'root-button') {
        toggleMenuOn(rootMenu);
        positionMenu(e, rootMenu);
      } else if(e.target.className === 'factory') {
        toggleMenuOn(factoryMenu);
        positionMenu(e, factoryMenu);
      }

    });
  }

  $('.close-button').click((e)=>{
    toggleMenuOff();
  });

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

function positionMenu(e, menu) {
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
  $('#factories').append($('<li class="factory">').text(factory.name));
});
