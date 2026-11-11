# language: pt
@ui
Funcionalidade: Practice Form

  Cenário: Enviar o formulário preenchido com dados aleatórios
    Dado que eu acesso o submenu "Practice Form" do card "Forms"
    Quando preencho todo o formulário com dados aleatórios
    E envio o formulário
    Então um popup de confirmação deve ser exibido com os dados enviados
    E consigo fechar o popup
