const express = require('express');
const connectMongo = require('./config/dbMongo');
const cors = require('cors');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
// Kết nối MongoDB
connectMongo();

const newsRoutes = require('./routes/newsRoutesMongoDB');
const eventRoutes = require('./routes/eventRoutesMongoDB');
const userRoutes = require('./routes/userRoutesMySQL');
const studentRoutes = require('./routes/studentRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutesMongoDB');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', userRoutes); // Tiền tố /api cho các route người dùng
app.use('/api', studentRoutes); 
app.use('/api', scholarshipRoutes);
app.use('/api',authMiddleware, newsRoutes); // Tiền tố /api cho các route tin tức
app.use('/api',authMiddleware, eventRoutes); // Tiền tố /api cho các route sự kiện




// Serve static files từ thư mục Frontend
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// Route bắt tất cả các request khác để phục vụ index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});