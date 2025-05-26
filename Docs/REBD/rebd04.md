# C4 : Esquema Relacional
links:
- [Relações](#relações)
- [Restaurante](#Restaurante)
- [Mesa](#Mesa)
- [Cliente](#Cliente)
- [Funcionário](#Funcionário)
- [Reserva](#Reserva)
- [Reserva_Mesa](#Reserva_Mesa)
- [Menu_Item](#Menu_Item)
- [Consumo](#Consumo)
- [Consumo_Item](#Consumo_Item)
- [Fatura](#Fatura)
- [Fatura_item](#Fatura_item)
- [Vistas](#Vistas Sql:)
- [Vista_Mesas_Reservadas_Porto](#Vista_Mesas_Reservadas_Porto)
- [Vista_Reservas_Restaurante_Porto](#Vista_Reservas_Restaurante_Porto)

---

## Relações:

### Restaurante

Regista os restaurantes com a sua localização.

| Nome            | Descrição                    | Domínio                           | Por Omissão | Automático | Nulo |
| --------------- | ---------------------------- | --------------------------------- | ----------- | ---------- | ---- |
| id\_restaurante | Identificador do restaurante | INT, PRIMARY KEY, AUTO\_INCREMENT | -           | Sim        | Não  |
| cidade          | Cidade do restaurante        | VARCHAR(50) NOT NULL              | -           | Não        | Não  |
| rua             | Rua do restaurante           | VARCHAR(100) NOT NULL             | -           | Não        | Não  |
| numero          | Número da porta              | VARCHAR(10) NOT NULL              | -           | Não        | Não  |
| codigo\_postal  | Código Postal                | VARCHAR(10) NOT NULL              | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)        |
|------------------|
| id_restaurante   |

---

### Mesa

Regista as mesas de cada restaurante, com capacidade e estado.

| Nome            | Descrição                    | Domínio                                                  | Por Omissão  | Automático | Nulo |
| --------------- | ---------------------------- | -------------------------------------------------------- | ------------ | ---------- | ---- |
| id\_mesa        | Identificador da mesa        | INT, PRIMARY KEY, AUTO\_INCREMENT                        | -            | Sim        | Não  |
| id\_restaurante | Identificador do restaurante | INT, FOREIGN KEY REFERENCES Restaurante(id\_restaurante) | -            | Não        | Não  |
| numero\_mesa    | Número visível da mesa       | VARCHAR(10) NOT NULL                                     | -            | Não        | Não  |
| capacidade      | Número de lugares            | INT NOT NULL                                             | -            | Não        | Não  |
| estado          | Estado da mesa               | ENUM('Disponível','Pendente','Reservada') NOT NULL       | 'Disponível' | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)  |
|------------|
| id_mesa    |

- **Referêncial (chaves estrangeiras)**:

| Nome           | Coluna(s)       | Tabela referênciada | Coluna(s) referênciada(s) | Indexar |
|----------------|------------------|----------------------|-----------------------------|---------|
| mesa_fk_rest   | id_restaurante   | Restaurante           | id_restaurante              | Sim     |

- **Atributos (check)**:

| Nome        | Coluna(s) | Condição                                              |
|-------------|-----------|--------------------------------------------------------|
| chk_estado  | estado    | estado IN ('Disponível','Pendente','Reservada')       |

---

### Cliente

Regista os clientes com dados de contacto.

| Nome        | Descrição                | Domínio                           | Por Omissão | Automático | Nulo |
| ----------- | ------------------------ | --------------------------------- | ----------- | ---------- | ---- |
| id\_cliente | Identificador do cliente | INT, PRIMARY KEY, AUTO\_INCREMENT | -           | Sim        | Não  |
| nome        | Nome do cliente          | VARCHAR(100) NOT NULL             | -           | Não        | Não  |
| contacto    | Contacto do cliente      | VARCHAR(30) NOT NULL              | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)   |
|-------------|
| id_cliente  |

---

### Funcionário

Regista os funcionários.

| Nome            | Descrição                 | Domínio                           | Por Omissão | Automático | Nulo |
| --------------- | ------------------------- | --------------------------------- | ----------- | ---------- | ---- |
| id\_funcionario | Identificador funcionário | INT, PRIMARY KEY, AUTO\_INCREMENT | -           | Sim        | Não  |
| nome            | Nome do funcionário       | VARCHAR(100) NOT NULL             | -           | Não        | Não  |
| cargo           | Cargo do funcionário      | VARCHAR(50) NOT NULL              | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)       |
|-----------------|
| id_funcionario  |

---

### Reserva

Regista as reservas feitas por clientes.

| Nome                | Descrição                  | Domínio                                                  | Por Omissão | Automático | Nulo |
| ------------------- | -------------------------- | -------------------------------------------------------- | ----------- | ---------- | ---- |
| id\_reserva         | Identificador da reserva   | INT, PRIMARY KEY, AUTO\_INCREMENT                        | -           | Sim        | Não  |
| id\_cliente         | Cliente que fez a reserva  | INT, FOREIGN KEY REFERENCES Cliente(id\_cliente)         | -           | Não        | Não  |
| id\_restaurante     | Restaurante da reserva     | INT, FOREIGN KEY REFERENCES Restaurante(id\_restaurante) | -           | Não        | Não  |
| data\_hora\_reserva | Data e hora da reserva     | DATETIME NOT NULL                                        | -           | Não        | Não  |
| numero\_pessoas     | Número de pessoas          | INT NOT NULL                                             | -           | Não        | Não  |
| tipo\_menu          | Tipo de menu               | ENUM('Normal','Aniversário') NOT NULL                    | 'Normal'    | Não        | Não  |
| data\_criacao       | Data de criação da reserva | DATETIME NOT NULL DEFAULT CURRENT\_TIMESTAMP             | NOW()       | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)     |
|---------------|
| id_reserva    |

- **Referêncial (chaves estrangeiras)**:

| Nome           | Coluna(s)       | Tabela referênciada | Coluna(s) referênciada(s) | Indexar |
|----------------|------------------|----------------------|-----------------------------|---------|
| reserva_fk_cli | id_cliente       | Cliente              | id_cliente                  | Sim     |
| reserva_fk_res | id_restaurante   | Restaurante          | id_restaurante              | Sim     |

- **Atributos (check)**:

| Nome            | Coluna(s)  | Condição                                |
|------------------|-------------|------------------------------------------|
| chk_tipo_menu    | tipo_menu   | tipo_menu IN ('Normal','Aniversário')   |

---

### Reserva_Mesa

Relaciona as mesas usadas numa reserva (tabela associativa).

| Nome        | Descrição                | Domínio                                          | Por Omissão | Automático | Nulo |
| ----------- | ------------------------ | ------------------------------------------------ | ----------- | ---------- | ---- |
| id\_reserva | Identificador da reserva | INT, FOREIGN KEY REFERENCES Reserva(id\_reserva) | -           | Não        | Não  |
| id\_mesa    | Identificador da mesa    | INT, FOREIGN KEY REFERENCES Mesa(id\_mesa)       | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)            |
|----------------------|
| id_reserva, id_mesa  |

- **Referêncial (chaves estrangeiras)**:

| Nome                   | Coluna(s)   | Tabela referênciada | Coluna(s) referênciada(s) | Indexar |
|------------------------|-------------|----------------------|-----------------------------|---------|
| reserva_mesa_fk_res    | id_reserva  | Reserva              | id_reserva                  | Sim     |
| reserva_mesa_fk_mesa   | id_mesa     | Mesa                 | id_mesa                     | Sim     |

---

### Menu_item

Itens do menu, com tipo e preço.

| Nome           | Descrição             | Domínio                                               | Por Omissão | Automático | Nulo |
| -------------- | --------------------- | ----------------------------------------------------- | ----------- | ---------- | ---- |
| id\_item       | Identificador do item | INT, PRIMARY KEY, AUTO\_INCREMENT                     | -           | Sim        | Não  |
| nome           | Nome do item          | VARCHAR(100) NOT NULL                                 | -           | Não        | Não  |
| descricao      | Descrição do item     | TEXT                                                  | -           | Não        | Sim  |
| tipo\_item     | Tipo do item          | ENUM('Entrada','Prato','Bebida','Sobremesa') NOT NULL | -           | Não        | Não  |
| tipo\_menu     | Menu ao qual pertence | ENUM('Normal','Aniversário','Ambos') NOT NULL         | 'Normal'    | Não        | Não  |
| preco\_unidade | Preço por unidade     | DECIMAL(8,2) NOT NULL                                 | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s) |
|-----------|
| id_item   |

- **Atributos (check)**:

| Nome             | Coluna(s)   | Condição                                               |
|------------------|-------------|---------------------------------------------------------|
| chk_tipo_item    | tipo_item   | tipo_item IN ('Entrada','Prato','Bebida','Sobremesa') |
| chk_tipo_menu    | tipo_menu   | tipo_menu IN ('Normal','Aniversário','Ambos')         |

---

### Consumo

Regista consumos feitos em reservas, por funcionário.

| Nome              | Descrição                | Domínio                                                  | Por Omissão | Automático | Nulo |
| ----------------- | ------------------------ | -------------------------------------------------------- | ----------- | ---------- | ---- |
| id\_consumo       | Identificador do consumo | INT, PRIMARY KEY, AUTO\_INCREMENT                        | -           | Sim        | Não  |
| id\_reserva       | Reserva associada        | INT, FOREIGN KEY REFERENCES Reserva(id\_reserva)         | -           | Não        | Não  |
| id\_mesa          | Mesa associada           | INT, FOREIGN KEY REFERENCES Mesa(id\_mesa)               | -           | Não        | Não  |
| id\_funcionario   | Funcionário responsável  | INT, FOREIGN KEY REFERENCES Funcionário(id\_funcionario) | -           | Não        | Não  |
| estado\_pagamento | Estado do pagamento      | ENUM('Pendente','Parcial','Pago') NOT NULL               | 'Pendente'  | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)   |
|-------------|
| id_consumo  |

- **Referêncial (chaves estrangeiras)**:

| Nome              | Coluna(s)       | Tabela referênciada | Coluna(s) referênciada(s) | Indexar |
|-------------------|------------------|----------------------|-----------------------------|---------|
| consumo_fk_res    | id_reserva       | Reserva              | id_reserva                  | Sim     |
| consumo_fk_mesa   | id_mesa          | Mesa                 | id_mesa                     | Sim     |
| consumo_fk_func   | id_funcionario   | Funcionário          | id_funcionario              | Sim     |

- **Atributos (check)**:

| Nome                  | Coluna(s)        | Condição                                  |
|-----------------------|------------------|--------------------------------------------|
| chk_estado_pagamento  | estado_pagamento | estado_pagamento IN ('Pendente','Parcial','Pago') |

---

### Consumo_Item

Itens consumidos numa consumação.

| Nome              | Descrição                     | Domínio                                          | Por Omissão | Automático | Nulo |
| ----------------- | ----------------------------- | ------------------------------------------------ | ----------- | ---------- | ---- |
| id\_consumo\_item | Identificador do item consumo | INT, PRIMARY KEY, AUTO\_INCREMENT                | -           | Sim        | Não  |
| id\_consumo       | Consumo associado             | INT, FOREIGN KEY REFERENCES Consumo(id\_consumo) | -           | Não        | Não  |
| id\_item          | Item do menu consumido        | INT, FOREIGN KEY REFERENCES Menu\_Item(id\_item) | -           | Não        | Não  |
| quantidade        | Quantidade consumida          | INT NOT NULL                                     | -           | Não        | Não  |
| valor\_unidade    | Preço por unidade             | DECIMAL(8,2) NOT NULL                            | -           | Não        | Não  |
| total\_linha      | Quantidade \* valor\_unidade  | DECIMAL(10,2) NOT NULL                           | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)        |
|------------------|
| id_consumo_item  |

- **Referêncial (chaves estrangeiras)**:

| Nome                | Coluna(s)     | Tabela referênciada | Coluna(s) referênciada(s) | Indexar |
|---------------------|----------------|----------------------|-----------------------------|---------|
| consumo_item_fk_c   | id_consumo     | Consumo              | id_consumo                  | Sim     |
| consumo_item_fk_i   | id_item        | Menu_Item            | id_item                     | Sim     |

---

### Fatura

Regista as faturas emitidas.

| Nome            | Descrição               | Domínio                                                  | Por Omissão | Automático | Nulo |
| --------------- | ----------------------- | -------------------------------------------------------- | ----------- | ---------- | ---- |
| id\_fatura      | Identificador da fatura | INT, PRIMARY KEY, AUTO\_INCREMENT                        | -           | Sim        | Não  |
| id\_cliente     | Cliente associado       | INT, FOREIGN KEY REFERENCES Cliente(id\_cliente)         | -           | Não        | Não  |
| id\_funcionario | Funcionário emissor     | INT, FOREIGN KEY REFERENCES Funcionário(id\_funcionario) | -           | Não        | Não  |
| data\_hora      | Data e hora da emissão  | DATETIME NOT NULL DEFAULT CURRENT\_TIMESTAMP             | NOW()       | Não        | Não  |
| subtotal        | Valor antes do IVA      | DECIMAL(10,2) NOT NULL                                   | -           | Não        | Não  |
| iva             | Valor do IVA            | DECIMAL(5,2) NOT NULL                                    | -           | Não        | Não  |
| total\_final    | Valor total final       | DECIMAL(10,2) NOT NULL                                   | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)   |
|-------------|
| id_fatura   |

- **Referêncial (chaves estrangeiras)**:

| Nome           | Coluna(s)       | Tabela referênciada | Coluna(s) referênciada(s) | Indexar |
|----------------|------------------|----------------------|-----------------------------|---------|
| fatura_fk_cli  | id_cliente       | Cliente              | id_cliente                  | Sim     |
| fatura_fk_func | id_funcionario   | Funcionário          | id_funcionario              | Sim     |

---

### Fatura_Item

Itens faturados numa fatura.

| Nome              | Descrição               | Domínio                                                      | Por Omissão | Automático | Nulo |
| ----------------- | ----------------------- | ------------------------------------------------------------ | ----------- | ---------- | ---- |
| id\_fatura\_item  | Identificador da linha  | INT, PRIMARY KEY, AUTO\_INCREMENT                            | -           | Sim        | Não  |
| id\_fatura        | Fatura associada        | INT, FOREIGN KEY REFERENCES Fatura(id\_fatura)               | -           | Não        | Não  |
| id\_consumo\_item | Item consumido faturado | INT, FOREIGN KEY REFERENCES Consumo\_Item(id\_consumo\_item) | -           | Não        | Não  |
| quantidade        | Quantidade faturada     | INT NOT NULL                                                 | -           | Não        | Não  |
| valor\_unidade    | Valor por unidade       | DECIMAL(8,2) NOT NULL                                        | -           | Não        | Não  |
| total\_parcial    | Total parcial da linha  | DECIMAL(10,2) NOT NULL                                       | -           | Não        | Não  |

#### RESTRIÇÕES DE INTEGRIDADE

- **Chave Primária**:

| Coluna(s)        |
|------------------|
| id_fatura_item   |

- **Referêncial (chaves estrangeiras)**:

| Nome             | Coluna(s)       | Tabela referênciada | Coluna(s) referênciada(s) | Indexar |
|------------------|------------------|----------------------|-----------------------------|---------|
| fk_fatura        | id_fatura        | Fatura               | id_fatura                   | Não     |
| fk_consumo_item  | id_consumo_item  | Consumo_Item         | id_consumo_item             | Não     |

---
---

## Vistas Sql:

### Vista_Reservas_Restaurante_Porto
Consultar todas as reservas do dia, do Restaurante do Porto

```sql
CREATE VIEW Vista_Reservas_Restaurante_Porto AS
SELECT 
    Reserva.id_reserva,
    Cliente.nome AS nome_cliente,
    Reserva.data_hora_reserva,
    Reserva.numero_pessoas,
    Reserva.tipo_menu,
    GROUP_CONCAT(Mesa.numero_mesa ORDER BY Mesa.numero_mesa SEPARATOR ', ') AS mesas_reservadas,
    Restaurante.cidade
FROM 
    Reserva
JOIN Cliente ON Reserva.id_cliente = Cliente.id_cliente
JOIN Reserva_Mesa ON Reserva.id_reserva = Reserva_Mesa.id_reserva
JOIN Mesa ON Reserva_Mesa.id_mesa = Mesa.id_mesa
JOIN Restaurante ON Reserva.id_restaurante = Restaurante.id_restaurante
WHERE 
    Restaurante.cidade = 'Porto'
    AND DATE(Reserva.data_hora_reserva) = CURDATE()
GROUP BY 
    Reserva.id_reserva,
    Cliente.nome,
    Reserva.data_hora_reserva,
    Reserva.numero_pessoas,
    Reserva.tipo_menu,
    Restaurante.cidade;
```
### Vista_Mesas_Reservadas_Porto
Consultar todas as mesas reservadas no dia , do Restaurante do Porto

```sql
CREATE VIEW Vista_Mesas_Reservadas_Porto AS 
SELECT DISTINCT
    Mesa.id_mesa,
    Mesa.numero_mesa,
    Mesa.capacidade,
    Reserva.data_hora_reserva
FROM 
    Mesa
JOIN Reserva_Mesa ON Mesa.id_mesa = Reserva_Mesa.id_mesa
JOIN Reserva ON Reserva_Mesa.id_reserva = Reserva.id_reserva
JOIN Restaurante ON Mesa.id_restaurante = Restaurante.id_restaurante
WHERE 
    Restaurante.cidade = 'Porto'
    AND DATE(Reserva.data_hora_reserva) = CURDATE();
```
---

| [< Previous](rebd03.md) | [^ Main](../../README.md) | [Next >](rebd05.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|
