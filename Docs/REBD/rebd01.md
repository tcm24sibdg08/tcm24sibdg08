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


# Especificação de Requisitos

## Atores e Funcionalidades

De acordo com cada ator existem funcionalidades distintas, e a confusão e atribuição indevida destas funcionalidades ao ator errado pode se tornar num problema bastante grave. Portanto, cada função foi destinada ao ator correto .

Atores e as suas funcionalidades e permissões:

## Cliente
O cliente acede ao sistema através de uma interface online (website) e tem como objetivo principal realizar reservas. As funcionalidades disponíveis para o cliente são:
Registo de cliente: **Inserção de nome e contacto para criação de conta no sistema.
- **Autenticação:** Login no sistema para aceder ao seu histórico e realizar reservas.


- **Consulta de disponibilidade:** Verificação de disponibilidade de mesas por restaurante, data e hora.


- **Reserva de mesa:**
Escolha do restaurante.

Seleção de data e hora.

Indicação do número de pessoas.

Escolha do tipo de menu (normal ou aniversário).

Seleção de mesa (caso aplicável).

O sistema marca a mesa como “Pendente” durante 5 minutos até o cliente confirmar a reserva.


- **Confirmação de reserva:** Finalização da reserva e geração de um número de reserva.


- **Consulta e cancelamento de reservas futuras.**


- **Consulta de reservas anteriores (histórico).**

## Funcionário
O funcionário é um utilizador com permissões avançadas para gerir as operações do restaurante, tanto em reservas como em consumos. A sua interface é de uso interno e controlada por autenticação. As funcionalidades disponíveis para o funcionário são:
- **Autenticação no sistema** com credenciais internas.


- **Consulta de reservas ativas** por localização, data e hora.


- **Reserva manual de mesa para cliente sem reserva.**


Não pode reservar mesas em estado “Pendente”.


Pode registar reservas para qualquer número de pessoas.


- **Alteração de estado da mesa:**


  Atualizar manualmente uma mesa para “Disponível” após o serviço.


- **Registo de consumos por mesa:**


  Escolha de itens do menu.


  Inserção da quantidade.


  O sistema calcula automaticamente o valor total da linha.


  Associação ao ID da mesa, reserva e funcionário.


- **Consulta do total acumulado de consumos por mesa em tempo real.**
- **Registo do pagamento e emissão automática de fatura.**
- **Gestão de ocupação do restaurante em tempo real** (dashboard com estado das mesas).


- **Consulta de histórico de reservas e consumos.**
  
## Administrador (Gestor)
O administrador ou gestor tem acesso total ao sistema e às funcionalidades de configuração e gestão geral. Este perfil é responsável por supervisionar o sistema e manter os dados atualizados. As suas funcionalidades incluem:
- **Autenticação segura com perfil de administrador.**


- **Gestão de utilizadores**(clientes e funcionários):


- **Criação, edição e remoção de contas.**


- **Gestão de restaurantes:**


Inserção de novas localizações (cidade, rua, número, código postal).


Atualização de dados de localização.


- **Gestão de mesas:**


Adição, edição ou remoção de mesas por restaurante.


Definição da capacidade de cada mesa.


- **Gestão do menu:**


Inserção de novos itens (entradas, pratos, bebidas, sobremesas).


Atualização de preços, descrições e categorias.


- **Consulta de relatórios:**


Histórico completo de reservas e consumos.


Estatísticas de ocupação por localização e horário.


Relatórios financeiros (valores faturados, IVA, total por funcionário).


- **Parâmetros do sistema:**


Definição do tempo máximo para estado “Pendente” (ex: 5 minutos).


Configurações gerais de funcionamento.

---

| [< Previous](rebd00.md) | [^ Main](../../README.md) | [Next >](rebd03.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|
