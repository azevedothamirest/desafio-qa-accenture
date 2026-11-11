import './commands'

// O demoqa carrega anúncios e scripts de terceiros que estouram erro no console.
// Esses erros não têm relação com o que estamos testando, então ignoramos.
Cypress.on('uncaught:exception', () => false)
