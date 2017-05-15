
const TreeBuilder = require('./treeBuilder.js');
const $ = require('jquery');
const selector = require('./selectors.js');
const Sockets = (() => {
  let {name, num, lowerRange, upperRange, nodeID} = selector;  
  const socket = io();

  /*
    socket that emits the 'create factory' event.
    Is picked by the server. 
  */
  let createFactory = (factory) => {
      socket.emit('create factory', factory);
  }
  /*
    socket that emits the 'update factory' event.
    Is picked by the server. 
  */  
  let updateFactory = (factory) => {
    socket.emit('update factory', factory);
  }
  /*
    socket that emits the 'delete factory' event.
    Is picked by the server. 
  */
  let deleteFactory = () => {
    socket.emit('delete factory', nodeID.val());
  }
  /*
    Initialize the 'create factory' socket
  */ 
  const initSockets = () => {
    socket.on('create factory', (factories) => {
      TreeBuilder.loadTree(factories);
    });
  }

  return {
    initSockets: initSockets,
    createFactory:createFactory,
    updateFactory:updateFactory,
    deleteFactory:deleteFactory
  }

})();

module.exports = Sockets;
