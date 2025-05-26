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

```sql
INSERT INTO Cliente (nome, contacto) VALUES
('Ana Silva', '912345678'),
('João Pereira', '913456789'),
('Maria Fernandes', '914567890');

INSERT INTO Restaurante (cidade, rua, numero, codigo_postal) VALUES
('Porto', 'Rua do Almada', '45', '4000-123'),
('Lisboa', 'Avenida da Liberdade', '100', '1250-001');

INSERT INTO Mesa (id_restaurante, numero_mesa, capacidade, estado) VALUES
(1, '1', 4, 'Disponível'),
(1, '2', 2, 'Disponível'),
(1, '3', 6, 'Disponível');

INSERT INTO Reserva (id_cliente, id_restaurante, data_hora_reserva, numero_pessoas, tipo_menu) VALUES
(1, 1, '2025-05-26 12:30:00', 2, 'Normal'),
(2, 1, '2025-05-26 20:00:00', 4, 'Aniversário');

INSERT INTO Reserva_Mesa (id_reserva, id_mesa) VALUES
(1, 1),
(2, 2),
(2, 3);
```
### Consultas,updates(exemplos)
Ver todas as reservas feitas hoje no restaurante do Porto.
 
```sql
SELECT Reserva.id_reserva, Cliente.nome AS nome_cliente, Reserva.data_hora_reserva
FROM Reserva
JOIN Cliente ON Reserva.id_cliente = Cliente.id_cliente
JOIN Restaurante ON Reserva.id_restaurante = Restaurante.id_restaurante
WHERE Restaurante.cidade = 'Porto'
  AND DATE(Reserva.data_hora_reserva) = CURDATE();
```
Atualizar a morada do restaurante do Porto.
 
```sql
UPDATE Restaurante
SET rua = 'Rua Nova das Flores', numero = '123', codigo_postal = '4000-456'
WHERE cidade = 'Porto';
```
Mostrar as mesas reservadas hoje no restaurante do Porto agrupadas por reserva.
 
```sql
SELECT 
  Reserva.id_reserva, 
  DATE_FORMAT(Reserva.data_hora_reserva, '%H:%i:%s') AS hora_reserva,
  GROUP_CONCAT(Mesa.numero_mesa ORDER BY Mesa.numero_mesa SEPARATOR ', ') AS mesas_reservadas
FROM Reserva
JOIN Reserva_Mesa ON Reserva.id_reserva = Reserva_Mesa.id_reserva
JOIN Mesa ON Reserva_Mesa.id_mesa = Mesa.id_mesa
JOIN Restaurante ON Mesa.id_restaurante = Restaurante.id_restaurante
WHERE Restaurante.cidade = 'Porto'
  AND DATE(Reserva.data_hora_reserva) = CURDATE()
GROUP BY Reserva.id_reserva, hora_reserva;
```
