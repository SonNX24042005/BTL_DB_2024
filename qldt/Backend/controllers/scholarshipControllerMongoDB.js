
const Scholarship = require('../models/scholarshipModelMongoDB');

const getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find({});
        res.status(200).json({
            success: true,
            count: scholarships.length,
            data: scholarships
        });
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
const getScholarshipById = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);

        if (!scholarship) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy học bổng' });
        }

        res.status(200).json({
            success: true,
            data: scholarship
        });
    } catch (error) {
         console.error('Error fetching scholarship by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};


module.exports = {
    getAllScholarships,
    getScholarshipById
};