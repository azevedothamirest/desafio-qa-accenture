# language: pt
@ui
Funcionalidade: Browser Windows

  Cenário: Abrir uma nova janela e validar a mensagem
    Dado que eu acesso o submenu "Browser Windows" do card "Alerts, Frame & Windows"
    Quando clico no botão "New Window"
    Então uma nova janela deve ser aberta com a mensagem "This is a sample page"
    E fecho a nova janela e volto para a página original
