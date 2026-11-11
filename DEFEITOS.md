# Defeitos encontrados

Defeitos do sistema sob teste (https://demoqa.com) encontrados durante a automação.
Para cada um: como reproduzir, o resultado esperado e obtido, e como a automação lida com ele.

| ID | Tela | Título | Severidade | Status na automação |
|----|------|--------|------------|---------------------|
| DEF-001 | Forms > Practice Form | Botão "Close" não fecha o popup de confirmação | Média | Contornado (fecha com Esc) |
| DEF-002 | Forms > Practice Form | Data de nascimento sem espaço após a vírgula no popup | Baixa | Apenas registrado |
| DEF-003 | Elements > Web Tables | Deletar um registro novo apaga todos os registros novos | Alta | Contornado (deleta só se ainda existir) |

---

## DEF-001 – Botão "Close" não fecha o popup de confirmação

- **Tela:** Forms > Practice Form
- **Severidade:** Média (a funcionalidade principal funciona, mas o usuário não consegue fechar o popup pelo botão)
- **Ambiente:** Cypress 13 / Electron 118, viewport 1366x900, encontrado em 11/11/2026

**Passos para reproduzir**
1. Acessar https://demoqa.com/automation-practice-form
2. Preencher os campos obrigatórios e clicar em **Submit**
3. No popup "Thanks for submitting the form", clicar em **Close**

**Resultado esperado:** o popup fecha.

**Resultado obtido:** o popup continua aberto e o console mostra o erro
`TypeError: findDOMNode is not a function`. O componente de modal usa `findDOMNode`,
uma API que não existe mais nas versões novas do React.

**Contorno na automação:** o popup é fechado com a tecla **Esc**, que fecha normalmente.
Ver `closeModal()` em `cypress/support/pages/PracticeFormPage.js`.

---

## DEF-002 – Data de nascimento sem espaço após a vírgula no popup

- **Tela:** Forms > Practice Form
- **Severidade:** Baixa (cosmético)

**Passos para reproduzir**
1. Preencher e enviar o Practice Form com a data de nascimento 09 Apr 1999

**Resultado esperado:** "09 April, 1999"

**Resultado obtido:** "09 April,1999" (sem espaço depois da vírgula)

**Na automação:** apenas registrado; o teste não valida o formato da data.

---

## DEF-003 – Deletar um registro novo apaga todos os registros novos

- **Tela:** Elements > Web Tables
- **Severidade:** Alta (perda de dados: o usuário apaga registros que não pediu para apagar)

**Passos para reproduzir**
1. Acessar https://demoqa.com/webtables
2. Clicar em **Add** e criar o registro A (e-mail a@t.com)
3. Clicar em **Add** e criar o registro B (e-mail b@t.com)
4. Clicar no ícone de lixeira apenas do registro A

**Resultado esperado:** só o registro A é removido; B continua na tabela.

**Resultado obtido:** A e B somem da tabela. Os registros novos recebem o mesmo id
(o botão de delete dos dois é `delete-record-4`), e a exclusão remove todos com esse id.

**Contorno na automação:** no cenário bônus (12 registros), o passo de exclusão só clica em
deletar se o registro ainda está na tabela, e o passo final valida que nenhum dos 12 sobrou.
Ver `deleto todos os registros criados` em `cypress/support/step_definitions/webTables.steps.js`.
