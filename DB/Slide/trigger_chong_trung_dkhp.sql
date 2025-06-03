DELIMITER $$
CREATE TRIGGER trg_chong_trung_dangky_hp
BEFORE INSERT ON dangkyhocphan
FOR EACH ROW
BEGIN
  DECLARE so_dong INT;
  SELECT COUNT(*) INTO so_dong
  FROM dangkyhocphan
  WHERE MSSV = NEW.MSSV AND MaHP = NEW.MaHP AND MaKyHoc = NEW.MaKyHoc;
  IF so_dong > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Sinh viên đã đăng ký học phần này trong kỳ học!';
  END IF;
END$$
DELIMITER ;
