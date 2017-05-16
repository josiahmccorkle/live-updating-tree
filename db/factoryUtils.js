"use strict";
/*
  create child nodes from generated numbers
  @param factory
*/
const formatChildNodes = (factory) => {
  let nodeArray = [];
  for (let i = 0; i < factory.numOfNodes; i++) {
    let min = Math.ceil(factory.lowerRange);
    let max = Math.floor(factory.upperRange);
    nodeArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  factory['childNodes'] = nodeArray;
  return factory;
};

/*
  @param val
  strip any special chars out of string
*/
const sanitize = (val) => {
  if(typeof val === "string"){
    if(val.length > 0){
      return val.replace(/[^\w\s]/gi, '');
    }
  }
} 


module.exports = {
  formatChildNodes:formatChildNodes,
  sanitize:sanitize
};
