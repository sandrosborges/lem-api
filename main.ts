import {Server} from './server/server'
import {employeesRouter} from "./employees/employees.router";


const server = new Server()

server.bootstrap([employeesRouter]).then(server=>{

  console.log('Server is listening on:', server.application.address())
}).catch(error => {
  console.log('server failed tl start.')
  console.error(error)
  process.exit(1)
})


