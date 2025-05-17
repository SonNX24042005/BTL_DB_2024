const mongoose = require('mongoose');

// Định nghĩa schema
const newsSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    link: {
        type: String,
    },
});

// Tạo model từ schema
module.exports = mongoose.model('New', newsSchema,'news');
