const studentModel = require('../models/studentModel');

const getStudentDetails = async (req, res) => {
  try {
    const { email } = req.params; // Lấy email từ URL parameter

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const studentData = await studentModel.getStudentByEmail(email);

    if (studentData) {
      res.status(200).json(studentData);
    } else {
      res.status(404).json({ message: 'Student not found with the provided email' });
    }
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getStudentDetails,
};