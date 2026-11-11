class ProgressBarPage {
  toggle() {
    cy.get('#startStopButton').click()
  }

  bar(options = {}) {
    return cy.get('#progressBar [role="progressbar"]', options)
  }

  value() {
    return this.bar().invoke('attr', 'aria-valuenow').then(Number)
  }

  reset() {
    // DEF-004: clicar em Reset logo que a barra chega a 100% faz ela voltar a andar
    // sozinha (sobra um timer rodando). A espera fixa aqui é intencional: dá tempo
    // do componente encerrar o timer antes do reset.
    cy.wait(1000)
    cy.get('#resetButton').should('be.visible').click()
  }
}

export default new ProgressBarPage()
