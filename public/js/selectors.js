const $ = require("jquery");
const Selectors = (() =>{
  return {
   rootMenu : $('.context-menu'),
   inputFields : $('.context-input'),
   factoryMenu : $('.factory-context-menu'),
   active : "context-menu--active",
   createFactoryButton : $('#create-factory'),
   createTitle : $('#create-title'),
   editTitle : $('#edit-title'),
   editButtons : $('#edit-buttons'),
   factories : $('#factories'),
   nodeID : $('#node-id'),
   closeButton : $('.close-button'),
   body : $('body'),
   createFactory : $('#create-factory'),
   updateFactory : $('#update-factory'),
   deleteFactory : $('#delete-factory'),
   name : $('#factory-name'),
   num : $('#num-children'),
   lowerRange : $('#lower-range'),
   upperRange : $('#upper-range'),
   nodeID: $('#node-id'),
   nodeError: $('#node-error'),
   rangeError: $('#range-error'),
   incomplete: $('#incomplete'),
   nameError: $('#name-error')
  }
})();

module.exports = Selectors;