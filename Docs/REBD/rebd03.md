# C3 : Normalização

---

## Relações derivadas do modelo EA

Com base no modelo entidade-associação, derivam-se as seguintes relações:

**Restaurante**(id_restaurante PK, cidade, rua, numero, codigo_postal)
- **DF1:**id_restaurante → cidade, rua, numero, codigo_postal

**Mesa**(id_mesa PK, numero_mesa, capacidade, estado, #id_restaurante → Restaurante)
- **DF2:** id_mesa → numero_mesa, capacidade, estado, id_restaurante

**Cliente**(id_cliente PK, nome, contacto)
- **DF3:**  id_cliente → nome, contacto

**Agendamento**(id_agendamento PK, data, hora, status_confirmacao, #id_veiculo → Veiculo, #id_servico → Servico)
- **DF4:** id_agendamento → data, hora, status_confirmacao, id_veiculo, id_servico

**Historico**(id_historico PK, notas, #id_veiculo → Veiculo, #id_servico → Servico, #id_agendamento → Agendamento)
- **DF5:** id_historico → notas, id_agendamento, id_veiculo, id_servico

**Acao_Recomendada**(id_acao PK, descricao, data, status, #id_veiculo → Veiculo)
- **DF6:** id_acao → descricao, data, status, id_veiculo


**Restaurante**(id_restaurante PK, cidade, rua, numero, codigo_postal)
-**DF1:** id_restaurante → cidade, rua, numero, codigo_postal

**Mesa**(id_mesa PK, numero_mesa, capacidade, estado, #id_restaurante → Restaurante)
-**DF2:** id_mesa → numero_mesa, capacidade, estado, id_restaurante

**Cliente**(id_cliente PK, nome, contacto)
-**DF3:** id_cliente → nome, contacto

**Funcionario**(id_funcionario PK, nome, cargo)
-**DF4:** id_funcionario → nome, cargo

**Reserva**(id_reserva PK, data_hora_reserva, numero_pessoas, tipo_menu, data_criacao, #id_cliente → Cliente, #id_restaurante → Restaurante)
-**DF5:** id_reserva → data_hora_reserva, numero_pessoas, tipo_menu, data_criacao, id_cliente, id_restaurante

**Reserva_Mesa**(id_reserva PK, id_mesa PK,  #id_reserva → Reserva, #id_mesa → Mesa)
-**DF6:** (id_reserva, id_mesa) → [Relacionamento N:M]

**Menu_Item**(id_item PK, nome, descricao, tipo_item, tipo_menu, preco_unidade)
-**DF7:** id_item → nome, descricao, tipo_item, tipo_menu, preco_unidade

**Consumo**(id_consumo PK, estado_pagamento, #id_reserva → Reserva, #id_mesa → Mesa, #id_funcionario → Funcionario)
-**DF8:** id_consumo → estado_pagamento, id_reserva, id_mesa, id_funcionario

**Consumo_Item**(id_consumo_item PK, quantidade, valor_unidade, total_linha, #id_consumo → Consumo, #id_item → Menu_Item)
-**DF9:** id_consumo_item → quantidade, valor_unidade, total_linha, id_consumo, id_item

**Fatura**(id_fatura PK, data_hora, subtotal, iva, total_final, #id_cliente → Cliente, #id_funcionario → Funcionario)
-**DF10:** id_fatura → data_hora, subtotal, iva, total_final, id_cliente, id_funcionario

**Fatura_Item**(id_fatura_item PK, quantidade, valor_unidade, total_parcial, #id_fatura → Fatura, #id_consumo_item → Consumo_Item)
-**DF11:** id_fatura_item → quantidade, valor_unidade, total_parcial, id_fatura, id_consumo_item

---

## Normalização do Esquema Relacional

### 1FN - Primeira Forma Normal
Todas as relações estão na 1FN porque:
- Todos os atributos contêm valores atómicos.
- Não existem grupos repetitivos nem atributos multivalorados.

### 2FN - Segunda Forma Normal
- Todas as tabelas têm **chave primária simples**.
- Nenhum atributo não-chave depende de parte de uma chave composta (pois nenhuma tabela tem chave composta).
→ Portanto, todas as relações estão em 2FN.

### 3FN - Terceira Forma Normal
- Não há dependências transitivas nos esquemas.
- Todos os atributos não-chave dependem **unicamente da chave primária**.

Portanto, todas as relações estão em **3FN** e não há necessidade de aplicar BCNF neste caso.

---

| [< Previous](REBD02.md) | [^ Main](../../README.md) | [Next >](REBD04.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|
