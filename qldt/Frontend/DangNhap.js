document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    // Cập nhật giao diện dựa trên phản hồi từ API
    const messageElement = document.getElementById("loginMessage");
    messageElement.innerText = data.message;
    messageElement.style.color = res.ok ? "green" : "red"; // Màu xanh nếu thành công, đỏ nếu thất bại

    if (res.ok) {
        setTimeout(() => {
            window.location.href = "index.html"; // Chuyển đến trang chủ sau 2s
        }, 2000);
    }
});