SET SQL_SAFE_UPDATES = 0;
DELETE FROM SinhVien;

-- 2. Xóa các tài khoản có mật khẩu bắt đầu bằng '2023'
DELETE FROM TaiKhoan
WHERE MatKhau LIKE '2023%';
SET SQL_SAFE_UPDATES = 1;