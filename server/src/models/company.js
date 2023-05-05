const mongoose = require('mongoose');



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
  floors: [floorSchema]
});



module.exports = mongoose.model('Company', companySchema);