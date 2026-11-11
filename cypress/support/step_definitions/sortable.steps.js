import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import SortablePage from '../pages/SortablePage'

const ASCENDING = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']

const currentOrder = () => SortablePage.items().then(($items) => [...$items].map((el) => el.innerText.trim()))

// A lista já abre em ordem crescente. Para o teste provar alguma coisa,
// primeiro embaralhamos (também com drag and drop) e conferimos que saiu da ordem.
When('embaralho a lista com drag and drop', () => {
  const descending = [...ASCENDING].reverse()
  SortablePage.sortTo(descending)
  currentOrder().should('deep.equal', descending)
})

When('arrasto os itens para a ordem crescente', () => {
  SortablePage.sortTo(ASCENDING)
})

Then('a lista deve estar na ordem {string}', (expected) => {
  currentOrder().should('deep.equal', expected.split(', '))
})
