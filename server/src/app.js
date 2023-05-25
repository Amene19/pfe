const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../src/routes/authRoutes.js')
const profile = require('../src/routes/profile.js')
const adminDashboard = require('./routes/adminDashboard.js')
const adminManageCompanies = require('./routes/adminManageCompanies.js')
const technicianManageReports= require('./routes/technicianManageReports.js')
const adminMangeMissions = require("./routes/adminManageMissions.js")
const techMissions = require('./routes/techMissions.js')
const moderatorMissions = require('./routes/moderatorMissions.js')
const mederatorManageReports = require('./routes/moderatorManageReports.js')
const cors = require('cors')



const app = express();
const cookieParser = require('cookie-parser');



app.use(cors({ origin: true, credentials: true }));

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error(error));


// middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', profile)
app.use('/api/dashboard/admin', adminDashboard)
app.use('/api/dashboard/admin/manageCompanies', adminManageCompanies)
app.use('/api/dashboard/technician/manageReports', technicianManageReports)
app.use('/api/dashboard/admin/manageMissions', adminMangeMissions)
app.use('/api/dashboard/technician/manageMissions', techMissions)
app.use('/api/dashboard/moderator/manageMissions', moderatorMissions)
app.use('/api/dashboard/mederator/manageReports', mederatorManageReports)


// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});