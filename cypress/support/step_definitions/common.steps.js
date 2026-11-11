import { Given } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../pages/HomePage'

// Navegação compartilhada por todas as features de UI:
// sempre parte da home e segue pelo card e pelo submenu, como o enunciado pede.
Given('que eu acesso o submenu {string} do card {string}', (menu, card) => {
  HomePage.open()
  HomePage.goToCard(card)
  HomePage.goToMenu(menu)
})
