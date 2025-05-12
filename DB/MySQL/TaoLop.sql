USE QLDT;

SET SQL_SAFE_UPDATES = 0;
CREATE TABLE IF NOT EXISTS Lop (
  MaLop   VARCHAR(15) 
           CHARACTER SET utf8mb4 
           COLLATE utf8mb4_unicode_ci 
           NOT NULL,
  GVCN    VARCHAR(6)  
           CHARACTER SET utf8mb4 
           COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (MaLop),
  KEY idx_gvcn (GVCN),
  CONSTRAINT fk_lop_gv 
    FOREIGN KEY (GVCN) 
    REFERENCES GiangVien(MaGV)
      ON UPDATE CASCADE
      ON DELETE SET NULL
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;

SET SQL_SAFE_UPDATES = 1;


-- 3) CHÈN 5 lớp cho mỗi chương trình (MaLop format: <MãCT>-K68-<01..05>, GVCN random GV0001–GV0103)
INSERT INTO Lop (MaLop, GVCN) VALUES
  -- IT-E10
  ('IT-E10-K68-01','GV0007'),
  ('IT-E10-K68-02','GV0015'),
  ('IT-E10-K68-03','GV0023'),
  ('IT-E10-K68-04','GV0031'),
  ('IT-E10-K68-05','GV0049'),

  -- IT-E15
  ('IT-E15-K68-01','GV0050'),
  ('IT-E15-K68-02','GV0062'),
  ('IT-E15-K68-03','GV0077'),
  ('IT-E15-K68-04','GV0084'),
  ('IT-E15-K68-05','GV0099'),

  -- IT-E6
  ('IT-E6-K68-01','GV0011'),
  ('IT-E6-K68-02','GV0026'),
  ('IT-E6-K68-03','GV0038'),
  ('IT-E6-K68-04','GV0042'),
  ('IT-E6-K68-05','GV0057'),

  -- IT-E7
  ('IT-E7-K68-01','GV0069'),
  ('IT-E7-K68-02','GV0073'),
  ('IT-E7-K68-03','GV0088'),
  ('IT-E7-K68-04','GV0092'),
  ('IT-E7-K68-05','GV0103'),

  -- IT-EP
  ('IT-EP-K68-01','GV0003'),
  ('IT-EP-K68-02','GV0018'),
  ('IT-EP-K68-03','GV0029'),
  ('IT-EP-K68-04','GV0036'),
  ('IT-EP-K68-05','GV0047'),

  -- IT1
  ('IT1-K68-01','GV0054'),
  ('IT1-K68-02','GV0061'),
  ('IT1-K68-03','GV0070'),
  ('IT1-K68-04','GV0081'),
  ('IT1-K68-05','GV0095'),

  -- IT2
  ('IT2-K68-01','GV0002'),
  ('IT2-K68-02','GV0013'),
  ('IT2-K68-03','GV0025'),
  ('IT2-K68-04','GV0034'),
  ('IT2-K68-05','GV0046')
;

-- 4) BẬT lại safe‐updates (nếu bạn tắt trước đó)
SET SQL_SAFE_UPDATES = 1;