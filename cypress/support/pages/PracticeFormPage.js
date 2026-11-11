class PracticeFormPage {
  fill(student) {
    cy.get('#firstName').type(student.firstName)
    cy.get('#lastName').type(student.lastName)
    cy.get('#userEmail').type(student.email)
    cy.contains('label', student.gender).click()
    cy.get('#userNumber').type(student.mobile)

    // o campo de data é um datepicker; selecionar tudo e digitar por cima funciona melhor
    cy.get('#dateOfBirthInput').type(`{selectall}${student.birthDate}{enter}`)

    cy.get('#subjectsInput').type(`${student.subject}{enter}`)
    cy.contains('label', student.hobby).click()
    cy.get('#uploadPicture').selectFile(`cypress/fixtures/${student.file}`)
    cy.get('#currentAddress').type(student.address)

    cy.get('#state input').type(`${student.state}{enter}`, { force: true })
    cy.get('#city input').type(`${student.city}{enter}`, { force: true })
  }

  submit() {
    cy.get('#submit').click({ force: true })
  }

  modalTitle() {
    return cy.get('#example-modal-sizes-title-lg')
  }

  // Bug do demoqa: clicar em "Close" (#closeLargeModal) lança
  // "findDOMNode is not a function" e o modal não fecha.
  // O Esc usa outro caminho do componente e fecha normalmente.
  closeModal() {
    cy.get('body').type('{esc}')
  }
}

export default new PracticeFormPage()
