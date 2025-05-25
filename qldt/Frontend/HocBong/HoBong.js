document.addEventListener('DOMContentLoaded', () => {
    const scholarshipGrid = document.getElementById('scholarshipGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const apiURL = '/api/scholarships'; 

    let allScholarships = [];
    let currentlyDisplayed = 0;
    const displayCount = 2; 


    function createScholarshipCard(scholarship) {
        const card = document.createElement('div');
        card.classList.add('scholarship-card');

        let detailsHtml = '<ul>';
        scholarship.details.forEach(detail => {

            detailsHtml += `<li><b>${detail.key || ''}:</b> ${detail.value || ''}</li>`;
        });
        detailsHtml += '</ul>';

        card.innerHTML = `
            <h2>${scholarship.title}</h2>
            <p>${scholarship.description}</p>
            ${detailsHtml}
            <a href="${scholarship.link || '#'}" class="btn" target="_blank" rel="noopener noreferrer">Xem Chi Tiết</a>
        `;
        return card;
    }

    
    function displayScholarships() {
        const startIndex = currentlyDisplayed;
        const endIndex = startIndex + displayCount;
        const scholarshipsToDisplay = allScholarships.slice(startIndex, endIndex);

        scholarshipsToDisplay.forEach(scholarship => {
            const card = createScholarshipCard(scholarship);
            scholarshipGrid.appendChild(card);
        });

        currentlyDisplayed += scholarshipsToDisplay.length;

        
        if (currentlyDisplayed >= allScholarships.length) {
            loadMoreBtn.style.display = 'none'; 
        } else {
            loadMoreBtn.style.display = 'inline-block'; 
        }
    }

    // Hàm fetch dữ liệu
    async function fetchScholarships() {
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error(`Lỗi mạng hoặc server: ${response.statusText}`);
            }
            const data = await response.json();

            scholarshipGrid.innerHTML = ''; 

            if (data.success && data.data.length > 0) {
                allScholarships = data.data;
                displayScholarships(); 
            } else {
                scholarshipGrid.innerHTML = '<p class="error-message">Hiện tại chưa có thông tin học bổng.</p>';
                loadMoreBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu học bổng:', error);
            scholarshipGrid.innerHTML = `<p class="error-message">Đã xảy ra lỗi khi tải dữ liệu. Vui lòng kiểm tra lại kết nối hoặc đảm bảo backend đang chạy.</p>`;
            loadMoreBtn.style.display = 'none';
        }
    }

    // Thêm sự kiện cho nút "Hiển thị thêm"
    loadMoreBtn.addEventListener('click', displayScholarships);

    // Bắt đầu tải dữ liệu khi trang được load
    fetchScholarships();
});