create database qldt;
USE QLDT;

-- 1. XÓA BẢNG CŨ
DROP TABLE IF EXISTS TaiKhoan;

CREATE TABLE TaiKhoan (
  Username VARCHAR(150) NOT NULL,
  MatKhau  VARCHAR(50)  NOT NULL,
  PRIMARY KEY (Username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
