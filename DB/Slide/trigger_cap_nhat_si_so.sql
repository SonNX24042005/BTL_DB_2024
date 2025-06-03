DELIMITER $$
CREATE TRIGGER trg_add_sv_to_lophocphan
BEFORE INSERT ON lichhoc
FOR EACH ROW
BEGIN
  DECLARE current_count INT;
  UPDATE lophocphan
  SET SoLuongSinhVien = SoLuongSinhVien + 1
  WHERE MaLopHP = NEW.MaLopHP;
END$$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_remove_sv_from_lophocphan
AFTER DELETE ON lichhoc
FOR EACH ROW
BEGIN
  UPDATE lophocphan
  SET SoLuongSinhVien = SoLuongSinhVien - 1
  WHERE MaLopHP = OLD.MaLopHP;
END$$
DELIMITER ;

