import * as mongoose from 'mongoose'

export interface Employee extends mongoose.Document {
  name: string,
  email: string,
  department: string
}

const employeeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  },
  department: {
    type: String,
    required: true
  }
})

export const Employee = mongoose.model<Employee>('Employee', employeeSchema)
