# language: pt
Funcionalidade: Cenários de erro da API da BookStore

  Esquema do Cenário: Não permitir criar usuário com senha inválida (<regra>)
    Quando tento criar um usuário com a senha "<senha>"
    Então a API deve responder 400 com o código "1300"

    Exemplos:
      | regra                     | senha       |
      | menos de 8 caracteres     | Ab@1        |
      | sem caractere especial    | Abcdefg1    |
      | sem número                | Abcdefg@    |
      | sem letra maiúscula       | abcdefg@1   |

  Cenário: Não permitir criar um usuário que já existe
    Dado que eu crio um novo usuário
    Quando tento criar o mesmo usuário novamente
    Então a API deve responder 406 com o código "1204"

  Cenário: Não gerar token com a senha errada
    Dado que eu crio um novo usuário
    Quando tento gerar um token com a senha "Errada@123"
    Então o token não deve ser gerado

  Cenário: Não permitir alugar livros sem token
    Dado que eu crio um novo usuário
    Quando tento alugar um livro sem enviar o token
    Então a API deve responder 401 com o código "1200"
