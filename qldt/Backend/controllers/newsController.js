
const newsModel = require('../models/newsModel');

const getNewsItems = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3; // Số lượng item mỗi lần tải

    const { news, hasMore } = newsModel.getNews(page, limit);

    const htmlNewsItems = news.map(item => `
        <f-grid-col>
            <img src="${item.image}" style="width: 100%" alt="${item.title}">
            <div class="content">
                <h2>${item.title}</h2>
                <p class="title">${item.category}</p>
                <p><a href="${item.link}" class="button">Đọc ngay</a></p>
            </div>
        </f-grid-col>
    `).join(''); // Nối các chuỗi HTML lại

    res.json({ html: htmlNewsItems, hasMore });
};

module.exports = {
    getNewsItems
};