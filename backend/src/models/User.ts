import { Schema, model } from 'mongoose'
import { IUser } from '../types/user.types'

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export default model<IUser>('User', UserSchema)
