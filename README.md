# EatAround - Restaurantes
O trabalho consiste no desenvolvimento de um sistema de base de dados destinado à gestão de reservas e pedidos de um restaurante com três localizações distintas. 


---

## Descrição do Problema


O objetivo principal é solucionar os problemas atuais enfrentados pelo restaurante, que incluem conflitos de reservas, duplicação de horários, dificuldade na gestão das mesas disponíveis e ineficiência na associação dos pedidos de cada mesa (que anteriormente eram realizadas à mão) e respetiva emissão de fatura. 

---

## Solução Proposta

Um sistema que permite:
- Reservar mesas com base na localização, data, hora, número de pessoas e tipo de menu.
- Reservas online pelo cliente e pelo funcionário (clientes pessoalmente)
- Gestão de multiplas localizações
- Atribuir automaticamente mesas em caso de grupos com mais de 8 pessoas.
- Gerir o estado das mesas (Disponível, Pendente, Reservada).
- Registar cada pedido por mesa e calcular automaticamente o total da conta.
- Emitir faturas detalhadas após o pagamento.
- Evitar reservas sobrepostas e validar automaticamente a disponibilidade.

---

## Estado das Mesas

| Estado     | Descrição |
|------------|-----------|
| Disponível | Mesa livre para reservas |
| Pendente   | Selecionada por um cliente durante o processo de reserva (até 5 min) |
| Reservada  | Confirmada por cliente ou funcionário |


## Organização do Repositório

- Relatório de especificação da informação: [Docs/REI](Docs/REI)
---

## Tecnologias Utilizadas

- Docker  
- NodeJS  
- MySQL  

---

## Group 08

* Carolina Silva [@CarolinaSilva](https://github.com/carolinalimasantosilva)
* Mafalda Nunes [@MafaldaNunes](https://github.com/Mafas-07)

---
