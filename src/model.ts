import { IndexedDB } from '@/utils/IndexedDB'
import { ITodoItem, ITodoModel } from '@/types'

export class TodoModel implements ITodoModel {
  indexedDB: IndexedDB = new IndexedDB()
  todoList: ITodoItem[] = []

  async add(data: ITodoItem) {
    const localData = { ...data }
    localData.order = this.todoList.length
    this.todoList?.push(localData)
    this.indexedDB.add(localData)
  }

  async get() {
    const todoList = await this.indexedDB.get() as ITodoItem[]
    this.todoList = todoList.sort((x, y) => x.order - y.order)
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
      order: this.todoList[index].order,
    })
  }

  async deleteTodoItem(e: Event) {
    const element = e.target as HTMLInputElement
    const index: number = this.todoList!.findIndex(item => item.id === element.value)
    this.todoList.splice(index, 1)
    await this.indexedDB.delete(element.value)
  }
  async updateTodoListOrder(oldIndex: number, newIndex: number) {
    console.log(oldIndex, newIndex)
    let newIdx = newIndex
    if (newIdx === 0) {
      newIdx += 1
    }
    const draggableIndex: number = this.todoList.findIndex(el => el.order === oldIndex)
    const deletedEl: ITodoItem = this.todoList.splice(draggableIndex, 1)[0]
    this.todoList.splice(newIdx, 0, deletedEl)
    this.todoList.forEach(async (item, i) => {
      item.order = i
      await this.indexedDB.update({
        title: this.todoList[i].title,
        done: this.todoList[i].done,
        id: this.todoList[i].id,
        createdAt: this.todoList[i].createdAt,
        order: item.order,
      })
    })
  }
}