const mongoose = require('mongoose')

const nonConformitySchema = new mongoose.Schema({
    num: String,
    location: String,
    nonConformity: String,
    inspectOrComment: String,
    attachment: [
      {
        public_id: String,
        url: String
      }
    ],
    recommendation: String,
    month1: String,
    month2: String,
    criticity: Number,
    priority: String
  });
  const fireExtinguisherSchema = new mongoose.Schema({
    name: String,
    type: String,
    good: Boolean,
    bad: Boolean,
    observation: String
  });

const partSchema = new mongoose.Schema({
  name: String,
  items: [{
    name: String,
    good: Boolean,
    bad: Boolean,
    observation: String
}],
  fireExtinguishers: [fireExtinguisherSchema],

});

const floorSchema = new mongoose.Schema({
  name: String,
  items: [{
    name: String,
    good: Boolean,
    bad: Boolean,
    observation: String
}],
  parts: [partSchema]
});

const outsideBuildingSchema = new mongoose.Schema({
    name: String,
    items: [{
        name: String,
        good: Boolean,
        bad: Boolean,
        observation: String
    }],
    fireExtinguishers: [fireExtinguisherSchema]
  });
  
const entryAndReceptionSchema = new mongoose.Schema({
    name: String,
    items: [{
        name: String,
        good: Boolean,
        bad: Boolean,
        observation: String
    }],
    fireExtinguishers: [fireExtinguisherSchema]
  });


const reportSchema = new mongoose.Schema({
  date: String,
  name: String,
  address: String,
  totalEmployees: Number,
  natureOfBusiness: String,
  natureOfRisk: String,
  image: {
    public_id :{
        type: String,
        
    },
    url: {
        type: String,
       
    }
    
},
  creationDate: {
    type: Date,
    default: Date.now
  },
  outsideBuilding: outsideBuildingSchema,
  entryAndReception: entryAndReceptionSchema,
  floors: [floorSchema],
  nonConformities: [nonConformitySchema],
  photos: [{
    url: {
        type: String,
    },
    comment: {
        type: String,
    }
}],
  approved: Boolean,
  date: String
})

module.exports = mongoose.model('Report', reportSchema)