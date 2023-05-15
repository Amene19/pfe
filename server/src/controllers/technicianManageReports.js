

const cloudinary = require('../utils/cloudinary')
const Report = require('../models/report')
const Company = require('../models/company')


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
      name,
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
    console.log(nonConformities[0].attachment, "first");
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
      name,
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
      date: `${currentYear}-${currentMonth}-${currentDay}`,
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
    getAllCompanies,
    getCompany,
    createReport
}