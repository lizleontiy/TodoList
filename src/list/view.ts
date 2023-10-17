import { createElement } from '@/utils/createElement'
import { ITodoItem, IListView } from '@/types'

export class ListView implements IListView {
  root: HTMLDivElement
  wrapper: HTMLDivElement
  onChangeEvent: (e: Event) => void

  constructor(rootId: string) {
    this.root = document.querySelector(rootId)! as HTMLDivElement
    this.wrapper = createElement('div', 'list-wrapper')! as HTMLDivElement
    this.onChangeEvent = () => {}
  }

  init() {
    this.root.appendChild(this.wrapper)
  }

  setOnchangeEvent(handler: (e: Event) => void) {
    this.onChangeEvent = handler
  }

  generateTodoItem(data: ITodoItem[]) {
    this.wrapper.innerHTML = ''
    data.forEach((item) => {
      const label = document.createElement('label')
      const checkbox = createElement('input')! as HTMLInputElement
      checkbox.type ='checkbox'
      checkbox.id = item.id
      checkbox.name = 'todo'
      checkbox.onchange = this.onChangeEvent
      checkbox.checked = Boolean(item.done)
      const textContent = document.createTextNode(item.title)
      label.appendChild(checkbox)
      label.appendChild(textContent)
      this.wrapper.appendChild(label)
    })
  }
}