import { createElement } from '@/utils/createElement'
import { IFormView, ITodoItem } from '@/types'

export class FormView implements IFormView {
  root: HTMLDivElement
  input: HTMLInputElement
  submitButton: HTMLButtonElement

  constructor(rootId: string) {
    this.root = document.querySelector(rootId)! as HTMLDivElement
    this.input = createElement('input', 'input')! as HTMLInputElement
    this.submitButton = createElement('button', 'input', 'Add')! as HTMLButtonElement
  }

  init() {
    const elements = [this.input, this.submitButton]
    elements.forEach((element) => {
      this.root.appendChild(element)
    })
    this.disableSubmitButton()
  }

  inputListener() {
    this.input.addEventListener('input', (e) => {
      this.handleSubmitButtonActivity(e as InputEvent)
    })
  }

  submitListener(callback: (data: ITodoItem) => void) {
    this.submitButton.addEventListener('click', () => {
      const todoItem = {
        title: this.input.value,
        done: 0,
        id: `id${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().valueOf(),
      }
      callback(todoItem)
      this.clearInput()
    })
  }

  handleSubmitButtonActivity(e: InputEvent) {
    const target = e.target as HTMLInputElement
    if (target.value.length > 0) {
      this.enableSubmitButton()
    } else {
      this.disableSubmitButton()
    }
  }

  clearInput() {
    this.input.value = ''
    this.disableSubmitButton()
  }

  disableSubmitButton() {
    this.submitButton.disabled = true
  }

  enableSubmitButton() {
    this.submitButton.disabled = false
  }
}