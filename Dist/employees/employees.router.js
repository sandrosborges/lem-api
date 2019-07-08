"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const employees_model_1 = require("./employees.model");
class EmployeesRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/employees', (req, resp, next) => {
            employees_model_1.Employee.find().then(employees => {
                resp.setHeader('Access-Control-Allow-Origin', '*');
                resp.json(employees);
                return next();
            }).catch(next);
        });
        application.get('/employees/:id', (req, resp, next) => {
            employees_model_1.Employee.findById(req.params.id).then(employee => {
                if (employee) {
                    resp.setHeader('Access-Control-Allow-Origin', '*');
                    resp.json(employee);
                    return next();
                }
                resp.send(404);
                return next();
            }).catch(next);
        });
        application.post('/employees', (req, resp, next) => {
            let employee = new employees_model_1.Employee(req.body);
            employee.save().then(employee => {
                resp.setHeader('Access-Control-Allow-Origin', '*');
                resp.json(employee);
                return next();
            }).catch(next);
        });
        application.put('/employees/:id', (req, resp, next) => {
            const options = { overwrite: true };
            employees_model_1.Employee.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    employees_model_1.Employee.findById(req.params.id).then(employee => {
                        resp.setHeader('Access-Control-Allow-Origin', '*');
                        resp.json(employee);
                        return next();
                    });
                }
                else {
                    resp.send(404);
                }
            }).catch(next);
        });
        application.patch('/employees/:id', (req, resp, next) => {
            const options = { new: true };
            employees_model_1.Employee.findByIdAndUpdate(req.params.id, req.body, options).then(employee => {
                if (employee) {
                    resp.setHeader('Access-Control-Allow-Origin', '*');
                    resp.json(employee);
                    return next();
                }
                else {
                    resp.send(404);
                }
            }).catch(next);
        });
    }
}
exports.employeesRouter = new EmployeesRouter();
