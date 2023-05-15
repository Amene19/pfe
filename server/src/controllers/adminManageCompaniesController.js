const User = require('../models/user')
const Company = require('../models/company')
const cloudinary = require('../utils/cloudinary')


const manageCompanies = (req, res)=>{
    return res.send("you are in the manage Entreprise")
}

// Create a new enterprise

const createCompany = async (req, res) => {
  try {
    const { name, address, totalEmployees, natureOfBusiness, natureOfRisk, image, creationDate, outsideBuilding, entryAndReception, floors, nonConformities, lastSixMonth, lastSixMonthName } = req.body;

    console.log('Received data:', req.body);
    console.log('NonConformities:', nonConformities);

    // Retry logic variables
    const MAX_RETRIES = 6;
    let retryCount = 0;

    // Upload function with retry
    async function uploadWithRetry(url, options) {
      try {
        return await cloudinary.uploader.upload(url, options);
      } catch (error) {
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, 4000));
          return uploadWithRetry(url, options);
        } else {
          throw error;
        }
      }
    }

    // Upload the company logo image to Cloudinary
    const uploadedLogo = await uploadWithRetry(image, {
      folder: "Company Logo"
    });

    // Upload attachments for nonConformities
    const updatedNonConformities = await Promise.all(nonConformities.map(async (nonConformity) => {
      const updatedAttachment = await Promise.all(nonConformity.attachment.map(async (attachment) => {
        const uploadedImage = await uploadWithRetry(attachment.url, {
          folder: "NonConformity Attachments"
        });

        return {
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url
        };
      }));

      return {
        num: nonConformity.num,
        location: nonConformity.location,
        nonConformity: nonConformity.nonConformity,
        inspectOrComment: nonConformity.inspectOrComment,
        attachment: updatedAttachment,
        recommendation: nonConformity.recommendation,
        month1: nonConformity.month1,
        month2: nonConformity.month2,
        criticity: nonConformity.criticity,
        priority: nonConformity.priority
      };
    }));

    // Upload floor plans and fire extinguisher images
    const newFloors = await Promise.all(floors.map(async (floor) => {
      const uploadedPlan = await uploadWithRetry(floor.plan, {
        folder: "Floor Plans",
      });
  
        return {
          name: floor.name,
          items: [...floor.value],
          plan: {
            public_id: uploadedPlan.public_id,
            url: uploadedPlan.secure_url,
          },
          parts: floor.parts.map((part) => ({
            name: part.name,
            items: [...part.value],
            fireExtinguishers: part.inputFields.map((field) => ({
              name: field.name,
              type: field.type,
            })),
          })),
        };
      }));

    // Create a new company document using the updated schema and uploaded images
    const company = new Company({
      name,
      address,
      totalEmployees,
      natureOfBusiness,
      natureOfRisk,
      creationDate,
      image: {
        public_id: uploadedLogo.public_id,
        url: uploadedLogo.secure_url
      },
      outsideBuilding,
      entryAndReception,
      floors: newFloors,
      nonConformities: updatedNonConformities,
      lastSixMonth,
      lastSixMonthName
    });

    await company.save();
    res.status(201).json(company);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ message: err.message });
  }
};


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

const editCompany = async (req, res) => {
  try {
    const { name, address, totalEmployees, natureOfBusiness, natureOfRisk, image, creationDate, outsideBuilding, entryAndReception, floors } = req.body;
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const updatedFloors = await Promise.all(floors.map(async (floor) => {
      const uploadedPlan = await cloudinary.uploader.upload(floor.plan, {
        folder: "Floor Plans",
      });

      return {
        name: floor.name,
        items: [...floor.value],
        plan: {
          public_id: uploadedPlan.public_id,
          url: uploadedPlan.secure_url,
        },
        parts: floor.parts.map((part) => ({
          name: part.name,
          items: [...part.value],
          fireExtinguishers: part.inputFields.map((field) => ({
            name: field.name,
            type: field.type,
          })),
        })),
      };
    }));
    const result = await cloudinary.uploader.upload(image, {
      folder: "Company Logo"
    })
    company.name = name;
    company.address = address;
    company.totalEmployees = totalEmployees;
    company.natureOfBusiness = natureOfBusiness;
    company.natureOfRisk = natureOfRisk;
    company.creationDate = creationDate;
    company.image = {
      public_id: result.public_id,
      url: result.secure_url
    };
    company.outsideBuilding = outsideBuilding;
    company.entryAndReception = entryAndReception;
    company.floors = updatedFloors;
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteCompany = async (req, res) => {
  const id = req.params.id 
  try {
      const result = await Company.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return res.status(404).send('Company not found');
      }
  
      res.send('Company deleted successfully');
  } catch(error) {
      console.error(error);
      res.status(500).send('Server error');
  }
}

module.exports = {
    manageCompanies,
    createCompany,
    getAllCompanies,
    getCompany,
    editCompany,
    deleteCompany
}