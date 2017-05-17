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

/*
  validation for any creation or update of factories.
  Will just return to the UI existing tree structure if it fails
  @param factory
*/
const validation = (factory) => {
  let validation;
  let {lowerRange, upperRange, numOfNodes, name} = factory;
  let lower = prepareNumbers(factory.lowerRange);
  let upper = prepareNumbers(factory.upperRange);
  let nodes = prepareNumbers(factory.numOfNodes);
  if(!nodeRangeValidation(lower, upper) || !childValidation(numOfNodes) || !nameValidation(name)){
    return false;
  }
  return true;
}

/*
  test the range of random numbers 
  @param lower
  @param upper
*/
const nodeRangeValidation = (lower, upper) => {
  if ( !isNullOrUndefined(lower) && !isNullOrUndefined(upper)) {
    if ( lower > upper || lower < 1 || upper < 1 || lower > 999999 || upper > 999999 ) {
      return false;
    } 
  } else {
    return false;
  }
  return true;
}

/*
  test the number of nodes that can be generated
  @param numOfNodes
*/
const childValidation = (numOfNodes) => {
  if (numOfNodes && (numOfNodes > 15 || numOfNodes < 1)) {
    return false;
  }
  return true;
}

/*
  validate the length and characters in the factory name
*/
const nameValidation = (name) => {
  if(!name || name.match(/[^A-Za-z- ]/) || name.length > 30){
      return false;
  }
   return true;
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
  Helper function that checks if a value is null or undefined
  @param val
*/
const isNullOrUndefined = (val) => {
  if(null === val || typeof val === 'undefined'){
    return true;
  }
  return false;
}


module.exports = {
  formatChildNodes:formatChildNodes,
  sanitize:sanitize,
  validation:validation
};
