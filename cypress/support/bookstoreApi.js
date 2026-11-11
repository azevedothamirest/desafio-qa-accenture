// failOnStatusCode: false → o Cypress não aborta em respostas 4xx/5xx.
// Quem decide se o status está certo são os steps (com expect), o que
// permite testar tanto o caminho feliz quanto os cenários de erro.
const request = (options) => cy.request({ failOnStatusCode: false, ...options })

export const createUser = (userName, password) =>
  request({ method: 'POST', url: '/Account/v1/User', body: { userName, password } })

export const generateToken = (userName, password) =>
  request({ method: 'POST', url: '/Account/v1/GenerateToken', body: { userName, password } })

export const isAuthorized = (userName, password) =>
  request({ method: 'POST', url: '/Account/v1/Authorized', body: { userName, password } })

export const getBooks = () => request({ method: 'GET', url: '/BookStore/v1/Books' })

export const addBooks = (token, userId, isbns) =>
  request({
    method: 'POST',
    url: '/BookStore/v1/Books',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: { userId, collectionOfIsbns: isbns.map((isbn) => ({ isbn })) }
  })

export const getUser = (token, userId) =>
  request({
    method: 'GET',
    url: `/Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${token}` }
  })
