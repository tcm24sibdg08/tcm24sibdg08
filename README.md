# tcm24sibdg08

# Sistema de Gestão de Reservas e Consumos para Restaurantes

Desenvolver um sistema de base de dados que permita organizar reservas, associar consumos e gerar faturas automaticamente em restaurantes com múltiplas localizações, garantindo uma gestão mais eficiente, redução de conflitos e melhor experiência para o cliente.

---

## Descrição do Problema

Um restaurante com 3 localizações distintas enfrenta dificuldades na gestão de reservas de mesas. A desorganização atual resulta em conflitos de horários, reservas duplicadas, trocas de mesas e confusão com os consumos dos clientes. É também necessário melhorar a emissão de faturas e o registo de itens consumidos durante o serviço.

---

## Solução Proposta

Foi desenhado um sistema que permite:
- Reservar mesas com base na localização, data, hora, número de pessoas e tipo de menu.
- Atribuir automaticamente mesas em caso de grupos com mais de 8 pessoas.
- Gerir o estado das mesas (Disponível, Pendente, Reservada).
- Registar consumos por mesa e calcular automaticamente o total da conta.
- Emitir faturas detalhadas após o pagamento.
- Evitar reservas sobrepostas e validar automaticamente a disponibilidade.

---

## Organização do Repositório

- Código-fonte disponível na pasta [`src`](src/)
- Documentação disponível na pasta [`docs`](docs/)
- Relatórios específicos na pasta [`docs/REI`](docs/REI/)

---

## Tecnologias Utilizadas

- Docker  
- NodeJS  
- MySQL  

---

## Relatórios

### Proposta
- [Proposta de Tema](docs/REI/proposta.md)

### REI - Relatório de Especificação de Informação
- [REI00](docs/REI/REI00.md)

---

## Grupo

- Carolina Silva  
- Mafalda Nunes 

---

## Estado das Mesas

| Estado     | Descrição |
|------------|-----------|
| Disponível | Mesa livre para reservas |
| Pendente   | Selecionada por um cliente durante o processo de reserva (até 5 min) |
| Reservada  | Confirmada por cliente ou funcionário |

---

## Funcionalidades em Destaque

- **Reservas online e manuais**
- **Associação entre mesas, reservas e clientes**
- **Gestão de múltiplas localizações**
- **Registo detalhado de consumos**
- **Faturação automática após pagamento**

---
