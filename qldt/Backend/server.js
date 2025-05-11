const express = require('express');
const cors = require('cors');
const path = require('path');
const newsRoutes = require('./routes/newsRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', newsRoutes); // Tiền tố /api cho các route tin tức
app.use('/api', eventRoutes); // Tiền tố /api cho các route sự kiện

// Serve static files từ thư mục Frontend
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// Route bắt tất cả các request khác để phục vụ index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});