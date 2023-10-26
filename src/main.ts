import { TodoView } from '@/view'
import { TodoController } from '@/controller'
import { TodoModel } from '@/model'
import '@/style/index.scss'
new TodoController(new TodoView('#form', '#list'), new TodoModel())
