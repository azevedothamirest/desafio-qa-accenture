// Estado compartilhado entre os steps de API (usuário, senha, token, livros...).
// Fica num módulo próprio para que steps em arquivos diferentes enxerguem o mesmo objeto.
// É zerado antes de cada cenário de API.
export const ctx = {}

export const resetCtx = () => {
  Object.keys(ctx).forEach((key) => delete ctx[key])
  ctx.userName = `thamires.qa.${Date.now()}`
  ctx.password = 'Teste@12345'
}
