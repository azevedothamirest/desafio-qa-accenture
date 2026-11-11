# Desafio QA Automation – Accenture

Automação de testes de API e Frontend no [demoqa.com](https://demoqa.com), feita com
**Cypress + Cucumber (BDD)** em JavaScript, com Page Objects.

![Testes Cypress](https://github.com/azevedothamirest/desafio-qa-accenture/actions/workflows/cypress.yml/badge.svg)

> [!IMPORTANT]
> **Foram encontrados 4 defeitos no demoqa durante a automação.**
> Os testes passam porque cada defeito foi contornado de forma explícita e documentada.
> Os detalhes de cada um (passos para reproduzir, resultado esperado × obtido e o contorno usado)
> estão em **[DEFEITOS.md](DEFEITOS.md)**.
>
> | ID | Tela | Defeito | Severidade |
> |----|------|---------|------------|
> | [DEF-001](DEFEITOS.md#def-001--botão-close-não-fecha-o-popup-de-confirmação) | Practice Form | Botão "Close" não fecha o popup de confirmação | Média |
> | [DEF-002](DEFEITOS.md#def-002--data-de-nascimento-sem-espaço-após-a-vírgula-no-popup) | Practice Form | Data de nascimento sem espaço após a vírgula no popup | Baixa |
> | [DEF-003](DEFEITOS.md#def-003--deletar-um-registro-novo-apaga-todos-os-registros-novos) | Web Tables | Deletar um registro novo apaga todos os registros novos | Alta |
> | [DEF-004](DEFEITOS.md#def-004--reset-logo-ao-chegar-em-100-não-para-a-barra) | Progress Bar | Reset logo ao chegar em 100% não para a barra | Média |

> [!TIP]
> **Este projeto foi feito com apoio de IA (Claude Code), de forma declarada e com revisão humana em cada etapa.**
> Saber usar IA não basta: é preciso entender o porquê de cada ação dela e não terceirizar 100% do trabalho.
> Quanto mais rápido uma IA produz código, maior a chance de um bug passar, e é aí que entra o papel de QA.
> Na seção **[Uso de IA](#uso-de-ia)** estão o processo seguido e **7 casos reais deste projeto** em que a revisão
> humana corrigiu o caminho que a IA tinha seguido primeiro.

## O que foi automatizado

| Parte | Cenário | Feature |
|-------|---------|---------|
| 1 – API | Criar usuário → gerar token → confirmar autorização → listar livros → alugar 2 livros → ver detalhes do usuário | [bookstore.feature](cypress/e2e/api/bookstore.feature) |
| 1 – API (extra) | Cenários de erro: senha inválida (Esquema do Cenário com 4 regras), usuário duplicado, token com senha errada, alugar sem token | [bookstoreNegativo.feature](cypress/e2e/api/bookstoreNegativo.feature) |
| 2 – UI | Forms > Practice Form | [practiceForm.feature](cypress/e2e/ui/practiceForm.feature) |
| 2 – UI | Alerts, Frame & Windows > Browser Windows | [browserWindows.feature](cypress/e2e/ui/browserWindows.feature) |
| 2 – UI | Elements > Web Tables (CRUD + **bônus**: 12 registros) | [webTables.feature](cypress/e2e/ui/webTables.feature) |
| 2 – UI | Widgets > Progress Bar | [progressBar.feature](cypress/e2e/ui/progressBar.feature) |
| 2 – UI | Interactions > Sortable | [sortable.feature](cypress/e2e/ui/sortable.feature) |

Todos os itens do enunciado foram feitos, incluindo o bônus.

## Como rodar

Pré-requisito: Node.js 18 ou mais novo.

```bash
npm install
npm test            # API + UI, numa única execução
npm run test:api    # só a Parte 1
npm run test:ui     # só a Parte 2
npm run cy:open     # modo interativo
```

Os testes também rodam no **GitHub Actions** a cada push na `main` e em pull requests
([cypress.yml](.github/workflows/cypress.yml)). Se algo falhar, as screenshots ficam salvas como artefato da execução.

## Estrutura

```
cypress/
├── e2e/
│   ├── api/                 # feature da Parte 1
│   └── ui/                  # uma feature por tela da Parte 2 (tag @ui)
├── fixtures/upload.txt      # arquivo usado no upload do Practice Form
└── support/
    ├── bookstoreApi.js      # uma função por endpoint da API
    ├── randomData.js        # geração de dados aleatórios válidos
    ├── commands.js          # bloqueio de anúncios e cy.openPage
    ├── pages/               # Page Objects
    └── step_definitions/    # steps do Cucumber (common.steps.js tem a navegação compartilhada)
```

## Decisões técnicas

- **Cucumber em português** (`# language: pt`): os cenários ficam legíveis para quem não programa.
- **Page Objects** na UI e **uma função por endpoint** na API: os steps descrevem o *quê*, e os
  page objects/funções escondem o *como* (seletores, URLs, headers).
- **Navegação compartilhada:** um único step (`que eu acesso o submenu "X" do card "Y"`) parte
  sempre da home, como o enunciado pede.
- **Dados aleatórios, mas válidos:** campos livres são sorteados; selects (estado/cidade, matérias,
  hobbies) usam só valores que o site aceita. O usuário da API leva um timestamp no nome, então cada
  execução é independente.
- **Anúncios bloqueados** via `cy.intercept`: eles cobrem botões e deixam os testes instáveis.
- **Browser Windows:** o Cypress controla uma única aba. O `window.open` é substituído por um stub;
  o teste valida que a URL `/sample` foi pedida e abre essa URL na mesma aba para checar a mensagem.
- **Web Tables:** cada linha é encontrada pelo e-mail (único) usando a busca, o que funciona mesmo com
  paginação. O número de registros do bônus vem do próprio Gherkin (`crio 12 novos registros`).
- **Progress Bar:** em vez de esperas fixas, o retry do Cypress para a barra logo após 10%, com folga
  até os 25%. `cy.clock()` foi testado e não funciona neste site (o React agenda as atualizações por
  um caminho que o relógio falso não controla). A única espera fixa do projeto é o contorno do DEF-004.
- **Sortable:** a lista usa react-dnd com backend HTML5, então o arrasto dispara os eventos nativos
  (`dragstart` → `dragover` → `drop` → `dragend`). O teste primeiro inverte a lista e só depois
  ordena, para provar que o drag and drop realmente funcionou.

---

## Uso de IA

> [!IMPORTANT]
> Este projeto foi desenvolvido com apoio de um assistente de IA (Claude Code), e faço questão de
> deixar isso claro.
>
> **Para mim, saber usar IA não basta: é preciso entender o porquê de cada ação dela,
> não terceirizar 100% do trabalho e garantir o fator humano na revisão.**
>
> Quanto mais rápido uma IA produz código, maior a chance de um bug passar despercebido,
> e é justamente aí que entra o papel de QA.

### Como a IA foi usada

- **Etapa por etapa, nunca tudo de uma vez:** cada tela foi feita isoladamente, com explicação do que
  foi feito e por quê, e só virou commit depois de revisada e com o teste passando.
  Os commits pequenos (Conventional Commits) refletem esse ritmo.
- **Nada foi aceito sem rodar:** todo teste foi executado de verdade, e os mais sensíveis a tempo
  (Progress Bar, Sortable) foram executados várias vezes seguidas para garantir estabilidade.
- **Defeitos confirmados à mão:** antes de registrar um defeito, ele foi reproduzido manualmente no
  navegador, fora do Cypress, para separar bug do sistema de bug do teste.
- **API consultada antes de escrever as validações:** os status e códigos de erro dos cenários
  negativos vieram de chamadas reais à API, não de suposição.

### Onde a revisão humana fez diferença

Estes são casos reais deste projeto em que o primeiro caminho, o mais "rápido", estava errado:

| Situação | O que parecia certo | O que a verificação mostrou |
|----------|---------------------|-----------------------------|
| Progress Bar | Controlar o tempo com `cy.clock()`/`cy.tick()` | Não funciona neste site: a barra não passava de 1%. Trocado pelo retry do Cypress. |
| Progress Bar | Ler o valor com `.then(Number)` e validar | O `.then` desliga o retry do Cypress; o valor era lido antes da tela atualizar. |
| Progress Bar | "O Reset está quebrado no teste" | Era um defeito real do site, reproduzido à mão ([DEF-004](DEFEITOS.md)). |
| Sortable | Arrastar com `mousedown`/`mousemove`/`mouseup` | A lista usa react-dnd com backend HTML5; só eventos nativos de drag and drop funcionam. |
| Web Tables | Seletor `.rt-tr-group` para as linhas | O demoqa mudou a tabela; o seletor foi atualizado depois de inspecionar o DOM. |
| Web Tables | Testes passando localmente | No CI (Linux) falharam: os e-mails gerados eram longos e empurravam os ícones para baixo de outra coluna. Corrigido na causa, sem `{force: true}`, que só esconderia o problema. |
| Web Tables | "O teste de deletar está errado" | Era um defeito real: deletar um registro novo apaga todos os novos ([DEF-003](DEFEITOS.md)). |

### Por que usar IA num teste técnico

- **É como o mercado trabalha hoje:** IA já faz parte do dia a dia de desenvolvimento e QA. Mostrar
  como uso, com critério, é mais honesto e mais útil do que esconder.
- **O valor está no julgamento, não na digitação:** a IA acelera a escrita, mas decidir o que testar,
  desconfiar de um teste verde, investigar uma falha e diferenciar bug do sistema de bug do teste
  continua sendo trabalho humano.
- **IA também erra, e com confiança:** a tabela acima mostra isso. Código gerado rápido precisa
  de mais verificação, não de menos.
- **Responsabilidade é minha:** cada decisão deste repositório eu consigo explicar e defender.
  O que está aqui foi revisado, executado e validado antes de entrar.
