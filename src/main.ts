import { FormView } from './form/view'
import { TodoController } from './controller'

new TodoController(new FormView('#app'))
