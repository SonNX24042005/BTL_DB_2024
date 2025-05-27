const gradeModel = require('../models/grade1Model');

const getStudentGrades = async (req, res) => {
    try {
        const { mssv } = req.params; 
        if (!mssv) {
            return res.status(400).json({ message: "MSSV is required" });
        }
        const grades = await gradeModel.getGradesBySemester(mssv);
    
        const gradesBySemester = grades.reduce((acc, grade) => {
            const { KyHoc, ...rest } = grade;
            if (!acc[KyHoc]) {
                acc[KyHoc] = [];
            }
            acc[KyHoc].push(rest);
            return acc;
        }, {});

        res.status(200).json(gradesBySemester); 
    } catch (error) {
        console.error("Error in getStudentGrades controller:", error);
        res.status(500).json({ message: "Failed to retrieve grades", error: error.message });
    }
};

module.exports = {
    getStudentGrades,
};