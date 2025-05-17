USE QLDT;
CREATE TABLE IF NOT EXISTS ChuongTrinh (
  MaChuongTrinh  VARCHAR(10)    NOT NULL,
  TenChuongTrinh VARCHAR(100)   NOT NULL,
  MaTruong       VARCHAR(10)    NOT NULL,
  PRIMARY KEY (MaChuongTrinh),
  FOREIGN KEY (MaTruong) REFERENCES Truong(MaTruong)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ChuongTrinh (MaChuongTrinh, TenChuongTrinh, MaTruong) VALUES
  -- FAMI
  ('MI1',  'Toán-Tin',                  'FAMI'),
  ('MI2',  'Hệ thống Thông tin quản lý','FAMI'),
  ('TROY-IT','Khoa học Máy tính - ĐH Troy','FAMI'),

  -- FED
  ('ED2',  'Công nghệ Giáo dục',         'FED'),
  ('ED3',  'Quản lý Giáo dục',     'FED'),

  -- SCLS
  ('BF1',  'Kỹ thuật Sinh học',          'SCLS'),
  ('BF2',  'Kỹ thuật Thực phẩm',         'SCLS'),
  ('CH1',  'Kỹ thuật Hóa học',           'SCLS'),
  ('CH2',  'Hóa học',                     'SCLS'),
  ('EV1',  'Kỹ thuật Môi trường',        'SCLS'),
  ('EV2',  'Quản lý Tài nguyên và Môi trường', 'SCLS'),
  ('BF-E12','Kỹ thuật Thực phẩm', 'SCLS'),
  ('BF-E19','Kỹ thuật Sinh học',   'SCLS'),
  ('CH-E11','Kỹ thuật Hóa dược',   'SCLS'),

  -- SEEE
  ('EE1',  'Kỹ thuật điện',              'SEEE'),
  ('EE2',  'Kỹ thuật điều khiển & Tự động hóa','SEEE'),
  ('ET1',  'Kỹ thuật Điện tử-Viễn thông','SEEE'),
  ('ET2',  'Kỹ thuật Y sinh',            'SEEE'),
  ('EE-E8','Kỹ thuật điều khiển-Tự động hóa', 'SEEE'),
  ('EE-E18','Hệ thống điện và năng lượng tái tạo', 'SEEE'),
  ('ET-E16','Truyền thông số và Kỹ thuật đa phương tiện', 'SEEE'),
  ('ET-E4','Kỹ thuật Điện tử - Viễn thông', 'SEEE'),
  ('ET-E5','Kỹ thuật Y sinh', 'SEEE'),
  ('ET-E9','Hệ thống nhúng thông minh và IoT', 'SEEE'),
  ('ET-LUH','Điện tử - Viễn thông', 'SEEE'),
  ('EE-EP','Tin học công nghiệp và Tự động hóa', 'SEEE'),

  -- SEM
  ('EM1',  'Quản lý Năng lượng',         'SEM'),
  ('EM2',  'Quản lý Công nghiệp',        'SEM'),
  ('EM3',  'Quản trị Kinh doanh',        'SEM'),
  ('EM4',  'Kế toán',                     'SEM'),
  ('EM5',  'Tài chính-Ngân hàng',        'SEM'),
  ('EM-E13','Phân tích Kinh doanh', 'SEM'),
  ('EM-E14','Logistics và Quản lý chuỗi cung ứng','SEM'),
  ('TROY-BA','Quản trị Kinh doanh - ĐH Troy','SEM'),

  -- SEP
  ('PH1',  'Vật lý Kỹ thuật',            'SEP'),
  ('PH2',  'Kỹ thuật Hạt nhân',          'SEP'),
  ('PH3',  'Vật lý Y khoa',              'SEP'),

  -- SME
  ('HE1',  'Kỹ thuật Nhiệt',             'SME'),
  ('ME1',  'Kỹ thuật Cơ điện tử',        'SME'),
  ('ME2',  'Kỹ thuật Cơ khí',            'SME'),
  ('TE1',  'Kỹ thuật Ô tô',              'SME'),
  ('TE2',  'Kỹ thuật Cơ khí động lực',   'SME'),
  ('TE3',  'Kỹ thuật Hàng không',        'SME'),
  ('TX1',  'Công nghệ Dệt May',          'SME'),
  ('ME-E1','Kỹ thuật Cơ điện tử', 'SME'),
  ('TE-E2','Kỹ thuật Ô tô',    'SME'),
  ('ME-LUH','Cơ điện tử', 'SME'),
  ('ME-NUT','Cơ điện tử', 'SME'),
  ('ME-GU','Cơ khí Chế tạo máy', 'SME'),
  ('TE-EP','Cơ khí Hàng không', 'SME'),

  -- SMSE
  ('MS1',  'Kỹ thuật Vật liệu',          'SMSE'),
  ('MS2',  'Kỹ thuật Vi điện tử và Công nghệ nano','SMSE'),
  ('MS3',  'Công nghệ vật liệu Polyme và Compozit','SMSE'),
  ('MS5',  'Kỹ thuật In',                 'SMSE'),
  ('MS-E3','Khoa học và Kỹ thuật Vật liệu','SMSE'),

  -- SOFL
  ('SOFL', 'Khoa Ngoại ngữ',             'SOFL'),
  ('FL1',  'Tiếng Anh KHKT và Công nghệ','SOFL'),
  ('FL3',  'Tiếng Trung KH&KT',    'SOFL'),
  ('FL2',  'Tiếng Anh chuyên nghiệp quốc tế','SOFL'),

  -- SOICT
  ('IT1',  'Khoa học Máy tính',     'SOICT'),
  ('IT2',  'Kỹ thuật Máy tính',     'SOICT'),
  ('IT-E7','Công nghệ Thông tin Global ICT','SOICT'),
  ('IT-E10','Khoa học Dữ liệu & Trí tuệ nhân tạo','SOICT'),
  ('IT-E15','An toàn không gian số','SOICT'),
  ('IT-E6','Công nghệ Thông tin Việt – Nhật','SOICT'),
  ('IT-EP','Công nghệ Thông tin Việt-Pháp','SOICT')
;
