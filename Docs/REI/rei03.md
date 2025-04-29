# Esquema Conceptual

## Modelo E/A

O sistema foi modelado com recurso ao Modelo Entidade-Associação, refletindo as principais entidades envolvidas na gestão de reservas e consumos em restaurantes com múltiplas localizações. Cada entidade e associação foi analisada para garantir uma estrutura lógica, eficiente e escalável.

### Diagrama do Modelo E/A

![Modelo Entidade-Associação do sistema de reservas](images/ea_model_restaurante.png)


---

### Entidades

#### Restaurante
Cada restaurante tem um identificador único, localização completa (cidade, rua, número e código postal). Esta entidade permite organizar os diferentes espaços físicos onde as reservas podem ser efetuadas.

#### Mesa
Cada mesa pertence a um restaurante e é identificada por um número. Inclui ainda a capacidade máxima de pessoas e o seu estado atual (Disponível, Pendente, Reservada).

#### Cliente
Contém o número de cliente, nome e contacto. Os clientes são essenciais para o processo de reserva, sendo associados diretamente às mesmas.

#### Funcionário
Identificado por um ID, cada funcionário pode realizar reservas manuais, registar consumos e finalizar pagamentos. É associado aos consumos e faturas emitidas.

#### Menu
Lista todos os itens disponíveis no restaurante (entradas, pratos principais, bebidas, sobremesas), cada um com nome, descrição, tipo e preço.

#### Item de Consumo
Regista os itens consumidos numa mesa, incluindo a quantidade, valor unitário e total da linha. Cada consumo está ligado a uma reserva ativa e a um funcionário.

---

### Associações

#### Reserva
Associação entre Cliente, Mesa e Restaurante. Uma reserva inclui data, hora, número de pessoas, tipo de menu e estado da mesa. Cada reserva é registada com uma data de criação.

#### Consumo
Associação entre Funcionário, Item do Menu e Mesa (via Reserva). Permite registar o que foi consumido por cada grupo de clientes, atribuindo a responsabilidade ao funcionário que registou.

#### Composição do Menu
Ligação entre Menu e Item de Consumo, indicando quais os pratos disponíveis e escolhidos.

---

## Regras de negócio adicionais (Restrições)

As seguintes regras não são diretamente representadas no modelo E/A, mas são fundamentais para garantir a integridade e consistência do sistema:

- Uma mesa em estado "Pendente" fica reservada temporariamente por 5 minutos. Se não for confirmada, volta a "Disponível".
- Mesas não podem ser reservadas manualmente por funcionários se estiverem "Pendente".
- Grupos com mais de 8 pessoas não podem escolher a mesa – o sistema seleciona automaticamente mesas compatíveis.
- A mesa só muda para "Disponível" após o funcionário registar o pagamento.
- Não é possível efetuar reservas sobrepostas em data/hora para a mesma mesa.
- Após almoço ou jantar, a mesa só muda de estado por ação manual do funcionário.
- Faturas apenas são emitidas após o registo do pagamento manual.
- A quantidade e o preço dos itens consumidos devem ser consistentes com o menu pré-definido.

---

[< Previous](rei02.md) | [^ Main](/../../) | Next >
:--- | :---: | ---:
