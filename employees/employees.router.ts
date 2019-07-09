import { Router } from '../common/router'
import * as restify from 'restify'
import { Employee } from './employees.model'

class EmployeesRouter extends Router {
  applyRoutes(application: restify.Server) {

    application.get('/employees', (req, resp, next) => {
      Employee.find().then(employees => {

        resp.json(employees)

        return next()
      }).catch(next)
    })

    application.get('/employees/:id', (req, resp, next) => {
        Employee.findById(req.params.id).then(employee => {
        if (employee) {

          resp.json(employee)
          return next()
        }
        resp.send(404)
        return next()
      }).catch(next)
    })

    application.post('/employees', (req, resp, next) => {
      let employee = new Employee(req.body)
      employee.save().then(employee => {
        resp.setHeader('Access-Control-Allow-Origin', '*');
        resp.json(employee)
        return next()
      }).catch(next)
    })

    application.put('/employees/:id', (req, resp, next) => {     

      const options = { overwrite: true }
      Employee.update({ _id: req.params.id }, req.body, options)
        .exec().then(result => {
          if (result.n) {
            Employee.findById(req.params.id).then(employee => {             
              resp.json(employee)
              return next()
            })
          } else {
            resp.send(404)
          }
        }).catch(next)
    })

    application.patch('/employees/:id', (req, resp, next) => {
      const options ={new:true}
      Employee.findByIdAndUpdate(req.params.id, req.body, options).then(
        employee => {
          if (employee) {
            resp.json(employee)
            return next()
          }
          else { resp.send(404) }
        }
      ).catch(next)
    })

  }
}

export const employeesRouter = new EmployeesRouter()
