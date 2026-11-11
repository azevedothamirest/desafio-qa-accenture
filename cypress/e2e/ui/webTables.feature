# language: pt
@ui
Funcionalidade: Web Tables

  Contexto:
    Dado que eu acesso o submenu "Web Tables" do card "Elements"

  Cenário: Criar, editar e deletar um registro
    Quando crio um novo registro
    Então o registro deve aparecer na tabela
    Quando edito o registro alterando o salário para "9999" e o departamento para "QA"
    Então a tabela deve mostrar o registro atualizado
    Quando deleto o registro
    Então o registro não deve mais aparecer na tabela

  @bonus
  Cenário: Criar 12 registros dinamicamente e deletar todos
    Quando crio 12 novos registros
    Então os 12 registros devem aparecer na tabela
    Quando deleto todos os registros criados
    Então nenhum dos registros criados deve aparecer na tabela
