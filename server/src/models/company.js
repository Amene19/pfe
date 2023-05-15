const mongoose = require('mongoose');


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
  criticity: String,
  priority: String
});

const fireExtinguisherSchema = new mongoose.Schema({
    name: String,
    type: String,
    notes: String
  });

const partSchema = new mongoose.Schema({
  name: String,
  items: Array,
  fireExtinguishers: [fireExtinguisherSchema],

});

const floorSchema = new mongoose.Schema({
  name: String,
  items: Array,
  plan: {
    public_id :{
        type: String,
        
    },
    url: {
        type: String,
       
    }
    
},
  parts: [partSchema]
});

const outsideBuildingSchema = new mongoose.Schema({
    name: String,
    items: Array,
    fireExtinguishers: [fireExtinguisherSchema]
  });
  
const entryAndReceptionSchema = new mongoose.Schema({
    name: String,
    items: Array,
    fireExtinguishers: [fireExtinguisherSchema]
  });

const companySchema = new mongoose.Schema({
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
  lastSixMonth: Array,
  lastSixMonthName: Array
});



module.exports = mongoose.model('Company', companySchema);