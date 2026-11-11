import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import ProgressBarPage from '../pages/ProgressBarPage'

// A barra anda ~1% a cada 100 ms. Em vez de esperar um tempo fixo (cy.wait),
// usamos o retry do Cypress: ele confere o valor a cada poucos ms e segue assim
// que a condição bate. Paramos logo depois de 10%, com folga até os 25%.
// (cy.clock/cy.tick não funcionou aqui: o React agenda as atualizações por
// um caminho que o relógio falso do Cypress não controla.)
When('inicio a barra de progresso e paro antes dos 25%', () => {
  ProgressBarPage.toggle()
  ProgressBarPage.bar().should(($bar) => {
    expect(Number($bar.attr('aria-valuenow'))).to.be.gte(10)
  })
  ProgressBarPage.toggle()
})

Then('o valor da barra deve ser menor ou igual a 25%', () => {
  ProgressBarPage.value().should('be.gt', 0).and('be.lte', 25)
})

When('inicio a barra novamente e ela chega aos 100%', () => {
  ProgressBarPage.toggle()
  ProgressBarPage.bar({ timeout: 20000 }).should('have.attr', 'aria-valuenow', '100')
})

When('reseto a barra de progresso', () => {
  ProgressBarPage.reset()
})

Then('o valor da barra deve voltar para 0%', () => {
  ProgressBarPage.bar().should('have.attr', 'aria-valuenow', '0')
})
