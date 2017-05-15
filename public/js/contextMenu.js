"use strict";
const $ = require("jquery");
const selector = require('./selectors.js');
const ContextMenu = (() => {
  let {rootMenu, inputFields, factoryMenu, 
       active, createFactoryButton, createTitle, 
       editTitle, editButtons, nodeID, closeButton, 
       name, num, lowerRange, upperRange,
      nameError, nodeError, rangeError, incomplete} = selector;
  let menuState = 0;
  let menuPosition;
  let menuPositionX;
  let menuPositionY;

  /*
    initialize context menu
  */
  const initContextMenu = () => {
    clickListener();
  }

  /*
    open context menu
    fill input fields with data from node when updating.
  */
  const toggleMenuOn = (e, menu) => {
    if ( menuState !== 1 ) {
      menuState = 1;
      if(menu === 'edit') {
        createFactoryButton.hide();
        createTitle.hide();
        editTitle.show();
        editButtons.show();
        fillFormForEditing(e.target);
      } else {
        editButtons.hide();
        editTitle.hide();
        createTitle.show();
        createFactoryButton.show();
      }
      rootMenu.addClass(active);
    } 
  }

  /*
    close context menu
  */
  const toggleMenuOff = () => {
    if ( menuState !== 0 ) {
      menuState = 0;
      rootMenu.removeClass(active);
      factoryMenu.removeClass(active);
      inputFields.val('');
      resetErrors();
    } 
  }

  const clickListener = () => {
    $("#root").on( "click", (e) => {
      resetErrors();
      e.preventDefault();
      if(e.target.id === 'root-button') {
        toggleMenuOn(e, rootMenu);
        positionMenu(e, rootMenu);
      } else if(e.target.className === 'factory-name') {
        toggleMenuOn(e, 'edit');
        positionMenu(e, rootMenu);
      }
    });
  }

  /*
    grab the position of the menu
  */
  const getPosition = (e) => {
    let xPosition = 0;
    let yPosition = 0;
    if (!e) {
      let e = window.event;
    }  
    if (e.pageX || e.pageY) {
     xPosition = e.pageX;
     yPosition = e.pageY;
    } else if (e.clientX || e.clientY) {
     xPosition = e.clientX + body.scrollLeft + 
                        document.documentElement.scrollLeft;
     yPosition = e.clientY + body.scrollTop + 
                        document.documentElement.scrollTop;
    }
    return {
     x: xPosition,
     y: yPosition
    }
  }

  /*
    position context menu to orient around mouse click
  */
  const positionMenu = (e, menu) => {
    menuPosition = getPosition(e);
    menuPositionX = menuPosition.x + "px";
    menuPositionY = menuPosition.y + "px";
    menu.css('left', menuPositionX);
    menu.css('top', menuPositionY);
  }

  /*
    register close button event and close menu when its triggered
  */
  closeButton.click((e) => {
    toggleMenuOff();
  });

  /*
    fill input fields with node data
  */
  const fillFormForEditing = (target) => {
    let siblings = $(target).siblings();
    let id = target.parentElement.attributes['id'].value;
    nodeID.val(id);
    name.val(siblings[0].attributes["node-name"].value);
    num.val(siblings[0].attributes["num-of-nodes"].value);
    lowerRange.val(siblings[0].attributes["lower-range"].value);
    upperRange.val(siblings[0].attributes["upper-range"].value);
  }

  /*
    show error when user tries to enter more than 15 nodes.
  */
  const showNodeError = () => {
    nodeError.show();
  };
  
  /*
    show error when the name has special characters.
  */
  const showNameError = () => {
    nameError.show();
  }
  /*
    show an error when the lower range is higher 
    than the higher range.
  */
  const showRangeError = () => {
    rangeError.show();
  }
  /*
    show an error when the user hasn't entered all input fields.
  */
  const showIncompleteError = () => {
    incomplete.show();
  }

  /*
    Remove all errors from the context menu.
  */
  const resetErrors = () => {
    incomplete.hide();
    nodeError.hide();
    rangeError.hide();
    nameError.hide();
  };

  return {
    initContextMenu:initContextMenu,
    toggleMenuOff:toggleMenuOff,
    showNameError:showNameError,
    showRangeError:showRangeError,
    showNodeError:showNodeError,
    showIncompleteError:showIncompleteError
  };
})();
 


module.exports = ContextMenu;