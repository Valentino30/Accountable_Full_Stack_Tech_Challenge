import { Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  _id: Schema.Types.ObjectId
}
