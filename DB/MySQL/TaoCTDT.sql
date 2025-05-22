USE QLDT;

-- 1. Tạo bảng Chương Trình Đào Tạo
CREATE TABLE IF NOT EXISTS ChuongTrinhDaoTao (
  MaChuongTrinh    VARCHAR(10) CHARACTER SET utf8mb4 NOT NULL, -- Sẽ sử dụng collation mặc định của bảng (được đặt bên dưới)
  MaHP             VARCHAR(8)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, -- Để khớp với HP.MaHP
  KyHocKhuyenNghi  VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (MaChuongTrinh, MaHP),
  FOREIGN KEY (MaChuongTrinh) REFERENCES ChuongTrinh(MaChuongTrinh)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (MaHP) REFERENCES HP(MaHP)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Nạp dữ liệu từ file ChuongTrinhDaoTao.csv vào bảng CTDT
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.4/Uploads/ChuongTrinhDaoTao.csv'
INTO TABLE ChuongTrinhDaoTao
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n' -- Hoặc '\n' tùy theo định dạng file CSV của bạn
IGNORE 1 LINES -- Bỏ qua dòng tiêu đề
(@csvMaChuongTrinh, @csvMaHP, @csvKyHocKhuyenNghi)
SET
  MaChuongTrinh   = TRIM(@csvMaChuongTrinh),
  MaHP            = TRIM(@csvMaHP),
  KyHocKhuyenNghi = IF(TRIM(LOWER(@csvKyHocKhuyenNghi)) = '' OR TRIM(LOWER(@csvKyHocKhuyenNghi)) IS NULL OR TRIM(LOWER(@csvKyHocKhuyenNghi)) = 'null', NULL, TRIM(@csvKyHocKhuyenNghi));