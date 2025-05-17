USE QLDT;

CREATE TABLE Truong (
  MaTruong    VARCHAR(10) NOT NULL,
  TenTruong   VARCHAR(50) NOT NULL,
  PRIMARY KEY (MaTruong)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Truong (MaTruong, TenTruong) VALUES
  ('SME',  'Trường Cơ khí'),
  ('SOICT','Trường Công nghệ Thông tin và Truyền thông'),
  ('SEEE', 'Trường Điện - Điện tử'),
  ('SMSE', 'Trường Vật liệu'),
  ('SCLS', 'Trường Hóa và Khoa học sự sống'),
  ('SEM',  'Trường Kinh tế'),
  ('FED',  'Khoa Khoa học và Công nghệ Giáo dục'),
  ('SEP',  'Khoa Vật lý kỹ thuật'),
  ('FAMI', 'Khoa Toán - Tin'),
  ('SOFL', 'Khoa Ngoại ngữ'),
  ('QPAN', 'Khoa Giáo dục Quốc phòng và An ninh'),
  ('GDTC', 'Khoa Giáo dục thể chất'),
  ('FPT',  'Khoa Lý luận chính trị');