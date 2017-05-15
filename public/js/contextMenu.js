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

  const initContextMenu = () => {
    clickListener();
  }

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

  const positionMenu = (e, menu) => {
    menuPosition = getPosition(e);
    menuPositionX = menuPosition.x + "px";
    menuPositionY = menuPosition.y + "px";
    menu.css('left', menuPositionX);
    menu.css('top', menuPositionY);
  }

  closeButton.click((e) => {
    toggleMenuOff();
  });

  const fillFormForEditing = (target) => {
    let siblings = $(target).siblings();
    let id = target.parentElement.attributes['id'].value;
    nodeID.val(id);
    name.val(siblings[0].attributes["node-name"].value);
    num.val(siblings[0].attributes["num-of-nodes"].value);
    lowerRange.val(siblings[0].attributes["lower-range"].value);
    upperRange.val(siblings[0].attributes["upper-range"].value);
  }

  const showNodeError = () => {
    nodeError.show();
  };
  
  const showNameError = () => {
    nameError.show();
  }

  const showRangeError = () => {
    rangeError.show();
  }

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
    showNodeError:showNodeError
  };
})();
 


module.exports = ContextMenu;