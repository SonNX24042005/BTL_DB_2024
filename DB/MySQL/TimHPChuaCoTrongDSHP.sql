USE QLDT;

SELECT DISTINCT
    temp.MaHP_csv AS MaHP_TrongFileCSV_ChuaCoTrongBangHP,
    temp.MaChuongTrinh_csv AS MaChuongTrinhTuongUng_TrongFileCSV
FROM
    CTDT_data_from_csv_temp temp
LEFT JOIN
    HP hp ON TRIM(temp.MaHP_csv) = TRIM(hp.MaHP) -- Phép so sánh bây giờ sẽ hợp lệ
WHERE
    hp.MaHP IS NULL
    AND temp.MaHP_csv IS NOT NULL
    AND TRIM(temp.MaHP_csv) <> '';