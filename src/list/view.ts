import { createElement } from '@/utils/createElement'
import { ITodoItem, IListView } from '@/types'

export class ListView implements IListView {
  root: HTMLDivElement
  wrapper: HTMLDivElement
  onChangeEvent: (e: Event) => void
  onDeleteEvent: (e: Event) => void

  constructor(rootId: string) {
    this.root = document.querySelector(rootId)! as HTMLDivElement
    this.wrapper = createElement('div', 'list-wrapper')! as HTMLDivElement
    this.onChangeEvent = () => {}
    this.onDeleteEvent = () => {}
  }

  init() {
    this.root.appendChild(this.wrapper)
  }

  setOnchangeEvent(handler: (e: Event) => void) {
    this.onChangeEvent = handler
  }

  setOndeleteEvent(handler: (e: Event) => void) {
    this.onDeleteEvent = handler
  }

  generateTodoItem(data: ITodoItem[]) {
    this.wrapper.innerHTML = ''
    data.forEach(({ title, id, done }) => {
      const label = document.createElement('label')
      const checkbox = createElement('input')! as HTMLInputElement
      const labelWrapper = createElement('div')! as HTMLDivElement
      const deleteBtn = createElement('button', 'delete-btn', '×')! as HTMLButtonElement
      deleteBtn.value = id
      labelWrapper.classList.add('label-wrapper')
      checkbox.type ='checkbox'
      checkbox.id = id
      checkbox.name = 'todo'
      checkbox.onchange = this.onChangeEvent
      deleteBtn.onclick = this.onDeleteEvent
      checkbox.checked = Boolean(done)
      const textContent = document.createTextNode(title)
      label.appendChild(checkbox)
      label.appendChild(textContent)
      label.appendChild(deleteBtn)
      labelWrapper.appendChild(label)
      this.wrapper.appendChild(labelWrapper)
    })
  }
}
