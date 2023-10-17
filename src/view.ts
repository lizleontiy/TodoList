import { FormView } from '@/form/view'
import { ListView } from '@/list/view'
import { IFormView, IListView, ITodoView } from '@/types'

export class TodoView implements ITodoView {
  form: IFormView
  list: IListView

  constructor(rootId: string) {
    this.form = new FormView(rootId)
    this.list = new ListView(rootId)
  }
}
