import * as mongoose from 'mongoose'

export interface Employee extends mongoose.Document {
  name: string,
  email: string,
  department: string
}

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
})

export const Employee = mongoose.model<Employee>('Employee', employeeSchema)
