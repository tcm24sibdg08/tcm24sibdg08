# Especificação de Requisitos

## Atores e Funcionalidades

De acordo com cada ator existem funcionalidades distintas, e a confusão e atribuição indevida destas funcionalidades ao ator errado pode se tornar num problema bastante grave. Portanto, cada função foi destinada ao ator correto .

Atores e as suas funcionalidades e permissões:

### Cliente
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

### Funcionário
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
  
### Administrador (Gestor)
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

| [< Previous](REI01.md) | [^ Main](../../README.md) | [Next >](REI03.md) |
|:----------------------------------:|:----------------------------------:|:----------------------------------:|

