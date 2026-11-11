import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import PracticeFormPage from '../pages/PracticeFormPage'
import { randomStudent } from '../randomData'

let student

When('preencho todo o formulário com dados aleatórios', () => {
  student = randomStudent()
  PracticeFormPage.fill(student)
})

When('envio o formulário', () => {
  PracticeFormPage.submit()
})

Then('um popup de confirmação deve ser exibido com os dados enviados', () => {
  PracticeFormPage.modalTitle().should('be.visible').and('have.text', 'Thanks for submitting the form')

  cy.get('.modal-body')
    .should('contain', `${student.firstName} ${student.lastName}`)
    .and('contain', student.email)
    .and('contain', student.mobile)
    .and('contain', student.file)
    .and('contain', `${student.state} ${student.city}`)
})

Then('consigo fechar o popup', () => {
  PracticeFormPage.closeModal()
  cy.get('.modal-content').should('not.exist')
})
