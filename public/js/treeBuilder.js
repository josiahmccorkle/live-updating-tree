"use strict";
const $ = require("jquery");
const treeTemplate = require('../templates/tree.hbs');
const {factories} = require('./selectors.js');
const TreeBuilder = (() => {
  
  /*
    loadTree uses handlesbars to create the node tree in the DOM.
    @param factoryList
  */
  const loadTree = (factoryList) => {
    let html = treeTemplate({factoryList});
    factories.html(html);
  }

  /*
    when the page loads, get nodes from database 
    and build tree in UI
  */
  const getTreeOnLoad = () => {
    $.ajax({url: "/getTree", success: (tree) => {
      loadTree(tree);
    }}); 
  }
  
  return {
    loadTree: loadTree,
    getTreeOnLoad:getTreeOnLoad
  }
})();

module.exports = TreeBuilder