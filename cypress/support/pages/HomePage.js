class HomePage {
  open() {
    cy.openPage('/')
  }

  goToCard(name) {
    cy.contains('.card', name).click()
  }

  goToMenu(item) {
    cy.contains('.element-list .text', item).click()
  }
}

export default new HomePage()
