import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import BrowserWindowsPage from '../pages/BrowserWindowsPage'

When('clico no botão "New Window"', () => {
  BrowserWindowsPage.stubWindowOpen()
  BrowserWindowsPage.clickNewWindow()
})

// O Cypress roda numa única aba: a "nova janela" é simulada abrindo
// a URL que o site passou para o window.open na própria aba do teste.
Then('uma nova janela deve ser aberta com a mensagem {string}', (message) => {
  BrowserWindowsPage.newWindowUrl().then((url) => {
    expect(url).to.contain('/sample')
    cy.visit(url)
  })
  cy.get('#sampleHeading').should('have.text', message)
})

// "Fechar" a janela simulada = voltar para a página que a abriu.
Then('fecho a nova janela e volto para a página original', () => {
  cy.go('back')
  cy.location('pathname').should('eq', '/browser-windows')
  cy.get('#windowButton').should('be.visible')
})
