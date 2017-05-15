"use strict";
const mongoose = require('mongoose'),
      {MongoClient} = require('mongodb'),
      Schema = mongoose.Schema,
      config = require('../config'),
      {mongodb} = config,
      utils = require('./factoryUtils.js');

mongoose.connect(mongodb.url + mongodb.name);
const db = mongoose.connection,
      Factory = require(__dirname+'/models/Factory.js');
mongoose.Promise = require('bluebird');
let getAll = {};
let any = {};
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB at: ' + mongodb.url + mongodb.name);
  getAll = mongoose.model('factories', {});
});

const createFactory = (factory)=>{ 
  let newFactory = new Factory({
    name: factory.name,
    numOfNodes: parseInt(factory.numOfNodes),
    lowerRange: parseInt(factory.lowerRange),
    upperRange: parseInt(factory.upperRange)
  });
  
  let saveFactory = newFactory.save();
  return saveFactory.then((doc) => {
    return getAllFactories();
  });
}

let deleteFactory = (id) => {
  return Factory.findByIdAndRemove(id).then(() => {
    return getAllFactories();
  });
};

let updateFactory = (factory) => {
  let {name, upperRange, lowerRange, numOfNodes, id} = factory;
  delete factory['id'];
  if(upperRange || lowerRange || numOfNodes) {
    return Factory.findByIdAndUpdate(id, factory, {new: true}).then((doc, err) => {
      let {_doc} = doc;
      let {_id} = _doc;
      _doc['updateChildNodes'] = true;
      return Factory.findOneAndUpdate({"_id": _id}, _doc, {new: true}).then(() => {
        return getAllFactories();
      });
    });
  } else {
    return Factory.findOneAndUpdate({"_id": id}, factory, {new: true}).then(() => {
      return getAllFactories();
    });
  }
};



const getAllFactories = () => {
  let allFactories = getAll.find();
  return allFactories.then((doc)=>{
    return doc;
  });
}

module.exports = {
  createFactory:createFactory,
  getAllFactories:getAllFactories,
  deleteFactory:deleteFactory,
  updateFactory:updateFactory
};
