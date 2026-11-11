# language: pt
@ui
Funcionalidade: Sortable

  Cenário: Ordenar a lista em ordem crescente com drag and drop
    Dado que eu acesso o submenu "Sortable" do card "Interactions"
    Quando embaralho a lista com drag and drop
    E arrasto os itens para a ordem crescente
    Então a lista deve estar na ordem "One, Two, Three, Four, Five, Six"
