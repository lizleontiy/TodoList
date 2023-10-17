import { TodoView } from '@/view'
import { TodoController } from '@/controller'
import { TodoModel } from '@/model'

new TodoController(new TodoView('#app'), new TodoModel())
