# language: pt
@ui
Funcionalidade: Progress Bar

  Cenário: Parar antes dos 25% e resetar ao chegar em 100%
    Dado que eu acesso o submenu "Progress Bar" do card "Widgets"
    Quando inicio a barra de progresso e paro antes dos 25%
    Então o valor da barra deve ser menor ou igual a 25%
    Quando inicio a barra novamente e ela chega aos 100%
    E reseto a barra de progresso
    Então o valor da barra deve voltar para 0%
