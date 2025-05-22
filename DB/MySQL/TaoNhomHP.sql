USE QLDT;

-- Bước 1: Tạo bảng NhomHocPhan
CREATE TABLE IF NOT EXISTS NhomHocPhan (
  MaNhomHP VARCHAR(10) NOT NULL,
  TenNhomHP VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (MaNhomHP)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bước 2: Nạp dữ liệu từ file CSV
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.4/Uploads/NhomHocPhan.csv' -- <<< XIN HÃY KIỂM TRA VÀ THAY ĐỔI ĐƯỜNG DẪN NÀY CHO CHÍNH XÁC
INTO TABLE NhomHocPhan
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n' -- Hoặc '\n' tùy thuộc vào file CSV của bạn
IGNORE 1 LINES -- Bỏ qua dòng tiêu đề của file CSV
(MaNhomHP, TenNhomHP);