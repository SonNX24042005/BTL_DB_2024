CREATE OR REPLACE VIEW view_lich_hoc_sinhvien AS
SELECT 
    lh.MSSV,
    lhp.MaKyHoc,
    lhp.MaLopHP,
    lhp.MaPhong,
    lhp.Thu,
    lhp.KipHoc,
    lhp.ThoiGianBatDau,
    lhp.ThoiGianKetThuc
FROM lichhoc lh
JOIN lophocphan lhp 
    ON lh.MaLopHP = lhp.MaLopHP
ORDER BY 
    lh.MSSV,
    lhp.MaKyHoc,
    lhp.Thu + 0, 
    lhp.KipHoc + 0,
    lhp.ThoiGianBatDau;
