import { FormView } from '@/form/view'
import { ListView } from '@/list/view'
import { IFormView, IListView, ITodoView } from '@/types'

export class TodoView implements ITodoView {
  form: IFormView
  list: IListView

  constructor(formRoot: string, listRoot: string) {
    this.form = new FormView(formRoot)
    this.list = new ListView(listRoot)
  }
}
