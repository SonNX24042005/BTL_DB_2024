const mongoose = require('mongoose');

// Định nghĩa schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    date: {
        type: String,
    },
    location: {
        type: String,
    },
});

// Tạo model từ schema
module.exports = mongoose.model('Event', eventSchema,'events');
