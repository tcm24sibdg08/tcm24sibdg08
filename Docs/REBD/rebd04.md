# C4 : Esquema Relacional

---

## Tabelas

### Restaurante

Regista os restaurantes com a sua localização.

| Nome            | Descrição                    | Domínio                           | Por Omissão | Automático | Nulo |
| --------------- | ---------------------------- | --------------------------------- | ----------- | ---------- | ---- |
| id\_restaurante | Identificador do restaurante | INT, PRIMARY KEY, AUTO\_INCREMENT | -           | Sim        | Não  |
| cidade          | Cidade do restaurante        | VARCHAR(50) NOT NULL              | -           | Não        | Não  |
| rua             | Rua do restaurante           | VARCHAR(100) NOT NULL             | -           | Não        | Não  |
| numero          | Número da porta              | VARCHAR(10) NOT NULL              | -           | Não        | Não  |
| codigo\_postal  | Código Postal                | VARCHAR(10) NOT NULL              | -           | Não        | Não  |

### Mesa

Regista as mesas de cada restaurante, com capacidade e estado.

| Nome            | Descrição                    | Domínio                                                  | Por Omissão  | Automático | Nulo |
| --------------- | ---------------------------- | -------------------------------------------------------- | ------------ | ---------- | ---- |
| id\_mesa        | Identificador da mesa        | INT, PRIMARY KEY, AUTO\_INCREMENT                        | -            | Sim        | Não  |
| id\_restaurante | Identificador do restaurante | INT, FOREIGN KEY REFERENCES Restaurante(id\_restaurante) | -            | Não        | Não  |
| numero\_mesa    | Número visível da mesa       | VARCHAR(10) NOT NULL                                     | -            | Não        | Não  |
| capacidade      | Número de lugares            | INT NOT NULL                                             | -            | Não        | Não  |
| estado          | Estado da mesa               | ENUM('Disponível','Pendente','Reservada') NOT NULL       | 'Disponível' | Não        | Não  |

### Cliente

Regista os clientes com dados de contacto.

| Nome        | Descrição                | Domínio                           | Por Omissão | Automático | Nulo |
| ----------- | ------------------------ | --------------------------------- | ----------- | ---------- | ---- |
| id\_cliente | Identificador do cliente | INT, PRIMARY KEY, AUTO\_INCREMENT | -           | Sim        | Não  |
| nome        | Nome do cliente          | VARCHAR(100) NOT NULL             | -           | Não        | Não  |
| contacto    | Contacto do cliente      | VARCHAR(30) NOT NULL              | -           | Não        | Não  |

### Funcionário

Regista os funcionários.

| Nome            | Descrição                 | Domínio                           | Por Omissão | Automático | Nulo |
| --------------- | ------------------------- | --------------------------------- | ----------- | ---------- | ---- |
| id\_funcionario | Identificador funcionário | INT, PRIMARY KEY, AUTO\_INCREMENT | -           | Sim        | Não  |
| nome            | Nome do funcionário       | VARCHAR(100) NOT NULL             | -           | Não        | Não  |
| cargo           | Cargo do funcionário      | VARCHAR(50) NOT NULL              | -           | Não        | Não  |

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

### Reserva_Mesa

Relaciona as mesas usadas numa reserva (tabela associativa).

| Nome        | Descrição                | Domínio                                          | Por Omissão | Automático | Nulo |
| ----------- | ------------------------ | ------------------------------------------------ | ----------- | ---------- | ---- |
| id\_reserva | Identificador da reserva | INT, FOREIGN KEY REFERENCES Reserva(id\_reserva) | -           | Não        | Não  |
| id\_mesa    | Identificador da mesa    | INT, FOREIGN KEY REFERENCES Mesa(id\_mesa)       | -           | Não        | Não  |

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

### Consumo

Regista consumos feitos em reservas, por funcionário.

| Nome              | Descrição                | Domínio                                                  | Por Omissão | Automático | Nulo |
| ----------------- | ------------------------ | -------------------------------------------------------- | ----------- | ---------- | ---- |
| id\_consumo       | Identificador do consumo | INT, PRIMARY KEY, AUTO\_INCREMENT                        | -           | Sim        | Não  |
| id\_reserva       | Reserva associada        | INT, FOREIGN KEY REFERENCES Reserva(id\_reserva)         | -           | Não        | Não  |
| id\_mesa          | Mesa associada           | INT, FOREIGN KEY REFERENCES Mesa(id\_mesa)               | -           | Não        | Não  |
| id\_funcionario   | Funcionário responsável  | INT, FOREIGN KEY REFERENCES Funcionário(id\_funcionario) | -           | Não        | Não  |
| estado\_pagamento | Estado do pagamento      | ENUM('Pendente','Parcial','Pago') NOT NULL               | 'Pendente'  | Não        | Não  |

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



---
