class BrowserWindowsPage {
  // O Cypress não controla uma segunda janela do navegador.
  // Então interceptamos o window.open, validamos que ele foi chamado
  // e abrimos a mesma URL na janela atual para checar o conteúdo.
  stubWindowOpen() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })
  }

  clickNewWindow() {
    cy.get('#windowButton').click()
  }

  newWindowUrl() {
    return cy.get('@windowOpen').should('have.been.calledOnce').then((stub) => stub.args[0][0])
  }
}

export default new BrowserWindowsPage()
