'use strict';
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      utils = require('../factoryUtils.js');

let FactorySchema = new Schema({
  name: String,
  numOfNodes: Number,
  lowerRange: Number,
  upperRange: Number,
  id: Number,
  childNodes: Array 
});

/*
  pre function for the save call to mongo
  
  @param next
*/
FactorySchema.pre('save', function(next) {
    let nodeArray = [];
    let doc = this._doc;
    this._doc = utils.formatChildNodes(doc);
    next();
});

/*
  pre call for the findOneAndUpdate call to mongo.
  creates child nodes for the document.
  sanity check for strings.
  @param next 
*/
FactorySchema.pre('findOneAndUpdate', function(next) {
  if(this._update.updateChildNodes) {
    let updatedFactory = utils.formatChildNodes(this._update);
    delete this._update.updateChildNodes;
  }
  
  this._update.name = utils.sanitize(this._update.name);
  next();
});

const Factory = mongoose.model('Factory', FactorySchema);

module.exports = Factory;
