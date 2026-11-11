// Bloqueia os anúncios do demoqa: eles cobrem botões e deixam os testes instáveis
Cypress.Commands.add('blockAds', () => {
  cy.intercept({ hostname: /googlesyndication|doubleclick|adservice|adplus/ }, { statusCode: 204 })
})

Cypress.Commands.add('openPage', (path) => {
  cy.blockAds()
  cy.visit(path)
})
