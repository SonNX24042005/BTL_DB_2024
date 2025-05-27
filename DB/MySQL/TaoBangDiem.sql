CREATE TABLE BangDiem (
    MSSV VARCHAR(20) NOT NULL,
    MaHP VARCHAR(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, -- Đã thêm CHARACTER SET và COLLATE
    HocKy VARCHAR(10) NOT NULL, -- Ví dụ: 20231 (Năm 2023, Kỳ 1)
    DiemSo DECIMAL(4,2) NULL,    -- Điểm số dạng số, ví dụ: 8.50
    DiemChu VARCHAR(3) NULL,     -- Điểm chữ, ví dụ: A, B+, F
    DiemGK DECIMAL(4,2) DEFAULT NULL,
    DiemCK DECIMAL(4,2) DEFAULT NULL,
    PRIMARY KEY (MSSV, MaHP, HocKy),
    FOREIGN KEY (MSSV) REFERENCES sinhvien(MSSV) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MaHP) REFERENCES hp(MaHP) ON DELETE CASCADE ON UPDATE CASCADE
);


DELIMITER $$

CREATE TRIGGER `bangdiem_before_insert`
BEFORE INSERT ON `bangdiem`
FOR EACH ROW
BEGIN
    DECLARE v_he_so_gk DECIMAL(3,2);
    DECLARE calculated_diem_so DECIMAL(4,2);

    SET calculated_diem_so = NULL; -- Khởi tạo
    SET NEW.DiemChu = NULL;      -- Khởi tạo

    -- Lấy HeSoGK từ bảng hp
    SELECT HeSoGK INTO v_he_so_gk FROM hp WHERE hp.MaHP = NEW.MaHP LIMIT 1;

    -- Tính DiemSo nếu DiemGK, DiemCK và v_he_so_gk đều không NULL
    IF NEW.DiemGK IS NOT NULL AND NEW.DiemCK IS NOT NULL AND v_he_so_gk IS NOT NULL THEN
        SET calculated_diem_so = ROUND(v_he_so_gk * NEW.DiemGK + (1 - v_he_so_gk) * NEW.DiemCK, 2);
    END IF;

    SET NEW.DiemSo = calculated_diem_so;

    -- Tính DiemChu dựa trên DiemSo
    IF NEW.DiemSo IS NOT NULL THEN
        SET NEW.DiemChu =
            CASE
                WHEN NEW.DiemSo < 4 THEN 'F'
                WHEN NEW.DiemSo < 5.0 THEN 'D'    -- Từ 4.0 đến 5.0
                WHEN NEW.DiemSo < 5.5 THEN 'D+'   -- Từ 5.01 đến 5.5
                WHEN NEW.DiemSo < 6.5 THEN 'C'    -- Từ 5.51 đến 6.5
                WHEN NEW.DiemSo < 7.0 THEN 'C+'   -- Từ 6.51 đến 7.0
                WHEN NEW.DiemSo < 8.0 THEN 'B'    -- Từ 7.01 đến 8.0
                WHEN NEW.DiemSo < 8.5 THEN 'B+'   -- Từ 8.01 đến 8.5
                WHEN NEW.DiemSo < 9.5 THEN 'A'    -- Từ 8.51 đến 9.5
                ELSE 'A+'                          -- Từ 9.51 trở lên
            END;
    ELSE
        SET NEW.DiemChu = NULL;
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER `bangdiem_before_update`
BEFORE UPDATE ON `bangdiem`
FOR EACH ROW
BEGIN
    DECLARE v_he_so_gk DECIMAL(3,2);
    DECLARE calculated_diem_so DECIMAL(4,2);

    SET calculated_diem_so = NULL; -- Khởi tạo
    SET NEW.DiemChu = NULL;      -- Khởi tạo

    -- Chỉ tính toán lại nếu các cột liên quan thay đổi
    IF NEW.DiemGK <> OLD.DiemGK OR NEW.DiemCK <> OLD.DiemCK OR NEW.MaHP <> OLD.MaHP OR (NEW.DiemGK IS NOT NULL AND OLD.DiemGK IS NULL) OR (NEW.DiemCK IS NOT NULL AND OLD.DiemCK IS NULL) THEN
        -- Lấy HeSoGK từ bảng hp
        SELECT HeSoGK INTO v_he_so_gk FROM hp WHERE hp.MaHP = NEW.MaHP LIMIT 1;

        -- Tính DiemSo nếu DiemGK, DiemCK và v_he_so_gk đều không NULL
        IF NEW.DiemGK IS NOT NULL AND NEW.DiemCK IS NOT NULL AND v_he_so_gk IS NOT NULL THEN
            SET calculated_diem_so = ROUND(v_he_so_gk * NEW.DiemGK + (1 - v_he_so_gk) * NEW.DiemCK, 2);
        END IF;
        
        SET NEW.DiemSo = calculated_diem_so;

        -- Tính DiemChu dựa trên DiemSo
        IF NEW.DiemSo IS NOT NULL THEN
            SET NEW.DiemChu =
                CASE
                    WHEN NEW.DiemSo < 3.9 THEN 'F'
                    WHEN NEW.DiemSo < 5.0 THEN 'D'
                    WHEN NEW.DiemSo < 5.5 THEN 'D+'
                    WHEN NEW.DiemSo < 6.5 THEN 'C'
                    WHEN NEW.DiemSo < 7.0 THEN 'C+'
                    WHEN NEW.DiemSo < 8.0 THEN 'B'
                    WHEN NEW.DiemSo < 8.5 THEN 'B+'
                    WHEN NEW.DiemSo < 9.5 THEN 'A'
                    ELSE 'A+'
                END;
        ELSE
            SET NEW.DiemChu = NULL;
        END IF;
    END IF;
END$$

DELIMITER ;

-- Sinh viên: 20230089
INSERT INTO bangdiem (MSSV, MaHP, HocKy, DiemGK, DiemCK) VALUES
('20230089', 'IT3190', '20251', 7.5, 8.0),  -- Lập trình mạng ứng dụng
('20230089', 'IT3230', '20251', 8.0, 8.5),  -- Đồ án Công nghệ phần mềm
('20230089', 'IT3280', '20251', 7.0, 7.8),  -- An toàn thông tin
('20230089', 'IT3283', '20251', 8.5, 9.0),  -- Thực hành An toàn thông tin
('20230089', 'IT3290', '20251', 6.5, 7.0),  -- Mạng máy tính nâng cao
('20230089', 'ED3220', '20251', 6.5, 7.0),

('20230089', 'IT3292', '20252', 7.8, 8.2),  -- Thực hành Mạng máy tính nâng cao
('20230089', 'IT3323', '20252', 8.2, 8.8),  -- Xây dựng chương trình dịch
('20230089', 'IT3362', '20252', 7.0, 8.0),  -- Phát triển ứng dụng Web phía Client với JS Frameworks
('20230089', 'IT3382', '20252', 8.8, 9.2),  -- Kiến trúc hướng dịch vụ (SOA) và Web Service
('20230089', 'IT3420', '20252', 6.0, 7.5),  -- Điện tử cho Công nghệ Thông tin

('20230089', 'IT4015', '20261', 7.5, 7.0),  -- Kiểm thử phần mềm
('20230089', 'IT4062', '20261', 8.0, 7.8),  -- Lập trình mạng (Thực hành Lập trình mạng)
('20230089', 'IT4082', '20261', 8.5, 8.0),  -- Quản lý dự án phần mềm
('20230089', 'IT4110', '20261', 9.0, 9.5),  -- Tính toán khoa học
('20230089', 'IT4172', '20261', 7.2, 8.1),  -- Xử lý tín hiệu số

('20230089', 'JP1110', '20242', 8.0, 8.5),  -- Tiếng Nhật 1 (Giả sử chưa học)
('20230089', 'JP1120', '20242', 7.5, 7.9),  -- Tiếng Nhật 2 (Giả sử chưa học)
('20230089', 'SSH1121', '20242', 8.8, 9.0), -- Kinh tế chính trị Mác - Lênin
('20230089', 'MIL1210', '20242', 9.0, 9.2), -- Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam
('20230089', 'PE1024', '20242', 7.0, 8.0);   -- Bơi lội (Giáo dục thể chất)
-- Thêm dữ liệu điểm cho sinh viên: 20236379 (Lớp IT-E10-K68-05)
INSERT INTO bangdiem (MSSV, MaHP, HocKy, DiemGK, DiemCK) VALUES
('20236379', 'SSH1111', '20231', 8.0, 8.5), -- Triết học Mác - Lênin (KyHocKhuyenNghi: 1 cho IT-E10)
('20236379', 'MI1111E', '20231', 7.5, 8.0), -- Giải tích I (KyHocKhuyenNghi: 1 cho IT-E10)
('20236379', 'MI1141E', '20231', 8.5, 9.0), -- Đại số (KyHocKhuyenNghi: 1 cho IT-E10)
('20236379', 'IT1110E', '20231', 9.0, 9.2), -- Nhập môn lập trình (KyHocKhuyenNghi: 1 cho IT-E10)
('20236379', 'MIL1210', '20231', 8.0, 7.5), -- Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam (KyHocKhuyenNghi: 1 cho IT-E10)
('20236379', 'PE1014', '20231', 7.0, 8.0),  -- Lý luận TDTT (KyHocKhuyenNghi: 1 cho IT-E10)
('20236379', 'PE1015', '20231', 8.5, 8.8),  -- Thể dục tay không (KyHocKhuyenNghi: 1 cho IT-E10)

('20236379', 'EM1170', '20232', 7.8, 8.2),  -- Pháp luật đại cương (KyHocKhuyenNghi: 2 cho IT-E10)
('20236379', 'IT3010E', '20232', 8.2, 8.8), -- Cấu trúc dữ liệu và giải thuật (KyHocKhuyenNghi: 2 cho IT-E10)
('20236379', 'IT3020E', '20232', 7.0, 8.0), -- Toán rời rạc (KyHocKhuyenNghi: 2 cho IT-E10)
('20236379', 'MI1121E', '20232', 8.8, 9.2), -- Giải tích II (KyHocKhuyenNghi: 2 cho IT-E10)
('20236379', 'MI2020E', '20232', 6.0, 7.5), -- Xác suất thống kê (KyHocKhuyenNghi: 2 cho IT-E10)
('20236379', 'MIL1220', '20232', 7.5, 7.0), -- Công tác quốc phòng và an ninh (KyHocKhuyenNghi: 2 cho IT-E10)
('20236379', 'PE1024', '20232', 8.0, 7.8),  -- Bơi lội (KyHocKhuyenNghi: 2 cho IT-E10)
('20236379', 'PH1110E', '20232', 8.5, 8.0), -- Basic Physics (KyHocKhuyenNghi: 2 cho IT-E10)

('20236379', 'IT3030E', '20241', 9.0, 9.5), -- Kiến trúc máy tính (KyHocKhuyenNghi: 3 cho IT-E10)
('20236379', 'IT3052E', '20241', 7.2, 8.1), -- Tối ưu hóa (KyHocKhuyenNghi: 3 cho IT-E10)
('20236379', 'IT3100E', '20241', 8.0, 8.5), -- Lập trình hướng đối tượng (KyHocKhuyenNghi: 3 cho IT-E10)
('20236379', 'IT3160E', '20241', 7.5, 7.9), -- Nhập môn Trí tuệ nhân tạo (KyHocKhuyenNghi: 3 cho IT-E10)
('20236379', 'MI1131E', '20241', 8.8, 9.0); -- Giải tích III (KyHocKhuyenNghi: 3 cho IT-E10)