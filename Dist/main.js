"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const employees_router_1 = require("./employees/employees.router");
const server = new server_1.Server();
server.bootstrap([employees_router_1.employeesRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('server failed tl start.');
    console.error(error);
    process.exit(1);
});
