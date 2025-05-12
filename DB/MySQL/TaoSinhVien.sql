USE QLDT;

-- (1) Tạo lại bảng tạm tmpSV
DROP TABLE IF EXISTS tmpSV;
SET SQL_SAFE_UPDATES = 0;
CREATE TABLE tmpSV (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  Gender       VARCHAR(10),
  HoDem        VARCHAR(100),
  LastName     VARCHAR(100),
  NgaySinh     DATE,
  MaSV         VARCHAR(20),
  MaLop        VARCHAR(15),
  HoDem_Proc   VARCHAR(100),
  LastName_Proc VARCHAR(100),
  Username     VARCHAR(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- (2) Import CSV
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.4/Uploads/k68.csv'
INTO TABLE tmpSV
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(
  Gender,
  HoDem,
  LastName,
  @tmpNgay,
  MaSV,
  MaLop
)
SET
  NgaySinh = STR_TO_DATE(@tmpNgay, '%d/%m/%Y');

-- (3) Lowercase
UPDATE tmpSV
SET
  HoDem_Proc     = LOWER(HoDem),
  LastName_Proc  = LOWER(LastName);

-- (4) Tháo dấu trên HoDem_Proc
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Á', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'À', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ả', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ã', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ạ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'á', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'à', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ả', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ã', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ạ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ă', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ắ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ằ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ẳ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ẵ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ặ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ă', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ắ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ằ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ẳ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ẵ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ặ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Â', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ấ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ầ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ẩ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ẫ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ậ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'â', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ấ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ầ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ẩ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ẫ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ậ', 'a');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'É', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'È', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ẻ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ẽ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ẹ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'é', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'è', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ẻ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ẽ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ẹ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ê', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ế', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ề', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ể', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ễ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ệ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ê', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ế', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ề', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ể', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ễ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ệ', 'e');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Í', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ì', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỉ', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ĩ', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ị', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'í', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ì', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỉ', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ĩ', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ị', 'i');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ó', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ò', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỏ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Õ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ọ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ó', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ò', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỏ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'õ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ọ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ô', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ố', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ồ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ổ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỗ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ộ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ô', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ố', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ồ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ổ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỗ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ộ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ơ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ớ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ờ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ở', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỡ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ợ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ơ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ớ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ờ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ở', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỡ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ợ', 'o');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ú', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ù', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ủ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ũ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ụ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ú', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ù', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ủ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ũ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ụ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ư', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ứ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ừ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ử', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ữ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ự', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ư', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ứ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ừ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ử', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ữ', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ự', 'u');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ý', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỳ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỷ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỹ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Ỵ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ý', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỳ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỷ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỹ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'ỵ', 'y');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'Đ', 'd');
UPDATE tmpSV SET HoDem_Proc = REPLACE(HoDem_Proc, 'đ', 'd');

-- (5) Tháo dấu trên LastName_Proc
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'á', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'à', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ả', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ã', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ạ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ă', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ắ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ằ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ẳ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ẵ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ặ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'â', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ấ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ầ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ẩ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ẫ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ậ', 'a');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'é', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'è', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ẻ', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ẽ', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ẹ', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ê', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ế', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ề', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ể', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ễ', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ệ', 'e');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'í', 'i');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ì', 'i');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỉ', 'i');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ĩ', 'i');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ị', 'i');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ó', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ò', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỏ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'õ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ọ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ô', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ố', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ồ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ổ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỗ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ộ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ơ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ớ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ờ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ở', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỡ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ợ', 'o');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ú', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ù', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ủ', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ũ', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ụ', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ư', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ứ', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ừ', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ử', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ữ', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ự', 'u');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ý', 'y');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỳ', 'y');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỷ', 'y');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỹ', 'y');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'ỵ', 'y');
UPDATE tmpSV SET LastName_Proc = REPLACE(LastName_Proc, 'đ', 'd');

-- (6) Sinh Username & insert vào TaiKhoan
UPDATE tmpSV
SET Username = CONCAT(
    LastName_Proc, '.',
    COALESCE(LEFT(SUBSTRING_INDEX(HoDem_Proc, ' ', 1),1), ''),
    IF(
      LOCATE(' ', HoDem_Proc) > 0,
      LEFT(SUBSTRING_INDEX(SUBSTRING_INDEX(HoDem_Proc, ' ', 2), ' ', -1),1),
      ''
    ),
    IF(
      (LENGTH(HoDem_Proc) - LENGTH(REPLACE(HoDem_Proc,' ',''))) >= 2,
      LEFT(SUBSTRING_INDEX(SUBSTRING_INDEX(HoDem_Proc, ' ', 3), ' ', -1),1),
      ''
    ),
    SUBSTR(MaSV, 3),
    '@sis.hust.edu.vn'
);


INSERT INTO TaiKhoan (Username, MatKhau)
SELECT DISTINCT Username, MaSV
FROM tmpSV
WHERE Username IS NOT NULL;

-- (7) Tạo và insert vào SinhVien
DROP TABLE IF EXISTS SinhVien;
CREATE TABLE SinhVien (
  MSSV       VARCHAR(20)     NOT NULL,
  HoTenSV    VARCHAR(200)    NOT NULL,
  GioiTinh   ENUM('Nam','Nu') NOT NULL,
  MaLop      VARCHAR(15)     NOT NULL,
  Email      VARCHAR(150)    NULL,
  DoB        DATE            NULL,
  TrangThai  TINYINT(1)      NOT NULL DEFAULT 1,
  PRIMARY KEY (MSSV),
  FOREIGN KEY (Email) REFERENCES TaiKhoan(Username)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4;
INSERT INTO SinhVien (MSSV, HoTenSV, GioiTinh, MaLop, Email, DoB,TrangThai)
SELECT
  MaSV AS MSSV,
  CONCAT(HoDem,' ',LastName) AS HoTenSV,
  IF(Gender='Nam','Nam','Nu') AS GioiTinh,
  MaLop,
  Username AS Email,
  NgaySinh AS DoB,
  1 AS TrangThai
FROM tmpSV
WHERE MaLop IS NOT NULL AND Username IS NOT NULL;
SET SQL_SAFE_UPDATES = 1;