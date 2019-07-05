"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    department: {
        type: String
    }
});
exports.Employee = mongoose.model('Employee', employeeSchema);
