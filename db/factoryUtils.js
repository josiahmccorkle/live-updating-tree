let formatChildNodes = (factory) => {
  let nodeArray = [];
  for (i = 0; i < factory.numOfNodes; i++) {
    let min = Math.ceil(factory.lowerRange);
    let max = Math.floor(factory.upperRange);
    nodeArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  factory['childNodes'] = nodeArray;
  return factory;
};

let sanitize = (val) => {
  if(typeof val === "string"){
    if(val.length > 0){
      return val.replace(/[^\w\s]/gi, '');
    }
  }
} 

let isNullOrUndefined = (value) => {
  return (null === value || typeof value === 'undefined') ? true : false;
}
module.exports = {
  formatChildNodes:formatChildNodes,
  sanitize:sanitize,
  isNullOrUndefined:isNullOrUndefined
};