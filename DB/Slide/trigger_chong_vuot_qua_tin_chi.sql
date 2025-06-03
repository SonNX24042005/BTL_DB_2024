DELIMITER $$
CREATE TRIGGER trg_gioihan_tinchi
BEFORE INSERT ON dangkyhocphan
FOR EACH ROW
BEGIN
  DECLARE tong_tc_hien_tai INT;
  DECLARE tc_hp_moi INT;
  SELECT IFNULL(SUM(hp.TinChiHocTap), 0) INTO tong_tc_hien_tai
  FROM dangkyhocphan dk
  JOIN hp ON dk.MaHP = hp.MaHP
  WHERE dk.MSSV = NEW.MSSV AND dk.MaKyHoc = NEW.MaKyHoc;
  SELECT TinChiHocTap INTO tc_hp_moi
  FROM hp
  WHERE MaHP = NEW.MaHP;
  -- Kiểm tra nếu vượt quá giới hạn
  IF tong_tc_hien_tai + tc_hp_moi > 28 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Sinh viên không được đăng ký quá 28 tín chỉ trong một kỳ học!';
  END IF;
END$$
DELIMITER ;
