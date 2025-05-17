const New = require('../models/newsModelMongoDB');

exports.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params, mặc định là 1
        const limit = parseInt(req.query.limit) || 3; // Lấy số lượng item mỗi trang, mặc định là 3 (khớp với frontend)
        const skip = (page - 1) * limit; // Tính toán số lượng documents cần bỏ qua

        const newsItems = await New.find()
            .sort({ title: 1 }) // Sắp xếp theo title tăng dần để tin mới nhất lên đầu (hoặc theo trường ngày tạo nếu có)
            .skip(skip)
            .limit(limit);

        const totalNews = await New.countDocuments(); // Đếm tổng số tin tức
        const hasMore = (page * limit) < totalNews; // Kiểm tra xem còn tin tức để tải thêm không

        let newsHtml = '';
        newsItems.forEach(item => {
            newsHtml += `
            <f-grid-col>
                <img src="${item.image}" style="width: 100%" alt="${item.title}">
                <div class="content">
                    <h2>${item.title}</h2>
                    <p class="title">${item.category}</p>
                    <p><a href="${item.link}" class="button">Đọc ngay</a></p>
                </div>
            </f-grid-col>
        `;
        });

        res.json({
            html: newsHtml, // HTML của các tin tức
            hasMore: hasMore   // Boolean cho biết có còn tin tức không
        });

    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi tải tin tức." });
    }
};