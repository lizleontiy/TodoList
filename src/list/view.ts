import { createElement } from '@/utils/createElement'
import { ITodoItem, IListView, IDragAndDropHandlers } from '@/types'

export class ListView implements IListView {
  root: HTMLDivElement
  wrapper: HTMLDivElement
  onChangeEvent: (e: Event) => void
  onDeleteEvent: (e: Event) => void
  onChangeOrderEvent: (oldIndex: number, newIndex: number) => void

  constructor(rootId: string) {
    this.root = document.querySelector(rootId)! as HTMLDivElement
    this.wrapper = createElement('div', 'list-wrapper')! as HTMLDivElement
    this.onChangeEvent = () => {}
    this.onDeleteEvent = () => {}
    this.onChangeOrderEvent = () => {}
    this.addDragAndDropListeners()
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

  setOnChangeOrderEvent(handler: (oldIndex: number, newIndex: number) => void) {
    this.onChangeOrderEvent = handler
  }

  generateTodoItem(data: ITodoItem[]) {
    this.wrapper.innerHTML = ''
    data.forEach(({ title, id, done, order }) => {
      const label = document.createElement('label')
      const checkbox = createElement('input')! as HTMLInputElement
      const labelWrapper = createElement('div')! as HTMLDivElement
      const deleteBtn = createElement('button', 'delete-btn', '×')! as HTMLButtonElement
      label.draggable = true
      deleteBtn.value = id
      labelWrapper.classList.add('label-wrapper')
      labelWrapper.dataset.index = String(order)
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

  addDragAndDropListeners() {
    let elDrag: HTMLDivElement
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    const events: IDragAndDropHandlers = {
      dragstart(event: DragEvent) {
        event.dataTransfer!.effectAllowed = 'move'
        elDrag = this as unknown as HTMLDivElement
      },
      dragover(event: DragEvent) {
        event.preventDefault()
        const el = this as unknown as HTMLDivElement
        el.style.marginBottom = elDrag!.clientHeight + 'px'
      },
      dragleave() {
        const el = this as unknown as HTMLDivElement
        el.style.marginBottom = '5px'
      },
      drop() {
        const el = this as unknown as HTMLDivElement
        const index: number = Number(el.dataset.index)
        el.style.marginBottom = '5px'
        if (!elDrag) {
          return
        }
        if (elDrag === this as unknown as HTMLDivElement) {
          return
        }
        self.wrapper.insertBefore(
          elDrag,
          [...self.wrapper.children][index].nextSibling
        )
        self.onChangeOrderEvent(Number(elDrag.dataset.index), index)
        Array.from([...self.wrapper.children]).forEach((el, i) => {
          const element = el as HTMLDivElement
          element.dataset.index = String(i)
        })
      },
    }
    const eventList = ['dragstart', 'dragover', 'dragleave', 'drop']
    eventList.forEach(eventName => {
      this.wrapper.addEventListener(eventName, (event: Event) => {
        const target = event.target as HTMLDivElement
        const elItem = target.closest('.label-wrapper')
        if (!elItem) {
          return
        }
        events[eventName as keyof IDragAndDropHandlers].call(elItem, event as DragEvent)
      })
    })
  }
}
