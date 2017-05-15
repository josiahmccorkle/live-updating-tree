const $ = require("jquery");
const ContextMenu = require("./contextMenu.js");
const Sockets = require("./sockets.js");
const TreeBuilder = require('./treeBuilder.js');
const selector = require('./selectors.js');
const Factory = require('./factory.js');
let {name, num, lowerRange, upperRange, nodeID} = selector;  

const init = () => {
  ContextMenu.initContextMenu();
  Sockets.initSockets();
  initClickHandlers();
};

const initClickHandlers = () => {
  $('#create-factory, #update-factory, #delete-factory').click((e) => { 
    handleMenuEvent(e.target);
  });
}

let createFactory = () => {
  let factory = Factory.getFactory();
  let valid = validateCreateFactory(factory);
  console.log("is valid"+ valid);
  if (valid) {
    Sockets.createFactory(factory);
    ContextMenu.toggleMenuOff();
  }
}

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

const validateCreateFactory = ((factory) => {
  console.log(factory.lowerRange);
  console.log(factory.upperRange);
  console.log(factory.name);
  console.log(factory.numOfNodes);
  if(!factory.lowerRange || !factory.upperRange || !factory.name || !factory.numOfNodes) {
      $('#incomplete').show();
      return false;
    }
    return true;
});

const validateUpdatedFactory = ((factory, target) => {
  let lower = prepareNumbers(factory.lowerRange);
  let upper = prepareNumbers(factory.upperRange);
  let nodes = prepareNumbers(factory.numOfNodes);
  let thisNode = $(target).siblings()[0];

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
  if(factory.name.match(/[^A-Za-z0-9\-_ ]/)){
    ContextMenu.showNameError();
    return false;
  } 
  if (nodes && nodes > 15) {
    ContextMenu.showNodeError();
    return false;      
  }
  return true; 
});

let deleteFactory = () => {
  Sockets.deleteFactory();
  ContextMenu.toggleMenuOff();
}

const prepareNumbers = ((number) => {
  return number ? parseInt(number) : null;
});

const handleMenuEvent = (target) => {
  if (target.id === 'create-factory') {
    createFactory();
  } else if (target.id === 'update-factory') {
    updateFactory();
  } else {
    deleteFactory();
  }
}

$(document).ready(() => {
    init();
    TreeBuilder.getTreeOnLoad();
});
