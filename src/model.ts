import { IndexedDB } from '@/utils/IndexedDB'
import { ITodoItem, ITodoModel } from '@/types'

export class TodoModel implements ITodoModel {
  indexedDB: IndexedDB
  todoList: ITodoItem[]

  constructor() {
    this.indexedDB = new IndexedDB()
    this.todoList = [] as ITodoItem[]
    this.init()
  }

  async add(data: ITodoItem) {
    this.todoList?.push(data)
    this.indexedDB.add(data)
  }

  async get() {
    const todoList = await this.indexedDB.get() as ITodoItem[]
    this.todoList = todoList.sort((x, y) => x.createdAt - y.createdAt)
  }

  async changeCheckboxStatus(e: Event) {
    const element = e.target as HTMLInputElement
    const index: number = this.todoList!.findIndex(item => item.id === element.id)
    this.todoList[index].done = Number(element.checked)
    await this.indexedDB.update({
      title: this.todoList[index].title,
      done: this.todoList[index].done,
      id: this.todoList[index].id,
      createdAt: this.todoList[index].createdAt,
    })
  }

  async init() {
    
  }
}