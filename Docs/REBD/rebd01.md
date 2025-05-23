# C1 : Introdução
## Descrição do trabalho
O trabalho consiste no desenvolvimento de um sistema de base de dados destinado à gestão de reservas e pedidos de um restaurante com três localizações distintas. O objetivo principal é solucionar os problemas atuais enfrentados pelo restaurante, que incluem conflitos de reservas, duplicação de horários, dificuldade na gestão das mesas disponíveis e ineficiência na associação de consumos às reservas efetuadas que anteriormente eram realizadas à mão.
O sistema proposto permitirá aos clientes realizar reservas de forma organizada e eficaz, selecionando o restaurante desejado, data, hora, número de pessoas, tipo de menu (normal ou aniversário) e, quando aplicável, a mesa desejada. Cada restaurante é identificado por um número e descrito com informações completas de localização, como cidade, rua, número e código postal. As mesas de cada restaurante possuem uma capacidade máxima definida, o que será levado em consideração no momento da reserva.
Um dos principais desafios do sistema será gerir automaticamente a alocação de mesas, especialmente no caso de reservas para grupos com mais de 8 pessoas, em que a seleção será automática e deverá considerar a disponibilidade e capacidade das mesas, dividindo os lugares de forma eficiente.
Além da gestão de reservas, o sistema deverá oferecer funcionalidades de registo de consumos por mesa. Os funcionários poderão associar a cada mesa os itens pedidos pelos clientes a partir de um menu previamente definido, com entradas, pratos, bebidas e sobremesas, incluindo nome, tipo e preço. Cada consumo será registado com o ID do item, quantidade, preço unidade e valor total da linha, bem como o ID do funcionário responsável e da mesa associada à reserva ativa.
O sistema irá calcular automaticamente o total da conta por mesa, possibilitando a consulta dos valores a qualquer momento durante o serviço. Após o pagamento, feito manualmente por um funcionário, o sistema deverá emitir uma fatura completa com o detalhe dos itens consumidos, subtotal, IVA (caso aplicável), total final, data e hora da emissão, bem como a identificação da reserva, cliente e funcionário. Após esse processo, a mesa voltará automaticamente ao estado "Disponível", pronta para novas reservas.
O sistema também será responsável por gerir os estados das mesas, que podem estar em três situações distintas: Disponível, Pendente ou Reservada. O estado "Pendente" ocorre durante o processo de reserva online e dura até 5 minutos, tempo em que o cliente deve confirmar a reserva. Caso não o faça, a mesa volta ao estado "Disponível". O estado "Reservada" representa uma confirmação completa, seja por um cliente ou por um funcionário. Só os funcionários podem alterar o estado de uma mesa manualmente se necessário.
Por fim, será registada a data de criação de cada reserva para fins de histórico e gestão. A validação automática da disponibilidade das mesas será feita com base na data, hora e número de pessoas, de forma a evitar conflitos e garantir a integridade das reservas.
O sistema proposto representa uma solução completa e integrada para as necessidades operacionais do restaurante, otimizando os processos de reserva, consumo e faturação, e contribuindo para uma experiência mais fluida tanto para os clientes como para os funcionários.

# Modelação do problema
A modelação do problema baseia-se nos seguintes pressupostos:
- **Três Localizações Distintas:** O sistema deve ser capaz de gerir de forma independente os três restaurantes, cada um com a sua própria estrutura de mesas, localização e reservas. Cada restaurante terá um identificador único (ID).


- **Gestão de Mesas por Restaurante:** Cada restaurante possui um conjunto de mesas identificadas por número e capacidade máxima de pessoas. As mesas não são partilhadas entre restaurantes.


- **Reserva com Critérios Múltiplos:** As reservas são feitas com base em múltiplos critérios — restaurante, data, hora, número de pessoas, tipo de menu e, quando aplicável, a seleção da mesa. Para grupos com mais de 8 pessoas, a alocação de mesas será feita automaticamente, utilizando a combinação de mesas disponíveis que satisfaça a capacidade necessária.


Estados da Mesa:


- **Disponível:** Mesa livre, sem reserva associada.


- **Pendente:** Mesa selecionada por cliente online ou pelo funcionário, mas ainda não confirmada. Expira após 5 minutos.


- **Reservada:** Confirmação efetuada, mesa ocupada para aquele horário.


Funcionamento Manual vs. Automático: Funcionários podem fazer reservas diretamente, mas não podem selecionar mesas que estejam pendentes. Deverá esperar que os 5 minutos passem. 
Cliente e Reserva: Cada cliente é identificado por um ID único e possui dados pessoais (nome e contacto). Cada reserva está diretamente associada a um cliente.


Registo de Consumos: Durante o atendimento, os consumos são registados no sistema por um funcionário e estão sempre ligados a uma mesa com reserva ativa. Estes dados alimentam o cálculo automático do total da conta.


Menu Estático: O menu é pré-definido e contém todos os itens disponíveis, com respetivos preços. Estes valores não são alterados durante o atendimento. Haverá a opção “ Personalizado” para casos de pratos improvisados por restrições de um cliente.


Fatura Automática: Após o pagamento ser registado, a fatura é automaticamente gerada, com todos os dados relevantes incluídos.


Validação e Integridade: A base de dados deve garantir que não existam sobreposições de reservas, através da verificação em tempo real da disponibilidade das mesas com base em data, hora e número de pessoas.

Este modelo pressupõe que o sistema será utilizado tanto por clientes (em plataforma online) como por funcionários (num painel de gestão interno), exigindo mecanismos robustos de controlo, segurança e simultaneidade no acesso à base de dados. O sistema proposto não só resolve os problemas de gestão enfrentados atualmente, como prepara o restaurante para um crescimento sustentável e uma melhor experiência para o cliente.


---
[< Previous](rei00.md) | [^ Main](/../../) | [Next >](rei02.md)
:--- | :---: | ---: 
