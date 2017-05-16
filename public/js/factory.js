const selector = require('./selectors.js');
let {name, num, lowerRange, upperRange, nodeID} = selector;  
const Factory = (() => {

  /*
    get the factory
  */
  let getFactory = () => {
    return {
      name: name.val(), 
      numOfNodes: prepareNumbers(num.val()),
      lowerRange: prepareNumbers(lowerRange.val()),
      upperRange: prepareNumbers(upperRange.val())
    }  
  }

  /*
    Helper function that converts strings to numbers 
    to be validated before submission.
    Returns the converted value.
    @param number
  */
  const prepareNumbers = (number) => {
    return number ? parseInt(number) : number;
  };

  return {
    getFactory:getFactory
  }
})();

module.exports = Factory;