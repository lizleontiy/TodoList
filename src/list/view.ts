import { createElement } from '@/utils/createElement'
import { ITodoItem, IListView, IDragAndDropHandlers } from '@/types'

export class ListView implements IListView {
  root: HTMLDivElement
  wrapper: HTMLDivElement
  onChangeEvent: (e: Event) => void = () => {}
  onDeleteEvent: (e: Event) => void = () => {}
  onChangeOrderEvent: (oldIndex: number, newIndex: number) => void = () => {}

  constructor(rootId: string) {
    this.root = document.querySelector(rootId)! as HTMLDivElement
    this.wrapper = createElement('div', 'list-wrapper')! as HTMLDivElement
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
      const labelWrapper = this.createLabelWrapper(order)
      const label = this.createLabel()
      const checkbox = this.createCheckbox(id, done)
      const deleteBtn = this.createDeleteButton(id)
      const draggable = this.createDraggableUIElement()
      const textContent = document.createTextNode(title)
      label.appendChild(checkbox)
      label.appendChild(textContent)
      label.appendChild(deleteBtn)
      labelWrapper.appendChild(label)
      labelWrapper.appendChild(draggable)
      this.wrapper.appendChild(labelWrapper)
    })
  }

  createLabelWrapper(order: number) {
    const labelWrapper = createElement('div')! as HTMLDivElement
    labelWrapper.classList.add('todo-list__item')
    labelWrapper.dataset.index = String(order)
    labelWrapper.draggable = true
    return labelWrapper
  }

  createLabel() {
    const label = createElement('label', 'todo-list__label') as HTMLLabelElement
    return label
  }

  createCheckbox(id: string, done: number) {
    const checkbox = createElement('input')! as HTMLInputElement
    checkbox.type ='checkbox'
    checkbox.id = id
    checkbox.name = 'todo'
    checkbox.checked = Boolean(done)
    checkbox.onchange = this.onChangeEvent
    return checkbox
  }

  createDeleteButton(id: string) {
    const deleteBtn = createElement('button', 'todo-list__button', '×')! as HTMLButtonElement
    deleteBtn.value = id
    deleteBtn.onclick = this.onDeleteEvent
    return deleteBtn
  }

  createDraggableUIElement() {
    const draggable = createElement('div')! as HTMLDivElement
    draggable.classList.add('todo-list__draggable')
    return draggable
  }

  addDragAndDropListeners() {
    const TODO_ITEM_OFFSET = '5px'
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
        const draoverElement = this as unknown as HTMLDivElement
        draoverElement.style.marginBottom = `${elDrag!.clientHeight}px`
      },
      dragleave() {
        const dragleaveElement = this as unknown as HTMLDivElement
        dragleaveElement.style.marginBottom = TODO_ITEM_OFFSET
      },
      drop() {
        const dropOnElement = this as unknown as HTMLDivElement
        const index: number = Number(dropOnElement.dataset.index)
        dropOnElement.style.marginBottom = TODO_ITEM_OFFSET
        if (!elDrag || elDrag === dropOnElement) {
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
        const dragndropEvent = eventName as keyof IDragAndDropHandlers
        const dragEvent = event as DragEvent
        const elItem = target.closest('.todo-list__item')
        if (!elItem) {
          return
        }
        events[dragndropEvent].call(elItem, dragEvent)
      })
    })
  }
}
