-- MySQL Script generated by MySQL Workbench
-- Mon Aug 31 08:06:37 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bdmarqfacil
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bdmarqfacil` ;

-- -----------------------------------------------------
-- Schema bdmarqfacil
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bdmarqfacil` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `bdmarqfacil` ;

-- -----------------------------------------------------
-- Table `ESTADOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ESTADOS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ESTADOS` (
  `IDESTADO` INT NOT NULL AUTO_INCREMENT,
  `DESCRICAO` CHAR(2) NOT NULL,
  PRIMARY KEY (`IDESTADO`))
ENGINE = InnoDB
COMMENT = '	';

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `CIDADES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CIDADES` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `CIDADES` (
  `IDCIDADE` INT NOT NULL AUTO_INCREMENT,
  `DESCRICAO` VARCHAR(80) NOT NULL,
  `IDESTADO` INT NOT NULL,
  PRIMARY KEY (`IDCIDADE`),
  CONSTRAINT `IDESTADO`
    FOREIGN KEY (`IDESTADO`)
    REFERENCES `ESTADOS` (`IDESTADO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ENDERECOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ENDERECOS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ENDERECOS` (
  `IDENDERECO` INT NOT NULL AUTO_INCREMENT,
  `RUA` VARCHAR(120) NOT NULL,
  `NUMERO` INT NOT NULL,
  `CEP` VARCHAR(8) NOT NULL,
  `BAIRRO` VARCHAR(80) NOT NULL,
  `COMPLEMENTO` VARCHAR(80) NULL,
  `IDCIDADE` INT NOT NULL,
  PRIMARY KEY (`IDENDERECO`),
  CONSTRAINT `FKIDCIDADE`
    FOREIGN KEY (`IDCIDADE`)
    REFERENCES `CIDADES` (`IDCIDADE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `EMPRESAS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `EMPRESAS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `EMPRESAS` (
  `IDEMPRESA` INT NOT NULL AUTO_INCREMENT,
  `RAZAOSOCIAL` VARCHAR(80) NOT NULL,
  `CPFCNPJ` VARCHAR(14) NOT NULL,
  `NOMEFANTASIA` VARCHAR(80) NOT NULL,
  `FGATIVO` INT NOT NULL,
  `TELEFONE` VARCHAR(10) NOT NULL,
  `EMAIL` VARCHAR(120) NOT NULL,
  `CELULAR` VARCHAR(11) NULL,
  `LOGO` LONGBLOB NULL,
  `IDENDERECO` INT NOT NULL,
  `DATAREGISTRO` DATE NOT NULL,
  PRIMARY KEY (`IDEMPRESA`),
  CONSTRAINT `FKIDENDERECOEMP`
    FOREIGN KEY (`IDENDERECO`)
    REFERENCES `ENDERECOS` (`IDENDERECO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `USUARIOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `USUARIOS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `USUARIOS` (
  `IDUSUARIO` INT NOT NULL AUTO_INCREMENT,
  `RG` VARCHAR(9) NOT NULL,
  `NOMECOMPLETO` VARCHAR(80) NOT NULL,
  `USUARIO` VARCHAR(20) NULL,
  `SENHA` VARCHAR(120) NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `DATANASCIMENTO` DATE NOT NULL,
  `TELEFONE` VARCHAR(10) NULL,
  `CELULAR` VARCHAR(11) NOT NULL,
  `EMAIL` VARCHAR(120) NOT NULL,
  `TIPOUSUARIO` CHAR(1) NOT NULL,
  `FGATIVO` INT NOT NULL,
  `IDEMPRESA` INT NOT NULL,
  `IDENDERECO` INT NOT NULL,
  PRIMARY KEY (`IDUSUARIO`),
  CONSTRAINT `FKIDEMPRESAUSU`
    FOREIGN KEY (`IDEMPRESA`)
    REFERENCES `EMPRESAS` (`IDEMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FKIDENDERECOUSU`
    FOREIGN KEY (`IDENDERECO`)
    REFERENCES `ENDERECOS` (`IDENDERECO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `AVALIACOES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AVALIACOES` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `AVALIACOES` (
  `IDAVALIACAO` INT NOT NULL AUTO_INCREMENT,
  `DATACRIACAO` DATE NOT NULL,
  `IMAGEM` LONGBLOB NULL,
  `DESCRICAO` VARCHAR(250) NOT NULL,
  `IDUSUARIO` INT NOT NULL,
  `IDEMPRESA` INT NOT NULL,
  PRIMARY KEY (`IDAVALIACAO`),
  CONSTRAINT `FKIDUSUARIO`
    FOREIGN KEY (`IDUSUARIO`)
    REFERENCES `USUARIOS` (`IDUSUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AVALIACOES_EMPRESAS1`
    FOREIGN KEY (`IDEMPRESA`)
    REFERENCES `EMPRESAS` (`IDEMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `CATEGORIAS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CATEGORIAS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `CATEGORIAS` (
  `IDCATEGORIA` INT NOT NULL AUTO_INCREMENT,
  `DESCRICAO` VARCHAR(80) NOT NULL,
  `TIPO` INT NOT NULL,
  `IDEMPRESA` INT NOT NULL,
  PRIMARY KEY (`IDCATEGORIA`),
  CONSTRAINT `FKIDEMPRESACAT`
    FOREIGN KEY (`IDEMPRESA`)
    REFERENCES `EMPRESAS` (`IDEMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PROCEDIMENTOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PROCEDIMENTOS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PROCEDIMENTOS` (
  `IDPROCEDIMENTO` INT NOT NULL AUTO_INCREMENT,
  `TITULO` VARCHAR(80) NOT NULL,
  `IMAGEM` LONGBLOB NULL,
  `FGATIVO` INT NOT NULL,
  `DESCRICAO` VARCHAR(150) NULL,
  `STATUS` INT NOT NULL,
  `DURACAO` INT NOT NULL,
  `IDCATEGORIA` INT NOT NULL,
  PRIMARY KEY (`IDPROCEDIMENTO`),
  CONSTRAINT `FKIDCATEGORIAPROC`
    FOREIGN KEY (`IDCATEGORIA`)
    REFERENCES `CATEGORIAS` (`IDCATEGORIA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PRODUTOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PRODUTOS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PRODUTOS` (
  `IDPRODUTO` INT NOT NULL AUTO_INCREMENT,
  `TITULO` VARCHAR(80) NOT NULL,
  `DESCRICAO` VARCHAR(150) NULL,
  `IMAGEM` LONGBLOB NULL,
  `PRECO` FLOAT NULL,
  `STATUS` INT NOT NULL,
  `FGATIVO` INT NOT NULL,
  `IDCATEGORIA` INT NOT NULL,
  PRIMARY KEY (`IDPRODUTO`),
  CONSTRAINT `FKIDCATEGORIAPROD`
    FOREIGN KEY (`IDCATEGORIA`)
    REFERENCES `CATEGORIAS` (`IDCATEGORIA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PAGAMENTOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PAGAMENTOS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PAGAMENTOS` (
  `IDPAGAMENTO` INT NOT NULL AUTO_INCREMENT,
  `STATUS` CHAR(1) NOT NULL,
  `ANOPAGAMENTO` INT NOT NULL,
  `IDEMPRESA` INT NOT NULL,
  PRIMARY KEY (`IDPAGAMENTO`),
  CONSTRAINT `FKIDEMPRESAPAG`
    FOREIGN KEY (`IDEMPRESA`)
    REFERENCES `EMPRESAS` (`IDEMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ATENDIMENTOS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ATENDIMENTOS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ATENDIMENTOS` (
  `IDATENDIMENTO` INT NOT NULL AUTO_INCREMENT,
  `HORARIO` DATETIME NOT NULL,
  `DURACAO` INT NOT NULL,
  `STATUS` CHAR(1) NOT NULL,
  `IDCOLABORADOR` INT NOT NULL,
  `IDPACIENTE` INT NOT NULL,
  `IDEMPRESA` INT NOT NULL,
  `FGATIVO` INT NOT NULL,
  PRIMARY KEY (`IDATENDIMENTO`),
  CONSTRAINT `FKIDCOLABORADOR`
    FOREIGN KEY (`IDCOLABORADOR`)
    REFERENCES `USUARIOS` (`IDUSUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FKIDPACIENTE`
    FOREIGN KEY (`IDPACIENTE`)
    REFERENCES `USUARIOS` (`IDUSUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ATENDIMENTOS_EMPRESAS1`
    FOREIGN KEY (`IDEMPRESA`)
    REFERENCES `EMPRESAS` (`IDEMPRESA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PROCEDIMENTOSATENDIMENTO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PROCEDIMENTOSATENDIMENTO` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PROCEDIMENTOSATENDIMENTO` (
  `IDPROCEDIMENTOSATENDIMENTO` INT NOT NULL AUTO_INCREMENT,
  `IDATENDIMENTO` INT NOT NULL,
  `IDPROCEDIMENTO` INT NOT NULL,
  PRIMARY KEY (`IDPROCEDIMENTOSATENDIMENTO`),
  CONSTRAINT `FKIDATENDIMENTO`
    FOREIGN KEY (`IDATENDIMENTO`)
    REFERENCES `ATENDIMENTOS` (`IDATENDIMENTO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FKIDPROCEDIMENTO`
    FOREIGN KEY (`IDPROCEDIMENTO`)
    REFERENCES `PROCEDIMENTOS` (`IDPROCEDIMENTO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;