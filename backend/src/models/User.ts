import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  _id: Schema.Types.ObjectId
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export default model<IUser>('User', UserSchema)
