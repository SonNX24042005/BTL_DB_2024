USE QLDT;
drop table if exists HP;
-- 1: Tạo và nạp dữ liệu cho bảng HP (Học Phần)
CREATE TABLE IF NOT EXISTS HP (
  MaHP            VARCHAR(8) NOT NULL,
  TenHP           VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  ThoiLuong       VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  HeSoGK          DECIMAL(3,2) NULL,
  TinChiHocTap    TINYINT UNSIGNED NULL,
  TinChiHocPhi    TINYINT UNSIGNED NULL,
  MaNhomHP        VARCHAR(10) NULL,
  PRIMARY KEY (MaHP),
  FOREIGN KEY (MaNhomHP) REFERENCES NhomHocPhan(MaNhomHP)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Nạp dữ liệu từ file ThongTinCoBanCacMon.csv vào bảng HP
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.4/Uploads/ThongTinCoBanCacMon.csv'
INTO TABLE HP
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n' -- Hoặc '\n'
IGNORE 1 LINES -- Bỏ qua dòng tiêu đề
(@csvMaHP, @csvTenHP, @csvThoiLuong, @csvTinChiHocTap, @csvTinChiHocPhi, @csvHeSo, @csvMaNhomHP)
SET
  MaHP = TRIM(@csvMaHP),
  TenHP = TRIM(@csvTenHP),
  ThoiLuong = IF(TRIM(@csvThoiLuong) = '' OR TRIM(@csvThoiLuong) IS NULL, NULL, TRIM(@csvThoiLuong)),
  HeSoGK = IF(TRIM(@csvHeSo) = '' OR TRIM(@csvHeSo) IS NULL, NULL, CAST(TRIM(@csvHeSo) AS DECIMAL(3,2))),
  TinChiHocTap = IF(TRIM(@csvTinChiHocTap) = '' OR TRIM(@csvTinChiHocTap) IS NULL OR NOT TRIM(@csvTinChiHocTap) REGEXP '^[0-9]+$', NULL, CAST(TRIM(@csvTinChiHocTap) AS UNSIGNED)),
  TinChiHocPhi = IF(TRIM(@csvTinChiHocPhi) = '' OR TRIM(@csvTinChiHocPhi) IS NULL OR NOT TRIM(@csvTinChiHocPhi) REGEXP '^[0-9]+$', NULL, CAST(TRIM(@csvTinChiHocPhi) AS UNSIGNED)),
  MaNhomHP = IF(TRIM(@csvMaNhomHP) = '' OR TRIM(@csvMaNhomHP) IS NULL, NULL, TRIM(@csvMaNhomHP));