import { IFormView } from './types'

export class TodoController {
  formView: IFormView

  constructor(formView: IFormView) {
    this.formView = formView
    this.formView.init()
  }
}