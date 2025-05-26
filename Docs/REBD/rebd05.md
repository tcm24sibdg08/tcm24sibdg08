# C5 : SQL (DDL & DML)

---

## DDL

```sql
USE `restaurantes`;

DROP TABLE IF EXISTS `Fatura_Item`;
DROP TABLE IF EXISTS `Fatura`;
DROP TABLE IF EXISTS `Consumo_Item`;
DROP TABLE IF EXISTS `Consumo`;
DROP TABLE IF EXISTS `Reserva_Mesa`;
DROP TABLE IF EXISTS `Reserva`;
DROP TABLE IF EXISTS `Menu_Item`;
DROP TABLE IF EXISTS `Mesa`;
DROP TABLE IF EXISTS `Cliente`;
DROP TABLE IF EXISTS `Funcionario`;
DROP TABLE IF EXISTS `Restaurante`;

CREATE TABLE IF NOT EXISTS `Restaurante` (
  `id_restaurante` INT PRIMARY KEY AUTO_INCREMENT,
  `cidade` VARCHAR(50) NOT NULL,
  `rua` VARCHAR(100) NOT NULL,
  `numero` VARCHAR(10) NOT NULL,
  `codigo_postal` VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Mesa` (
  `id_mesa` INT PRIMARY KEY AUTO_INCREMENT,
  `id_restaurante` INT NOT NULL,
  `numero_mesa` VARCHAR(10) NOT NULL,
  `capacidade` INT NOT NULL,
  `estado` ENUM('Disponível', 'Pendente', 'Reservada') NOT NULL DEFAULT 'Disponível',
  FOREIGN KEY (`id_restaurante`) REFERENCES `Restaurante`(`id_restaurante`)
);

CREATE TABLE IF NOT EXISTS `Cliente` (
  `id_cliente` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `contacto` VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Funcionario` (
  `id_funcionario` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `cargo` VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Reserva` (
  `id_reserva` INT PRIMARY KEY AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_restaurante` INT NOT NULL,
  `data_hora_reserva` DATETIME NOT NULL,
  `numero_pessoas` INT NOT NULL,
  `tipo_menu` ENUM('Normal', 'Aniversário') NOT NULL DEFAULT 'Normal',
  `data_criacao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`),
  FOREIGN KEY (`id_restaurante`) REFERENCES `Restaurante`(`id_restaurante`)
);

CREATE TABLE IF NOT EXISTS `Reserva_Mesa` (
  `id_reserva` INT NOT NULL,
  `id_mesa` INT NOT NULL,
  PRIMARY KEY (`id_reserva`, `id_mesa`),
  FOREIGN KEY (`id_reserva`) REFERENCES `Reserva`(`id_reserva`),
  FOREIGN KEY (`id_mesa`) REFERENCES `Mesa`(`id_mesa`)
);

CREATE TABLE IF NOT EXISTS `Menu_Item` (
  `id_item` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` TEXT,
  `tipo_item` ENUM('Entrada', 'Prato', 'Bebida', 'Sobremesa') NOT NULL,
  `tipo_menu` ENUM('Normal', 'Aniversário', 'Ambos') NOT NULL DEFAULT 'Normal',
  `preco_unidade` DECIMAL(8,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Consumo` (
  `id_consumo` INT PRIMARY KEY AUTO_INCREMENT,
  `id_reserva` INT NOT NULL,
  `id_mesa` INT NOT NULL,
  `id_funcionario` INT NOT NULL,
  `estado_pagamento` ENUM('Pendente', 'Parcial', 'Pago') NOT NULL DEFAULT 'Pendente',
  FOREIGN KEY (`id_reserva`) REFERENCES `Reserva`(`id_reserva`),
  FOREIGN KEY (`id_mesa`) REFERENCES `Mesa`(`id_mesa`),
  FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionario`(`id_funcionario`)
);

CREATE TABLE IF NOT EXISTS `Consumo_Item` (
  `id_consumo_item` INT PRIMARY KEY AUTO_INCREMENT,
  `id_consumo` INT NOT NULL,
  `id_item` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `valor_unidade` DECIMAL(8,2) NOT NULL,
  `total_linha` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`id_consumo`) REFERENCES `Consumo`(`id_consumo`),
  FOREIGN KEY (`id_item`) REFERENCES `Menu_Item`(`id_item`)
);

CREATE TABLE IF NOT EXISTS `Fatura` (
  `id_fatura` INT PRIMARY KEY AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_funcionario` INT NOT NULL,
  `data_hora` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subtotal` DECIMAL(10,2) NOT NULL,
  `iva` DECIMAL(5,2) NOT NULL,
  `total_final` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`),
  FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionario`(`id_funcionario`)
);

CREATE TABLE IF NOT EXISTS `Fatura_Item` (
  `id_fatura_item` INT PRIMARY KEY AUTO_INCREMENT,
  `id_fatura` INT NOT NULL,
  `id_consumo_item` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `valor_unidade` DECIMAL(8,2) NOT NULL,
  `total_parcial` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`id_fatura`) REFERENCES `Fatura`(`id_fatura`),
  FOREIGN KEY (`id_consumo_item`) REFERENCES `Consumo_Item`(`id_consumo_item`)
);
```

---

## DML

### Inserts (exemplos)
