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




---
