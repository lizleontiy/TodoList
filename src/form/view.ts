import { IFormView } from './../types'

export class FormView implements IFormView {
  root: HTMLDivElement
  input: HTMLInputElement
  submitButton: HTMLButtonElement

  constructor(rootId: string) {
    this.root = document.querySelector(rootId)! as HTMLDivElement
    this.input = this.createElement('input', 'input')! as HTMLInputElement
    this.submitButton = this.createElement('button', 'input', 'Add')! as HTMLButtonElement
  }

  init() {
    const elements = [this.input, this.submitButton]
    elements.forEach((element) => {
      this.root.appendChild(element)
    })
    this.disableSubmitButton()
  }

  createElement(tag: string, className?: string | string[], text?: string) {
    const element = document.createElement(tag)
    if (className) {
      element.classList.add(...className)
    }
    if (text) {
      element.textContent = text
    }
    return element
  }

  disableSubmitButton() {
    this.submitButton.disabled = true
  }

  enableSubmitButton() {
    this.submitButton.disabled = false
  }
}