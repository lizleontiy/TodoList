import { TransactionType } from '@/utils/const'

export class IndexedDB {
  db: IDBDatabase | null
  dbVersion: number
  dbName: string
  schemaName: string

  constructor(
    db = null,
    dbVersion = 1,
    dbName = 'TodoList',
    schemaName = 'TodoObjList',
  ) {
    this.db = db
    this.dbVersion = dbVersion
    this.dbName = dbName
    this.schemaName = schemaName
  }

  open() {
    if (this.db) {
      return this.db
    }
    const indexedDBVal = window.indexedDB
    const openedDB = indexedDBVal.open(this.dbName, this.dbVersion)
    return new Promise((
      resolve: (value: IDBDatabase | null) => void,
      reject: (error: unknown) => void
    ) => {
      openedDB.onupgradeneeded = () => {
        console.log('onupgradeneeded')
        this.db = openedDB.result
        const store = this.db.createObjectStore(this.schemaName, { keyPath: 'id' })
        store.createIndex('is_done', 'done', { unique: true })
      }
      openedDB.onsuccess = () => {
        console.log('onsuccess')
        this.db = openedDB.result
        resolve(this.db)
      }
      openedDB.onerror = (error) => {
        reject(error)
      }
    })
  }

  async get() {
    const store = await this.createStore(TransactionType.READONLY)
    if (!store) {
      return
    }
    const request = await store.getAll()
    return this.handleResult(request)
  }

  async add(data: object) {
    const store = await this.createStore(TransactionType.READWRITE)
    if (!store) {
      return
    }
    const request = store.add(data)
    request.onerror = function(event) {
      if (request.error!.name === 'ConstraintError') {
        console.error('Item with the same id already exists')
      } else {
        console.warn(event)
      }
    }
    return this.handleResult(request)
  }

  async delete(id: string) {
    const store = await this.createStore(TransactionType.READWRITE)
    if (!store) return
    const request = await store.delete(id)
    return this.handleResult(request)
  }

  async update(todoItem: object) {
    try {
      const store = await this.createStore(TransactionType.READWRITE)
      if (!store) {
        return
      }
      const request = await store.put(todoItem)
      return this.handleResult(request)
    } catch (error) {
      console.error(error)
    }
  }

  async createStore(type: IDBTransactionMode) {
    const db = await this.open()
    const transaction = db!.transaction(this.schemaName, type)
    const todoListStore = transaction.objectStore(this.schemaName)
    this.closeDB(transaction)
    return todoListStore
  }

  private handleResult(request: IDBRequest) {
    return new Promise((
      resolve: (value: unknown) => void,
      reject: (error: unknown) => void
    ) => {
      request.onsuccess = function() {
        resolve(request.result)
      }
      request.onerror = function() {
        reject(request.error)
      }
    })
  }

  private closeDB(transaction: IDBTransaction) {
    transaction.oncomplete = function() {
      this.db.close()
    }
  }
}
