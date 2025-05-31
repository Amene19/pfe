

const cloudinary = require('../utils/cloudinary')
const Report = require('../models/report')
const Company = require('../models/company')
const bodyParser = require('body-parser');
const fs = require('fs');
const mammoth = require('mammoth');


const getAllCompanies = async (req, res) => {
    try {
        const company = await Company.find()
        return res.json({company});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    
}

const getCompany = async (req, res) => {
  const id = req.params.id
  try {
      const company = await Company.findById(id)
      return res.json(company)
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
}

const createReport = async (req, res) => {
  const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Note: Month starts from 0, so we add 1
    const currentYear = currentDate.getFullYear();
  try {
    const {
      companyName,
      address,
      totalEmployees,
      natureOfBusiness,
      natureOfRisk,
      image,
      creationDate,
      outsideBuilding,
      entryAndReception,
      floors,
      nonConformities,
      photos
    } = req.body;

    console.log('Received data:', req.body);
    console.log(companyName, "company Name");
     // Upload photos to Cloudinary and get public_id and url
     const uploadedPhotos = await Promise.all(
      photos.map(async (photo) => {
        const uploadedPhoto = await cloudinary.uploader.upload(photo.url, {
          folder: 'Report Photos'
        });

        return {
          url: uploadedPhoto.secure_url,
          comment: photo.comment,
          public_id: uploadedPhoto.public_id
        };
      })
    );

    const newFloors = await Promise.all(floors.map(async (floor) => {
      return {
        name: floor.name,
        items: [...floor.items],
        parts: floor.parts.map((part) => ({
          name: part.name,
          items: [...part.items],
          fireExtinguishers: part.fireExtinguishers.map((fireExtinguisher) => ({
            name: fireExtinguisher.name,
            type: fireExtinguisher.type,
            good: fireExtinguisher.good,
            bad: fireExtinguisher.bad,
            observation: fireExtinguisher.observation
          })),
        })),
      };
    }));

    // Create a new report document using the updated schema
    const report = new Report({
      companyName,
      address,
      totalEmployees,
      natureOfBusiness,
      natureOfRisk,
      creationDate,
      image,
      outsideBuilding,
      entryAndReception,
      floors: newFloors,
      nonConformities,
      photos: uploadedPhotos,
      approved: false,
      posted: false,
      date: `${currentYear}-${currentMonth}-${currentDay}`,
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ message: err.message });
  }
};

const editReport = async (req, res) => {
  try {
    const {
      outsideBuilding,
      entryAndReception,
      floors,
      nonConformities,
      InterventionGroup,
      improvement
    } = req.body;

    const reportId = req.params.id; // Assuming you pass the report ID in the URL


    const newFloors = await Promise.all(floors.map(async (floor) => {
      return {
        name: floor.name,
        items: [...floor.items],
        parts: floor.parts.map((part) => ({
          name: part.name,
          items: [...part.items],
          fireExtinguishers: part.fireExtinguishers.map((fireExtinguisher) => ({
            name: fireExtinguisher.name,
            type: fireExtinguisher.type,
            good: fireExtinguisher.good,
            bad: fireExtinguisher.bad,
            observation: fireExtinguisher.observation
          })),
        })),
      };
    }));

    // Find the existing report document by ID
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Update the report fields
   
    report.outsideBuilding = outsideBuilding;
    report.entryAndReception = entryAndReception;
    report.floors = newFloors;
    report.nonConformities = nonConformities;
    report.InterventionGroup = InterventionGroup;
    report.improvement = improvement;
    report.posted = true
    report.rejected = false
    // Save the updated report
    await report.save();
    res.json(report);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ message: err.message });
  }
};

const getAllReports = async (req, res) => {
  try {
      const report = await Report.find()
      return res.json({report});
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
  
}

const getAllReportsPosted = async (req, res) => {
  try {
      const report = await Report.find({posted: true})
      return res.json({report});
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
  
}

const getReport = async (req, res) => {
  const id = req.params.id
  try {
      const report = await Report.findById(id)
      return res.json(report)
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
}

const deleteReport = async (req, res) => {
  const id = req.params.id 
  try {
      const report = await Report.deleteOne({ _id: id });

      if (report.deletedCount === 0) {
        return res.status(404).send('report not found');
      }
  
      res.send('report deleted successfully');
  } catch(error) {
      console.error(error);
      res.status(500).send('Server error');
  }
}



module.exports = {
    getAllCompanies,
    getCompany,
    createReport,
    getAllReports,
    deleteReport,
    getReport,
    editReport,
    getAllReportsPosted,
   
}