import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor'
import * as api from '../bookstoreApi'
import { ctx, resetCtx } from '../apiContext'

Before({ tags: 'not @ui' }, resetCtx)

Given('que eu crio um novo usuário', () => {
  api.createUser(ctx.userName, ctx.password).then((res) => {
    expect(res.status).to.eq(201)
    expect(res.body.username).to.eq(ctx.userName)
    ctx.userId = res.body.userID
  })
})

Given('gero um token de acesso para ele', () => {
  api.generateToken(ctx.userName, ctx.password).then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body.status).to.eq('Success')
    ctx.token = res.body.token
  })
})

Given('confirmo que o usuário está autorizado', () => {
  api.isAuthorized(ctx.userName, ctx.password).then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body).to.eq(true)
  })
})

When('listo os livros disponíveis', () => {
  api.getBooks().then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body.books).to.have.length.greaterThan(1)
    ctx.books = res.body.books
  })
})

When('alugo dois livros da lista', () => {
  ctx.chosen = ctx.books.slice(0, 2).map((b) => b.isbn)

  api.addBooks(ctx.token, ctx.userId, ctx.chosen).then((res) => {
    expect(res.status).to.eq(201)
    expect(res.body.books.map((b) => b.isbn)).to.deep.eq(ctx.chosen)
  })
})

Then('os detalhes do usuário devem mostrar os dois livros alugados', () => {
  api.getUser(ctx.token, ctx.userId).then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body.username).to.eq(ctx.userName)
    expect(res.body.books.map((b) => b.isbn)).to.have.members(ctx.chosen)
  })
})
