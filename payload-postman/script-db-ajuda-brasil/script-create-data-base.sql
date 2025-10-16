-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ajuda_brasil_bd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ajuda_brasil_bd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ajuda_brasil_bd` DEFAULT CHARACTER SET utf8 ;
USE `ajuda_brasil_bd` ;

-- -----------------------------------------------------
-- Table `ajuda_brasil_bd`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ajuda_brasil_bd`.`usuario` (
  `id` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `tipo_perfil` INT NOT NULL DEFAULT 0,
  `nome` VARCHAR(255) NULL,
  `cpf_cnpj` VARCHAR(20) NULL,
  `cep` VARCHAR(20) NULL,
  `telefone` VARCHAR(20) NULL,
  `cidade` VARCHAR(100) NULL,
  `tipo_doacao` VARCHAR(255) NULL,
  `bairro` VARCHAR(255) NULL,
  `numero_imovel` VARCHAR(255) NULL,
  `referencia_endereco` VARCHAR(255) NULL,
  `estado` VARCHAR(2) NULL,
  `sobre_nos` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ajuda_brasil_bd`.`solicitacao_doacao_historico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ajuda_brasil_bd`.`solicitacao_doacao_historico` (
  `id` VARCHAR(255) NOT NULL,
  `data_rejeicao` DATETIME(6) NULL,
  `data_solicitacao` DATETIME(6) NULL,
  `id_solicitante` VARCHAR(255) NULL,
  `solicitante` VARCHAR(255) NULL,
  `tipo_solicitacao` VARCHAR(255) NULL,
  `usuario_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_solicitacao_doacao_historico_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_solicitacao_doacao_historico_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ajuda_brasil_bd`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ajuda_brasil_bd`.`soliocitacao_doacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ajuda_brasil_bd`.`soliocitacao_doacao` (
  `id` VARCHAR(255) NOT NULL,
  `solicitante` VARCHAR(225) NULL,
  `tipo_solicitacao` VARCHAR(255) NULL,
  `data_solicitacao` TIMESTAMP NULL,
  `usuario_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_soliocitacao_doacao_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_soliocitacao_doacao_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ajuda_brasil_bd`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ajuda_brasil_bd`.`doacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ajuda_brasil_bd`.`doacao` (
  `id` VARCHAR(255) NOT NULL,
  `doador` VARCHAR(255) NULL,
  `tipo_doacao` VARCHAR(255) NULL,
  `data_doacao` TIMESTAMP NULL,
  `status_doacao` VARCHAR(255) NULL,
  `valor_transacao` DECIMAL(10,2) NULL,
  `parcelas` INT NULL,
  `email_pagador` VARCHAR(255) NULL,
  `token_cartao` VARCHAR(350) NULL,
  `usuario_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_doacao_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_doacao_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ajuda_brasil_bd`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ajuda_brasil_bd`.`detalhe_pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ajuda_brasil_bd`.`detalhe_pagamento` (
  `id` INT NOT NULL,
  `status_pagamento` VARCHAR(45) NULL,
  `tipo_pagamento` VARCHAR(45) NULL,
  `detalhe_pagamentocol` VARCHAR(45) NULL,
  `usuario_id` VARCHAR(255) NOT NULL,
  `doacao_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detalhe_pagamento_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_detalhe_pagamento_doacao1_idx` (`doacao_id` ASC) VISIBLE,
  CONSTRAINT `fk_detalhe_pagamento_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ajuda_brasil_bd`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalhe_pagamento_doacao1`
    FOREIGN KEY (`doacao_id`)
    REFERENCES `ajuda_brasil_bd`.`doacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
