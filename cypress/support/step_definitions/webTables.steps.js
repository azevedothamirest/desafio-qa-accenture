import { When, Then, Before } from '@badeball/cypress-cucumber-preprocessor'
import WebTablesPage from '../pages/WebTablesPage'
import { randomRecord } from '../randomData'

// Registros criados no cenário atual, para editar, validar e deletar depois.
let records

Before({ tags: '@ui' }, () => {
  records = []
})

const createRecord = () => {
  const record = randomRecord()
  records.push(record)
  WebTablesPage.openForm()
  WebTablesPage.fillForm(record)
}

When('crio um novo registro', () => {
  createRecord()
})

When('crio {int} novos registros', (total) => {
  Cypress._.times(total, createRecord)
})

Then('o registro deve aparecer na tabela', () => {
  const [record] = records
  WebTablesPage.row(record.email).should('contain', record.firstName).and('contain', record.department)
})

Then('os {int} registros devem aparecer na tabela', (total) => {
  expect(records).to.have.length(total)
  records.forEach((record) => WebTablesPage.row(record.email).should('contain', record.firstName))
})

When('edito o registro alterando o salário para {string} e o departamento para {string}', (salary, department) => {
  const [record] = records
  WebTablesPage.edit(record.email, { salary, department })
  Object.assign(record, { salary, department })
})

Then('a tabela deve mostrar o registro atualizado', () => {
  const [record] = records
  WebTablesPage.row(record.email).should('contain', record.salary).and('contain', record.department)
})

When('deleto o registro', () => {
  WebTablesPage.delete(records[0].email)
})

When('deleto todos os registros criados', () => {
  // DEF-003: o site dá o mesmo id a todos os registros novos e, ao deletar um,
  // apaga todos os que têm aquele id. Então só deletamos se o registro ainda existe;
  // o passo seguinte garante que nenhum dos 12 sobrou.
  records.forEach((record) => {
    WebTablesPage.search(record.email)
    cy.get('tbody').then(($tbody) => {
      if ($tbody.text().includes(record.email)) WebTablesPage.delete(record.email)
    })
  })
})

Then(/^(o registro|nenhum dos registros criados) não deve mais aparecer na tabela$|^nenhum dos registros criados deve aparecer na tabela$/, () => {
  records.forEach((record) => {
    WebTablesPage.search(record.email)
    cy.contains(record.email).should('not.exist')
  })
})
