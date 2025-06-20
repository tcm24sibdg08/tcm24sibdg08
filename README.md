# EatAround - Restaurantes
Este projeto consiste no desenvolvimento de um sistema de base de dados para a gestão integrada de reservas e pedidos de um restaurante com três localizações distintas. O objetivo principal é resolver problemas reais enfrentados, como conflitos e sobreposições de reservas, gestão deficiente das mesas e dificuldade na associação dos consumos às reservas, tarefas que antes eram realizadas manualmente.

---

## Descrição do Problema

Atualmente, o restaurante enfrenta:

- Conflitos de reservas e duplicação de horários;

- Dificuldade na gestão das mesas disponíveis;

- Ineficiência no registo dos consumos e emissão de faturas;

- Ausência de controlo automatizado para disponibilização de mesas após uso.

---

## Solução Proposta


Um sistema que permite:

- Reservas online por clientes e funcionários, indicando restaurante, data, hora, número de pessoas, tipo de menu e, se desejado, escolha da mesa;

- Gestão de múltiplas localizações;

- Atribuição automática de mesas para grupos grandes;

- Gestão do estado das mesas (Disponível, Pendente, Reservada);

- Registo dos consumos associados a cada reserva;

- Emissão automática de faturas detalhadas após pagamento;

- Validação automática para evitar reservas sobrepostas e garantir a disponibilidade das mesas;

- Histórico de reservas, consumos e faturação.

---

## Estado das Mesas

| Estado     | Descrição |
|------------|-----------|
| Disponível | Mesa livre para reservas |
| Pendente   | Selecionada por um cliente ou funcionário mas ainda não confirmada/concluída (até 5 min) |
| Reservada  | Confirmada por cliente ou funcionário |


## Organização do Repositório

- Relatório de especificação da informação: [Docs/REI](Docs/REI)
- Relatório de especificação da base de dados: [Docs/REBD](Docs/REBD)
- Produto:[Docs/P](Docs/P)
- Restaurante-api:[Docs/restaurante-api](Docs/restaurante-api)
- Postman:[Docs/Postman](Docs/Postman)
- Sql:[Docs/sql](Docs/sql)

README.md — Este ficheiro com a descrição geral do projeto.
---

## Tecnologias Utilizadas

- Postman
- Node.js
- MySQL
- LoopBack 4


---

## Group 08

* Carolina Silva [@CarolinaSilva](https://github.com/carolinalimasantosilva)
* Mafalda Nunes [@MafaldaNunes](https://github.com/Mafas-07)

---
