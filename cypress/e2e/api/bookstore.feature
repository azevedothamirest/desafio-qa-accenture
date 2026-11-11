# language: pt
Funcionalidade: Aluguel de livros na BookStore via API

  Cenário: Usuário novo aluga dois livros
    Dado que eu crio um novo usuário
    E gero um token de acesso para ele
    E confirmo que o usuário está autorizado
    Quando listo os livros disponíveis
    E alugo dois livros da lista
    Então os detalhes do usuário devem mostrar os dois livros alugados
