// const allNewEvents = [
//     {
//         id: 1,
//         title: "Innovation Day",
//         link: "https://soict.hust.edu.vn/soict-innovation-day-2025",
//         date: "Thu 2, 12/08/2025",
//         location: "P402 B1"
//     },
//     {
//         id: 2,
//         title: "Seminar",
//         link: "https://soict.hust.edu.vn/seminar-khoa-hoc-thang-11-nam-2024-truong-cong-nghe-thong-tin-va-truyen-thong.html",
//         date: "Thu 4, 27/04/2026",
//         location: "P302 D9"
//     },
//     {
//         id: 3,
//         title: "Open Day",
//         link: "https://soict.hust.edu.vn/truong-cntttt-tham-gia-ngay-hoi-tu-van-tuyen-sinh-huong-nghiep-bach-khoa-open-day-2024.html",
//         date: "Thu 6, 27/3/2026",
//         location: "P212 C7"
//     },
//     {
//         id: 4,
//         title: "Book's Day",
//         link: "https://library.hust.edu.vn/",
//         date: "Thu 2, 21/02/2026",
//         location: "Ta Quang Buu library"
//     },
//     {
//         id: 5,
//         title: "NXS",
//         link: "https://soict.hust.edu.vn/cuoc-thi-y-tuong-sang-tao-sinh-vien-2025-dam-me-va-y-tuong",
//         date: "Thu 7, 31/03/2025",
//         location: "C2"
//     }
// ]

// const getEvents = () => allNewEvents;

// module.exports = {
//     getEvents
// };
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
