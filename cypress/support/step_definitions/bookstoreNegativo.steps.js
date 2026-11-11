import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import * as api from '../bookstoreApi'
import { ctx } from '../apiContext'

// ISBN real do catálogo, para o erro vir da falta de token e não de um livro inexistente.
const ANY_ISBN = '9781449325862'

When('tento criar um usuário com a senha {string}', (password) => {
  api.createUser(ctx.userName, password).as('response')
})

When('tento criar o mesmo usuário novamente', () => {
  api.createUser(ctx.userName, ctx.password).as('response')
})

When('tento gerar um token com a senha {string}', (password) => {
  api.generateToken(ctx.userName, password).as('response')
})

When('tento alugar um livro sem enviar o token', () => {
  api.addBooks(null, ctx.userId, [ANY_ISBN]).as('response')
})

Then('a API deve responder {int} com o código {string}', (status, code) => {
  cy.get('@response').then((res) => {
    expect(res.status).to.eq(status)
    expect(res.body.code).to.eq(code)
    expect(res.body.message).to.be.a('string').and.not.be.empty
  })
})

// A API responde 200 mesmo quando a autenticação falha;
// o erro vem no corpo (status "Failed" e token nulo).
Then('o token não deve ser gerado', () => {
  cy.get('@response').then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body.status).to.eq('Failed')
    expect(res.body.token).to.be.null
    expect(res.body.result).to.eq('User authorization failed.')
  })
})
