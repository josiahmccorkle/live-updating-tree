"use strict";
const $ = require("jquery");
const treeTemplate = require('../templates/tree.hbs');
const {factories} = require('./selectors.js');
const TreeBuilder = (() => {
  const loadTree = (factoryList) => {
    let html = treeTemplate({factoryList});
    factories.html(html);
  }
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