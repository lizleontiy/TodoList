import { FormView } from '@/form/view'
import { TodoController } from '@/controller'
import { TodoModel } from '@/model'

new TodoController(new FormView('#app'), new TodoModel())
