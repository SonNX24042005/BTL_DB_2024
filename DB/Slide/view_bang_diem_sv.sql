CREATE OR REPLACE VIEW view_bang_diem_sv AS
WITH diem_cao_nhat AS (
  SELECT bd.MSSV, bd.MaHP,
    MAX( CASE bd.DiemChu
        WHEN 'A+' THEN 4.0 
        WHEN 'A'  THEN 4.0 
        WHEN 'B+' THEN 3.5 
        WHEN 'B'  THEN 3.0 
        WHEN 'C+' THEN 2.5 
        WHEN 'C'  THEN 2.0 
        WHEN 'D+' THEN 1.5 
        WHEN 'D'  THEN 1.0 
        WHEN 'F'  THEN 0
        ELSE NULL
      END
    ) AS diem_chu_so FROM bangdiem bd GROUP BY bd.MSSV, bd.MaHP),
	diem_chu_text AS (
  SELECT dcn.MSSV, dcn.MaHP, CASE dcn.diem_chu_so
      WHEN 4.0 THEN 'A+'
      WHEN 3.5 THEN 'B+'
      WHEN 3.0 THEN 'B'
      WHEN 2.5 THEN 'C+'
      WHEN 2.0 THEN 'C'
      WHEN 1.5 THEN 'D+'
      WHEN 1.0 THEN 'D'
      WHEN 0.0 THEN 'F'
      ELSE NULL
    END AS DiemChu
  FROM diem_cao_nhat dcn
)
SELECT sv.MSSV, ct.MaChuongTrinh, ctdt.MaHP, hp.TenHP, dct.DiemChu
FROM sinhvien sv JOIN lop l ON sv.MaLop COLLATE utf8mb4_unicode_ci = l.MaLop COLLATE utf8mb4_unicode_ci
JOIN chuongtrinh ct ON ct.MaChuongTrinh COLLATE utf8mb4_unicode_ci =
     LEFT(l.MaLop COLLATE utf8mb4_unicode_ci, LOCATE('K', l.MaLop COLLATE utf8mb4_unicode_ci) - 2)
JOIN chuongtrinhdaotao ctdt 
  ON ct.MaChuongTrinh COLLATE utf8mb4_unicode_ci = ctdt.MaChuongTrinh COLLATE utf8mb4_unicode_ci
LEFT JOIN hp ON ctdt.MaHP COLLATE utf8mb4_unicode_ci = hp.MaHP COLLATE utf8mb4_unicode_ci
LEFT JOIN diem_chu_text dct 
  ON sv.MSSV COLLATE utf8mb4_unicode_ci = dct.MSSV COLLATE utf8mb4_unicode_ci 
  AND ctdt.MaHP COLLATE utf8mb4_unicode_ci = dct.MaHP COLLATE utf8mb4_unicode_ci;