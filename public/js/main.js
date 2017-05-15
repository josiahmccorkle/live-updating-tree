const $ = require("jquery");
const ContextMenu = require("./contextMenu.js");
const Sockets = require("./sockets.js");
const TreeBuilder = require('./treeBuilder.js');
const selector = require('./selectors.js');
const Factory = require('./factory.js');
let {name, num, lowerRange, upperRange, nodeID} = selector;  

/*
  Initialize eventing and the following UI components:
  context menu and sockets
*/
const init = () => {
  ContextMenu.initContextMenu();
  Sockets.initSockets();
  initClickHandlers();
};

/*
  Initialize click handlers
*/
const initClickHandlers = () => {
  $('#create-factory, #update-factory, #delete-factory').click((e) => { 
    handleMenuEvent(e.target);
  });
}

/*
  Triggered when user submits a new node to be created.
  Calls a socket event to be emitted and closes the context menu.
*/
let createFactory = () => {
  let factory = Factory.getFactory();
  let valid = validateCreateFactory(factory);
  if (valid) {
    Sockets.createFactory(factory);
    ContextMenu.toggleMenuOff();
  }
}

/*
  Triggered when user updates an existing node.
  validates user input and calls socket event.
  @param: target
*/
let updateFactory = (target) => {
  let factory  = Factory.getFactory();
  for (var property in factory) {
    if (factory.hasOwnProperty(property)) {
      if(factory[property] === ""){
        delete factory[property];
      }
    }
  }
  let valid = validateUpdatedFactory(factory, target);
  if (valid) {
    factory['id'] = nodeID.val();
    Sockets.updateFactory(factory);
    ContextMenu.toggleMenuOff();
  }
}

/*
  Validation for factory creation.
  @param factory
*/
const validateCreateFactory = ((factory) => {
  let {lowerRange, upperRange, name, numOfNodes} = factory;
  if(!lowerRange || !upperRange || !name || !numOfNodes) {
      ContextMenu.showIncompleteError();
      return false;
  }
  if(numOfNodes && numOfNodes > 15){
    ContextMenu.showNodeError();
    return false;
  }
  if(parseInt(lowerRange) > parseInt(upperRange)){
    ContextMenu.showRangeError();
    return false;
  }
  if(name && evaluateNameString(name)) {
    ContextMenu.showNameError();
    return false;
  }
    return true;
});

/*
  validation for factory update
  @param factory 
  @param target
*/
const validateUpdatedFactory = ((factory, target) => {
  let lower = prepareNumbers(factory.lowerRange);
  let upper = prepareNumbers(factory.upperRange);
  let nodes = prepareNumbers(factory.numOfNodes);
  let thisNode = $(target).siblings()[0];
  let name = factory.name;

  if (lower) {
    if (upper) {
      if (lower > upper) {
        ContextMenu.showRangeError();
        return false;
      } 
    } else if (lower > thisNode.attributes["upper-range"].value) {
      ContextMenu.showRangeError();
      return false;        
    }
  }
  if (name && evaluateNameString(name)) {
    ContextMenu.showNameError();
    return false;
  } 
  if (nodes && nodes > 15) {
    ContextMenu.showNodeError();
    return false;      
  }
  return true; 
});

/*
  Deletes a node by calling the cooresponding socket 
  and then closes the context menu.
*/
let deleteFactory = () => {
  Sockets.deleteFactory();
  ContextMenu.toggleMenuOff();
}

/*
  Helper function that converts strings to numbers 
  to be validated before submission.
  Returns the converted value.
  @param number
*/
const prepareNumbers = (number) => {
  return number ? parseInt(number) : null;
};

/*
  Helper function that evaluates strings.
  returns true if special chars are found.
  @param number
*/
const evaluateNameString = (name) => {
  return name.match(/[^A-Za-z0-9\-_ ]/);
}

/*
  handleMenuEvent listens for clicks on the 
  context menu buttons and calls the appropriate 
  function.
*/
const handleMenuEvent = (target) => {
  if (target.id === 'create-factory') {
    createFactory();
  } else if (target.id === 'update-factory') {
    updateFactory();
  } else {
    deleteFactory();
  }
}

/*
  On document load, initialize the app 
  and load tree into DOM 
*/
$(document).ready(() => {
    init();
    TreeBuilder.getTreeOnLoad();
});
