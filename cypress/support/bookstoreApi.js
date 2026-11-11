export const createUser = (userName, password) =>
  cy.request('POST', '/Account/v1/User', { userName, password })

export const generateToken = (userName, password) =>
  cy.request('POST', '/Account/v1/GenerateToken', { userName, password })

export const isAuthorized = (userName, password) =>
  cy.request('POST', '/Account/v1/Authorized', { userName, password })

export const getBooks = () => cy.request('GET', '/BookStore/v1/Books')

export const addBooks = (token, userId, isbns) =>
  cy.request({
    method: 'POST',
    url: '/BookStore/v1/Books',
    headers: { Authorization: `Bearer ${token}` },
    body: { userId, collectionOfIsbns: isbns.map((isbn) => ({ isbn })) }
  })

export const getUser = (token, userId) =>
  cy.request({
    method: 'GET',
    url: `/Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${token}` }
  })
