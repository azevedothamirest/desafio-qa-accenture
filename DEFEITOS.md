# Defeitos encontrados

Defeitos do sistema sob teste (https://demoqa.com) encontrados durante a automação.
Para cada um: como reproduzir, o resultado esperado e obtido, e como a automação lida com ele.

| ID | Tela | Título | Severidade | Status na automação |
|----|------|--------|------------|---------------------|
| DEF-001 | Forms > Practice Form | Botão "Close" não fecha o popup de confirmação | Média | Contornado (fecha com Esc) |
| DEF-002 | Forms > Practice Form | Data de nascimento sem espaço após a vírgula no popup | Baixa | Apenas registrado |

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
