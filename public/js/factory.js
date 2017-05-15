const selector = require('./selectors.js');
let {name, num, lowerRange, upperRange, nodeID} = selector;  
const Factory = (() => {

  /*
    get the factory
  */
  let getFactory = () => {
    return {
      name: name.val(), 
      numOfNodes: num.val(),
      lowerRange: lowerRange.val(),
      upperRange : upperRange.val()
    }  
  }
  return {
    getFactory:getFactory
  }
})();

module.exports = Factory;