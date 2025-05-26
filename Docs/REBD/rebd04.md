Restaurante
DESCRIÇÃO
Regista os dados dos restaurantes disponíveis, cada um com uma morada única.

COLUNAS

Nome	Descrição	Domínio	Por Omissão	Automático	Nulo
id_restaurante	Identificador do restaurante	INT	-	Sim	Não
cidade	Cidade do restaurante	VARCHAR(50)	-	Não	Não
rua	Rua do restaurante	VARCHAR(100)	-	Não	Não
numero	Número da porta	VARCHAR(10)	-	Não	Não
codigo_postal	Código Postal	VARCHAR(10)	-	Não	Não

RESTRIÇÕES DE INTEGRIDADE
Chave Primária:

id_restaurante

Mesa
DESCRIÇÃO
Contém as mesas disponíveis em cada restaurante, com capacidade e estado atual.

COLUNAS

Nome	Descrição	Domínio	Por Omissão	Automático	Nulo
id_mesa	Identificador da mesa	INT	-	Sim	Não
id_restaurante	Restaurante associado	INT	-	Não	Não
numero_mesa	Número visível da mesa	VARCHAR(10)	-	Não	Não
capacidade	Número de lugares	INT	-	Não	Não
estado	Estado atual da mesa	ENUM('Disponível','Pendente','Reservada')	'Disponível'	Não	Não

RESTRIÇÕES DE INTEGRIDADE
Chave Primária:

id_mesa

Referencial (chaves estrangeiras):

Nome	Coluna(s)	Tabela referenciada	Coluna(s) referenciada(s)	Indexar
mesa_fk_rest	id_restaurante	Restaurante	id_restaurante	Sim

Atributos (check):

Nome	Coluna(s)	Condição
chk_estado	estado	estado IN ('Disponível','Pendente','Reservada')

