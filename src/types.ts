import { IndexedDB } from '@/utils/IndexedDB'

export interface ITodoItem {
  title: string,
  done: number,
  id: string,
  createdAt: number,
}
export interface IFormView {
  root: HTMLDivElement,
  input: HTMLInputElement,
  submitButton: HTMLButtonElement,
  init: () => void,
  inputListener: () => void,
  submitListener: (callback: (data: ITodoItem) => void) => void,
  clearInput: () => void,
  disableSubmitButton: () => void,
  enableSubmitButton: () => void,
}

export interface IListView {
  root: HTMLDivElement,
  wrapper: HTMLDivElement,
  onChangeEvent: (e: Event) => void,
  onDeleteEvent: (e: Event) => void,
  init: () => void,
  setOnchangeEvent: (handler: (e: Event) => void) => void,
  setOndeleteEvent: (handler: (e: Event) => void) => void,
  generateTodoItem: (data: ITodoItem[]) => void,
}

export interface ITodoView {
  form: IFormView,
  list: IListView,
}

export interface ITodoModel {
  indexedDB: IndexedDB,
  todoList: ITodoItem[],
  add: (data: ITodoItem) => void,
  get: () => void,
  changeCheckboxStatus: (e: Event) => void,
  deleteTodoItem: (e: Event) => void,
}

export interface ITodoController {
  view: ITodoView,
  model: ITodoModel,
  getDataOnLoad: () => void,
  addData: (data: ITodoItem) => void,
  checkboxEventHandler: (e: Event) => void,
  updateList: () => void,
}