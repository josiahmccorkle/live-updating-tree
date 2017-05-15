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

FactorySchema.pre('save', function(next) {
    let nodeArray = [];
    let doc = this._doc;
    for (i = 0; i < doc.numOfNodes; i++) {
      let min = Math.ceil(this.lowerRange);
      let max = Math.floor(this.upperRange);
      this.childNodes.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    next();
});

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
