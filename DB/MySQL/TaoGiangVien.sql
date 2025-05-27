   USE QLDT;

-- 1) XÓA bảng tạm và các tài khoản GV cũ, bảng GiangVien cũ
DROP TABLE IF EXISTS tmpGV;
SET SQL_SAFE_UPDATES = 0;
DELETE FROM TaiKhoan WHERE MatKhau LIKE 'GV%';
DROP TABLE IF EXISTS GiangVien;

-- 2) TẠO bảng tạm tmpGV
CREATE TABLE tmpGV (
  MaGV        VARCHAR(6)    NOT NULL,
  FirstName   VARCHAR(100)  NULL,
  LastName    VARCHAR(50)   NULL,
  FProc       VARCHAR(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  LProc       VARCHAR(50)   CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  BaseUser    VARCHAR(125)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  RN          INT,
  Username    VARCHAR(130)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3) IMPORT CSV
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.4/Uploads/GiangVien.csv'
INTO TABLE tmpGV
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(MaGV, @FirstNameVar, @LastNameVar)
SET
  FirstName = NULLIF(TRIM(@FirstNameVar), ''),
  LastName = NULLIF(TRIM(@LastNameVar), '');

-- 4) Khởi tạo First_Proc, Last_Proc
UPDATE tmpGV
SET
  FProc = LOWER(COALESCE(TRIM(FirstName), '')),
  LProc  = LOWER(COALESCE(TRIM(LastName), ''));

-- 5) Loại dấu cho First_Proc
UPDATE tmpGV SET FProc = REPLACE(FProc,'á','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'à','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ả','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ã','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ạ','a');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ă','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ắ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ằ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ẳ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ẵ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ặ','a');
UPDATE tmpGV SET FProc = REPLACE(FProc,'â','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ấ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ầ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ẩ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ẫ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ậ','a');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Á','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'À','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ả','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ã','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ạ','a');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ă','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ắ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ằ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ẳ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ẵ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ặ','a');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Â','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ấ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ầ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ẩ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ẫ','a'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ậ','a');
UPDATE tmpGV SET FProc = REPLACE(FProc,'é','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'è','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ẻ','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ẽ','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ẹ','e');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ê','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ế','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ề','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ể','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ễ','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ệ','e');
UPDATE tmpGV SET FProc = REPLACE(FProc,'É','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'È','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ẻ','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ẽ','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ẹ','e');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ê','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ế','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ề','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ể','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ễ','e'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ệ','e');
UPDATE tmpGV SET FProc = REPLACE(FProc,'í','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ì','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỉ','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ĩ','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ị','i');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Í','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ì','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỉ','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ĩ','i'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ị','i');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ó','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ò','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỏ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'õ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ọ','o');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ô','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ố','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ồ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ổ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỗ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ộ','o');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ơ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ớ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ờ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ở','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỡ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ợ','o');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ó','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ò','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỏ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Õ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ọ','o');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ô','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ố','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ồ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ổ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỗ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ộ','o');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ơ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ớ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ờ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ở','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỡ','o'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ợ','o');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ú','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ù','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ủ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ũ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ụ','u');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ư','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ứ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ừ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ử','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ữ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ự','u');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ú','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ù','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ủ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ũ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ụ','u');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ư','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ứ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ừ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ử','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ữ','u'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ự','u');
UPDATE tmpGV SET FProc = REPLACE(FProc,'ý','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỳ','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỷ','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỹ','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'ỵ','y');
UPDATE tmpGV SET FProc = REPLACE(FProc,'Ý','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỳ','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỷ','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỹ','y'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Ỵ','y');
UPDATE tmpGV SET FProc = REPLACE(FProc,'đ','d'); UPDATE tmpGV SET FProc = REPLACE(FProc,'Đ','d');

-- 6) Loại dấu cho Last_Proc
UPDATE tmpGV SET LProc = REPLACE(LProc,'á','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'à','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ả','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ã','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ạ','a');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ă','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ắ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ằ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ẳ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ẵ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ặ','a');
UPDATE tmpGV SET LProc = REPLACE(LProc,'â','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ấ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ầ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ẩ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ẫ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ậ','a');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Á','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'À','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ả','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ã','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ạ','a');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ă','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ắ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ằ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ẳ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ẵ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ặ','a');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Â','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ấ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ầ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ẩ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ẫ','a'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ậ','a');
UPDATE tmpGV SET LProc = REPLACE(LProc,'é','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'è','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ẻ','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ẽ','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ẹ','e');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ê','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ế','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ề','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ể','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ễ','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ệ','e');
UPDATE tmpGV SET LProc = REPLACE(LProc,'É','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'È','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ẻ','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ẽ','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ẹ','e');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ê','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ế','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ề','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ể','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ễ','e'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ệ','e');
UPDATE tmpGV SET LProc = REPLACE(LProc,'í','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ì','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỉ','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ĩ','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ị','i');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Í','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ì','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỉ','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ĩ','i'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ị','i');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ó','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ò','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỏ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'õ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ọ','o');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ô','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ố','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ồ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ổ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỗ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ộ','o');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ơ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ớ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ờ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ở','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỡ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ợ','o');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ó','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ò','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỏ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Õ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ọ','o');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ô','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ố','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ồ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ổ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỗ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ộ','o');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ơ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ớ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ờ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ở','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỡ','o'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ợ','o');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ú','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ù','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ủ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ũ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ụ','u');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ư','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ứ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ừ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ử','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ữ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ự','u');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ú','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ù','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ủ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ũ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ụ','u');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ư','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ứ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ừ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ử','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ữ','u'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ự','u');
UPDATE tmpGV SET LProc = REPLACE(LProc,'ý','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỳ','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỷ','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỹ','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'ỵ','y');
UPDATE tmpGV SET LProc = REPLACE(LProc,'Ý','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỳ','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỷ','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỹ','y'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Ỵ','y');
UPDATE tmpGV SET LProc = REPLACE(LProc,'đ','d'); UPDATE tmpGV SET LProc = REPLACE(LProc,'Đ','d');

-- 7) Tính BaseUser
UPDATE tmpGV
SET BaseUser = CONCAT(
  LProc,
  '.',
  COALESCE(LEFT(SUBSTRING_INDEX(FProc, ' ', 1), 1), ''),
  IF(
    LOCATE(' ', FProc) > 0,
    COALESCE(LEFT(SUBSTRING_INDEX(SUBSTRING_INDEX(FProc, ' ', 2), ' ', -1), 1), ''),
    ''
  ),
  IF(
    (LENGTH(FProc) - LENGTH(REPLACE(FProc, ' ', ''))) >= 2,
    COALESCE(LEFT(SUBSTRING_INDEX(SUBSTRING_INDEX(FProc, ' ', 3), ' ', -1), 1), ''),
    ''
  ),
  IF(
    (LENGTH(FProc) - LENGTH(REPLACE(FProc, ' ', ''))) >= 3,
    COALESCE(LEFT(SUBSTRING_INDEX(SUBSTRING_INDEX(FProc, ' ', 4), ' ', -1), 1), ''),
    ''
  )
);
UPDATE tmpGV SET BaseUser = IF(BaseUser = '.', '', BaseUser); -- Nếu chỉ có '.', làm rỗng
UPDATE tmpGV SET BaseUser = IF(LEFT(BaseUser,1) = '.', SUBSTRING(BaseUser, 2), BaseUser); -- Nếu bắt đầu bằng '.', bỏ nó đi
UPDATE tmpGV SET BaseUser = IF(RIGHT(BaseUser,1) = '.', SUBSTRING(BaseUser, 1, LENGTH(BaseUser)-1), BaseUser); -- Nếu kết thúc bằng '.', bỏ nó đi


-- 9) Gán RN để xử lý trùng BaseUser
UPDATE tmpGV
SET BaseUser = IF(COALESCE(TRIM(BaseUser), '') = '', CONCAT('user', MaGV, '_fallback'), BaseUser);

UPDATE tmpGV AS t
JOIN (
  SELECT
    MaGV,
    ROW_NUMBER() OVER (PARTITION BY BaseUser ORDER BY MaGV) AS rn_val
  FROM tmpGV
) AS x ON t.MaGV = x.MaGV
SET t.RN = x.rn_val;

-- 10) Sinh Username cuối cùng (không có @domain)
UPDATE tmpGV
SET Username = IF(
    COALESCE(TRIM(BaseUser), '') = '',
    CONCAT('user', MaGV),
    IF(RN = 1, BaseUser, CONCAT(BaseUser, RN))
);

-- 11) Đổ vào TaiKhoan (matkhau = MaGV)
INSERT INTO TaiKhoan (Username, MatKhau)
SELECT DISTINCT
    CONCAT(tg.Username, '@soict.hust.edu.vn'),
    tg.MaGV
FROM tmpGV tg
WHERE tg.Username IS NOT NULL AND tg.Username <> '' AND LENGTH(CONCAT(tg.Username, '@soict.hust.edu.vn')) <= 150
ON DUPLICATE KEY UPDATE MatKhau = VALUES(MatKhau);

-- 13) Tạo và đổ vào GiangVien
CREATE TABLE IF NOT EXISTS GiangVien (
  MaGV        VARCHAR(6)    NOT NULL,
  HoTenGV     VARCHAR(150)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  Email       VARCHAR(150)  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  MaTruong    VARCHAR(10)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (MaGV),
  FOREIGN KEY (MaTruong) REFERENCES Truong(MaTruong)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (Email) REFERENCES TaiKhoan(Username)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- Bảng GiangVien có thể dùng COLLATE mặc định unicode_ci cho các cột khác

INSERT INTO GiangVien (MaGV, HoTenGV, Email, MaTruong)
SELECT
  MaGV,
  TRIM(CONCAT(COALESCE(FirstName,''),' ',COALESCE(LastName,''))),
  CONCAT(Username,'@soict.hust.edu.vn'),
  'SOICT'
FROM tmpGV
WHERE Username IS NOT NULL AND Username <> '' AND LENGTH(CONCAT(Username, '@soict.hust.edu.vn')) <= 150;

-- 14) BẬT lại safe‐updates
SET SQL_SAFE_UPDATES = 1;
DROP TABLE IF EXISTS tmpGV;
