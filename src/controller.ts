import { ITodoModel, ITodoView, ITodoController, ITodoItem } from './types'

export class TodoController implements ITodoController {
  view: ITodoView
  model: ITodoModel

  constructor(view: ITodoView, todoModel: ITodoModel) {
    this.view = view
    this.model = todoModel
    this.view.form.init()
    this.view.list.init()
    this.view.list.setOnchangeEvent(this.checkboxEventHandler.bind(this))
    this.view.form.inputListener()
    this.getDataOnLoad()
    this.view.form.submitListener(this.addData.bind(this))
  }

  async getDataOnLoad() {
    await this.model.get()
    if (this.model.todoList.length > 0) {
      this.view.list.generateTodoItem(this.model.todoList)
    }
  }

  async addData(data: ITodoItem) {
    await this.model.add(data)
    await this.model.get()
    this.view.list.generateTodoItem(this.model.todoList)
  }

  checkboxEventHandler(e: Event) {
    this.model.changeCheckboxStatus(e)
  }
}
