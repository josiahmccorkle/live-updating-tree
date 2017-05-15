
const TreeBuilder = require('./treeBuilder.js');
const $ = require('jquery');
const selector = require('./selectors.js');
const Sockets = (() => {
  let {name, num, lowerRange, upperRange, nodeID} = selector;  
  const socket = io();
  let getFactory = () => {
    let factory = {
      "name": name.val(), 
      "numOfNodes": num.val(),
      "lowerRange": lowerRange.val(),
      "upperRange":upperRange.val()
    }
    return factory;    
  }
  let createFactory = (factory) => {
      socket.emit('create factory', factory);
  }
  
  let updateFactory = (factory) => {
    socket.emit('update factory', factory);
  }

  let deleteFactory = () => {
    socket.emit('delete factory', nodeID.val());
  }
 
  const initSockets = () => {
    socket.on('create factory', (factories) => {
      TreeBuilder.loadTree(factories);
    });
  }

  const validateUpdatedFactory = ((factory, target) => {
    let lower = prepareNumbers(factory.lowerRange);
    let upper = prepareNumbers(factory.upperRange);
    let nodes = prepareNumbers(factory.numOfNodes);
    let thisNode = $(target).siblings()[0];

    if (lower) {
      if (upper) {
        if (lower > upper) {
          $('#range-error').show();
          return false;
        } 
      } else if (lower > thisNode.attributes["upper-range"].value) {
        $('#range-error').show();
        return false;        
      }
    }
    if (nodes && nodes > 15) {
      $('#node-error').show();
      return false;      
    } 
  });

  const prepareNumbers = ((number) => {
    return number ? parseInt(number) : null;
  });

  return {
    initSockets: initSockets,
    createFactory:createFactory,
    updateFactory:updateFactory,
    deleteFactory:deleteFactory
  }

})();
module.exports = Sockets;
