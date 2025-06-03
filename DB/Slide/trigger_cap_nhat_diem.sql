DELIMITER $$
CREATE TRIGGER trg_insert_diemso_diemchu
BEFORE INSERT ON bangdiem
FOR EACH ROW
BEGIN
  DECLARE hsgk DECIMAL(3,2);
  DECLARE diem DECIMAL(4,2);
  SELECT HeSoGK INTO hsgk
  FROM hp
  WHERE MaHP = NEW.MaHP;
  -- tinhs diem so
  IF NEW.DiemGK IS NOT NULL AND NEW.DiemCK IS NOT NULL AND hsgk IS NOT NULL THEN
    SET diem = NEW.DiemGK * hsgk + NEW.DiemCK * (1 - hsgk);
    SET NEW.DiemSo = diem;
	-- gan diem chu 
    IF diem >= 9.5 THEN
      SET NEW.DiemChu = 'A+';
    ELSEIF diem >= 8.5 THEN
      SET NEW.DiemChu = 'A';
    ELSEIF diem >= 8.0 THEN
      SET NEW.DiemChu = 'B+';
    ELSEIF diem >= 7.0 THEN
      SET NEW.DiemChu = 'B';
    ELSEIF diem >= 6.5 THEN
      SET NEW.DiemChu = 'C+';
    ELSEIF diem >= 5.5 THEN
      SET NEW.DiemChu = 'C';
    ELSEIF diem >= 5.0 THEN
      SET NEW.DiemChu = 'D+';
    ELSEIF diem >= 4.0 THEN
      SET NEW.DiemChu = 'D';
    ELSE
      SET NEW.DiemChu = 'F';
    END IF;
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_update_diemso_diemchu
BEFORE UPDATE ON bangdiem
FOR EACH ROW
BEGIN
  DECLARE hsgk DECIMAL(3,2);
  DECLARE diem DECIMAL(4,2);

  SELECT HeSoGK INTO hsgk
  FROM hp
  WHERE MaHP = NEW.MaHP;

  IF NEW.DiemGK IS NOT NULL AND NEW.DiemCK IS NOT NULL AND hsgk IS NOT NULL THEN
    SET diem = NEW.DiemGK * hsgk + NEW.DiemCK * (1 - hsgk);
    SET NEW.DiemSo = diem;

    IF diem >= 9.5 THEN
      SET NEW.DiemChu = 'A+';
    ELSEIF diem >= 8.5 THEN
      SET NEW.DiemChu = 'A';
    ELSEIF diem >= 8.0 THEN
      SET NEW.DiemChu = 'B+';
    ELSEIF diem >= 7.0 THEN
      SET NEW.DiemChu = 'B';
    ELSEIF diem >= 6.5 THEN
      SET NEW.DiemChu = 'C+';
    ELSEIF diem >= 5.5 THEN
      SET NEW.DiemChu = 'C';
    ELSEIF diem >= 5.0 THEN
      SET NEW.DiemChu = 'D+';
    ELSEIF diem >= 4.0 THEN
      SET NEW.DiemChu = 'D';
    ELSE
      SET NEW.DiemChu = 'F';
    END IF;
  END IF;
END$$
DELIMITER ;



