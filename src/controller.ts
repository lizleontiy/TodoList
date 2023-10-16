import { IFormView, ITodoModel } from './types'
export class TodoController {
  formView: IFormView
  todoModel

  constructor(formView: IFormView, todoModel: ITodoModel) {
    this.formView = formView
    this.formView.init()
    this.todoModel = todoModel
  }
}