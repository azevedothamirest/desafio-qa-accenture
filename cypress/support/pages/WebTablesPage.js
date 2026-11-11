class WebTablesPage {
  openForm() {
    cy.get('#addNewRecordButton').click()
  }

  fillForm(record) {
    Object.entries({
      '#firstName': record.firstName,
      '#lastName': record.lastName,
      '#userEmail': record.email,
      '#age': record.age,
      '#salary': record.salary,
      '#department': record.department
    }).forEach(([field, value]) => {
      if (value !== undefined) cy.get(field).clear().type(value)
    })
    cy.get('#submit').click()
  }

  search(text) {
    cy.get('#searchBox').clear().type(text)
  }

  row(email) {
    this.search(email)
    return cy.contains('tbody tr', email)
  }

  edit(email, changes) {
    this.row(email).find('[title="Edit"]').click()
    this.fillForm(changes)
  }

  delete(email) {
    this.row(email).find('[title="Delete"]').click()
  }
}

export default new WebTablesPage()
