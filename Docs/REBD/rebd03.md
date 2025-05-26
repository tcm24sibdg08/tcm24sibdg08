# C3 : Normalização

---

## Relações derivadas do modelo EA

Com base no modelo entidade-associação, derivam-se as seguintes relações:

**Restaurante**(id_restaurante PK, cidade, rua, numero, codigo_postal)

- **DF1:** id_restaurante → cidade, rua, numero, codigo_postal

**Mesa**(id_mesa PK, numero_mesa, capacidade, estado, #id_restaurante → Restaurante)

- **DF2:** id_mesa → numero_mesa, capacidade, estado, id_restaurante

**Cliente**(id_cliente PK, nome, contacto)

- **DF3:** id_cliente → nome, contacto

**Funcionario**(id_funcionario PK, nome, cargo)
- **DF4:** id_funcionario → nome, cargo

**Reserva**(id_reserva PK, data_hora_reserva, numero_pessoas, tipo_menu, data_criacao, #id_cliente → Cliente, #id_restaurante → Restaurante)
- **DF5:** id_reserva → data_hora_reserva, numero_pessoas, tipo_menu, data_criacao, id_cliente, id_restaurante

**Reserva_Mesa**(id_reserva PK, id_mesa PK,  #id_reserva → Reserva, #id_mesa → Mesa)
- **DF6:** (id_reserva, id_mesa) → [Relacionamento N:M]

**Menu_Item**(id_item PK, nome, descricao, tipo_item, tipo_menu, preco_unidade)
- **DF7:** id_item → nome, descricao, tipo_item, tipo_menu, preco_unidade

**Consumo**(id_consumo PK, estado_pagamento, #id_reserva → Reserva, #id_mesa → Mesa, #id_funcionario → Funcionario)
- **DF8:** id_consumo → estado_pagamento, id_reserva, id_mesa, id_funcionario

**Consumo_Item**(id_consumo_item PK, quantidade, valor_unidade, total_linha, #id_consumo → Consumo, #id_item → Menu_Item)
- **DF9:** id_consumo_item → quantidade, valor_unidade, total_linha, id_consumo, id_item

**Fatura**(id_fatura PK, data_hora, subtotal, iva, total_final, #id_cliente → Cliente, #id_funcionario → Funcionario)
- **DF10:** id_fatura → data_hora, subtotal, iva, total_final, id_cliente, id_funcionario

**Fatura_Item**(id_fatura_item PK, quantidade, valor_unidade, total_parcial, #id_fatura → Fatura, #id_consumo_item → Consumo_Item)
- **DF11:** id_fatura_item → quantidade, valor_unidade, total_parcial, id_fatura, id_consumo_item

---

## Normalização do Esquema Relacional

### 1FN - Primeira Forma Normal
- Todos os atributos contêm valores atómicos (ex.: nome, capacidade, preço_unidade);
- Não existem grupos repetitivos nem atributos multivalorados;
- Cada célula contém apenas um valor por atributo.
 Todas as relações estão na 1FN
 
### 2FN - Segunda Forma Normal
- A maioria das tabelas tem chaves primárias simples (id_cliente, id_mesa, id_reserva, etc.);
- Relações com chave composta, como Reserva_Mesa(id_reserva, id_mesa), não têm atributos adicionais → logo, não existe dependência parcial;
Todas as relações estão na 2FN.

### 3FN - Terceira Forma Normal
-Nenhum atributo não-chave depende de outro atributo não-chave;
-Atributos como total_linha, total_parcial, subtotal, etc., são redundâncias derivadas calculáveis, mas aceites por motivos de desempenho — não violam a 3FN, pois dependem diretamente da chave.
Todas as relações estão em 3FN.

### Não há necessidade de aplicar BCNF, já que não há violações.

---

| [< Previous](REBD02.md) | [^ Main](../../README.md) | [Next >](REBD04.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|
