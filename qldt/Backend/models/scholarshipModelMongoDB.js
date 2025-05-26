
const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Vui lòng nhập tiêu đề học bổng'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Vui lòng nhập mô tả']
    },
    details: [{ 
        key: String,
        value: String
    }],
    link: {
        type: String,
        default: '#' // Link chi tiết, mặc định là '#'
    },
    category: { // Có thể thêm category để phân loại
        type: String,
        enum: ['KKHT', 'TranDaiNghia', 'DoanhNghiep', 'TraoDoi', 'HTHT', 'QueHuong'],
        required: true
    }
}, { timestamps: true }); // Thêm timestamps để biết khi nào được tạo/cập nhật

const Scholarship = mongoose.model('Scholarship', scholarshipSchema, 'scholarships');

module.exports = Scholarship;