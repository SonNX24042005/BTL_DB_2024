
const allNewsItems = [
    {
        id: 1,
        image: "images/2025ProgramUpdate.jpg", // Đường dẫn tương đối từ index.html
        title: "Cập nhật chương trình đào tạo 2025",
        category: "Thông báo",
        link: "#news1" // Hoặc link tới trang chi tiết
    },
    {
        id: 2,
        image: "images/2025ProgramUpdate1.jpg",
        title: "Hội thảo Công nghệ AI đột phá",
        category: "Sự kiện",
        link: "#news2"
    },
    {
        id: 3,
        image: "images/2025ProgramUpdate2.jpg",
        title: "Ngày hội việc làm IT 2024",
        category: "Tuyển dụng",
        link: "#news3"
    },
    {
        id: 4,
        image: "images/2025ProgramUpdate3.jpg",
        title: "Khai giảng khóa học Lập trình Web",
        category: "Đào tạo",
        link: "#news4"
    },
    {
        id: 5,
        image: "images/2025ProgramUpdate.jpg",
        title: "Cuộc thi Sáng tạo Robot sinh viên",
        category: "Cuộc thi",
        link: "#news5"
    },
    {
        id: 6,
        image: "images/2025ProgramUpdate1.jpg",
        title: "Chương trình trao đổi sinh viên quốc tế",
        category: "Hợp tác",
        link: "#news6"
    },
    {
        id: 7,
        image: "images/2025ProgramUpdate2.jpg",
        title: "Ngày hội việc làm IT 2024",
        category: "Tuyển dụng",
        link: "#news3"
    },
    {
        id: 8,
        image: "images/2025ProgramUpdate3.jpg",
        title: "Khai giảng khóa học Lập trình Web",
        category: "Đào tạo",
        link: "#news4"
    },
    // Thêm các tin tức khác nếu muốn
];

const getNews = (page = 1, limit = 3) => { // Mặc định mỗi lần tải 3 tin
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedItems = allNewsItems.slice(startIndex, endIndex);
    const hasMore = endIndex < allNewsItems.length;
    return { news: paginatedItems, hasMore };
};

module.exports = {
    getNews
};