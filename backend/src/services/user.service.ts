import User from '../models/User'

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId).lean()
  return user
}
