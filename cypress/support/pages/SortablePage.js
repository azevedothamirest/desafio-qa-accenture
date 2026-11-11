class SortablePage {
  items() {
    return cy.get('#demo-tabpane-list .list-group-item')
  }

  // A lista usa react-dnd com o backend HTML5 (atributos draggable e data-handler-id).
  // Ele escuta os eventos nativos de drag and drop, não mousedown/mousemove.
  // Disparamos dragstart → dragenter/dragover → drop → dragend compartilhando o
  // mesmo DataTransfer, como o navegador faz num arrasto real.
  // O ponto do dragover importa: o react-dnd só troca os itens quando o cursor
  // passa da metade do alvo, então miramos perto da borda de cima ou de baixo.
  dragTo(source, target, movingUp) {
    const dataTransfer = new DataTransfer()
    const rect = target.getBoundingClientRect()
    const clientX = rect.left + rect.width / 2
    const clientY = movingUp ? rect.top + 2 : rect.bottom - 2

    cy.wrap(source).trigger('dragstart', { dataTransfer })
    cy.wrap(target)
      .trigger('dragenter', { dataTransfer, clientX, clientY })
      .trigger('dragover', { dataTransfer, clientX, clientY })
      .trigger('drop', { dataTransfer, clientX, clientY })
    cy.wrap(source).trigger('dragend', { dataTransfer })
  }

  // Coloca os itens na ordem pedida, posição por posição:
  // para cada posição, arrasta o item certo até o item que está lá.
  sortTo(order) {
    order.forEach((label, index) => {
      this.items().then(($items) => {
        const list = [...$items]
        const sourceIndex = list.findIndex((el) => el.innerText.trim() === label)
        if (sourceIndex !== index) this.dragTo(list[sourceIndex], list[index], sourceIndex > index)
      })
    })
  }
}

export default new SortablePage()
